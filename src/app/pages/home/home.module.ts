import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';

import { QuyHoachService } from './quyhoach.service';
import { HomeComponent } from './home.component';
import { QuickLinksInnerComponent } from './partial/quick-links-inner.component';
import { QuickMenuComponent } from './partial/quick-menu.component';
import { QuickMenuMapComponent } from './partial/quick-menu-map.component';

@NgModule({
  declarations: [
    HomeComponent,
    QuickLinksInnerComponent,
    QuickMenuComponent,
    QuickMenuMapComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    ButtonModule,
    InputTextModule,

    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
    MatSliderModule,

    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      }
    ])
  ],
  exports: [],
  providers: [
    MessageService,
    QuyHoachService
  ]
})
export class HomeModule { }
