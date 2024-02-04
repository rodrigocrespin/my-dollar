import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';
import { ToRelativeOptions } from 'luxon/src/datetime';

@Pipe({ name: 'toRelative' })
export class ToRelativePipe implements PipeTransform {
  transform(value: DateTime, options?: ToRelativeOptions): string|null {
    return value.toRelative(options);
  }
}