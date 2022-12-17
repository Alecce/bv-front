import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {RequestsService} from '../../services/api/requests.service';
import {Overlay} from '@angular/cdk/overlay';
import {languagesInterface} from '../../../environments/languages';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {ListsService} from '../../services/api/lists.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {debounceTime, filter} from 'rxjs/operators';
import {MapGoogleDesignedComponent} from '../../schemas/map-google-designed/map-google-designed.component';
import {ReplaySubject, Subject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {CompetitionSelectComponent} from '@src/app/schemas/competition-select/competition-select.component';
import {MatDialog} from '@angular/material/dialog';
import {MapOpenLayersComponent} from '@src/app/schemas/map-open-layers/map-open-layers.component';

@Component({
  selector: 'app-event-designed-basic',
  templateUrl: './event-designed-basic.component.html',
  styleUrls: ['./event-designed-basic.component.css']
})
export class EventDesignedBasicComponent implements OnInit {
  tab = 'basic';
  // @ts-ignore
  @Input() downloadedData: Subject;


  routeData = {editable: false, download: false, available: true};

  geoData =  new ReplaySubject(1);
// @ts-ignore
  @ViewChild(MapGoogleDesignedComponent) googleMap: MapGoogleDesignedComponent;
// @ts-ignore
  @ViewChild(MapOpenLayersComponent) openLayersMap: MapOpenLayersComponent;


  mapReloadSubj =  new ReplaySubject(1);

  form = new FormGroup({
    name_national: new FormControl(''),
    name_international: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(0),

    type: new FormControl('select'),
    competition: new FormControl(0),
    language: new FormControl('select'),
    details: new FormControl(''),
    fee: new FormControl(''),
    active: new FormControl(''),
    public: new FormControl(''),
    age_restriction: new FormControl(''),

    from: new FormControl(''),
    to: new FormControl(''),
    start_time: new FormControl(''),
    end_time: new FormControl(''),
    phone: new FormControl(''),
    fax: new FormControl(''),
    email: new FormControl(''),
    web: new FormControl(''),
    imageDL: new FormControl(''),

    wineHelper: new FormControl(''),


    yours: new FormControl(''),
    userId: new FormControl(''),

    lat: new FormControl(''),
    lng: new FormControl(''),
  });


  countries = [];
  countriesMap = new Map();
  types = types;

  imageLink = null;
  url;
  languageArr = languagesInterface;
  fileToUpload: File = null;
  noImage = '../../../assets/icons/placeholder-wine.svg';
  isImageChanged = false;
  wineList = [];
  winePage = 1;
  wineTotal = 0;
  chosenWines = [];

  tabs = {
    basic: 'basic',
    wines: 'wines',
  };

  constructor(private service: RequestsService,
              public listService: ListsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public dialog: MatDialog,
              public langService: LanguageServiceService,
              public overlay: Overlay) { }

  ngOnInit() {


    this.geoData.subscribe(data => {
      console.log(data);

// @ts-ignore
      this.lng.setValue(data.lng);
// @ts-ignore
      this.lat.setValue(data.lat);
    });

    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x.name);
      });
    });

    this.wineHelper.valueChanges.pipe(
      debounceTime(1000),
      filter(form => !form.invalid),
    ).subscribe(() => {
      this.downloadWines();
    });


    this.downloadedData.subscribe(data => {
      console.log(data);


      Object.keys(this.form.controls).forEach(key => {
// @ts-ignore
        if (this.form.get(key) instanceof FormControl && data.commoninfo[key]) {
// @ts-ignore
          this.form.get(key).setValue(data.commoninfo[key]);
        }
      });

// @ts-ignore
      this.geoData.next(data.geolocation);

//       this.geoData.subscribe(data => {
//         console.log(data);
//
// // @ts-ignore
//         this.lng.setValue(data.lng);
// // @ts-ignore
//         this.lat.setValue(data.lat);
//       });


      if(this.googleMap) {
        this.googleMap.setMarker(this.form.value);
      }
      if(this.openLayersMap) {
// @ts-ignore
        this.openLayersMap.setMarker(this.form.value);
      }

      // console.log(data.commoninfo.image);
// @ts-ignore
      if (data.commoninfo.image * 1) {
// @ts-ignore
        this.imageLink = environment.eventImageStore + `${this.activatedroute.snapshot.params.id + '_' + data.commoninfo.image}.png`;
      }

// @ts-ignore
      this.chosenWines = data.winelist.wine_list;
    });
  }

  get name_national() {
    return this.form.get('name_national');
  }
  get name_international() {
    return this.form.get('name_international');
  }
  get address() {
    return this.form.get('address');
  }
  get city() {
    return this.form.get('city');
  }
  get type() {
    return this.form.get('type');
  }
  get competition() {
    return this.form.get('competition');
  }
  get language() {
    return this.form.get('language');
  }
  get details() {
    return this.form.get('details');
  }
  get fee() {
    return this.form.get('fee');
  }
  get active() {
    return this.form.get('active');
  }
  get public() {
    return this.form.get('public');
  }
  get age_restriction() {
    return this.form.get('age_restriction');
  }


  get from() {
    return this.form.get('from');
  }
  get to() {
    return this.form.get('to');
  }
  get start_time() {
    return this.form.get('start_time');
  }
  get end_time() {
    return this.form.get('end_time');
  }
  get phone() {
    return this.form.get('phone');
  }
  get fax() {
    return this.form.get('fax');
  }
  get email() {
    return this.form.get('email');
  }
  get web() {
    return this.form.get('web');
  }
  get image() {
    return this.form.get('image');
  }
  get country() {
    return this.form.get('country');
  }
  get wineHelper() {
    return this.form.get('wineHelper');
  }
  get lat() {
    return this.form.get('lat');
  }
  get lng() {
    return this.form.get('lng');
  }

  placeMark() {

    // console.log(this.country.value);
    // console.log(this.countriesMap);
    const geoData = {address: this.countriesMap.get(this.country.value * 1) + ', ' + this.city.value + ', ' + this.address.value }
    this.service.coordinatesByAddress(geoData).subscribe(res => {
// @ts-ignore
//       if (res.geo) {
// // @ts-ignore
//         this.googleMap.setMarker(res.geo)
//       }

// @ts-ignore
      if (res.geo) {

        if(this.googleMap) {
// @ts-ignore
          this.googleMap.setMarker(res.geo);
        }

        if(this.openLayersMap) {
// @ts-ignore
          this.openLayersMap.setMarker(res.geo);
        }
      }
    });
  }

  removeMark() {
    if(this.googleMap) {
      this.googleMap.removeMarker();
    }

    if(this.openLayersMap) {
      this.openLayersMap.removeMarker();
    }
  }

  checkValidation(input: AbstractControl) {
    if (input.untouched) {
      return 'border-secondary';
    } else if (input.valid) {
      return 'border-info';
    } else {
      return 'border-danger';
    }
  }
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // @ts-ignore
        this.url = event.target.result;
      }
      this.fileToUpload = event.target.files.item(0);

      this.isImageChanged = true;
    }
  }
  deleteImage() {
    if (this.langService.editable) {
      return;
    }
    this.imageLink = null;
    this.fileToUpload = null;
    this.isImageChanged = true;
  }

  downloadWines() {
    this.listService.getWines({search: this.wineHelper.value, page: this.winePage}).subscribe(data => {
        // @ts-ignore
        this.wineList = data.rows;
      }
    );
  }
  selectWine(wine) {
    // console.log(id);
    this.chosenWines.forEach(w => {
      if (w.id == wine.id) {
        return;
      }
    });
    this.chosenWines.push(wine);
    // this.winery.setValue(id);
    // if (id) {
    //   this.wineryName = this.wineryList.filter(x => x.id == id)[0];
    // } else {
    //   this.wineryName = null;
    // }
  }
  getWineName(wine) {
    if (wine) {
      if (wine.international_wn == wine.name || !wine.name) {
        return `${wine.international_wn}`;
      }
      return `${wine.international_wn} (${wine.name})`;
    }
  }
  removeWine(wine) {
    this.chosenWines = this.chosenWines.filter(w => {
      return w.id != wine.id;
    });
  }





  back() {
    if (this.langService.editable) {
      return;
    }
    this.router.navigate(['/event/' + this.activatedroute.snapshot.params.id],
      {queryParams: {tab: this.activatedroute.snapshot.queryParamMap.get('tab')}});
  }
  backLink() {
    return '/event/' + this.activatedroute.snapshot.params.id;
  }

  selectWinesLink() {
    return '/event-wine-list/' + this.activatedroute.snapshot.params.id;
  }

  getData() {
    const requestData = {
      winelist: this.chosenWines,
      commoninfo: this.form.value,
      // participants: this.participants.fullData(),
      // geolocation: this.yandexGeolocation.getCoordinates(),
      id: 0
    };
    console.log(requestData);

    return requestData;

  }


  getImage() {
    if (this.imageLink) {
      // return environment.wineImageStore + `${this.wineData.id + '_' + this.wineData.image}.png`;
      return this.imageLink;
    } else {
      return this.noImage;
    }
  }


  setWinePage(page) {
    if (this.langService.editable) {
      return;
    }
    this.winePage = page;
    this.downloadWines();
    return page;
  }


  openAwardSelect(): void {
    if (this.langService.editable) {
      return;
    }

    const data = {
      form: this.form,
      options: {
        hasCompetitionOption: true,
        hasAwardOption: false
      }
    };

    const dialogRef = this.dialog.open(CompetitionSelectComponent, {
      // scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '90%',
      height: '90%',
      autoFocus: false,
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      // this.userId.setValue(result);

    });
  }
  reloadMap() {
    this.mapReloadSubj.next({});
  }
  // ngAfterContentChecked(): void {
  //   // console.log('ngAfterContentChecked');
  //   // this.reloadMap();
  // }
}

export const types = [
  // {place: 'select', value: 'select', label: 'Select'},
  {place: 'auction', value: 'auction', label: 'Auction'},
  {place: 'course', value: 'course', label: 'Course'},
  {place: 'harvest', value: 'harvest', label: 'Harvest'},
  {place: 'lecture', value: 'lecture', label: 'Lecture'},
  {place: 'meeting', value: 'meeting', label: 'Meeting'},
  {place: 'new_wine_launch', value: 'new_wine_launch', label: 'New event Launch'},
  {place: 'wine_competition', value: 'wine_competition', label: 'Wine Competition'},
  {place: 'wine_exhibition', value: 'wine_exhibition', label: 'Wine exhibition'},
  {place: 'wine_tasting', value: 'wine_tasting', label: 'Wine tasting'},
  {place: 'wine_tour', value: 'wine_tour', label: 'Wine tour'},
];
