import {Component, OnInit} from '@angular/core';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {CookieService} from 'ngx-cookie-service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {Title} from '@angular/platform-browser';
import {RequestsService} from '@src/app/services/api/requests.service';
import {SuccessService} from '@src/app/services/success.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingServiceService} from '@src/app/services/loading-service.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReplaySubject} from 'rxjs';
import {languagesContent} from '@src/environments/languages';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {AdditionalViewSchemaComponent} from '@src/app/schemas/additional-view-schema/additional-view-schema.component';
import {Overlay} from '@angular/cdk/overlay';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';

@Component({
  selector: 'app-vineyard-one-designed',
  templateUrl: './vineyard-one-designed.component.html',
  styleUrls: ['./vineyard-one-designed.component.css']
})
export class VineyardOneDesignedComponent implements OnInit {

  vineyard = null;
  // commoninfo

  cookies;
  routeData = {editable: false, download: false, available: true};

  geoData =  new ReplaySubject(1);

  form = new FormGroup({
    language: new FormControl(this.langService.getLanguage()),
    name_national: new FormControl(''),
    name_international: new FormControl('', Validators.required),
    establish_year: new FormControl(''),
    owner: new FormControl(''),
    yours: new FormControl(''),
    userId: new FormControl(''),
    business: new FormControl(0),
    square: new FormControl(''),
    squareUnit: new FormControl(''),

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

    grapes: new FormGroup({}),
    grapesData: new FormArray([]),
    grapesSearch: new FormControl(''),


    lat: new FormControl(''),
    lng: new FormControl(''),

  });


  countriesMap = new Map();
  regionesMap = new Map();
  countries = [];
  regiones = [];

  squareUnits = [
    {place: 'acre', value: 'acre', label: 'Acres'},
    {place: 'dunam', value: 'dunam', label: 'Dunams'},
    {place: 'squaremetre', value: 'squaremetre', label: 'Square metres'},
    {place: 'are', value: 'are', label: 'Ares'},
    {place: 'hectare', value: 'hectare', label: 'Hectares'},
    {place: 'squareyard', value: 'squareyard', label: 'Square yards'},
  ];


  imageLink = null;
  url;
  languageArr = languagesContent;
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



  grapePage = 1;
  grapeTotal = 0;
  grapeList = [];
  wineryGrapeList = [];

  additionalStructure = new ReplaySubject(10);
  structure = [];
  menu = {};

  additional = {
    structure: [],
    menu: {}
  };

  additionalTabs = new ReplaySubject(10);
  downloadedData = new ReplaySubject(10);

  constructor(
    public downloadingService: DownloadDataServiceService,
    private service: RequestsService,
    public activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router,
    private accountService: AccountServiceService,
    private successService: SuccessService,
    public langService: LanguageServiceService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public overlay: Overlay,
    private titleService: Title,
    public loadingService: LoadingServiceService,
    private additionalService: AdditionalServiceService
  ) { }

  ngOnInit(): void {

    const req = {business_type: 'vineyard'};
    this.service.getConstructorStructure(req).subscribe((data: InputData[]) => {
      this.additional.structure = data;

      this.additionalService.transformAdditional(data, this.structure, null);

      this.additionalTabs.next(this.additionalService.getTabs(data));

      this.additionalStructure.next(data);
    });

    this.additionalTabs.subscribe(tabs => {

// @ts-ignore
      this.tabs = tabs;

    });

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


    const id = this.activatedroute.snapshot.params.id;
    this.service.getVineyard(id).subscribe(data => {

      console.log(data);


      let title = '';
      // @ts-ignore
      if(data.commoninfo.language == this.langService.language && data.commoninfo.name_national) {
        // @ts-ignore
        title = data.commoninfo.name_national + ' vineyard - bonvino.com';
      } else {
        // @ts-ignore
        title = data.commoninfo.name_international + ' vineyard - bonvino.com';
      }
      this.titleService.setTitle(title);


// @ts-ignore
//       this.downloadedData.next(data);


      this.vineyard = data;

// @ts-ignore
      if (data.menu) {
// @ts-ignore
        this.additional.menu = JSON.parse(data.menu);
      }

      this.downloadedData.next(data);
// @ts-ignore
      if (data.grapesFull) {
// @ts-ignore
        this.wineryGrapeList = data.grapesFull;
      }
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
      this.geoData.next(data.commoninfo);
      // this.googleMap.setMarker(this.vineyard.commoninfo);


    });
  }

  isEditable() {
    return !this.vineyard.user || this.accountService.isSameUser(this.vineyard.user) || this.accountService.isAdmin();
  }
  editVineyardLink() {
    return '/vineyard-edit/' + this.activatedroute.snapshot.params.id;
  }

  isTabExist(tab) {

    const res = this.additional.structure.filter(x => {
      return (x.tab == tab && this.additional.menu[x.block_name]);
    });
    return res.length;
  }


  showAdditional(tab) {

    if (this.langService.editable) {
      return;
    }

    const dialogRef = this.dialog.open(AdditionalViewSchemaComponent, {
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: '80%',
      height: '80%',
      autoFocus: false,
      data: {
        content: this.downloadedData,
        tab,
        additionalStructure: this.additionalStructure
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
