import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {environment} from '@src/environments/environment';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {languagesContent} from '@src/environments/languages';
import {debounceTime} from 'rxjs/operators';
import {MapGoogleDesignedComponent} from '@src/app/schemas/map-google-designed/map-google-designed.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ListsService} from '@src/app/services/api/lists.service';
import {CookieService} from 'ngx-cookie-service';
import {ReplaySubject, Subject} from 'rxjs';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {Overlay} from '@angular/cdk/overlay';
import {PlaceOfOriginComponent} from '@src/app/schemas/place-of-origin/place-of-origin.component';
import {MatDialog} from '@angular/material/dialog';
import {PersonSearchComponent} from '@src/app/schemas/person-search/person-search.component';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {LoadingServiceService} from '@src/app/services/loading-service.service';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {MapOpenLayersComponent} from '@src/app/schemas/map-open-layers/map-open-layers.component';

@Component({
  selector: 'app-vineyard-basic-designed',
  templateUrl: './vineyard-basic-designed.component.html',
  styleUrls: ['./vineyard-basic-designed.component.css']
})
export class VineyardBasicDesignedComponent implements OnInit, AfterViewInit {
  tab = 'basic';
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() structureData: Subject;


  cookies;
  routeData = {editable: false, download: false, available: true};

  geoData =  new ReplaySubject(1);
// @ts-ignore
  @ViewChild(MapGoogleDesignedComponent) googleMap: MapGoogleDesignedComponent;
// @ts-ignore
  @ViewChild(MapOpenLayersComponent) openLayersMap: MapOpenLayersComponent;
  // @ts-ignore
  @Input() isParentShowNoValidation;


  mapReloadSubj =  new ReplaySubject(1);

  form = new FormGroup({
    language: new FormControl(this.langService.getLanguage()),
    name_national: new FormControl(''),
    name_international: new FormControl('', Validators.required),
    alterNames: new FormArray([]),

    establish_year: new FormControl(''),
    owner: new FormControl(''),
    vintner_national: new FormControl(''),
    vintner_international: new FormControl(''),
    yours: new FormControl(''),
    userId: new FormControl(''),
    business: new FormControl(0),
    square: new FormControl(''),
    squareUnit: new FormControl(''),


    altitude_min: new FormControl(''),
    altitude_max: new FormControl(''),
    altituteUnit: new FormControl(''),


    production: new FormControl(''),
    productionUnit: new FormControl(''),

    harvests: new FormArray([]),


    differentAddress: new FormControl(0),
    address: new FormControl(''),
    country: new FormControl(0),
    regionsForm: new FormArray([
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
    ]),

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
    grapeClones: new FormGroup({}),
    grapeUses: new FormGroup({}),


    lat: new FormControl(''),
    lng: new FormControl(''),


    image: new FormControl(''),
    emblem: new FormControl(''),
    imageDB: new FormControl(''),
    emblemDB: new FormControl(''),

    grapeRootstock: new FormArray([]),

  });


  countriesMap = new Map();
  regionesMap = new Map();
  countries = [];
  regiones = [];

  squareUnits = squareUnits;
  altituteUnits = altituteUnits;
  harvestUnits = harvestUnits;
  harvestTypes = harvestTypes;
  productionUnits = productionUnits;

  fileToUpload: File = null;
  imageLink = null;
  isImageChanged = false;
  url;


  fileToUploadEmblem: File = null;
  imageLinkEmblem = null;
  isImageChangedEmblem = false;
  urlEmblem;

  languageArr = languagesContent;
  noImage = '../../../assets/icons/placeholder-wine.svg';
  wineList = [];
  winePage = 1;
  wineTotal = 0;
  chosenWines = [];

  tabs = {
    basic: 'basic',
    wines: 'wines',
  };



  addressCode = null;
  originCode = null;


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

  wineryKashrutList = [];
  wineryQualityList = [];
  wineryBiodynamicList = [];
  wineryOrganicList = [];
  wineryVeganList = [];
  wineryGrapeList = [];


  clonesMap = new Map();
  usesMap = new Map();


