import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {environment} from '@src/environments/environment';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {Title} from '@angular/platform-browser';
import {CookieService} from 'ngx-cookie-service';
import {ListsService} from '@src/app/services/api/lists.service';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin, ReplaySubject} from 'rxjs';
import {PlaceOfOriginComponent} from '@src/app/schemas/place-of-origin/place-of-origin.component';
import {MatDialog} from '@angular/material/dialog';
import {AdditionalSearchSchemaComponent} from '@src/app/schemas/additional-search-schema/additional-search-schema.component';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {performanceArr} from '@src/app/wineries-designed/winery-basic/winery-basic.component';
import {WineryShortSubscreenComponent} from '@src/app/wineries-designed/winery-short-subscreen/winery-short-subscreen.component';
import {Location} from '@angular/common';
import {Overlay} from '@angular/cdk/overlay';

@Component({
  selector: 'app-winery-list-designed',
  templateUrl: './winery-list-designed.component.html',
  styleUrls: ['./winery-list-designed.component.css']
})
export class WineryListDesignedComponent implements OnInit, OnDestroy {

  @ViewChild('cards') private cards: ElementRef;


  noImage = '../../../assets/icons/placeholder-wine.svg';
  wineTypeList = [];
  countries = [];
  regiones = [];
  countriesMap = new Map();
  regionesMap = new Map();

  downloading = false;
  downloadStarted = false;

  wineryList = [];
  page = 1;
  maxPage = 1;
  downloadedPages = 1;
  searchNumber = 0;
  savedForm = null;
  intervals;

  tabs = {
    all: 'all',
    my: 'my',
    interesting: 'interesting'
  };

  orders = {
    name_int: {name: 'winery_name', direction: true},
    name_int_reverse: {name: 'winery_name', direction: false},

    name_nat: {name: 'international_name', direction: true},
    name_nat_reverse: {name: 'international_name', direction: false},

    // date: {name: 'from', direction: true},
    // date_reverse: {name: 'from', direction: false},

    country: {name: 'country_id', direction: true},
    country_reverse: {name: 'country_id', direction: false},

    sort: {name: 'id', direction: true},
  };

  chosenWinery;

  form = new FormGroup({
    searchInternationalName: new FormControl(''),
    // searchUpcoming: new FormControl(false),
    // searchCountry: new FormControl(0),
    // year: new FormControl(''),
    // series: new FormControl(''),
    // to: new FormControl(''),
    // searchId: new FormControl(''),
    // searchYear: new FormControl(''),
    // searchColor: new FormControl(0),
    // searchType: new FormControl(0),
    // searchWinery: new FormControl(''),
    tab: new FormControl(this.tabs.all),
    order: new FormControl('name_int'),
    country: new FormControl(0),
    regionsForm: new FormArray([
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
    ]),

    owner: new FormControl(''),
    winemaker: new FormControl(''),


    isKashrut: new FormControl(''),
    isBiodynamic: new FormControl(''),
    isOrganic: new FormControl(''),
    isVegan: new FormControl(''),




    performance: new FormControl(''),
  });

  // @ts-ignore
  @ViewChild(AdditionalSearchSchemaComponent) additionalSearch: AdditionalSearchSchemaComponent;

  additionalStructure = new ReplaySubject(10);
  structure = [];

  performanceArr = performanceArr;


  constructor(public service: RequestsService,
              public listService: ListsService,
              public langService: LanguageServiceService,
              public accountService: AccountServiceService,
              public cookieService: CookieService,
              public location: Location,
              public activatedroute: ActivatedRoute,
              public dialog: MatDialog,
              public overlay: Overlay,
              private titleService: Title,
              private router: Router) { }

