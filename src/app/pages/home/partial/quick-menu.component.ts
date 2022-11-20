import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-quick-menu',
  templateUrl: './quick-menu.component.html',
})
export class QuickMenuComponent {
  @HostBinding('class') class = 'menu menu-sub menu-sub-dropdown menu-column w-200px py-3';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  constructor() { }
}
