import { Pipe, PipeTransform } from '@angular/core';
import { AVAILABLE_LANGUAGES } from '../services/language.service';

@Pipe({ name: 'language' })
export class LanguagePipe implements PipeTransform {
  transform(value: string): string {
    return (value && AVAILABLE_LANGUAGES.find(l => l.id === value)?.description) || value;
  }
}
