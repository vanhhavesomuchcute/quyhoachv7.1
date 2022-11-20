import { Component, ViewChild, Directive, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuyHoachService } from './quyhoach.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  showLeftPanel$: Observable<boolean>;

  constructor(private quyhoachService: QuyHoachService) {
    this.showLeftPanel$ = this.quyhoachService.showLeftPanel$.asObservable();
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.quyhoachService.initApp('divMap');
  }

  onCloseLeftPanel() {
    this.quyhoachService.setShowLeftPanel(false);
  }
}
