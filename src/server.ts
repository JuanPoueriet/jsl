import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

// --- AÑADIDO: Importar los datos para el sitemap dinámico ---
import { PROJECTS, BLOG_POSTS } from './app/core/data/mock-data';
import { SUPPORTED_LANGUAGES } from './app/core/constants/languages';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// --- OPTIMIZACIÓN: Compresión Gzip/Brotli ---
app.use(compression());

// --- SEGURIDAD: Rate Limiting Avanzado (Throttling Dinámico) ---

// 1. Limiter para Lectura (GET) - Navegación fluida
// Permite ráfagas (bursts) de exploración.
const readLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 100, // 100 peticiones por minuto (Suficiente para cargar assets y navegar)
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Demasiadas solicitudes de lectura. Por favor espera un momento.',
});

// 2. Limiter para Acciones (POST/PUT/DELETE) - Estricto
// Evita spam en formularios.
const writeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 3, // Solo 3 acciones por minuto (ej. 3 envíos de formulario)
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Estás realizando acciones demasiado rápido.',
});

// 3. Limiter para Autenticación/Sensible - Muy Estricto
// Protección contra fuerza bruta.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos por 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Demasiados intentos de autenticación.',
});

// Middleware para aplicar limiters según el método HTTP
app.use((req, res, next) => {
  if (req.path.startsWith('/api/auth')) {
    authLimiter(req, res, next);
  } else if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    writeLimiter(req, res, next);
  } else {
    readLimiter(req, res, next);
  }
});

app.get('/', (req, res) => {
  const supportedLangs = SUPPORTED_LANGUAGES;
  const defaultLang = 'en';

  const acceptLanguage = req.headers['accept-language'];
  if (acceptLanguage) {
    // Procesa el header 'Accept-Language' para encontrar el mejor idioma
    const langs = acceptLanguage.split(',').map(lang => {
      const parts = lang.trim().split(';');
      return { code: parts[0].split('-')[0], q: parts[1] ? parseFloat(parts[1].split('=')[1]) : 1.0 };
    });

    // Ordena por 'quality value' (q)
    langs.sort((a, b) => b.q - a.q);

    // Encuentra el primer idioma soportado
    for (const lang of langs) {
      if (supportedLangs.includes(lang.code)) {
        res.redirect(302, `/${lang.code}`);
        return;
      }
    }
  }

  // Si no hay header o no hay coincidencia, redirige al idioma por defecto
  res.redirect(302, `/${defaultLang}`);
});



// --- INICIO: Funciones para generar el Sitemap ---

// Lista de rutas públicas estáticas
const staticRoutes = [
  '', // Para home
  'solutions',
  'products',
  'projects', // Página índice de proyectos
  'blog',     // Página índice de blog
  'about-us',
  'contact',
  'privacy-policy',
  'terms-of-service'
];

const domain = 'https://www.jsl.technology';
const supportedLangs = SUPPORTED_LANGUAGES;
const defaultLang = 'es';

/**
 * Genera el XML del sitemap dinámicamente
 */
function generateSitemap(): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';

  // 1. Añadir rutas estáticas
  staticRoutes.forEach(route => {
    xml += generateUrlEntry(route);
  });

  // 2. Añadir rutas dinámicas de Proyectos
  PROJECTS.forEach(project => {
    xml += generateUrlEntry(`projects/${project.slug}`);
  });
  
  // 3. Añadir rutas dinámicas de Blog
  BLOG_POSTS.forEach(post => {
    xml += generateUrlEntry(`blog/${post.slug}`);
  });

  xml += '</urlset>';
  return xml;
}

/**
 * Helper para generar una entrada <url> con sus <xhtml:link>
 */
function generateUrlEntry(route: string): string {
  let entryXml = '';
  
  supportedLangs.forEach(lang => {
    const url = `${domain}/${lang}${route ? '/' + route : ''}`;

    entryXml += '<url>';
    entryXml += `<loc>${url}</loc>`;

    // Añadir las alternativas hreflang
    supportedLangs.forEach(altLang => {
      const altUrl = `${domain}/${altLang}${route ? '/' + route : ''}`;
      entryXml += `<xhtml:link rel="alternate" hreflang="${altLang}" href="${altUrl}" />`;
    });

    // Añadir el x-default
    const defaultUrl = `${domain}/${defaultLang}${route ? '/' + route : ''}`;
    entryXml += `<xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />`;

    entryXml += '</url>';
  });
  
  return entryXml;
}
// --- FIN: Funciones para generar el Sitemap ---








/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 * // Handle API request
 * });
 * ```
 */

// --- ENDPOINT MOCK PARA CONTACTO (Con validación simulada de Captcha) ---
app.use(express.json()); // Necesario para parsear el body JSON

app.post('/api/contact', (req, res) => {
  const { name, email, message, token } = req.body;

  // Simulación de validación de Captcha
  if (!token) {
    // Si fuera real, validaríamos contra Google API aquí
    console.warn('Intento de envío sin token de captcha');
    // En producción esto sería un 400 o 403, pero para demo permitimos pasar si es mock
    // res.status(400).json({ success: false, message: 'Captcha token missing' });
    // return;
  }

  console.log('Recibido formulario de contacto:', { name, email, hasToken: !!token });

  // Simular proceso
  setTimeout(() => {
    res.json({ success: true, message: 'Formulario recibido correctamente' });
  }, 500);
});


app.get('/sitemap.xml', (req, res) => {
  const sitemap = generateSitemap();
  res.header('Content-Type', 'application/xml');
  res.send(sitemap);
});


/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  // --- AÑADIDO: Cabeceras de Seguridad ---
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  // --- FIN AÑADIDO ---

  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);