import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
// import {SupermapComponent} from '../../supermap/supermap.component';
import {SupermapGoogleComponent} from '../../supermap-google/supermap-google.component';

@Component({
  selector: 'app-map-google-designed',
  templateUrl: './map-google-designed.component.html',
  styleUrls: ['./map-google-designed.component.css']
})
export class MapGoogleDesignedComponent implements OnInit, AfterViewInit {



  routeData = {editable: false};
// @ts-ignore
  @Input() currentData: Subject;
// @ts-ignore
  @Input() routerData;
// @ts-ignore
  @Input() downloadedData: Subject;
// @ts-ignore
  @ViewChild(SupermapGoogleComponent) supermap: SupermapGoogleComponent;
  constructor() { }

  ngOnInit() {
    if (this.routerData) {
      this.routeData = this.routerData;
    }
  }

  ngAfterViewInit(): void {

    console.log(this.downloadedData);
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
    }

  }

  removeMarker() {
    this.supermap.removeMarker();
  }

}
