import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RequestsService} from '../../services/api/requests.service';
import {environment} from '../../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {ListsService} from '../../services/api/lists.service';
import {forkJoin, ReplaySubject} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LanguageServiceService} from '../../services/language-service.service';
import {Title} from '@angular/platform-browser';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';
import {EventShortSubscreenComponent} from '@src/app/event-designed/event-short-subscreen/event-short-subscreen.component';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {AdditionalSearchSchemaComponent} from '@src/app/schemas/additional-search-schema/additional-search-schema.component';
import {types} from '@src/app/event-designed/event-designed-basic/event-designed-basic.component';
import {languagesInterface} from '@src/environments/languages';

@Component({
  selector: 'app-event-list-designed',
  templateUrl: './event-list-designed.component.html',
  styleUrls: ['./event-list-designed.component.css']
})
export class EventListDesignedComponent implements OnInit, OnDestroy {

  @ViewChild('cards') private cards: ElementRef;

  tableCols = [
    {variable: 'id', name: '#', link: true, href: 'event/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'international_wn', name: 'Name', link: true, href: '', hrefId: '', searchFormControlName: 'searchInternationalName', sorting: true},
    {variable: 'vintage_year', name: 'Year', link: true, href: '', hrefId: '', searchFormControlName: 'searchYear', sorting: true},
    {variable: 'wine_color', name: 'Color', link: true, href: '', hrefId: '', searchFormControlName: 'searchColor', sorting: true},
    {variable: 'type', name: 'Type', link: true, href: '', hrefId: '', searchFormControlName: 'searchType', sorting: true},
    {variable: 'name', name: 'Country', link: true, href: '', hrefId: '', searchFormControlName: 'searchCountry', sorting: true},
    {variable: 'international_name', name: 'Winery', link: true, href: '', hrefId: '', searchFormControlName: 'searchWinery', sorting: true},
    {variable: 'has_image', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'searchWinery', image: true, imagePath: environment.wineImageStore}
  ];
  api = 'getEventList';

  noImage = '../../../assets/icons/placeholder-wine.svg';
  wineTypeList = [];
  countries = [];
  wineryList = [];
  downloading = false;
  downloadStarted = false;

  eventList = [];
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
    name_int: {name: 'neutral', direction: true},
    name_int_reverse: {name: 'neutral', direction: false},

    name_nat: {name: 'name', direction: true},
    name_nat_reverse: {name: 'name', direction: false},

    date: {name: 'from', direction: true},
    date_reverse: {name: 'from', direction: false},

    country: {name: 'country', direction: true},
    country_reverse: {name: 'country', direction: false},

    sort: {name: 'id', direction: true},
  };

  chosenWinery;

  form = new FormGroup({
    searchInternationalName: new FormControl(''),
    searchUpcoming: new FormControl(false),
    searchCountry: new FormControl(0),
    searchCity: new FormControl(''),
    from: new FormControl(''),
    to: new FormControl(''),

    type: new FormControl(''),
    language: new FormControl(''),
    // searchId: new FormControl(''),
    // searchYear: new FormControl(''),
    // searchColor: new FormControl(0),
    // searchType: new FormControl(0),
    // searchWinery: new FormControl(''),
    tab: new FormControl(this.tabs.all),
    // wineryHelper: new FormControl(''),
    order: new FormControl('name_int')
  });


  // @ts-ignore
  @ViewChild(AdditionalSearchSchemaComponent) additionalSearch: AdditionalSearchSchemaComponent;

  additionalStructure = new ReplaySubject(10);
  structure = [];

  types = types;
  languageArr = languagesInterface;


  constructor(public service: RequestsService,
              public listService: ListsService,
              public langService: LanguageServiceService,
              public accountService: AccountServiceService,
              public cookieService: CookieService,
              public activatedroute: ActivatedRoute,
              public location: Location,
              public dialog: MatDialog,
              public overlay: Overlay,
              private titleService: Title,
              private router: Router) { }

  ngOnInit() {

    let title = 'Eventlist - bonvino.com';
    this.titleService.setTitle(title);


    const getWineType = this.service.getWineType();
    const getCountries = this.service.getCountries();


    forkJoin([getWineType, getCountries]).subscribe(results => {

      // @ts-ignore
      this.wineTypeList = results[0];
      // @ts-ignore
      this.countries = results[1];
    });


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
      business_type: 'event',
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
  get type() {
    return this.form.get('type');
  }
  get language() {
    return this.form.get('language');
  }
  filterEvents() {
    this.downloadStarted = true;
    console.log(this.form.value);
    this.savedForm = JSON.parse(JSON.stringify(this.form.value));
    this.page = 1;
    this.eventList = [];
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
    this.listService.getEventList(request).subscribe(data => {
      if (searchNumber === this.searchNumber &&
        !this.eventList.filter(x => {
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
        this.eventList = this.eventList.concat(downloadedRows);

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
      return environment.eventImageStore + `${row.id + '_' + row.image}.png`;

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
  viewEvent(id) {
    this.location.go('/event/' + id);
    const eventData = {id};
    const dialogRef = this.dialog.open(EventShortSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      // reposition(),
      width: '768px',
      height: '672px',
      autoFocus: false,
      panelClass: 'mat-dialog-bonvino',
      data: eventData
    });

    dialogRef.afterClosed().subscribe(result => {
      this.changeQuery();
    });


  }

  changeQuery() {

    this.location.go('/event-list', '');
    // if (this.activatedroute.snapshot.data.showWine || this.activatedroute.snapshot.data.showWinery) {
    // } else {
    //   this.router.navigate([], {queryParams: queryData});
    // }
  }

}
