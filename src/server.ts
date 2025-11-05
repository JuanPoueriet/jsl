import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();


app.get('/', (req, res) => {
  // 302 es una redirección temporal, lo cual es apropiado aquí.
  res.redirect(302, '/es');
});



// --- INICIO: Funciones para generar el Sitemap ---

// Lista de rutas públicas (basada en tu app.routes.ts)
// Usamos '' para 'home' porque tu seo.ts la trata como la raíz
const publicRoutes = [
  '', // Para home
  'solutions',
  'products',
  'projects',
  'about-us',
  'contact',
  'privacy-policy',
  'terms-of-service'
];

const domain = 'https://www.jsl.technology';
const supportedLangs = ['es', 'en'];
const defaultLang = 'es'; // Tu default según seo.ts

/**
 * Genera el XML del sitemap dinámicamente
 */
function generateSitemap(): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';

  // Por cada ruta, genera una entrada para cada idioma
  publicRoutes.forEach(route => {
    supportedLangs.forEach(lang => {
      const url = `${domain}/${lang}${route ? '/' + route : ''}`;

      xml += '<url>';
      xml += `<loc>${url}</loc>`;

      // Añadir las alternativas hreflang
      supportedLangs.forEach(altLang => {
        const altUrl = `${domain}/${altLang}${route ? '/' + route : ''}`;
        xml += `<xhtml:link rel="alternate" hreflang="${altLang}" href="${altUrl}" />`;
      });

      // Añadir el x-default
      const defaultUrl = `${domain}/${defaultLang}${route ? '/' + route : ''}`;
      xml += `<xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />`;

      xml += '</url>';
    });
  });

  xml += '</urlset>';
  return xml;
}
// --- FIN: Funciones para generar el Sitemap ---








/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */


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
