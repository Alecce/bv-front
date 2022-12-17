import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {SupermapComponent} from '../../supermap/supermap.component';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-map-yandex-designed',
  templateUrl: './map-yandex-designed.component.html',
  styleUrls: ['./map-yandex-designed.component.css']
})
export class MapYandexDesignedComponent implements OnInit, AfterViewInit {

  routeData = {editable: false};
// @ts-ignore
  @Input() downloadedData: Subject;
// @ts-ignore
  @ViewChild(SupermapComponent) supermap: SupermapComponent;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.downloadedData.subscribe(downloadData => {
      console.log(downloadData);
      if (downloadData.geolocation.lat !== null && downloadData.geolocation.lng !== null) {
        this.supermap.placeDownloadedMarker({lat: downloadData.geolocation.lat, lng: downloadData.geolocation.lng});
        this.supermap.setZoom(4, downloadData.geolocation.lat, downloadData.geolocation.lng);
      }
    });
  }

}
