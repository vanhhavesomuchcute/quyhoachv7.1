import { Component, ViewChild, Directive, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatInput } from '@angular/material/input';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

declare var mapboxgl: any;

@Directive({
  selector: '[matInputAutofocus]',
})
export class AutofocusDirective implements OnInit {

  constructor(private matInput: MatInput) {

  }

  ngOnInit() {
    setTimeout(() => this.matInput.focus());
  }
}

export class ViewStatus {
  contentLeftPanel: string;
  showLeftPanel: boolean;
  searchRS: any = undefined;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {

  @ViewChild('drawer') sidenav: MatDrawer;

  viewStatus$: Observable<ViewStatus>;
  bViewStatus: BehaviorSubject<ViewStatus>;

  map: any;
  showLeftPanel: any = true;
  textSearch: any;
  layers: any = [
    { name: 'Đường ống dịch vụ', type: 'line', visibility: true },
    { name: 'Nhánh dịch vụ', type: 'line', visibility: true },
    { name: 'Đồng hồ dịch vụ', type: 'point', visibility: true },
    { name: 'Điểm đấu nối - Dịch vụ', type: 'point', visibility: true },
    { name: 'Van chặn - Dịch vụ', type: 'point', visibility: true },
    { name: 'Đồng hồ tổng khách hàng - Truyền dẫn', type: 'point', visibility: true },
    { name: 'Hố ga xả cặn - Phân phối', type: 'point', visibility: true },
    { name: 'Van xả cặn - Phân phối', type: 'point', visibility: true },
    { name: 'Van trụ cứu hỏa - Phân phối', type: 'point', visibility: true },
    { name: 'Trụ cứu hỏa - Phân phối', type: 'point', visibility: true },
    { name: 'Tủ đồng hồ từ - Phân phối', type: 'point', visibility: true },
    { name: 'Hố ga, đồng hồ tổng từ - Phân phối', type: 'point', visibility: true },
    { name: 'Hố ga, đồng hồ tổng cơ - Phân phối', type: 'point', visibility: true },
    { name: 'Đồng hồ tổng khách hàng - Phân phối', type: 'point', visibility: true },
    { name: 'Van chặn - Phân phối', type: 'point', visibility: true },
    { name: 'Van xả khí - Phân phối', type: 'point', visibility: true },
    { name: 'Điểm đấu nối - Phân phối', type: 'point', visibility: true },
    { name: 'Trạm bơm tăng áp - Phân phối', type: 'point', visibility: true },
    { name: 'Trạm bơm sản xuất', type: 'point', visibility: true },
    { name: 'Ống trụ cứu hỏa - Phân phối', type: 'line', visibility: true },
    { name: 'Ống dẫn xả khí - Phân phối', type: 'line', visibility: true },
    { name: 'Ống dẫn xả cặn - Phân phối', type: 'line', visibility: true },
    { name: 'Đường ống phân phối', type: 'line', visibility: true },
    { name: 'Ranh giới DMA', type: 'polygon', visibility: true },
    { name: 'Ranh giới ô cấp nước', type: 'polygon', visibility: true },
    { name: 'Ranh giới đơn vị cấp nước', type: 'polygon', visibility: true }
  ];
  notes: any = [
    {
      name: 'Ống HDPE D40(Dân) - Hẻm 250',
      layer: 'Tuyến ống phụ D,50'
    },
    {
      name: 'Ống PVC D114 - Trần Phú',
      layer: 'Tuyến ống D60 trở lên'
    },
    {
      name: 'Tuyến Trấn Phú Kéo Dài',
      layer: 'Tuyến ống D60 trở lên'
    },
    {
      name: 'Hẻm Khách Sạn Phong Vũ DN63',
      layer: 'Tuyến ống D60 trở lên'
    },
    {
      name: 'Tuyến Nhánh Lê Hồng Phong - Đoàn Thị Điểm',
      layer: 'Tuyến ống D60 trở lên'
    },
    {
      name: 'Tuyến DN63 Lê Hồng Phong',
      layer: 'Tuyến ống D60 trở lên'
    },
    {
      name: 'Tuyến DN63 Hoàng Văn Thụ',
      layer: 'Tuyến ống D60 trở lên'
    },
    {
      name: 'Tuyến Lê Hồng Phong DN63 Bổ Sung',
      layer: 'Tuyến ống D60 trở lên'
    },
    {
      name: 'Hẻm 20A Trần Phú DN63',
      layer: 'Tuyến ống D60 trở lên'
    }
  ];
  baseLayers: any = [
    {
      name: 'Nền eKMap',
      maps: [
        {
          id: 'ekmap',
          name: 'Bản sáng',
          active: false,
          type: 'Vector',
          thumbnail: 'https://g1.cloudgis.vn/gservices/rest/maps/roadmap/tile/5/25/14.png'
        },
        {
          id: 'ekmap',
          name: 'Bản xám',
          active: false,
          type: 'Vector',
          thumbnail: 'https://g1.cloudgis.vn/gservices/rest/maps/roadmap/tile/5/25/14.png'
        },
        {
          id: 'ekmap',
          name: 'Bản đêm',
          active: false,
          type: 'Vector',
          thumbnail: 'https://g1.cloudgis.vn/gservices/rest/maps/roadmap/tile/5/25/14.png'
        },
        {
          id: 'ekmap',
          name: 'Bản đêm xanh cô ban',
          active: false,
          type: 'Vector',
          thumbnail: 'https://g1.cloudgis.vn/gservices/rest/maps/roadmap/tile/5/25/14.png'
        }
      ]
    },
  ]

  constructor() { }

  ngOnInit() {
    var vs = new ViewStatus();
    vs.showLeftPanel = true;
    vs.contentLeftPanel = 'HOME';
    this.bViewStatus = new BehaviorSubject<ViewStatus>(vs);
    this.viewStatus$ = this.bViewStatus.asObservable();
  }

  ngAfterViewInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWtnaXMiLCJhIjoiY2tzaDcyd2Y0MGZxODJ2bWJtazluYzJxaSJ9.iqs6o8w7rkGNZReqPr_hRQ';
    var me = this;
    me.map = new mapboxgl.Map({
      container: 'divMap',
      center: [105.84132, 21.05751],
      zoom: 13,
      hash: true
    });

    me.map.addSource('citymap_dark', {
      'type': 'raster',
      'tiles': [
        'https://api.ekgis.vn/v2/maps/raster/ctm/bright/{z}/{x}/{y}.png?api_key=DYZSHsEqJFc58MaBhYHI9zmMMmmPn3Xg9NXSrf0V'
      ],
      'tileSize': 512,
      'maxzoom': 22
    });

    me.map.addLayer({
      "id": "citymap",
      "type": "raster",
      "source": "citymap_dark"
    });

    me.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  }

