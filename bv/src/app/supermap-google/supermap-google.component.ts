import {Component, Input, OnInit} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {RequestsService} from '../services/api/requests.service';

@Component({
  selector: 'app-supermap-google',
  templateUrl: './supermap-google.component.html',
  styleUrls: ['./supermap-google.component.css']
})
export class SupermapGoogleComponent implements OnInit {
  addressData = new ReplaySubject(1);
  coordinatesData = new ReplaySubject(1);
  Coordinates: {lat: number, lng: number};


  mapProperties = {zoom: 2, lat: 41, lng: 65 };
  startPosition = { lat: 41, lng: 65 };
  lt = 0;
  lg = 0;
  markers: any[] = [
  ];
  constructor(private yService: RequestsService) {

  }

// @ts-ignore
  @Input() forcedShown = false;
// @ts-ignore
  @Input() routerData;
// @ts-ignore
  @Input() currentData: Subject;

  ngOnInit() {
  }

  markerDragEnd($event) {
    if (!this.routerData.editable) {
      return;
    }
    const event = {lat: $event.coords.lat, lng: $event.coords.lng};
    console.log($event);
    this.coordinatesData.next(event);
    if (this.currentData) {
      this.currentData.next(event);
    }
//     this.yService.geoByCoordinates(event).subscribe((data => {
// // @ts-ignore
//       if (data.address.GeoObjectCollection.featureMember.length) {
// // @ts-ignore
//         this.addressData.next(data.address.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components);
//       }
// // @ts-ignore
//       else if (data.locality.GeoObjectCollection.featureMember.length) {
// // @ts-ignore
//         this.addressData.next(data.locality.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components);
//       } else {
//         this.addressData.next([]);
//       }
//     }));
  }

  public placeMarker($event) {
    if (!this.routerData.editable) {
      return;
    }
    this.coordinatesData.next($event);

    // console.log($event.lat);
    console.log(this.routerData);
    const newMarker = {
      lat: $event.lat,
      lng: $event.lng,
      draggable: this.routerData.editable
    };
    this.markers.pop();
    this.markers.push(newMarker);
    this.yService.geoByCoordinates($event).subscribe((data => {
// @ts-ignore
      if (data.address.GeoObjectCollection.featureMember.length) {
// @ts-ignore
        this.addressData.next(data.address.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components);
// @ts-ignore
      } else if (data.locality.GeoObjectCollection.featureMember.length) {
// @ts-ignore
        this.addressData.next(data.locality.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components);
      } else {
        this.addressData.next([]);
      }
    }));
  }
  placeDownloadedMarker($event) {
    this.coordinatesData.next($event);
    // console.log($event.lat);
    console.log(this.routerData);
    const newMarker = {
      lat: $event.lat,
      lng: $event.lng,
      draggable: this.routerData.editable
    };
    this.markers.pop();
    this.markers.push(newMarker);
    if (this.currentData) {
      this.currentData.next(newMarker);
    }
  }
  getCountriesArray() {
  }
  getMarkerAddress() {
    return this.addressData;
  }
  getMarkerCoordinates() {
    return this.coordinatesData;
  }
  getCoordinates() {

  }

  removeMarker() {
    this.markers.pop();

    const newMarker = {
      lat: null,
      lng: null,
    };

    this.currentData.next(newMarker);
  }
  setZoom(zoom, lt, lg) {
    // this.lt = '0';
    // this.lg = '0';
    this.mapProperties.zoom = zoom;
    this.mapProperties.lat = lt * 1;
    this.mapProperties.lng = lg * 1;
  }
}