  constructor(private service: RequestsService,
              public listService: ListsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              public dialog: MatDialog,
              private cookieObserver: CookieObserverService,
              public loadingService: LoadingServiceService,
              public downloadingService: DownloadDataServiceService,
              private additionalService: AdditionalServiceService,
              public overlay: Overlay) { }


  ngOnInit() {

    this.downloadingService.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x.name);
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

    this.cookies = this.cookieObserver.observeCookie();
    this.geoData.subscribe(data => {
      console.log(data);

// @ts-ignore
      this.lng.setValue(data.lng);
// @ts-ignore
      this.lat.setValue(data.lat);
    });


    // this.wineHelper.valueChanges.pipe(
    //   debounceTime(1000),
    //   filter(form => !form.invalid),
    // ).subscribe(() => {
    //   this.downloadWines();
    // });

    this.downloadedData.subscribe(data => {
      this.routeData.download = true;

      console.log(data);
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
            this.imageLink = environment.vineyardImageStore + `${this.activatedroute.snapshot.params.id + '_' + data.image}.png`;
// @ts-ignore
            this.image.setValue(data.image);
          }
        }

        if (key == 'emblem') {
// @ts-ignore
          if (data.emblem * 1) {
// @ts-ignore
            this.imageLinkEmblem = environment.vineyardEmblemImageStore + `${this.activatedroute.snapshot.params.id + '_' + data.emblem}.png`;
// @ts-ignore
            this.emblem.setValue(data.emblem);
          }
        }

        // console.log(this.imageLink);
        // console.log(this.imageLinkEmblem);

      });

// @ts-ignore
      if (data.alterNames) {
// @ts-ignore
        data.alterNames.forEach(point => {
          this.addAlterNames(point);
        });
      }

// @ts-ignore
      if (data.harvests) {
        try{


          const harvestsData = JSON.parse(data.harvests);

          console.log(harvestsData);
          harvestsData.forEach(h => {
            this.addHarvests(h);
          })

        } catch (e) {

        }
        // this.wineryGrapeList = data.grapesFull;
      }

// @ts-ignore
      if (data.kashruts) {
// @ts-ignore
        this.wineryKashrutList = data.kashruts;
      }
// @ts-ignore
      if (data.qualities) {
// @ts-ignore
        this.wineryQualityList = data.qualities;
      }
// @ts-ignore
      if (data.biodynamics) {
// @ts-ignore
        this.wineryBiodynamicList = data.biodynamics;
      }
// @ts-ignore
      if (data.organics) {
// @ts-ignore
        this.wineryOrganicList = data.organics;
      }
// @ts-ignore
      if (data.vegans) {
// @ts-ignore
        this.wineryVeganList = data.vegans;
      }

// @ts-ignore
      if (data.grapesFull) {
        this.wineryGrapeList = data.grapesFull;
        try {
          data.grapesFull.forEach(x => {
            this.addGrapeInner(x, data.grapeClones, data.grapeUses)
          });
        } catch(e) {

        }
      }
      console.log(this.form.value);
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
//       this.geoData.next(data.commoninfo);
      if(this.googleMap) {
        this.googleMap.setMarker(this.form.value);
      }
      if(this.openLayersMap) {
// @ts-ignore
        this.openLayersMap.setMarker(this.form.value);
      }
// @ts-ignore
      this.yours.setValue(1 * (this.cookieService.get('myId') * 1 === data.user));
      // console.log(data.user);
      console.log(this.wineryGrapeList);
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


      // console.log(this.form.value);
      // console.log(this.countriesMap);
    });