  ngOnInit() {

    let title = 'Winerylist - bonvino.com';
    this.titleService.setTitle(title);


    const getWineType = this.service.getWineType();
    const getCountries = this.service.getCountries();
    const getRegiones = this.service.getRegiones();




    forkJoin([getWineType, getCountries, getRegiones]).subscribe(results => {

      // @ts-ignore
      this.wineTypeList = results[0];
      // @ts-ignore
      this.countries = results[1];
// @ts-ignore
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x.name);
      });
// @ts-ignore
      this.regiones = results[2];
      this.regiones.forEach(x => {
        this.regionesMap.set(x.id, x.name);
      });
    });

    // this.wineryHelper.valueChanges.pipe(
    //   debounceTime(1000),
    //   filter(form => !form.invalid),
    // ).subscribe(() => {
    //   this.downloadWineries();
    // });

    // return position > height - threshold;
    this.savedForm = JSON.parse(JSON.stringify(this.form.value));
    this.intervals = setInterval(() => {

      const threshold = 100;
      const position = window.scrollY + window.innerHeight;
      const height = document.body.scrollHeight;

      if (height - threshold < position && this.downloadStarted) {
        // console.log('!');
        this.downloadAdditionalEvents();
      }

    }, 1000);




    const req = {
      business_type: 'winery',
      search: true,
    };

    this.service.getConstructorStructure(req).subscribe((data: InputData[]) => {

      this.structure = data;
      this.additionalStructure.next(this.structure);

    });
  }


  get searchUpcoming() {
    return this.form.get('searchUpcoming');
  }
  get searchWinery() {
    return this.form.get('searchWinery');
  }
  get searchCountry() {
    return this.form.get('searchCountry');
  }
  get tab() {
    return this.form.get('tab');
  }
  get from() {
    return this.form.get('from');
  }
  get to() {
    return this.form.get('to');
  }
  get order() {
    return this.form.get('order');
  }
  get owner() {
    return this.form.get('owner');
  }
  get winemaker() {
    return this.form.get('winemaker');
  }
  get isKashrut() {
    return this.form.get('isKashrut');
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
  get performance() {
    return this.form.get('performance');
  }
  get country() {
    return this.form.get('country');
  }
  get regionsForm(): FormArray {
    return this.form.get('regionsForm') as FormArray;
  }
  filterEvents() {
    this.downloadStarted = true;
    console.log(this.form.value);
    this.savedForm = JSON.parse(JSON.stringify(this.form.value));
    this.page = 1;
    this.wineryList = [];
    this.downloadEvents();
  }
  addEvent() {
    this.router.navigate(['/event-add']);
  }
  addEventLink() {
    return '/event-add';
  }
  downloadAdditionalEvents() {
    // this.downloading = true;
    // console.log(this.form.value);
    if (this.page <= this.maxPage && this.page <= this.downloadedPages && !this.downloading) {
      this.downloading = true;
      this.downloadEvents();
    }
  }
  downloadEvents() {
    if (this.langService.editable) {
      return;
    }

    const request = {
      additional: this.additionalSearch.getData(),
      search: this.savedForm,
      order: this.orders[this.savedForm.order],
      page: this.page
    };
    const searchNumber = this.searchNumber;
    this.listService.getWineryList(request).subscribe(data => {
      if (searchNumber === this.searchNumber &&
        !this.wineryList.filter(x => {
          // @ts-ignore
          return x.id == data.rows[0].id;
        }).length
      ) {
        // @ts-ignore
        const downloadedRows = data.rows;
        downloadedRows.forEach(row => {
          if (row.time) {
            row.fullTimeDate = JSON.parse(row.time);
            if (row.fullTimeDate.length) {
              row.titleDate = row.fullTimeDate[0].day;
              const len = row.fullTimeDate.length - 1;
              if (len >= 1) {
                row.endDate = row.fullTimeDate[len].day;
              }
            } else {
              row.titleDate = null;
            }
            console.log(row);
          }
        });
        // @ts-ignore
        this.wineryList = this.wineryList.concat(downloadedRows);

        // @ts-ignore
        this.maxPage = data.total / 10 + 1;
        // @ts-ignore
        this.downloadedPages++;
        this.page++;
        this.downloading = false;
      }
      // console.log(this.eventList);
    });
  }
  chooseTab(tab) {
    if (this.langService.editable) {
      return;
    }

    this.tab.setValue(tab);
  }
  getTabColor(tab) {
    if (this.tab.value == tab) {
      return 'btn-menu-selected menu-2-active';
    } else {
      return '';
    }
  }
  getImage(row) {
    if (row.image) {
      return environment.wineryImageStore + `${row.id + '_' + row.image}.png`;

    } else {
      return this.noImage;
    }
  }

  getEmblem(row) {
    if (row.emblem) {
      return environment.wineryEmblemImageStore + `${row.id + '_' + row.emblem}.png`;

    } else {
      return this.noImage;
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervals);
  }

  get cardWidth() {
    const nCards = Math.floor(this.cards.nativeElement.offsetWidth / 352);
    return this.cards.nativeElement.offsetWidth / nCards - 33;
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
      console.log(result);
      if (result) {

        this.country.setValue(result.country * 1);
        if (result.regionsForm) {
          // this.regionsForm.setValue(downloadData.geolocation.regions);
          for (let i = 0; i < 6; i++) {
            this.regionsForm.controls[i].setValue(result.regionsForm[i] * 1);
            //
            // console.log(this.regionesMap);
            // console.log(this.regionesMap.get(result.regionsForm[i] * 1));
          }
        }
      }

    });
  }
  viewWinery(id) {
    this.location.go('/winery/' + id);
    const wineryData = {id};
    const dialogRef = this.dialog.open(WineryShortSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      // reposition(),
      width: '768px',
      height: '672px',
      autoFocus: false,
      panelClass: 'mat-dialog-bonvino',
      data: wineryData
    });

    dialogRef.afterClosed().subscribe(result => {
      this.location.go('/winery-list');
    });


  }
}
