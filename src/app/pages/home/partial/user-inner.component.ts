import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

declare var abp: any;

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  bLoginInfo$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  loginInfo$: Observable<any>;

  constructor(
  ) {
    this.loginInfo$ = this.bLoginInfo$.asObservable();
  }

  ngOnInit(): void {
    this.bLoginInfo$.next(abp.loginInfo);
  }

  logout() {
  }

  ngOnDestroy() {
  }
}
