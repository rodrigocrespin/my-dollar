import { Component } from '@angular/core';
import { AVAILABLE_LANGUAGES, Languages, LanguageService } from '../../services/language.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  language$: Observable<string>;
  languages = AVAILABLE_LANGUAGES;

  constructor(private languageService: LanguageService) {
    this.language$ = languageService.language$;
  }

  setLanguage(lang: string): void {
    this.languageService.setLanguage(lang as Languages);
  }
}
