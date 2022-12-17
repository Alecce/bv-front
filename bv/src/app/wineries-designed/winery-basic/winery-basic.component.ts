import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Overlay} from '@angular/cdk/overlay';
import {RequestsService} from '../../services/api/requests.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ListsService} from '../../services/api/lists.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {PlaceOfOriginComponent} from '../../schemas/place-of-origin/place-of-origin.component';
import {MatDialog} from '@angular/material/dialog';
import {debounceTime, filter} from 'rxjs/operators';
import {LoadingServiceService} from '../../services/loading-service.service';
import {environment} from '../../../environments/environment';
import {languagesInterface} from '../../../environments/languages';
import {CookieObserverService} from '../../services/cookieObserver/cookie-observer.service';
import {MapGoogleDesignedComponent} from '../../schemas/map-google-designed/map-google-designed.component';
import {ReplaySubject, Subject} from 'rxjs';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {PersonSearchComponent} from '@src/app/schemas/person-search/person-search.component';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {MapOpenLayersComponent} from '@src/app/schemas/map-open-layers/map-open-layers.component';

@Component({
  selector: 'app-winery-basic',
  templateUrl: './winery-basic.component.html',
  styleUrls: ['./winery-basic.component.css']
})
export class WineryBasicComponent implements OnInit, AfterViewInit {
  tab = 'basic';

  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() structureData: Subject;

  mapReloadSubj =  new ReplaySubject(1);


  languageArr = languagesInterface;
  loading = false;
  ownerId = 0;
  geoData =  new ReplaySubject(1);

  DAYS_OF_WEEK = {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday'
  };

  formVisitTime = new FormGroup({
    6: new FormArray([]),
    0: new FormArray([]),
    1: new FormArray([]),
    2: new FormArray([]),
    3: new FormArray([]),
    4: new FormArray([]),
    5: new FormArray([]),
  });


// @ts-ignore
  @ViewChild(MapGoogleDesignedComponent) googleMap: MapGoogleDesignedComponent;
// @ts-ignore
  @ViewChild(MapOpenLayersComponent) openLayersMap: MapOpenLayersComponent;
  // @ts-ignore
  @Input() isParentShowNoValidation;

  form = new FormGroup({

    name_national: new FormControl(''),
    name_international: new FormControl('', Validators.required),
    alterNames: new FormArray([]),

    establish_year: new FormControl(''),

    country: new FormControl(0, [Validators.required, Validators.min(1)]),
    regionsForm: new FormArray([
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
    ]),

    wine_producer: new FormControl(''),
    noncommercial: new FormControl(false),
    owner: new FormControl(''),
    yours: new FormControl(0),
    userId: new FormControl(0),

    image: new FormControl(''),
    emblem: new FormControl(''),
    imageDB: new FormControl(''),
    emblemDB: new FormControl(''),

    winemaker_national: new FormControl(''),
    winemaker_international: new FormControl(''),
    performance: new FormControl('0'),
    // negotiator: new FormControl('NO'),
    language: new FormControl(this.langService.getLanguage()),

    differentAddress: new FormControl(0),
    address: new FormControl(''),
    fullAddress: new FormControl(''),
    zip: new FormControl(''),
    phone: new FormControl(''),
    // phoneHide: new FormControl(false),
    mobile: new FormControl(''),
    // mobileHide: new FormControl(false),
    fax: new FormControl(''),
    // faxHide: new FormControl(false),
    email: new FormControl(''),
    // emailHide: new FormControl(false),
    web: new FormControl(''),

    isKashrut: new FormControl(''),
    kashruts: new FormGroup({}),
    kashrutsData: new FormArray([]),
    kashrutsSearch: new FormControl(''),

    isQuality: new FormControl(''),
    qualities: new FormGroup({}),
    qualitiesData: new FormArray([]),
    qualitiesSearch: new FormControl(''),

    isBiodynamic: new FormControl(''),
    biodynamics: new FormGroup({}),
    biodynamicsData: new FormArray([]),
    biodynamicsSearch: new FormControl(''),

    isOrganic: new FormControl(''),
    organics: new FormGroup({}),
    organicsData: new FormArray([]),
    organicsSearch: new FormControl(''),

    isVegan: new FormControl(''),
    vegans: new FormGroup({}),
    vegansData: new FormArray([]),
    vegansSearch: new FormControl(''),

    grapes: new FormGroup({}),
    grapesData: new FormArray([]),
    grapesSearch: new FormControl(''),

    vineyards: new FormGroup({}),
    vineyardsData: new FormArray([]),
    vineyardsSearch: new FormControl(''),


    lat: new FormControl(''),
    lng: new FormControl(''),

    series: new FormArray([]),
  });


  routeData = {editable: false, download: false, available: true};

  countries = [];
  regiones = [];
  countriesMap = new Map();
  countriesMapISO2 = new Map();
  regionesMap = new Map();

  fileToUpload: File = null;
  noImage = '../../../assets/icons/placeholder-wine.svg';

  imageLink = null;
  isImageChanged = false;
  url;


  fileToUploadEmblem: File = null;
  imageLinkEmblem = null;
  isImageChangedEmblem = false;
  urlEmblem;

  listKashruts;
  listQualities;
  listBiodynamic;
  listOrganic;
  listVegan;

  subKashruts;
  subQualities;
  subBiodynamic;
  subOrganic;
  subVegan;


