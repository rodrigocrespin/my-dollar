import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';

export enum Languages {
  English = 'en',
  Spanish = 'es'
}

export const AVAILABLE_LANGUAGES = [
  { id: Languages.English, description: 'English' },
  { id: Languages.Spanish, description: 'Spanish' }
];

const DEFAULT_LANGUAGE = Languages.English;
const LANG_KEY = 'lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {

  language$: Observable<string>;

  constructor(private translateService: TranslateService) {

    const savedLang = window.localStorage.getItem(LANG_KEY);
    if (savedLang) {
      this.useLang(savedLang);
    } else {
      this.setDefaultLanguage();
    }

    this.language$ = this.translateService.onLangChange.pipe(
      map(e => e.lang),
      startWith(this.translateService.currentLang),
      shareReplay(1));
  }

  private useLang(lang: string): void {
    this.translateService.use(lang);
    this.translateService.currentLang = lang;
  }

  setDefaultLanguage(): void {
    this.useLang(DEFAULT_LANGUAGE);
  }

  setLanguage(lang: string): void {
    // @ts-ignore
    if (!AVAILABLE_LANGUAGES.map(l => l.id).includes(lang)) {
      return;
    }
    this.useLang(lang);
    window.localStorage.setItem(LANG_KEY, lang);
  }
}
