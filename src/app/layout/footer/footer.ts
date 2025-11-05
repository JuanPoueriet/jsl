import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // <-- 1. Importar
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'jsl-footer',
  imports: [RouterLink, TranslateModule, LucideAngularModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  currentYear = new Date().getFullYear();

  // --- 2. AÑADIR ESTAS PROPIEDADES ---
  public currentLang: string;

  constructor(private translate: TranslateService) {
    // 3. Obtener el idioma actual
    this.currentLang = this.translate.currentLang;

    // 4. Escuchar cambios de idioma
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
  }
  // --- FIN DE LOS CAMBIOS ---
}