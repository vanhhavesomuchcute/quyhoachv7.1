import { ApplicationRef, EventEmitter, Injectable, NgZone, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { async, BehaviorSubject, Observable } from 'rxjs';

declare var mapboxgl: any;
declare var abp: any;

@Injectable()
export class QuyHoachService {

  map: any = null;
  showLeftPanel$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private messageService: MessageService
  ) {

  }

  initApp(divMap: any) {
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

    me.map.on('click', (e: any) => {
      me.setShowLeftPanel(true);
    });

    me.map.addControl(new MapboxMeasureControl({
      handleMeasureArea: me.handleMeasureArea.bind(this),
      handleMeasureDistance: me.handleMeasureDistance.bind(this),
      handleMeasureDelete: me.handleMeasureDelete.bind(this)
    }), "bottom-right");
  }

  setShowLeftPanel(show: any) {
    this.showLeftPanel$.next(show);
  }

  handleMeasureArea() {

  }
  handleMeasureDistance() {

  }

  handleMeasureDelete() {

  }
}

class MapboxMeasureControl {

  _className: any;
  _container: any;
  _map: any;

  _handleArea: any;
  _handleDistance: any;
  _handleDelete: any;

  constructor({
    handleMeasureArea = (e: any) => { },
    handleMeasureDistance = (e: any) => { },
    handleMeasureDelete = (e: any) => { }
  }) {
    this._handleArea = handleMeasureArea;
    this._handleDistance = handleMeasureDistance;
    this._handleDelete = handleMeasureDelete;
  }

  onAdd(map: any) {
    var btnMeasureArea = document.createElement("button");
    btnMeasureArea.className = "mapboxgl-ctrl-icon" + " " + this._className;
    btnMeasureArea.type = "button";
    btnMeasureArea.title = 'Đo diện tích';
    btnMeasureArea.onclick = this._handleArea;
    btnMeasureArea.innerHTML = '<i class="fas fa-draw-polygon m-0 fs-4 text-dark"></i>';

    var btnMeasureDistance = document.createElement("button");
    btnMeasureDistance.className = "mapboxgl-ctrl-icon" + " " + this._className;
    btnMeasureDistance.type = "button";
    btnMeasureDistance.title = 'Đo chiều dài';
    btnMeasureDistance.onclick = this._handleDistance;
    btnMeasureDistance.innerHTML = '<i class="fas fa-ruler m-0 fs-4 text-dark"></i>';

    var btnMeasureDelete = document.createElement("button");
    btnMeasureDelete.className = "mapboxgl-ctrl-icon" + " " + this._className;
    btnMeasureDelete.type = "button";
    btnMeasureDelete.title = 'Xóa kết quả đo';
    btnMeasureDelete.onclick = this._handleDelete;
    btnMeasureDelete.innerHTML = '<i class="fas fa-trash-alt m-0 fs-4 text-dark"></i>';

    this._container = document.createElement("div");
    this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
    this._container.appendChild(btnMeasureArea);
    this._container.appendChild(btnMeasureDistance);
    this._container.appendChild(btnMeasureDelete);

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}