  grapePage = 1;
  grapeTotal = 0;
  vineyardPage = 1;
  vineyardTotal = 0;
  kashrutPage = 1;
  kashrutTotal = 0;
  qualityPage = 1;
  qualityTotal = 0;
  biodynamicPage = 1;
  biodynamicTotal = 0;
  organicPage = 1;
  organicTotal = 0;
  veganPage = 1;
  veganTotal = 0;


  kashrutList = [];
  qualityList = [];
  biodynamicList = [];
  organicList = [];
  veganList = [];
  grapeList = [];
  vineyardList = [];

  wineryKashrutList = [];
  wineryQualityList = [];
  wineryBiodynamicList = [];
  wineryOrganicList = [];
  wineryVeganList = [];
  wineryGrapeList = [];
  wineryVineyardList = [];

  cookies;


  tabs = {
    basic: 'basic',
    additional: 'additional',
    menu: 'menu',
  };

  wineryList = [];
  wineryPage = 1;
  wineryTotal = 0;
  wineryName = null;

  addressCode = null;
  originCode = null;

  wineProducerArr = wineProducerArr;
  performanceArr = performanceArr;


  constructor(private cookieObserver: CookieObserverService,
              private service: RequestsService,
              public listService: ListsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              public accountService: AccountServiceService,
              public langService: LanguageServiceService,
              public dialog: MatDialog,
              public overlay: Overlay,
              private router: Router,
              public loadingService: LoadingServiceService,
              public downloadingService: DownloadDataServiceService,
              private additionalService: AdditionalServiceService
  ) {
  }


