import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagePipe } from './language.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'ngx-moment';
import { AbsoluteNumberPipe } from './absolute-number.pipe';

@NgModule({
  declarations: [
    LanguagePipe,
    AbsoluteNumberPipe
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MomentModule
  ],
  exports: [
    LanguagePipe,
    TranslateModule,
    MomentModule,
    AbsoluteNumberPipe
  ]
})
export class SharedModule {}
