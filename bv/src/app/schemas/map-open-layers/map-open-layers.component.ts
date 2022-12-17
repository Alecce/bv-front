import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {SupermapOpenLayersComponent} from '@src/app/schemas/supermap-open-layers/supermap-open-layers.component';

@Component({
  selector: 'app-map-open-layers',
  templateUrl: './map-open-layers.component.html',
  styleUrls: ['./map-open-layers.component.css']
})
export class MapOpenLayersComponent implements OnInit, AfterViewInit {

  lt = 0;
  lg = 0;
  markerZoom = 15;
  zoom = this.markerZoom;


  shown = true;
  routeData = {editable: false};


// @ts-ignore
  @Input() reloadSubj: Subject;
// @ts-ignore
  @Input() currentData: Subject;
// @ts-ignore
  @Input() routerData;
// @ts-ignore
  @Input() downloadedData: Subject;
// @ts-ignore
  @ViewChild(SupermapOpenLayersComponent) supermap: SupermapOpenLayersComponent;
  constructor() { }

  ngOnInit() {
    if (this.routerData) {
      this.routeData = this.routerData;
    }


    console.log(this.downloadedData);
    if(this.downloadedData) {
      this.downloadedData.subscribe(downloadData => {
        console.log(downloadData);
        if (downloadData.geolocation && downloadData.geolocation.lat !== null && downloadData.geolocation.lng !== null) {

          this.lt = downloadData.geolocation.lat;
          this.lg = downloadData.geolocation.lng;
          this.zoom = this.markerZoom;

          this.reloadMap();
          // console.log(downloadData.geolocation);
          // this.supermap.placeDownloadedMarker({lat: downloadData.geolocation.lat, lng: downloadData.geolocation.lng});
          // this.supermap.setZoom(15, downloadData.geolocation.lat, downloadData.geolocation.lng);
        }
      });
    }


    this.reloadSubj.subscribe(x => {
      // this.layer.getSource().changed();
      // this.map.setLayers([new TileLayer({
      //   source: new OSM({})
      // })]);
      // this.initMap();

      this.reloadMap();

    })
  }

  reloadMap() {

    this.shown = false;
    setTimeout(()=>{
      this.shown = true;

    });
  }

  ngAfterViewInit(): void {

    if(this.downloadedData) {
      this.downloadedData.subscribe(downloadData => {
        console.log(downloadData);
        if (downloadData.geolocation && downloadData.geolocation.lat !== null && downloadData.geolocation.lng !== null) {
          // console.log(downloadData.geolocation);
          this.supermap.placeDownloadedMarker({lat: downloadData.geolocation.lat, lng: downloadData.geolocation.lng});
          this.supermap.setZoom(15, downloadData.geolocation.lat, downloadData.geolocation.lng);
        }
      });
    }
  }

  setMarker(downloadData) {

    if (downloadData.lat && downloadData.lng) {
      this.supermap.placeDownloadedMarker({lat: downloadData.lat, lng: downloadData.lng});
      this.supermap.setZoom(15, downloadData.lat, downloadData.lng);


      this.lt = downloadData.lat;
      this.lg = downloadData.lng;
      // this.lt = 31;
      // this.lg = 34;
      this.zoom = this.markerZoom;

      this.reloadMap();
    }

  }

  removeMarker() {
    // this.supermap.removeMarker();
    this.shown = false;

    const newMarker = {
      lat: null,
      lng: null,
    };

    this.currentData.next(newMarker);
  }

}
