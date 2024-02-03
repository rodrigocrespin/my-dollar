import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AppContainerComponent } from './app-container/app-container.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

const COMPONENTS = [
  NavbarComponent,
  FooterComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    AppContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class LayoutModule { }