  onClickToggleLeft() {
    this.sidenav.toggle();
    this.showLeftPanel = !this.showLeftPanel;
    setTimeout(() => this.map.resize(), 320);
  }

  onClickSearch() {
    var vs = this.bViewStatus.getValue();
    vs.contentLeftPanel = 'SEARCH';
    this.bViewStatus.next(vs);
  }

  onClickBack() {
    var vs = this.bViewStatus.getValue();
    vs.contentLeftPanel = 'HOME';
    vs.searchRS = undefined;
    this.bViewStatus.next(vs);
  }

  onClickLayerVisiblility(layer: any) {
    layer.visibility = !layer.visibility;
  }

  onClickClearSearch() {
    this.textSearch = "";
    var vs = this.bViewStatus.getValue();
    vs.searchRS = [];
    this.bViewStatus.next(vs);
  }

  onChangeTextSearch(evt: any) {
    var me = this;
    fetch("https://ssl.aquasoft.vn:40002/aquasoft.com/LoginAPI/UsersLogin",
      {
        method: "POST",
        body: JSON.stringify({ "username": "thanh hoa", "password": "admin" })
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        //console.log(data);
        var vs = me.bViewStatus.getValue();
        if (me.textSearch)
          vs.searchRS = [{}, {}]
        else
          vs.searchRS = [];
        me.bViewStatus.next(vs);
      })
  }
}
