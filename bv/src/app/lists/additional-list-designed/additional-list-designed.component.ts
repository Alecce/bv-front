import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {environment} from '@src/environments/environment';
import {FormControl, FormGroup} from '@angular/forms';
import {ListsService} from '@src/app/services/api/lists.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '@src/app/services/api/requests.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {Block, BlockData} from '@src/app/admin/blocks-constructor/blocks-constructor.component';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-additional-list-designed',
  templateUrl: './additional-list-designed.component.html',
  styleUrls: ['./additional-list-designed.component.css']
})
export class AdditionalListDesignedComponent implements OnInit, OnDestroy {


  LANGUAGE_CURRENT_PAGE = 'additional_search';

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

  blockForm = new FormGroup({
    block: new FormControl(''),
  });


  form = new FormGroup({
    // block: new FormControl(''),
  });

  avaliableBlocks: Block[] = [];
  blocksMap = new Map();


  structure: InputData[] = [];

  constructor(public service: RequestsService,
    public listService: ListsService,
    public langService: LanguageServiceService,
    public cookieService: CookieService,
    public activatedroute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private additionalService: AdditionalServiceService
  ) { }

  ngOnInit() {

    let title = 'Search in blocks - bonvino.com';
    this.titleService.setTitle(title);


    this.service.getConstructorBlocksSearch().subscribe((data: BlockData) => {

      // this.avaliableBlocks.push({id: -1, name: 'Blank block'});
      // this.blocksMap.set(-1, 'Blank block');
      data.res.forEach(row => {
        this.avaliableBlocks.push({id: row.id, name: row.name});
        this.blocksMap.set(row.id, row.name);
      });
    });

    this.block.valueChanges.subscribe(v => {
      console.log(v);

      const req = {id: v};

      this.service.getBlockStructure(req).subscribe((data: InputData[]) => {

        this.structure.length = 0;
        this.form = new FormGroup({
        });

        this.additionalService.transformAdditionalBlock(data, this.structure, this.form);

        console.log(this.structure);
        console.log(this.form.value);
      });

    })


  }


  get block() {
    return this.blockForm.get('block');
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

  findBlocks() {
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
      search: this.savedForm,
      order: this.orders[this.savedForm.order],
      page: this.page
    };
    const searchNumber = this.searchNumber;
    this.listService.getBusinessesForBlock(request).subscribe(data => {
      if (searchNumber === this.searchNumber &&
        !this.eventList.filter(x => {
          // @ts-ignore
          return x.id == data.rows[0].id;
        }).length
      ) {
        // @ts-ignore
        const downloadedRows = data.rows;
        // downloadedRows.forEach(row => {
        //   if (row.time) {
        //     row.fullTimeDate = JSON.parse(row.time);
        //     if (row.fullTimeDate.length) {
        //       row.titleDate = row.fullTimeDate[0].day;
        //       const len = row.fullTimeDate.length - 1;
        //       if (len >= 1) {
        //         row.endDate = row.fullTimeDate[len].day;
        //       }
        //     } else {
        //       row.titleDate = null;
        //     }
        //     console.log(row);
        //   }
        // });
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

}