//     this.downloadedData.subscribe(data => {
//       console.log(data);
//
//
//       Object.keys(this.form.controls).forEach(key => {
// // @ts-ignore
//         if (this.form.get(key) instanceof FormControl && data.commoninfo[key]) {
// // @ts-ignore
//           this.form.get(key).setValue(data.commoninfo[key]);
//         }
//       });
//
//       this.geoData.next(data);
//
//
//     });
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

  get language() {
    return this.form.get('language');
  }
  get name_national() {
    return this.form.get('name_national');
  }
  get name_international() {
    return this.form.get('name_international');
  }
  get establish_year() {
    return this.form.get('establish_year');
  }
  get owner() {
    return this.form.get('owner');
  }
  get business() {
    return this.form.get('business');
  }
  get square() {
    return this.form.get('square');
  }
  get squareUnit() {
    return this.form.get('squareUnit');
  }


  get differentAddress() {
    return this.form.get('differentAddress');
  }
  get address() {
    return this.form.get('address');
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

  get grapeClones(): FormGroup {
    return this.form.get('grapeClones') as FormGroup;
  }
  get grapeUses(): FormGroup {
    return this.form.get('grapeUses') as FormGroup;
  }


  get yours() {
    return this.form.get('yours');
  }
  get userId() {
    return this.form.get('userId');
  }

  get image() {
    return this.form.get('imageDB');
  }
  get emblem() {
    return this.form.get('emblemDB');
  }

  get altitude_min() {
    return this.form.get('altitude_min');
  }
  get altitude_max() {
    return this.form.get('altitude_max');
  }
  get altituteUnit() {
    return this.form.get('altituteUnit');
  }
  get harvests() : FormArray {
    return this.form.get('harvests') as FormArray;
  }

  get production() {
    return this.form.get('production');
  }
  get productionUnit() {
    return this.form.get('productionUnit');
  }


  removeMark() {

    if(this.googleMap) {
      this.googleMap.removeMarker();
    }

    if(this.openLayersMap) {
      this.openLayersMap.removeMarker();
    }
  }
  placeMark() {

    // console.log(this.country.value);
    // console.log(this.countriesMap);
    const geoData = {address: this.countriesMap.get(this.country.value * 1) + ', ' + this.address.value };
//     this.service.coordinatesByAddress(geoData).subscribe(res => {
// // @ts-ignore
//       if (res.geo) {
// // @ts-ignore
//         this.googleMap.setMarker(res.geo)
//       }
//     });


    // const geoData = {address: ''};
    // if (this.address.value) {
    //   geoData.address = this.countriesMap.get(this.country.value * 1) + ', ' + this.address.value;
    // } else {
    //   geoData.address = this.countriesMap.get(this.country.value * 1);
    // }

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
      }
      console.log(res);
    });
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


  getData() {

    const grapelistDB = [];

    this.wineryGrapeList.forEach(x => {
      grapelistDB.push(x.id);
    });

    const grapeSynonimsDB = [];

    this.wineryGrapeList.forEach(x => {
      grapeSynonimsDB.push(x.synonim);
    });

    const kashrutDB = [];

    this.wineryKashrutList.forEach(x => {
      kashrutDB.push(x.id);
    });

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


    const requestData = {
      commoninfo: this.form.value,
      grapelist: JSON.stringify(grapelistDB),
      grapeSynonims: JSON.stringify(grapeSynonimsDB),


      kashrut: JSON.stringify(kashrutDB),
      quality: JSON.stringify(qualityDB),
      biodynamic: JSON.stringify(biodynamicDB),
      organic: JSON.stringify(organicDB),
      vegan: JSON.stringify(veganDB),
      id: 0
    };
//     if (this.activatedroute.snapshot.data.download) {
// // @ts-ignore
//       requestData.id = this.activatedroute.snapshot.params.id;
//     }
    console.log(requestData);

    return requestData;

  }


