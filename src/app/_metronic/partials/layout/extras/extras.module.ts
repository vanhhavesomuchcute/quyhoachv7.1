import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {LayoutScrollTopComponent} from './scroll-top/scroll-top.component';
import {TranslationModule} from '../../../../modules/i18n';
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import { MenuDrawerComponent } from './menu-drawer/menu-drawer.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    LayoutScrollTopComponent,
    MenuDrawerComponent
  ],
  imports: [InlineSVGModule, RouterModule, TranslationModule, NgbTooltipModule, MatIconModule],
  exports: [
    LayoutScrollTopComponent,
    MenuDrawerComponent
  ],
})
export class ExtrasModule {
}
