import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
// import {YandexGeolocationComponent} from '../../../yandex-geolocation/yandex-geolocation.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../../../services/language-service.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {CookieObserverService} from '../../../services/cookieObserver/cookie-observer.service';
// import {SupermapComponent} from '../../../supermap/supermap.component';
import {RequestsService} from '../../../services/api/requests.service';
import {ActivatedRoute} from '@angular/router';
import {SupermapGoogleComponent} from '../../../supermap-google/supermap-google.component';

@Component({
  selector: 'app-map-subtable',
  templateUrl: './map-subtable.component.html',
  styleUrls: ['./map-subtable.component.css']
})
export class MapSubtableComponent implements OnInit, AfterViewInit {
  public tab = 'yandexGeolocation';

  countriesMap = new Map();
  routeData = {editable: true};
  countries = [];
  regiones = [];
  allRegiones = [];
  countryFromCommoninfo;
  countryFromMap;
// @ts-ignore
  @ViewChild(SupermapGoogleComponent) supermap: SupermapGoogleComponent;
  form = new FormGroup({
    country: new FormControl(0),
    city: new FormControl(''),
    address: new FormControl(''),
    longtitude: new FormControl(''),
    latitude: new FormControl(''),
    regionsForm: new FormArray([
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
    ]),
  });
  constructor(private service: RequestsService,
              // private yandexService: YandexService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              private cookieObserver: CookieObserverService,
              public dialogRef: MatDialogRef<MapSubtableComponent>,
              @Inject(MAT_DIALOG_DATA) public downloadedData) { }

  ngOnInit() {
    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x.name);
      });
    });
    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x.name);
      });
      this.filterRegiones();
    });

    this.country.valueChanges.subscribe(() => {
      this.clearNext(0);
      this.filterRegiones();
    });
    for (let i = 0; i < 6; i++) {
      this.regionsForm.controls[i].valueChanges.subscribe(() => {

        this.clearNext(i + 1);
        this.filterRegiones();
      });
    }

    this.service.getRegiones().subscribe(data => {
// @ts-ignore
      this.regiones = data;
      this.filterRegiones();
    });


  }
  get address() {
    return this.form.get('address');
  }
  get city() {
    return this.form.get('city');
  }
  get country() {
    return this.form.get('country');
  }
  get longtitude() {
    return this.form.get('longtitude');
  }
  get latitude() {
    return this.form.get('latitude');
  }
  get regionsForm(): FormArray {
    return this.form.get('regionsForm') as FormArray;
  }

  ngAfterViewInit(): void {
    this.supermap.getMarkerAddress().subscribe((data) => {
      // let isHouse = false;
// @ts-ignore
      if (data.length) {
        let str = '';
// @ts-ignore
        data.forEach(x => {
          if (x.kind == 'house' || x.kind == 'locality' || x.kind == 'country' || x.kind == 'street') {
            str += x.name + ', ';
          }
          if (x.kind == 'country') {
            this.countryFromMap = x.name;
          }
        })
        str = str.substr(0, str.length - 2);
        // this.address.setValue(str);
      } else {
        // this.address.setValue('');
      }
    });

    this.supermap.getMarkerCoordinates().subscribe(data => {
      console.log(data);
// @ts-ignore
      this.longtitude.setValue(data.lng);
// @ts-ignore
      this.latitude.setValue(data.lat);
    });

    this.downloadedData.subscribe(downloadData => {
      this.supermap.routerData = {editable: true};
      console.log(downloadData);
      if (downloadData.geolocation.lat !== null && downloadData.geolocation.lng !== null) {
        this.latitude.setValue(downloadData.geolocation.lat);
        this.longtitude.setValue(downloadData.geolocation.lng);
        this.supermap.placeDownloadedMarker({lat: downloadData.geolocation.lat, lng: downloadData.geolocation.lng});
        this.supermap.setZoom(4, downloadData.geolocation.lat, downloadData.geolocation.lng);
      }
      this.address.setValue(downloadData.geolocation.address);
      this.city.setValue(downloadData.geolocation.city);
      this.country.setValue(downloadData.geolocation.country);
      if (downloadData.geolocation.regions) {
        // this.regionsForm.setValue(downloadData.geolocation.regions);
        for (let i = 0; i < 6; i++) {
          this.regionsForm.controls[i].setValue(downloadData.geolocation.regions[i]);
        }
      }
    });
  }
  public getCoordinates() {
    return {
      lat: this.latitude.value,
      lng: this.longtitude.value,
      address: this.address.value,
      city: this.city.value,
      country: this.country.value,
      regions: this.regionsForm.value
    };
  }
  removeGeolocation() {
    this.latitude.setValue(null);
    this.longtitude.setValue(null);
    this.supermap.removeMarker();
  }
  searchByAddress() {

    const geoData = {address: ''};
    if (this.address.value) {
      geoData.address = this.countriesMap.get(this.country.value * 1) + ', ' + this.address.value;
    } else {
      geoData.address = this.countriesMap.get(this.country.value * 1);
    }
    // const country = this.countriesMap.get(this.country.value * 1);
    // const fullAddress = country + ', ' + this.city.value + ', ' + this.address.value;
    this.service.coordinatesByAddress(geoData).subscribe(res => {
// @ts-ignore
      if (res.geo) {

// @ts-ignore
//         this.googleMap.setMarker(res.geo);
// @ts-ignore
//         const res = data.geo.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
//         const coord = res.split(' ');
// @ts-ignore
        const lng = res.geo.lng;
// @ts-ignore
        const lat = res.geo.lat;

        this.latitude.setValue(lat);
        this.longtitude.setValue(lng);
        this.supermap.placeDownloadedMarker({lat, lng});
        this.supermap.setZoom(15, lat, lng);
      }

    });
  }
  close(): void {
    this.dialogRef.close();
  }

  getResults() {
    return {geolocation: this.getCoordinates()};
  }

  filterRegiones() {
    console.log((this.regionsForm as FormArray).value);
    this.allRegiones[0] = [];
    this.allRegiones[0] = this.regiones.filter(region => {
      return region.parent == this.country.value;
    });
    for (let i = 1; i < 6; i++) {
      this.allRegiones[i] = [];
      this.allRegiones[i] = this.regiones.filter(region => {
        return region.parent == (this.regionsForm as FormArray).at(i - 1).value;
      });
    }
  }
  clearNext(level) {
    if (level < 6) {
      this.regionsForm.at(level).setValue(0);
    }
  }

}
