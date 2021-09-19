import { HttpClient } from '@angular/common/http';
import {
  MissingTranslationHandler, MissingTranslationHandlerParams,
  TranslateDefaultParser, TranslateLoader, TranslateParser
} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

// based on https://github.com/ngx-translate/core/issues/340#issuecomment-265156635

// don't download translations for english language
export class DefaultTranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, public prefix: string = '/assets/i18n/', public suffix: string = '.json') { }

  public getTranslation(lang: string): Observable<object> {
    if (lang === 'en') {
      // @ts-ignore
      return of(null);
    }
    return this.http.get(`${this.prefix}${lang}${this.suffix}`);
  }
}

export function DefaultTranslateHttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new DefaultTranslateHttpLoader(http);
}

// use single brackets { instead of double {{ for translations parameters interpolation
@Injectable()
export class InterpolatedTranslateParser extends TranslateDefaultParser {
  public templateMatcher: RegExp = /{\s?([^{}\s]*)\s?}/g;
}

// add [MISSING] text to missing translations
@Injectable()
export class FlaggingMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): any {
    if (params.key.indexOf('[MISSING]') === -1) {
      const prefix = params.translateService.currentLang !== 'en' ? '[MISSING] ' : '';
      return prefix + params.translateService.parser.interpolate(params.key, params.interpolateParams);
    }
  }
}

export const TRANSLATE_MODULE_CONFIG = {
  useDefaultLang: false,
  parser: {
    provide: TranslateParser,
    useClass: InterpolatedTranslateParser
  },
  missingTranslationHandler: {
    provide: MissingTranslationHandler,
    useClass: FlaggingMissingTranslationHandler
  },
  loader: {
    provide: TranslateLoader,
    useFactory: DefaultTranslateHttpLoaderFactory,
    deps: [HttpClient]
  }
};
