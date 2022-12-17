import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingServiceService} from '@src/app/services/loading-service.service';
import {AdditionalViewSchemaComponent} from '@src/app/schemas/additional-view-schema/additional-view-schema.component';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {CookieService} from 'ngx-cookie-service';
import {languagesContent} from '@src/environments/languages';
import {RequestsService} from '@src/app/services/api/requests.service';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {Overlay} from '@angular/cdk/overlay';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {SuccessService} from '@src/app/services/success.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {ReplaySubject} from 'rxjs';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {competitionTypes} from '@src/app/competition-designed/competition-basic/competition-basic.component';

@Component({
  selector: 'app-competition-one',
  templateUrl: './competition-one.component.html',
  styleUrls: ['./competition-one.component.css']
})
export class CompetitionOneComponent implements OnInit {

  competition = null;
  awards = [];
  wines = [];
  events = [];
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

  competitionTypes = competitionTypes;

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


    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x.name);
      });
    });

    const req = {business_type: 'competition'};
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



    const id = this.activatedroute.snapshot.params.id;
    this.service.getCompetition(id).subscribe(fulldata => {

      // @ts-ignore
      const data = fulldata.competition;
      // @ts-ignore
      const awards = fulldata.awards;
      // @ts-ignore
      this.wines = fulldata.wines;
      // @ts-ignore
      this.events = fulldata.events;
      console.log(data);

      let title = '';
      // @ts-ignore
      if(data.commoninfo.language == this.langService.language && data.commoninfo.name_national) {
        // @ts-ignore
        title = data.commoninfo.name_national + ' competition - bonvino.com';
      } else {
        // @ts-ignore
        title = data.commoninfo.name_international + ' competition - bonvino.com';
      }
      this.titleService.setTitle(title);


// @ts-ignore
//       this.downloadedData.next(data);


      this.competition = data;
      this.awards = awards;

// @ts-ignore
      if (data.menu) {
// @ts-ignore
        this.additional.menu = JSON.parse(data.menu);
      }

      this.downloadedData.next(data);

    });
  }

  isEditable() {
    return !this.competition.commoninfo.user || this.accountService.isSameUser(this.competition.commoninfo.user) || this.accountService.isAdmin();
  }
  editCompetitionLink() {
    return '/competition-edit/' + this.activatedroute.snapshot.params.id;
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
  grantAwardsLink() {
    return '/grant-awards/' + this.activatedroute.snapshot.params.id;
  }
  getCategoryName(award) {
    if (award && (award.categories_name || award.categories_name_int || award.categories_name_int)) {
      let res = '';
      if (award.categories_name && award.categories_name_int) {
        res = res + `${award.categories_name} (${award.categories_name_int})`;
      } else if (award.categories_name) {
        res = res + `${award.categories_name}`;
      } else if (award.categories_name_int) {
        res = res + `${award.categories_name_int}`;
      }

      if(award.categories_year) {
        res = res + ` - ${award.categories_year}`;
      }

      return res;
    }
  }
}