// Grape grape
  downloadGrape() {
    console.log(this.grapesSearch.value);
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

      console.log(grape);
      this.wineryGrapeList.push(grape);
      this.addGrapeInner(grape, null, null)
    }
  }

  switchCloneAndUses(grape) {
    grape.open = !grape.open;
  }

  addGrapeInner(grapesFull, grapeClones, grapeUses) {


    let gc = {};
    let gu = {};

    if(grapeClones) {
      gc = JSON.parse(grapeClones);
    }

    if(grapeUses) {
      gu = JSON.parse(grapeUses);
    }

    let arrClones = [];
    let arrUses = [];

    const grapeInner = new FormGroup({});
    const clones = new FormGroup({});
    const uses = new FormGroup({});

    if(grapesFull.cloneNames) {
      arrClones = JSON.parse(grapesFull.cloneNames);
      // console.log(arrClones);

      arrClones.forEach(c => {
        let value = false;
        try {
          value = gc[grapesFull.id + ''][c];
        } catch (e) {
        }

        clones.addControl(c, new FormControl(value))
      });
    }

    if(grapesFull.uses) {
      const regex = /, */;
      arrUses = grapesFull.uses.split(regex);
      // console.log(arrUses);
      arrUses.forEach(c => {
        let value = false;
        try {
          value = gu[grapesFull.id + ''][c];
        } catch (e) {
        }

        uses.addControl(c, new FormControl(value))
      });
    }

    this.grapeClones.addControl(grapesFull.id + '', clones);
    this.grapeUses.addControl(grapesFull.id + '', uses);


    const clonesArr = [];
    if(clones) {
      // @ts-ignore
      Object.keys(clones.controls).forEach((key, control) => {
        clonesArr.push({
          name: key,
          control,
          form: clones
        })
      });
    }

    this.clonesMap.set(grapesFull.id + '', clonesArr);

    const usesArr = [];
    if(uses) {
      // @ts-ignore
      Object.keys(uses.controls).forEach((key, control) => {
        usesArr.push({
          name: key,
          control,
          form: uses
        })
      });
    }

    this.usesMap.set(grapesFull.id + '', usesArr);
    // usesMap = new Map();
  }

  getGrapeName(grape) {
    if (grape) {
      return grape.row;
    }
  }

  getClonesForGrape(id) {



    let arr = [];
    try {
      arr = this.clonesMap.get(id + '')
    } catch (e) {}
    return arr;
  }

  getUsesForGrape(id) {


    let arr = [];
    try {
      arr = this.usesMap.get(id + '')
    } catch (e) {}
    return arr;

  }

  removeGrapeFromWinery(i) {
    // @ts-ignore
    this.wineryGrapeList.splice(i, 1);
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
  setGrapePage(page) {
    if (this.langService.editable) {
      return;
    }
    this.grapePage = page;
    this.downloadGrape();
    return page;
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




  addHarvests(point) {
    if (this.langService.editable) {
      return;
    }
    if (point) {
      (this.harvests as FormArray).push(this.getFormHarvests(point));
    } else {
      (this.harvests as FormArray).push(this.getBlancFormHarvests());
    }
  }


  removeHarvests(point) {
    if (this.langService.editable) {
      return;
    }
    (this.harvests as FormArray).removeAt(point);
  }

  getBlancFormHarvests() {
    return new FormGroup({
      production: new FormControl(''),
      year: new FormControl(''),
      type: new FormControl(''),
      unit: new FormControl(''),
    });
  }
  getFormHarvests(point) {
    return new FormGroup({
      production: new FormControl(point.production),
      year: new FormControl(point.year),
      type: new FormControl(point.type),
      unit: new FormControl(point.unit),
    });
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



  setImage(timestamp) {
    this.image.setValue(timestamp);
    this.isImageChanged = false;
  }

  setEmblem(timestamp) {
    this.emblem.setValue(timestamp);
    this.isImageChangedEmblem = false;
  }

  isBigScreen() {
    return window.innerWidth > 1080
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

  convertSquare(size) {
    const currentSquare = this.squareUnits.find(x => {
      return x.value == this.squareUnit.value;
    });

    if(currentSquare && currentSquare.size && this.square.value) {
      try {
        const newSquare = Math.round(this.square.value * currentSquare.size / size * 10) / 10;
        if(!isNaN(newSquare)) {
          this.square.setValue(newSquare);
        }
      } catch(e) {

      }
    }
  }

  convertProduction(size) {
    const currentProduction = this.productionUnits.find(x => {
      return x.value == this.productionUnit.value;
    });

    if(currentProduction && currentProduction.size && this.production.value) {
      try {
        const newSquare = Math.round(this.production.value * currentProduction.size / size * 10) / 10;
        if(!isNaN(newSquare)) {
          this.production.setValue(newSquare);
        }
      } catch(e) {

      }
    }
  }

  convertAltitude(size) {
    const currentSquare = this.altituteUnits.find(x => {
      return x.value == this.altituteUnit.value;
    });

    if(currentSquare && currentSquare.size && this.altitude_min.value) {
      try {
        const newSquare = Math.round(this.altitude_min.value * currentSquare.size / size * 10) / 10;
        if(!isNaN(newSquare)) {
          this.altitude_min.setValue(newSquare);
        }
      } catch(e) {

      }
    }

    if(currentSquare && currentSquare.size && this.altitude_max.value) {
      try {
        const newSquare = Math.round(this.altitude_max.value * currentSquare.size / size * 10) / 10;
        if(!isNaN(newSquare)) {
          this.altitude_max.setValue(newSquare);
        }
      } catch(e) {

      }
    }
  }


  convertHarvest(i, size) {
    const currentUnit = this.harvestUnits.find(x => {
      return x.value == this.harvests.at(i).get('unit').value;
    });
    const currentType = this.harvestTypes.find(x => {
      return x.value == this.harvests.at(i).get('type').value;
    });

    // console.log()

    if(currentUnit && currentUnit.size && this.harvests.at(i).get('production').value) {
      try {

        const newSquare = Math.round(this.harvests.at(i).get('production').value / currentUnit.size * size.size / (1 + currentUnit.density * currentType.size) * (1 + size.density * currentType.size) * 10) / 10;
        console.log(this.harvests.at(i).get('production').value);
        console.log(currentUnit.size);
        console.log(size.size);
        console.log((1 + currentUnit.density * currentType.size));
        console.log((1 + size.density * currentType.size));
        console.log(newSquare);





        if(!isNaN(newSquare)) {
          this.harvests.at(i).get('production').setValue(newSquare);
        }
      } catch(e) {

      }
    }
  }
  reloadMap() {
    this.mapReloadSubj.next({});
  }
}


export const squareUnits = [
  {place: 'acre', value: 'acre', label: 'acres', size: 4046.86},
  {place: 'dunam', value: 'dunam', label: 'dunams', size: 1000},
  {place: 'hectare', value: 'hectare', label: 'hectares', size: 10000},
  {place: 'squarefeet', value: 'squarefeet', label: 'square feet', size: 0.092903},
  {place: 'squarekm', value: 'squarekm', label: 'square km', size: 1000000},
  // {place: 'squaremetre', value: 'squaremetre', label: 'square metres', size: 1},
  // {place: 'are', value: 'are', label: 'ares', size: 100},
  // {place: 'squareyard', value: 'squareyard', label: 'square yards', size: 0.836127},
];

export const altituteUnits = [
  {place: 'meter', value: 'meter', label: 'meter', size: 1},
  {place: 'feet', value: 'feet', label: 'feet', size: 0.3048},
];

// short tons/tons/hl
export const productionUnits = [
  {place: 'short tons', value: 'short tons', label: 'short tons', size: 0.907185, density: 0},
  {place: 'tons', value: 'tons', label: 'tons', size: 1, density: 0},
  {place: 'hl', value: 'hl', label: 'hl', size: 0.14, density: 1},
  {place: 'gallon', value: 'gallon', label: 'gallon', size: 0.0053, density: 1},
];

export const harvestUnits = [
  {place: 'kg/ha', value: 'kg/ha', label: 'kg/ha', size: 2470, density: 0},
  {place: 'ton/acre', value: 'ton/acre', label: 'ton/acre', size: 1, density: 0},
  {place: 'hl/ha', value: 'hl/ha', label: 'hl/ha', size: 15, density: 1},
];

export const harvestTypes = [
  {place: 'white_wine', value: 'white_wine', label: 'white wine', size: 0},
  {place: 'red_wine', value: 'red_wine', label: 'red wine', size: 0.167},
  {place: 'mixed_wine', value: 'mixed_wine', label: 'mixed wine', size: 0.267},
];