  ngOnInit() {


    this.downloadingService.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x.name);
        this.countriesMapISO2.set(x.id, x.ISO2);
      });
      this.downloadingService.getRegiones().subscribe(dataR => {
// @ts-ignore
        this.regiones = dataR;
        this.regiones.forEach(x => {
          this.regionesMap.set(x.id, x.name);
        });
      });
    });


    this.additionalService.structure.subscribe(structure => {
// @ts-ignore
      structure.forEach(row => {
        if(row.option_id == 28) {
          this.addressCode = row.controlName;
        }
        if(row.option_id == 88) {
          this.originCode = row.controlName;
        }
      });
    });

    this.additionalService.changes.subscribe(change => {
      if(change[this.addressCode] && !this.differentAddress.value) {
        this.address.setValue(change[this.addressCode]);
      }
      if(change[this.originCode] && !this.differentAddress.value) {
        const contactData = JSON.parse(change[this.originCode]);

        // console.log(contactData);
        // {"country":3,"regionsForm":[296,0,0,0,0,0]}
        this.country.setValue(contactData.country * 1);
        contactData.regionsForm.forEach((v, i) => {
          if(i <= 6) {
            this.regionsForm.at(i).setValue(v * 1);
          }
        });
        // this.address.setValue();
        // console.log(change[this.originCode]);
      }
    });

    this.geoData.subscribe(data => {
      console.log(data);

// @ts-ignore
      this.lng.setValue(data.lng);
// @ts-ignore
      this.lat.setValue(data.lat);
    });

    this.cookies = this.cookieObserver.observeCookie();

    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x.name);
      });
      // this.filterRegiones();
      this.service.getRegiones().subscribe(regionData => {
// @ts-ignore
        this.regiones = regionData;
        this.regiones.forEach(x => {
          this.regionesMap.set(x.id, x.name);
        });
        // this.filterRegiones();
      });
    });

    this.yours.valueChanges.subscribe(y => {
      if (!y) {
        if (this.cookieObserver.cookies.id == this.userId.value) {
          this.userId.setValue('');
        }
      }
    });

    const id = this.activatedroute.snapshot.params.id;
    if (this.activatedroute.snapshot.data.download) {
      this.routeData.download = true;

      this.downloadedData.subscribe(data => {
      // this.service.getWinery(id).subscribe(data => {

        // console.log(data);
        Object.keys(this.form.controls).forEach(key => {
          if (this.form.get(key) instanceof FormControl && data.commoninfo[key]) {
// @ts-ignore
            this.form.get(key).setValue(data.commoninfo[key]);
          }
// @ts-ignore
          if (this.form.get(key) instanceof FormArray && data.commoninfo[key]) {
            let i = 0;
// @ts-ignore
            data.commoninfo[key].forEach(v => {

// @ts-ignore
              (this.form.get(key) as FormArray).at(i).setValue(data.commoninfo[key][i]);
              i++;
            });
          }

          if (key == 'image') {
// @ts-ignore
            if (data.image * 1) {
// @ts-ignore
              this.imageLink = environment.wineryImageStore + `${this.activatedroute.snapshot.params.id + '_' + data.image}.png`;
// @ts-ignore
              this.image.setValue(data.image);
            }
            // this.form.get(key).setValue(downloadData.wineryinfo.id);
            // this.wineryName = downloadData.wineryinfo;
          }

          if (key == 'emblem') {
// @ts-ignore
            if (data.emblem * 1) {
// @ts-ignore
              this.imageLinkEmblem = environment.wineryEmblemImageStore + `${this.activatedroute.snapshot.params.id + '_' + data.emblem}.png`;
// @ts-ignore
              this.emblem.setValue(data.emblem);
            }
            // this.form.get(key).setValue(downloadData.wineryinfo.id);
            // this.wineryName = downloadData.wineryinfo;
          }

//           if (key == 'series') {
// // @ts-ignore
//             if (data.series) {
//
//               console.log(data.series);
//
//               try {
//
//                 let seriesData = data.series;
//
//                 if(typeof seriesData == 'string'){
//                   seriesData = JSON.parse(seriesData);
//                 }
//                 console.log(seriesData);
//
//                 seriesData.forEach(seria => {
//                   this.addSeria(seria);
//                 });
//
//               } catch (e) {
//
//               }
//
//             }
//           }
        });


        if (data.alterNames) {


          data.alterNames.forEach(point => {


            this.addAlterNames(point);

          });
        }

// @ts-ignore
        this.wineryKashrutList = data.kashruts;
// @ts-ignore
        this.wineryQualityList = data.qualities;
// @ts-ignore
        this.wineryBiodynamicList = data.biodynamics;
// @ts-ignore
        this.wineryOrganicList = data.organics;
// @ts-ignore
        this.wineryVeganList = data.vegans;
// @ts-ignore
        this.wineryGrapeList = data.grapesFull;

// @ts-ignore
        if (data.grapeSynonims) {
          const wineryGrapeList = [];
// @ts-ignore
          const synonims = JSON.parse(data.grapeSynonims);
// @ts-ignore
          const grapelist = JSON.parse(data.grapelist);

          for (let i = 0; i < synonims.length; i++) {
            this.wineryGrapeList.forEach(x => {
              // console.log(x);
              if (grapelist[i] && synonims[i]) {
                if (x.id == grapelist[i]) {
                  const grape = {id: x.id, name: x.name, synonim: synonims[i]};
                  // x.synonim = synonims[i];
                  wineryGrapeList.push(grape);
                }
              } else if (grapelist[i]) {

                if (x.id == grapelist[i]) {
                  const grape = {id: x.id, name: x.name};
                  // x.synonim = synonims[i];
                  wineryGrapeList.push(grape);
                }
              }
            });
          }
          this.wineryGrapeList = wineryGrapeList;
        }
// @ts-ignore
        this.wineryVineyardList = data.vineyardsFull;

        // 'grapesFull' => $grapes,
        //   'vineyardsFull' => $vineyards,
// @ts-ignore
        if (data.visittime && data.visittime != '') {
// @ts-ignore
          const timeData = JSON.parse(data.visittime);
          console.log(timeData);

          this.restoreTimeData(timeData);
        }

        if(this.googleMap) {
          this.googleMap.setMarker(this.form.value);
        }
        if(this.openLayersMap) {
// @ts-ignore
          this.openLayersMap.setMarker(this.form.value);
        }
// @ts-ignore
        this.yours.setValue(1 * (this.cookieService.get('myId') * 1 === data.user));
        console.log(data.user);
        if(data.user) {

// @ts-ignore
          this.userId.setValue(data.user * 1);
        }
// @ts-ignore
        if (data.user != 0 && this.cookieService.get('myId') * 1 !== data.user * 1
          && this.cookieService.get('sequrity') != '4' || !this.activatedroute.snapshot.data.editable) {
          this.routeData.editable = false;
          this.form.disable();
        }



        this.sortingGrapes();
        this.sortingVineyards();
        this.sortingKashrut();
        this.sortingQuality();
        this.sortingBio();
        this.sortingOrganic();
        this.sortingVegan();


        console.log(this.form.value);
        console.log(this.countriesMap);

      });
    }

    this.name_national.valueChanges.pipe(
      debounceTime(1000),
      filter(form => !form.invalid),
    ).subscribe(() => {
      this.wineryPage = 1;
      this.downloadWineries();
    });


    this.langService.download.subscribe(() => {

      this.sortingGrapes();
      this.sortingVineyards();
      this.sortingKashrut();
      this.sortingQuality();
      this.sortingBio();
      this.sortingOrganic();
      this.sortingVegan();
    })
  }


  ngAfterViewInit(): void {

    this.kashrutsSearch.valueChanges.pipe(
      debounceTime(1000),
    ).subscribe((v) => {
      if (v != null) {
        this.kashrutPage = 1;
        this.downloadKashrut();
      }
    });

    this.qualitiesSearch.valueChanges.pipe(
      debounceTime(1000),
    ).subscribe((v) => {
      if (v != null) {
        this.qualityPage = 1;
        this.downloadQuality();
      }
    });

    this.biodynamicsSearch.valueChanges.pipe(
      debounceTime(1000),
    ).subscribe((v) => {
      if (v != null) {
        this.biodynamicPage = 1;
        this.downloadBiodynamic();
      }
    });

    this.organicsSearch.valueChanges.pipe(
      debounceTime(1000),
    ).subscribe((v) => {
      if (v != null) {
        this.organicPage = 1;
        this.downloadOrganic();
      }
    });

    this.vegansSearch.valueChanges.pipe(
      debounceTime(1000),
    ).subscribe((v) => {
      if (v != null) {
        this.veganPage = 1;
        this.downloadVegan();
      }
    });

    this.grapesSearch.valueChanges.pipe(
      debounceTime(1000),
    ).subscribe((v) => {
      if (v != null) {
        this.grapePage = 1;
        this.downloadGrape();
      }
    });

    this.vineyardsSearch.valueChanges.pipe(
      debounceTime(1000),
    ).subscribe((v) => {
      if (v != null) {
        this.vineyardPage = 1;
        this.downloadVineyard();
      }
    });
  }

  openUserSelect(): void {
    if (this.langService.editable) {
      return;
    }

    const dialogRef = this.dialog.open(PersonSearchComponent, {
      // scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '90%',
      height: '90%',
      autoFocus: false,
      data: this.form.value
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      this.userId.setValue(result);

    });
  }

  openPlaceOfOrigin(): void {
    if (this.langService.editable) {
      return;
    }

    const dialogRef = this.dialog.open(PlaceOfOriginComponent, {
      // scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '800px',
      height: '450px',
      autoFocus: false,
      data: this.form.value
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result) {

        this.country.setValue(result.country * 1);
        if (result.regionsForm) {
          for (let i = 0; i < 6; i++) {
            this.regionsForm.controls[i].setValue(result.regionsForm[i] * 1);
          }
        }
      }

    });
  }

  get name_international() {
    return this.form.get('name_international');
  }
  get country() {
    return this.form.get('country');
  }
  get lat() {
    return this.form.get('lat');
  }
  get lng() {
    return this.form.get('lng');
  }

  get regionsForm(): FormArray {
    return this.form.get('regionsForm') as FormArray;
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
      console.log(this.fileToUpload);

      this.isImageChanged = true;
    }
  }

  deleteImage() {
    this.imageLink = null;
    this.fileToUpload = null;
    this.isImageChanged = true;
  }


  onSelectFileEmblem(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // @ts-ignore
        this.urlEmblem = event.target.result;
      }
      this.fileToUploadEmblem = event.target.files.item(0);

      this.isImageChangedEmblem = true;
    }
  }

  deleteImageEmblem() {
    this.imageLinkEmblem = null;
    this.fileToUploadEmblem = null;
    this.isImageChangedEmblem = true;
  }

  get yours() {
    return this.form.get('yours');
  }

  get userId() {
    return this.form.get('userId');
  }

  get isKashrut() {
    return this.form.get('isKashrut');
  }

  get isQuality() {
    return this.form.get('isQuality');
  }

  get isBiodynamic() {
    return this.form.get('isBiodynamic');
  }

  get isOrganic() {
    return this.form.get('isOrganic');
  }

  get isVegan() {
    return this.form.get('isVegan');
  }

  get kashruts(): FormGroup {
    return this.form.get('kashruts') as FormGroup;
  }

  get qualities(): FormGroup {
    return this.form.get('qualities') as FormGroup;
  }

  get biodynamics(): FormGroup {
    return this.form.get('biodynamics') as FormGroup;
  }

  get organics(): FormGroup {
    return this.form.get('organics') as FormGroup;
  }

  get vegans(): FormGroup {
    return this.form.get('vegans') as FormGroup;
  }

  get grapes(): FormGroup {
    return this.form.get('grapes') as FormGroup;
  }

  get vineyards(): FormGroup {
    return this.form.get('vineyards') as FormGroup;
  }

  get kashrutsSearch() {
    return this.form.get('kashrutsSearch');
  }

  get qualitiesSearch() {
    return this.form.get('qualitiesSearch');
  }

  get biodynamicsSearch() {
    return this.form.get('biodynamicsSearch');
  }

  get organicsSearch() {
    return this.form.get('organicsSearch');
  }

  get vegansSearch() {
    return this.form.get('vegansSearch');
  }

  get grapesSearch() {
    return this.form.get('grapesSearch');
  }

  get vineyardsSearch() {
    return this.form.get('vineyardsSearch');
  }

  get language() {
    return this.form.get('language');
  }

  get performance() {
    return this.form.get('performance');
  }

  get address() {
    return this.form.get('address');
  }

  get differentAddress() {
    return this.form.get('differentAddress');
  }

  get image() {
    return this.form.get('imageDB');
  }
  get emblem() {
    return this.form.get('emblemDB');
  }
  get wine_producer() {
    return this.form.get('wine_producer');
  }
  back() {
    if (this.langService.editable) {
      return;
    }
    if (this.routeData.download) {
      this.router.navigate(['/winery/' + this.activatedroute.snapshot.params.id]);
    } else {
      this.router.navigate(['/wine-list/']);
    }
  }

  create() {

    if (this.langService.editable) {
      return;
    }

    const kashrutDB = [];

    this.wineryKashrutList.forEach(x => {
      kashrutDB.push(x.id);
    });
    // console.log(this.wineryKashrutList);

    const qualityDB = [];

    this.wineryQualityList.forEach(x => {
      qualityDB.push(x.id);
    });
    const biodynamicDB = [];

    this.wineryBiodynamicList.forEach(x => {
      biodynamicDB.push(x.id);
    });

    const organicDB = [];

    this.wineryOrganicList.forEach(x => {
      organicDB.push(x.id);
    });

    const veganDB = [];

    this.wineryVeganList.forEach(x => {
      veganDB.push(x.id);
    });

    const grapelistDB = [];

    this.wineryGrapeList.forEach(x => {
      grapelistDB.push(x.id);
    });

    const grapeSynonimsDB = [];

    this.wineryGrapeList.forEach(x => {
      grapeSynonimsDB.push(x.synonim);
    });

    const vineyardlistDB = [];

    this.wineryVineyardList.forEach(x => {
      vineyardlistDB.push(x.id);
    });

    const visittime = this.formVisitTime.value;
    const visittimeDB = {};
    for (const day in visittime) {
      const nRows = Math.max(visittime[day].length / 2, 2);
      for (let i = 0; i < nRows; i++) {
        const timeNameFrom = `f_${day}_${1 + i}`;
        visittimeDB[timeNameFrom] = 2 * i >= visittime[day].length ? '' : visittime[day][2 * i];
        const timeNameTo = `t_${day}_${1 + i % 2}`;
        visittimeDB[timeNameTo] = 2 * i >= visittime[day].length ? '' : visittime[day][2 * i + 1];
      }
    }



    const formsData = {
      commoninfo: this.form.value,
      kashrut: JSON.stringify(kashrutDB),
      quality: JSON.stringify(qualityDB),
      biodynamic: JSON.stringify(biodynamicDB),
      organic: JSON.stringify(organicDB),
      vegan: JSON.stringify(veganDB),
      visittime: JSON.stringify(visittimeDB),
      grapelist: JSON.stringify(grapelistDB),
      vineyardlist: JSON.stringify(vineyardlistDB),
      grapeSynonims: JSON.stringify(grapeSynonimsDB),
    };

    if (!this.activatedroute.snapshot.data.download) {
      this.service.addWinery(formsData).subscribe(data => {
// @ts-ignore
        if (data.id) {


          if (this.isImageChanged) {
// @ts-ignore
            this.service.setImage('wineries', data.id, this.fileToUpload).subscribe(() => {
              // this.service.setWineImage(this.image.fileToUpload, data.id).subscribe(() => {
              // @ts-ignore

              if (this.isImageChangedEmblem) {
// @ts-ignore
                this.service.setImage('winery-emblem', data.id, this.fileToUploadEmblem).subscribe(() => {

// @ts-ignore
                  this.router.navigate(['/winery/' + data.id]);
                });
              }
// @ts-ignore
              this.router.navigate(['/winery/' + data.id]);
            });
          } else {

            if (this.isImageChangedEmblem) {
// @ts-ignore
              this.service.setImage('winery-emblem', data.id, this.fileToUploadEmblem).subscribe(() => {

// @ts-ignore
                this.router.navigate(['/winery/' + data.id]);
              });
            }
            // @ts-ignore
            this.router.navigate(['/winery/' + data.id]);
          }
// @ts-ignore
//           this.router.navigate(['/winery/' + data.id]);
        }
      });
    } else {
// @ts-ignore
      formsData.wineryId = this.activatedroute.snapshot.params.id;
      this.service.editWinery(formsData).subscribe(() => {
        if (this.isImageChanged) {
// @ts-ignore
          this.service.setImage('wineries', formsData.wineryId, this.fileToUpload).subscribe(() => {
          });
        }
        if (this.isImageChangedEmblem) {
// @ts-ignore
          this.service.setImage('winery-emblem', formsData.wineryId, this.fileToUploadEmblem).subscribe(() => {
          });
        }
      });
    }
  }

  getBasicData() {

    if (this.langService.editable) {
      return;
    }

    const kashrutDB = [];

    this.wineryKashrutList.forEach(x => {
      kashrutDB.push(x.id);
    });
    // console.log(this.wineryKashrutList);

    const qualityDB = [];

    this.wineryQualityList.forEach(x => {
      qualityDB.push(x.id);
    });
    const biodynamicDB = [];

    this.wineryBiodynamicList.forEach(x => {
      biodynamicDB.push(x.id);
    });

    const organicDB = [];

    this.wineryOrganicList.forEach(x => {
      organicDB.push(x.id);
    });

    const veganDB = [];

    this.wineryVeganList.forEach(x => {
      veganDB.push(x.id);
    });

    const grapelistDB = [];

    this.wineryGrapeList.forEach(x => {
      grapelistDB.push(x.id);
    });

    const grapeSynonimsDB = [];

    this.wineryGrapeList.forEach(x => {
      grapeSynonimsDB.push(x.synonim);
    });

    const vineyardlistDB = [];

    this.wineryVineyardList.forEach(x => {
      vineyardlistDB.push(x.id);
    });

    const visittime = this.formVisitTime.value;
    const visittimeDB = {};
    for (const day in visittime) {
      const nRows = Math.max(visittime[day].length / 2, 2);
      for (let i = 0; i < nRows; i++) {
        const timeNameFrom = `f_${day}_${1 + i}`;
        visittimeDB[timeNameFrom] = 2 * i >= visittime[day].length ? '' : visittime[day][2 * i];
        const timeNameTo = `t_${day}_${1 + i % 2}`;
        visittimeDB[timeNameTo] = 2 * i >= visittime[day].length ? '' : visittime[day][2 * i + 1];
      }
    }


    console.log(this.form.value);
    const formsData = {
      commoninfo: this.form.value,
      // series: this.series.value,
      kashrut: JSON.stringify(kashrutDB),
      quality: JSON.stringify(qualityDB),
      biodynamic: JSON.stringify(biodynamicDB),
      organic: JSON.stringify(organicDB),
      vegan: JSON.stringify(veganDB),
      visittime: JSON.stringify(visittimeDB),
      grapelist: JSON.stringify(grapelistDB),
      vineyardlist: JSON.stringify(vineyardlistDB),
      grapeSynonims: JSON.stringify(grapeSynonimsDB),
    };

    return formsData;
  }

  placeMark() {

    // console.log(this.country.value);
    // console.log(this.countriesMap);
    const geoData = {address: '', ISO2: ''};
    if(this.googleMap) {

      if (this.address.value) {
        geoData.address = this.countriesMap.get(this.country.value * 1) + ', ' + this.address.value;
      } else {
        geoData.address = this.countriesMap.get(this.country.value * 1);
      }
    }

    if(this.openLayersMap) {


      geoData.address = this.address.value;
      geoData.ISO2 = this.countriesMapISO2.get(this.country.value * 1);
    }


    // const geoData = {address: this.countriesMap.get(this.country.value * 1) + ', ' + this.address.value }
    this.service.coordinatesByAddress(geoData).subscribe(res => {
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


// @ts-ignore
        if(res.geo.full) {

        }

      }

      console.log(res);
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

  isContain(arr: any[], id: any) {
    let res = false;
    arr.forEach(x => {
      if (x.id == id) {
        res = true;
      }
    });
    return res;
  }
  isContainGrapeWithSynonym(arr: any[], grape: any) {
    let res = false;
    arr.forEach(x => {
      // @ts-ignore
      if (x.id == grape.id && x.synonim == grape.synonim) {
        res = true;
      }
    });
    return res;
  }

  downloadKashrut() {
    this.listService.getKashrutListForWinery({search: this.kashrutsSearch.value, page: this.kashrutPage}).subscribe(data => {
        // @ts-ignore
        this.kashrutList = data.rows;
        // @ts-ignore
        this.kashrutTotal = data.total;
      }
    );
  }

  selectKashrut(kashrut) {
    if (!this.isContain(this.wineryKashrutList, kashrut.id)) {
      this.wineryKashrutList.push(kashrut);
      this.sortingKashrut();
    }
  }

  getKashrutName(kashrut) {
    if (kashrut) {
      if (!kashrut.hebrew || !kashrut.hebrew.length) {
        return `${kashrut.international}`;
      }
      return `${kashrut.hebrew} (${kashrut.international})`;
    }
  }

  removeKashrutFromWinery(i) {
    // @ts-ignore
    this.wineryKashrutList.splice(i, 1);
    this.sortingKashrut();
  }

// Quality quality qualities
  downloadQuality() {
    this.listService.getQualityListForWinery({search: this.qualitiesSearch.value, page: this.qualityPage}).subscribe(data => {
        // @ts-ignore
        this.qualityList = data.rows;
        // @ts-ignore
        this.qualityTotal = data.total;
      }
    );
  }

  selectQuality(quality) {
    if (!this.isContain(this.wineryQualityList, quality.id)) {
      this.wineryQualityList.push(quality);
      this.sortingQuality();
    }
  }

  getQualityName(quality) {
    if (quality) {
      return `${quality.name}`;
    }
  }

  removeQualityFromWinery(i) {
    // @ts-ignore
    this.wineryQualityList.splice(i, 1);
    this.sortingQuality();
  }

// Biodynamic biodynamic biodynamics
  downloadBiodynamic() {
    this.listService.getBiodinamicListForWinery({search: this.biodynamicsSearch.value, page: this.biodynamicPage}).subscribe(data => {
        // @ts-ignore
        this.biodynamicList = data.rows;
        // @ts-ignore
        this.biodynamicTotal = data.total;
      }
    );
  }

  selectBiodynamic(biodynamic) {
    if (!this.isContain(this.wineryBiodynamicList, biodynamic.id)) {
      this.wineryBiodynamicList.push(biodynamic);
      this.sortingBio();
    }
  }

  getBiodynamicName(biodynamic) {
    if (biodynamic) {
      return `${biodynamic.name}`;
    }
  }

  removeBiodynamicFromWinery(i) {
    // @ts-ignore
    this.wineryBiodynamicList.splice(i, 1);
    this.sortingBio();
  }

// Organic organic organics
  downloadOrganic() {
    this.listService.getOrganicListForWinery({search: this.organicsSearch.value, page: this.organicPage}).subscribe(data => {
        // @ts-ignore
        this.organicList = data.rows;
        // @ts-ignore
        this.organicTotal = data.total;
      }
    );
  }

  selectOrganic(organic) {
    if (!this.isContain(this.wineryOrganicList, organic.id)) {
      this.wineryOrganicList.push(organic);
      this.sortingOrganic();
    }
  }

  getOrganicName(organic) {
    if (organic) {
      return `${organic.name}`;
    }
  }

  removeOrganicFromWinery(i) {
    // @ts-ignore
    this.wineryOrganicList.splice(i, 1);
    this.sortingOrganic();
  }

// Vegan vegan
  downloadVegan() {
    this.listService.getVeganListForWinery({search: this.vegansSearch.value, page: this.veganPage}).subscribe(data => {
        // @ts-ignore
        this.veganList = data.rows;
        // @ts-ignore
        this.veganTotal = data.total;
      }
    );
  }

  selectVegan(vegan) {
    if (!this.isContain(this.wineryVeganList, vegan.id)) {
      this.wineryVeganList.push(vegan);
      this.sortingVegan();
    }
  }

  getVeganName(vegan) {
    if (vegan) {
      return `${vegan.name}`;
    }
  }

  removeVeganFromWinery(i) {
    // @ts-ignore
    this.wineryVeganList.splice(i, 1);
    this.sortingVegan();
  }

// Grape grape
  downloadGrape() {
    // console.log(this.grapesSearch.value);
    const search = this.grapesSearch.value.split(',').join('');
    this.listService.getGrapeListForWinery({search: this.grapesSearch.value, page: this.grapePage}).subscribe(data => {
        console.log(data);
        // @ts-ignore
        this.grapeList = data.rows;
        // @ts-ignore
        this.grapeTotal = data.total;
      }
    );
  }

  selectGrape(grape) {
    // if (!this.isContain(this.wineryGrapeList, grape.id)) {
    if (!this.isContainGrapeWithSynonym(this.wineryGrapeList, grape)) {
      this.wineryGrapeList.push(grape);
      this.sortingGrapes();
    }
  }

  getGrapeName(grape) {
    if (grape) {
      return grape.row;
    }
  }

  removeGrapeFromWinery(i) {
    // @ts-ignore
    this.wineryGrapeList.splice(i, 1);
    this.sortingGrapes();
  }

  getImage() {
    if (this.routeData.download) {
      // return environment.wineImageStore + `${this.wineData.id + '_' + this.wineData.image}.png`;
      return this.imageLink;
    } else {
      return this.noImage;
    }
  }

  getImageEmblem() {
    if (this.routeData.download) {
      // return environment.wineImageStore + `${this.wineData.id + '_' + this.wineData.image}.png`;
      return this.imageLinkEmblem;
    } else {
      return this.noImage;
    }
  }

// Vineyard vineyard
  downloadVineyard() {
    this.listService.getVineyardListForWinery({search: this.vineyardsSearch.value, page: this.grapePage}).subscribe(data => {
        // @ts-ignore
        this.vineyardList = data.rows;
        // @ts-ignore
        this.vineyardTotal = data.total;
      }
    );
  }

  selectVineyard(vineyard) {
    if (!this.isContain(this.wineryVineyardList, vineyard.id)) {
      this.wineryVineyardList.push(vineyard);

      this.sortingVineyards();
    }
  }

  getVineyardName(vineyard) {
    // console.log(vineyard);
    let res = '';
    if (vineyard) {
      if (vineyard.name && (vineyard.name == vineyard.international || !vineyard.international)) {
        res = `${vineyard.name}`;
      }
      if (vineyard.international && !vineyard.name) {
        res = `${vineyard.international}`;
      }
      res = `${vineyard.name} (${vineyard.international})`;
    }

    // @ts-ignore
    return res.trim();
  }

  removeVineyardFromWinery(i) {
    // @ts-ignore
    this.wineryVineyardList.splice(i, 1);
    this.sortingVineyards();
  }
  vineyardLink(vineyard) {

    return '/vineyard/' + vineyard;
  }

  get days() {
    return this.formVisitTime.controls;
  }

  get daysKeys() {
    return Object.keys(this.days);
  }

  times(day): FormArray {
    return (this.formVisitTime.get(day) as FormArray);
  }

  addTimeRange(day) {
    if (this.langService.editable) {
      return;
    }
    this.times(day).push(new FormControl('', Validators.required));
    this.times(day).push(new FormControl('', Validators.required));
  }

  restoreTimeData(timeData) {


    const valuesArr = [];
    Object.keys(timeData).forEach((key, i) => {

      if(i % 2 == 0) {
        const fromToDataForDay = {
          from: timeData[key],
          to: null,
          day: key[2]
        };
        valuesArr.push(fromToDataForDay);
      } else {
        valuesArr[valuesArr.length - 1].to = timeData[key];
      }
    });

    valuesArr.forEach(x => {

      if(x.from  || x.to) {

        this.times(x.day).push(new FormControl(x.from));
        this.times(x.day).push(new FormControl(x.to));
      }
    });
  }


  removeTimeRange(day, time) {
    if (this.langService.editable) {
      return;
    }
    this.times(day).removeAt(time);
    this.times(day).removeAt(time);
  }

  setGrapePage(page) {
    if (this.langService.editable) {
      return;
    }
    this.grapePage = page;
    this.downloadGrape();
    return page;
  }
  setVineyardPage(page) {
    if (this.langService.editable) {
      return;
    }
    this.vineyardPage = page;
    this.downloadVineyard();
    return page;
  }
  setKashrutsPage(page) {
    if (this.langService.editable) {
      return;
    }
    this.kashrutPage = page;
    this.downloadKashrut();
    return page;
  }
  setQualitiesPage(page) {
    if (this.langService.editable) {
      return;
    }
    this.qualityPage = page;
    this.downloadQuality();
    return page;
  }
  setBiodynamicPage(page) {
    if (this.langService.editable) {
      return;
    }
    this.biodynamicPage = page;
    this.downloadBiodynamic();
    return page;
  }
  setOrganicPage(page) {
    if (this.langService.editable) {
      return;
    }
    this.organicPage = page;
    this.downloadOrganic();
    return page;
  }
  setVeganPage(page) {
    if (this.langService.editable) {
      return;
    }
    this.veganPage = page;
    this.downloadVegan();
    return page;
  }

  get name_national() {
    return this.form.get('name_national');
  }
  downloadWineries() {
    if (this.routeData.download) {
      return;
    }
    this.listService.getWineries({search: this.name_national.value, page: this.wineryPage, onlyNeutral: true}).subscribe(data => {
        // @ts-ignore
        this.wineryList = data.rows;
        // @ts-ignore
        this.wineryTotal = data.total;
      }
    );
  }
  getWineryName(winery) {
    if (winery) {
      if (winery.international_name == winery.winery_name){
        return `${winery.international_name}`;
      }
      return `${winery.international_name} (${winery.winery_name})`;
    }
  }
  getWineryLink(winery) {
    return '/winery-edit/' + winery.id;
  }

  setImage(timestamp) {
    this.image.setValue(timestamp);
    this.isImageChanged = false;
  }

  setEmblem(timestamp) {
    this.emblem.setValue(timestamp);
    this.isImageChangedEmblem = false;
  }

  isInvalid(field) {
    return this.isParentShowNoValidation && field.invalid;
  }

  isBigScreen() {
    return window.innerWidth > 1080
  }



  get alterNames(): FormArray {
    return this.form.get('alterNames') as FormArray;
  }
  addAlterNames(point) {
    if (this.langService.editable) {
      return;
    }
    if (point) {
      (this.alterNames as FormArray).push(this.getFormAlterNames(point));
    } else {
      (this.alterNames as FormArray).push(this.getBlancFormAlterNames());
    }
  }


  removeAlterNames(point) {
    if (this.langService.editable) {
      return;
    }
    (this.alterNames as FormArray).removeAt(point);
  }

  getBlancFormAlterNames() {
    return new FormGroup({
      language: new FormControl('not chosen'),
      name: new FormControl(''),
    });
  }
  getFormAlterNames(point) {
    return new FormGroup({
      language: new FormControl(point.language),
      name: new FormControl(point.name),
    });
  }


  sortingGrapes() {
    // console.log(this.wineryGrapeList);

    this.wineryGrapeList.sort((a, b) => {
      const firstTextInCurrentLanguage = a.synonim
        || this.langService.getTextFromEverySource('grapes_names', '', a.id, a.name)
        || a.name;
      const secondTextInCurrentLanguage = b.synonim
        || this.langService.getTextFromEverySource('grapes_names', '', b.id, b.name)
        || b.name;

      return firstTextInCurrentLanguage > secondTextInCurrentLanguage ? 1 : -1;
    })
  }

  sortingVineyards() {
    // console.log(this.wineryVineyardList);

    this.wineryVineyardList.sort((a, b) => {
      const firstTextInCurrentLanguage = this.getVineyardName(a);
      const secondTextInCurrentLanguage = this.getVineyardName(b);



      return firstTextInCurrentLanguage > secondTextInCurrentLanguage ? 1 : -1;
    })
  }

  sortingKashrut() {

    this.wineryKashrutList.sort((a, b) => {
      const firstTextInCurrentLanguage = this.getKashrutName(a);
      const secondTextInCurrentLanguage = this.getKashrutName(b);


      return firstTextInCurrentLanguage > secondTextInCurrentLanguage ? 1 : -1;
    })
  }

  sortingQuality() {

    this.wineryQualityList.sort((a, b) => {
      const firstTextInCurrentLanguage = this.getQualityName(a);
      const secondTextInCurrentLanguage = this.getQualityName(b);


      return firstTextInCurrentLanguage > secondTextInCurrentLanguage ? 1 : -1;
    })
  }

  sortingBio() {

    this.wineryBiodynamicList.sort((a, b) => {
      const firstTextInCurrentLanguage = this.getBiodynamicName(a);
      const secondTextInCurrentLanguage = this.getBiodynamicName(b);


      return firstTextInCurrentLanguage > secondTextInCurrentLanguage ? 1 : -1;
    })
  }

  sortingOrganic() {

    this.wineryOrganicList.sort((a, b) => {
      const firstTextInCurrentLanguage = this.getOrganicName(a);
      const secondTextInCurrentLanguage = this.getOrganicName(b);


      return firstTextInCurrentLanguage > secondTextInCurrentLanguage ? 1 : -1;
    })
  }

  sortingVegan() {

    this.wineryVeganList.sort((a, b) => {
      const firstTextInCurrentLanguage = this.getVineyardName(a);
      const secondTextInCurrentLanguage = this.getVineyardName(b);


      return firstTextInCurrentLanguage > secondTextInCurrentLanguage ? 1 : -1;
    })
  }

  reloadMap() {
    this.mapReloadSubj.next({});
  }
}


export const wineProducerArr = [
  {id: 'Virtual Winery', value: 'Virtual Winery'},
  {id: 'Winery', value: 'Winery'},
  {id: 'Cooperative', value: 'Cooperative'},
  {id: 'Garage winery', value: 'Garage winery'},
  {id: 'Urban winery', value: 'Urban winery'},
  {id: 'Farm winery', value: 'Farm winery'},
  {id: 'Micro-winery', value: 'Micro-winery'},
  {id: 'Vineyard-winery', value: 'Vineyard-winery'},
  {id: 'Negociant', value: 'Negociant'},
];

export const performanceArr = [
  {place: 'till_2000', defaultValue: 'till 2000', value: '1'},
  {place: 'till_5000', defaultValue: '2000-5000', value: '2'},
  {place: 'till_8000', defaultValue: '5000-8000', value: '3'},
  {place: 'till_12000', defaultValue: '8000-12000', value: '4'},
  {place: 'till_20000', defaultValue: '12000-20000', value: '5'},
  {place: 'till_30000', defaultValue: '20000-30000', value: '6'},
  {place: 'till_60000', defaultValue: '30000-60000', value: '7'},
  {place: 'till_100000', defaultValue: '60000-100000', value: '8'},
  {place: 'till_160000', defaultValue: '100000-160000', value: '9'},
  {place: 'till_220000', defaultValue: '160000-220000', value: '10'},
  {place: 'till_300000', defaultValue: '220000-300000', value: '11'},
  {place: 'till_450000', defaultValue: '300000-450000', value: '12'},
  {place: 'till_600000', defaultValue: '450000-600000', value: '13'},
  {place: 'till_800000', defaultValue: '600000-800000', value: '14'},
  {place: 'till_1200000', defaultValue: '800000-1200000', value: '15'},
  {place: 'till_1500000', defaultValue: '1200000-1500000', value: '16'},
  {place: 'till_2000000', defaultValue: '1500000-2000000', value: '17'},
  {place: 'till_3000000', defaultValue: '2000000-3000000', value: '18'},
  {place: 'till_5000000', defaultValue: '3000000-5000000', value: '19'},
  {place: '5000000_more', defaultValue: '5000000 and more', value: '20'},
];
// <button class="btn btn-option" (click)="_performance.choose('13')">
//   <app-text page="winery_add" place="till_600000" default="450000-600000"></app-text>
//   </button>
