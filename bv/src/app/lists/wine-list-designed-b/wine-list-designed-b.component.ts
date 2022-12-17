import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {CloseSubscreenSecviceService} from '@src/app/services/close-subscreen-secvice.service';
import {debounceTime, pairwise} from 'rxjs/operators';
import {FindWineComponent} from '@src/app/schemas/find-wine/find-wine.component';
import {CookieObserverService} from '@src/app/services/cookieObserver/cookie-observer.service';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {WineOneUniversalSubscreenComponent} from '@src/app/wines-designed/wine-one-universal-subscreen/wine-one-universal-subscreen.component';
import {ResolutionService} from '@src/app/services/resolution.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Overlay} from '@angular/cdk/overlay';
import {forkJoin, Observable, of, ReplaySubject} from 'rxjs';
import {IconBonvinoComponent} from '@src/app/schemas/icon-bonvino/icon-bonvino.component';
import {WinesShopAddSubscreenComponent} from '@src/app/wines-designed/wines-shop-add-subscreen/wines-shop-add-subscreen.component';
import {environment} from '@src/environments/environment';
import {WinesVoteSubscreenComponent} from '@src/app/wines-designed/wines-vote-subscreen/wines-vote-subscreen.component';
import {WinesSimplestoreSubscreenComponent} from '@src/app/wines-designed/wines-simplestore-subscreen/wines-simplestore-subscreen.component';
import {WineryShortSubscreenComponent} from '@src/app/wineries-designed/winery-short-subscreen/winery-short-subscreen.component';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {ListsService} from '@src/app/services/api/lists.service';
import {variables} from '@src/environments/variables';
import {FormArray} from '@angular/forms';
import {CompetitionSelectComponent} from '@src/app/schemas/competition-select/competition-select.component';
import {WineDescriptionSubscreenComponent} from '@src/app/wines-designed/wine-description-subscreen/wine-description-subscreen.component';
import {AreYouSureComponent} from '@src/app/services/are-you-sure/are-you-sure.component';
import {WinesStoreSubscreenComponent} from '@src/app/wines-designed/wines-store-subscreen/wines-store-subscreen.component';
import {RequestsService} from '@src/app/services/api/requests.service';
import {CookieService} from 'ngx-cookie-service';
import {PlaceholderServiceService} from '@src/app/services/placeholder-service.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {Location} from '@angular/common';
import {
  champagneSweetness,
  color,
  grandTypes,
  sweetness
} from '@src/app/wines-designed/wines-basic-designed/wines-basic-designed.component';
import {MatDialog} from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {WineListSearchbarServiceService} from '@src/app/lists/wine-list-designed/wine-list-searchbar-service.service';

@Component({
  selector: 'app-wine-list-designed-b',
  templateUrl: './wine-list-designed-b.component.html',
  styleUrls: ['./wine-list-designed-b.component.css']
})
export class WineListDesignedBComponent implements  OnInit, AfterContentChecked, OnDestroy {

// @ts-ignore
  @ViewChild('navigation') private navigationRef_: ElementRef;
// @ts-ignore
  @ViewChild('sidenav') private sidenavRef_;

  mobileView = false;

  possibleActions = {
    getToCollection: false,
    getToShop: false,
    getToStorage: false,
    rate: false,
    getToEvent: false,
    wishing: false,

  };

  counterData = null;

  @ViewChild('cards') private cards: ElementRef;

  winery = null;
  shop = null;
  wineryData = null;
  shopData = null;

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
  api = 'getWineList';

  noImage = '../../../assets/icons/placeholder-wine.svg';
  wineTypeList = [];
  countryList = [];
  wineryList = [];
  grapeList = [];
  wineSubTypeList = [];
  nongrapeSubTypeList = [];
  sparklingSubTypeList = [];

  wrappingList = [];
  priceList = [];


  availableTypesForSubTypes = [];
  downloading = false;
  totalResults = null;

  wineryPage = 1;
  wineryTotal = 0;
  chosenWinery;

  grapePage = 1;
  grapeTotal = 0;
  chosenGrape;

  countries = [];
  regiones = [];
  allRegiones = [];
  countriesMap = new Map();
  regionesMap = new Map();
  wineTypeMap = new Map();

  wineList = [];
  page = 1;
  maxPage = 1;
  downloadedPages = 1;
  searchNumber = 0;
  savedForm = null;


  sweetnessArr = sweetness;
  champagneSweetnessArr = champagneSweetness;
  colorArr = color;
  grandTypesArr = grandTypes;

  details = [];

  navigationTabs = [
    {
      label: 'Discover',
      value: 'all',
      isShown: () => {
        return !this.specialPage;
      }
    },
    {
      label: 'Discover',
      value: 'discoverEvent',
      isShown: () => {
        return this.specialPage == 'event';
      }
    },
    {
      label: 'Chosen wines',
      value: 'event',
      isShown: () => {
        return this.specialPage == 'event';
      }
    },
    {
      label: 'Discover',
      value: 'discoverShop',
      isShown: () => {
        return this.specialPage == 'shop';
      }
    },
    {
      label: 'Chosen wines',
      value: 'shop',
      isShown: () => {
        return this.specialPage == 'shop';
      }
    },
    {
      label: 'I and wine',
      value: 'iAndWine',
      isShown: () => {
        return !this.specialPage;
      }
    },
    {
      label: 'Your wine collection',
      value: 'collection',
      isShown: () => {
        return !this.specialPage && this.accountService.ifCollector();
      }
    },
    {
      label: 'Wines rated by you',
      value: 'myRates',
      isShown: () => {
        return !this.specialPage && this.accountService.ifCollector();
      }
    },
  ];

  navigationTabsBengat = [
    {
      label: 'Wine Collection',
      value: 'bengatCollection',
      isShown: () => {
        return true;
      }
    },
    {
      label: 'Wine Rating',
      value: 'bengatRating',
      isShown: () => {
        return true;
      }
    },
  ];

  tabs = {
    all: 'all',
    my: 'my',
    relatedWines: 'relatedWines',
    iAndWine: 'iAndWine',
    myRates: 'myRates',
    collection: 'collection',
    event: 'event',
    discoverEvent: 'discoverEvent',
    shop: 'shop',
    discoverShop: 'discoverShop',

    discoverCompetition: 'discoverCompetition',


    bengatCollection: 'bengatCollection',
    bengatRating: 'bengatRating',
  };


  reverseAddTimeTabs = [
    this.tabs.iAndWine,
    this.tabs.myRates,
    this.tabs.collection,

    this.tabs.bengatCollection,
    this.tabs.bengatRating,
  ];

  autosearchTabs = [
    this.tabs.my,
    this.tabs.relatedWines,
    this.tabs.iAndWine,
    this.tabs.myRates,
    this.tabs.collection,
    this.tabs.event,
    this.tabs.shop,

    this.tabs.bengatCollection,
    this.tabs.bengatRating,
  ];

  orders = {
    addtime: {name: 'addtime', direction: true},
    addtime_reverse: {name: 'addtime', direction: false},

    name_int: {name: 'international_wn', direction: true},
    name_int_reverse: {name: 'international_wn', direction: false},

    winery: {name: 'winery', direction: true},
    winery_reverse: {name: 'winery', direction: false},

    // name_nat: {name: 'wines.name', direction: true},
    // name_nat_reverse: {name: 'wines.name', direction: false},

    year: {name: 'vintage_year', direction: true},
    year_reverse: {name: 'vintage_year', direction: false},

    country: {name: 'countries.name', direction: true},
    country_reverse: {name: 'countries.name', direction: false},

    rating: {name: 'rating', direction: true},
    rating_reverse: {name: 'rating', direction: false},

    sort: {name: 'wines.id', direction: true},


    award: {name: 'has_award', direction: true},
    award_reverse: {name: 'has_award', direction: false},


    is_confirmed: {name: 'is_confirmed', direction: true},
    is_confirmed_reverse: {name: 'is_confirmed', direction: false},


    is_confirmed_competition: {name: 'is_confirmed_competition', direction: true},
    is_confirmed_competition_reverse: {name: 'is_confirmed_competition', direction: false},
  };

  bengat = variables.bengat;

  startingTab = this.bengat ? this.tabs.bengatCollection : this.tabs.all;
  //
  // form = new FormGroup({
  //   searchId: new FormControl(''),
  //   searchInternationalName: new FormControl(''),
  //   searchYear: new FormControl(''),
  //   // searchColor: new FormControl(0),
  //   // searchType: new FormControl(0),
  //   searchCountry: new FormControl(0),
  //   searchWinery: new FormControl(''),
  //   tab: new FormControl(this.startingTab),
  //   wineryHelper: new FormControl(''),
  //   order: new FormControl('name_int'),
  //
  //   country: new FormControl(0),
  //   regionsForm: new FormArray([
  //     new FormControl(0),
  //     new FormControl(0),
  //     new FormControl(0),
  //     new FormControl(0),
  //     new FormControl(0),
  //     new FormControl(0),
  //   ]),
  //
  //
  //   color: new FormControl('0'),
  //   type: new FormControl('0'),
  //
  //   grand_type: new FormControl('0'),
  //   still: new FormControl('0'),
  //   sweetness: new FormControl('0'),
  //   sparkling: new FormControl('0'),
  //   method: new FormControl('0'),
  //   nongrape: new FormControl('0'),
  //   gas: new FormControl('0'),
  //   champagne_sweetness: new FormControl('0'),
  //   special: new FormControl('0'),
  //
  //
  //   priceLevel: new FormControl('0'),
  //   bottleSize: new FormControl('0'),
  //
  //   year: new FormControl(''),
  //   alc_percent: new FormControl(''),
  //   minPrice: new FormControl(''),
  //   maxPrice: new FormControl(''),
  //
  //
  //   isKashrut: new FormControl(''),
  //   isQuality: new FormControl(''),
  //   isBiodynamic: new FormControl(''),
  //   isOrganic: new FormControl(''),
  //   isVegan: new FormControl(''),
  //
  //   grapeSearch: new FormControl(''),
  //   grapeHelper: new FormControl(''),
  //
  //   isForWinery: new FormControl(false),
  //
  //
  //   competition: new FormControl(0),
  //   competitionYear: new FormControl(''),
  //   award: new FormControl(0),
  //   // grantAward: new FormControl(0),
  //   // competitionGroup: new FormGroup({
  //   // }),
  // });

  specialPageId = 0;
  interval = null;
  downloadStarted = false;
  schema = 'cards';
  myRole = null;
  personal = false;
  // specialPage = null;
// @ts-ignore
  @ViewChild('icnViewList') public icnViewList: IconBonvinoComponent;

// @ts-ignore
  @ViewChild('icnViewThumbs') public icnViewThumbs: IconBonvinoComponent;


  // @ts-ignore
  @Input() specialPage;
  // @ts-ignore
  @Input() specialPageId;
// @ts-ignore
  cookies: Observable;

  isSubscreenOpened = false;

  closeSubScreenSubj = new ReplaySubject(10);
  isSheduleInitialLoading = false;

  reloadEventListerner = new ReplaySubject(10);

  // dialogRef: MatDialogRef;
  isNotDestroyed = true;


  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    this.onScrollLoadAdditionalWines();
  }


  constructor(public service: RequestsService,
              public listService: ListsService,
              public downloadService: DownloadDataServiceService,
              public langService: LanguageServiceService,
              public cookieService: CookieService,
              public activatedroute: ActivatedRoute,
              public accountService: AccountServiceService,
              public location: Location,
              private router: Router,
              public dialog: MatDialog,
              public overlay: Overlay,
              public imagePlaceholder: PlaceholderServiceService,
              private cookieObserver: CookieObserverService,
              private titleService: Title,
              public closeSubscreenService: CloseSubscreenSecviceService,
              public wineListSearchbarService: WineListSearchbarServiceService,
              private changeDetector: ChangeDetectorRef,
              public  resolutionService: ResolutionService) { }

  ngOnInit() {

    const id = this.activatedroute.snapshot.params.id;
    const showWine = this.activatedroute.snapshot.data.showWine;

    if(showWine && id) {
      this.viewWine(id);
      this.isSheduleInitialLoading = true;
    }


    const showWinery = this.activatedroute.snapshot.data.showWinery;
    if(showWinery && id) {
      this.viewWinery(id)
      this.isSheduleInitialLoading = true;
    }

    if (this.activatedroute) {
      this.specialPageId = this.activatedroute.snapshot.params.id;
    }

    if (this.activatedroute.snapshot.data.special) {
// @ts-ignore
      this.specialPage = this.activatedroute.snapshot.data.special;
    }

    if (this.specialPage == 'event') {
      this.chooseTab(this.tabs.discoverEvent);
    }

    if (this.specialPage == 'shop') {
      this.chooseTab(this.tabs.discoverShop);
    }

    if (this.specialPage == 'grantAward') {
      this.competition.setValue(id);
      this.chooseTab(this.tabs.discoverCompetition);
    }

    this.shop = this.activatedroute.snapshot.queryParamMap.get('shop');
    this.winery = this.activatedroute.snapshot.queryParamMap.get('winery');


    this.accountService.currentRole.subscribe(role => {
      this.myRole = role;
    });

    this.cookies = this.cookieObserver.observeCookie();

    const getWineType = this.service.getWineType();
    const getCountries = this.service.getCountries();
    const getSubTypeList = this.service.getWineSubType();
    const getSparklingSubType = this.service.getSparklingType();
    const getNongrapeSubType = this.service.getNongrapeTypes();


    const getWrapList = this.service.getWrapList();
    const getPriceList = this.service.getPriceList();

    this.service.getCountries().subscribe(data => {
// @ts-ignore
      this.countries = data;
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x.name);
      });
      // this.filterRegiones();
      this.service.getRegiones().subscribe(dataR => {
// @ts-ignore
        this.regiones = dataR;
        this.regiones.forEach(x => {
          this.regionesMap.set(x.id, x.name);
        });
        // this.filterRegiones();
      });
    });


    forkJoin([getWineType, getCountries, getSubTypeList, getSparklingSubType, getNongrapeSubType, getWrapList, getPriceList])
      .subscribe(results => {

        // @ts-ignore
        this.wineTypeList = results[0];
        console.log(this.wineTypeList);
        this.wineTypeList.forEach(w => {
          this.wineTypeMap.set(w.id * 1, w.type);
        });
        // @ts-ignore
        this.countryList = results[1];
        // @ts-ignore
        this.wineSubTypeList = results[2];
        this.wineSubTypeList.forEach(x => {
          x.typeList = JSON.parse(x.type);
          x.typeList.forEach(t => {
            this.availableTypesForSubTypes.push(t);
          });

        });


        // @ts-ignore
        this.sparklingSubTypeList = results[3];
        // @ts-ignore
        this.nongrapeSubTypeList = results[4];
        // @ts-ignore
        this.wrappingList = results[5];
        // @ts-ignore
        this.priceList = results[6];

      });

    if (this.shop) {
      this.service.getShop(this.shop).subscribe(data => {
        this.shopData = data;

        this.changeDetector.detectChanges();
      });

      this.specialPageId = this.shop;
      this.chooseTab(this.tabs.shop);
    }

    if (this.winery) {
      this.isForWinery.setValue(true);
      this.searchWinery.setValue(this.winery);
      this.service.getWineryData(this.winery).subscribe(data => {
        this.wineryData = data;
        this.showWines();
      });
    } else {

    }



    this.savedForm = JSON.parse(JSON.stringify(this.wineListSearchbarService.form.value));

    this.type.valueChanges.subscribe(() => {
      this.special.setValue('0');
    });

    const query = this.activatedroute.snapshot.queryParamMap;
    console.log(this.activatedroute.snapshot.queryParamMap.keys);
    let autoload = null;
    if (!this.specialPage) {
      query.keys.forEach(k => {
        if (k == 'autoload') {
          autoload = query.get(k);
        } else if (k == 'regionsForm') {
          const rf = JSON.parse(query.get(k));
          rf.forEach((v, i) => {
            this.regionsForm.at(i).setValue(v);
          });
        } else if (k == 'chosenWinery') {
          this.chosenWinery = JSON.parse(query.get(k));
          // this.selectWinery(this.chosenWinery.id);
          this.searchWinery.setValue(this.chosenWinery.id);
        } else if (k == 'chosenGrape') {
          this.chosenGrape = JSON.parse(query.get(k));
          // this.selectWinery(this.chosenWinery.id);
          this.grapeSearch.setValue(this.chosenGrape.id);
        } else {
          if(this.wineListSearchbarService.form.get(k)) {
            this.wineListSearchbarService.form.get(k).setValue(query.get(k));
          }
        }
      });
    }

    if (
      this.tab.value != this.tabs.all &&
      this.tab.value != this.tabs.discoverShop &&
      this.tab.value != this.tabs.discoverEvent
    ) {
      autoload = true;
    }

    if (autoload && !this.isSheduleInitialLoading) {
      this.showWines();
    }

    if(this.isSheduleInitialLoading) {
      this.closeSubScreenSubj.subscribe(x => {
        if(x) {
          this.showWines();

        }
      })
    } else {

    }

    this.wineListSearchbarService.form.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        this.changeQuery();

      });
    this.wineListSearchbarService.form.valueChanges
      .pipe(
        debounceTime(500),
        pairwise()
      ).subscribe(([oldValue, newValue]) => {
      if (this.downloadStarted && oldValue.wineryHelper === newValue.wineryHelper) {
        this.showWines();
      }


    });

    if(!this.shop && !this.winery) {


      let title = 'Winelist - bonvino.com';
      this.titleService.setTitle(title);
    }

    if(!this.specialPage && !this.winery && !this.shop && !this.bengat) {
      this.country.setValue(104);
    }

    if(this.bengat) {
      this.order.setValue(this.orders.addtime.name)
    }


    this.wineListSearchbarService.showWines.subscribe(isLoading => {
      if(isLoading) {
        this.showWines();
        this.changeQuery();
        this.wineListSearchbarService.showWines.next(0);
      }
    })


    this.wineListSearchbarService.openSwitchSubject.subscribe(x => {
      if(x) {
        this.openBar();
      } else {
        this.closeBar();
      }
    })
  }

  private onScrollLoadAdditionalWines() {
    const threshold = 100;
    const position = window.scrollY + window.innerHeight;
    const height = document.body.scrollHeight;

    if (height - threshold < position && this.downloadStarted) {

      // console.log('!');
      this.downloadAdditionalWines();
    }
  }

  changeQuery() {

    if(this.isSubscreenOpened) {
      return;
    }

    const queryData = {};

    if (this.searchInternationalName.value != '') {
      // @ts-ignore
      queryData.searchInternationalName = this.searchInternationalName.value;
    }
    if (this.tab.value != this.tabs.all) {
      // @ts-ignore
      queryData.tab = this.tab.value;
    }
    if (this.order.value != 'sort') {
      // @ts-ignore
      queryData.order = this.order.value;
    }
    if (this.grand_type.value != '0') {
      // @ts-ignore
      queryData.grand_type = this.grand_type.value;
    }
    if (this.still.value != '0') {
      // @ts-ignore
      queryData.still = this.still.value;
    }
    if (this.sweetness.value != '0') {
      // @ts-ignore
      queryData.sweetness = this.sweetness.value;
    }
    if (this.sparkling.value != '0') {
      // @ts-ignore
      queryData.sparkling = this.sparkling.value;
    }
    if (this.method.value != '0') {
      // @ts-ignore
      queryData.method = this.method.value;
    }
    if (this.nongrape.value != '0') {
      // @ts-ignore
      queryData.nongrape = this.nongrape.value;
    }
    if (this.gas.value != '0') {
      // @ts-ignore
      queryData.gas = this.gas.value;
    }
    if (this.champagne_sweetness.value != '0') {
      // @ts-ignore
      queryData.champagne_sweetness = this.champagne_sweetness.value;
    }
    if (this.type.value != '0') {
      // @ts-ignore
      queryData.type = this.type.value;
    }
    if (this.color.value != '0') {
      // @ts-ignore
      queryData.color = this.color.value;
    }
    if (this.special.value != '0') {
      // @ts-ignore
      queryData.special = this.special.value;
    }
    if (this.minPrice.value != '') {
      // @ts-ignore
      queryData.minPrice = this.minPrice.value;
    }
    if (this.maxPrice.value != '') {
      // @ts-ignore
      queryData.maxPrice = this.maxPrice.value;
    }
    if (this.country.value != '0') {
      // @ts-ignore
      queryData.country = this.country.value;
    }
    if (Math.max(this.regionsForm.value) != 0) {
      // @ts-ignore
      queryData.regionsForm = JSON.stringify(this.regionsForm.value);
    }
    if (this.chosenWinery && !this.winery) {
      // @ts-ignore
      queryData.chosenWinery = JSON.stringify(this.chosenWinery);
    }
    if (this.chosenGrape) {
      // @ts-ignore
      queryData.chosenGrape = JSON.stringify(this.chosenGrape);
    }

    let queryString = '';

    Object.keys(queryData).forEach(key => {
      queryString = queryString + key + '=' + queryData[key] + '&';
      // console.log(key);
    });


    if(queryString) {
      queryString = queryString.slice(0, -1);
    }
    // console.log(queryData);
    // console.log(queryString);

    if (this.activatedroute.snapshot.data.showWine || this.activatedroute.snapshot.data.showWinery) {
      this.location.go('/wine-list', queryString);
    } else {
      this.router.navigate([], {queryParams: queryData, replaceUrl: true});
    }

    this.langService.addLanguageParam();
  }

  get searchInternationalName() {
    return this.wineListSearchbarService.form.get('searchInternationalName');
  }
  get wineryHelper() {
    return this.wineListSearchbarService.form.get('wineryHelper');
  }
  get searchWinery() {
    return this.wineListSearchbarService.form.get('searchWinery');
  }
  get grapeSearch() {
    return this.wineListSearchbarService.form.get('grapeSearch');
  }
  get grapeHelper() {
    return this.wineListSearchbarService.form.get('grapeHelper');
  }
  get tab() {
    return this.wineListSearchbarService.form.get('tab');
  }
  get order() {
    return this.wineListSearchbarService.form.get('order');
  }

  grand_typeF() {
    console.log('grand')
    return this.wineListSearchbarService.form.get('grand_type');
  }

  get grand_type() {
    return this.wineListSearchbarService.form.get('grand_type');
  }
  get still() {
    return this.wineListSearchbarService.form.get('still');
  }
  get sweetness() {
    return this.wineListSearchbarService.form.get('sweetness');
  }
  get maxPrice() {
    return this.wineListSearchbarService.form.get('maxPrice');
  }
  get minPrice() {
    return this.wineListSearchbarService.form.get('minPrice');
  }
  get sparkling() {
    return this.wineListSearchbarService.form.get('sparkling');
  }
  get method() {
    return this.wineListSearchbarService.form.get('method');
  }
  get nongrape() {
    return this.wineListSearchbarService.form.get('nongrape');
  }
  get gas() {
    return this.wineListSearchbarService.form.get('gas');
  }
  get champagne_sweetness() {
    return this.wineListSearchbarService.form.get('champagne_sweetness');
  }
  get type() {
    return this.wineListSearchbarService.form.get('type');
  }
  get color() {
    return this.wineListSearchbarService.form.get('color');
  }
  get special() {
    return this.wineListSearchbarService.form.get('special');
  }
  get year() {
    return this.wineListSearchbarService.form.get('year');
  }
  get alc_percent() {
    return this.wineListSearchbarService.form.get('alc_percent');
  }
  get priceLevel() {
    return this.wineListSearchbarService.form.get('priceLevel');
  }
  get bottleSize() {
    return this.wineListSearchbarService.form.get('bottleSize');
  }
  // get competitionGroup() {
  //   return this.wineListSearchbarService.form.get('competitionGroup');
  // }
  get competition() {
    return this.wineListSearchbarService.form.get('competition');
  }
  get competitionYear() {
    return this.wineListSearchbarService.form.get('competitionYear');
  }
  get competitionAward() {
    return this.wineListSearchbarService.form.get('award');
  }
  // get grantAward() {
  //   return this.wineListSearchbarService.form.get('grantAward');
  // }



  openAwardSelect(): void {
    if (this.langService.editable) {
      return;
    }

    const data = {
      form: this.wineListSearchbarService.form,
      options: {
        hasCompetitionOption: true,
        hasAwardOption: true
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
  showWines() {
    if (this.langService.editable) {
      return;
    }


    if (this.grand_type.value != 'nongrape') {
      this.nongrape.setValue('0', {emitEvent:false});
    } else {
      this.color.setValue('0', {emitEvent:false});
      // this.sweetness.setValue('0');
    }
    if (this.grand_type.value != 'sparkling') {
      this.sparkling.setValue('0', {emitEvent:false});
      this.method.setValue('0', {emitEvent:false});
      this.gas.setValue('0', {emitEvent:false});
      this.champagne_sweetness.setValue('0', {emitEvent:false});
    }
    if (this.grand_type.value == 'sparkling') {
      this.sweetness.setValue('0', {emitEvent:false});
    }
    if (this.grand_type.value != 'still') {
      this.still.setValue('0', {emitEvent:false});
      this.type.setValue('0', {emitEvent:false});
      // this.sweetness.setValue('0', {emitEvent:false});
    }
    if (!this.availableTypesForSubTypes.includes(this.type.value + '')) {
      this.special.setValue('0', {emitEvent:false});
    }

    this.downloadStarted = true;
    this.savedForm = JSON.parse(JSON.stringify(this.wineListSearchbarService.form.value));
    this.page = 1;
    this.wineList = [];
    this.totalResults = null;
    this.downloadWines();
  }
  addWines() {
    this.router.navigate(['/wines-add/0']);
  }
  addWinesLink() {
    return '/wines-add/0';
  }
  addWinesLinkForWinery(winery) {
    return '/wines-add/' + winery;
  }

  returnToEventLink() {
    return '/event-edit/' + this.specialPageId;

  }
  downloadAdditionalWines() {
    if (this.page <= this.maxPage && this.page <= this.downloadedPages && !this.downloading) {
      this.downloading = true;
      this.downloadWines();
    }
  }
  downloadWines() {

    const request = {
      search: this.savedForm,
      order: this.orders[this.savedForm.order],
      page: this.page,
      role: this.myRole,
      language: this.langService.getLanguage(),
      specialPageId: this.specialPageId
    };
    const searchNumber = this.searchNumber;
    this.listService.getWineList(request).subscribe(data => {
      if (searchNumber === this.searchNumber
        && !this.wineList.filter(x => {
          // @ts-ignore
          if (!data.rows.length) {
            return false;
          }
          // @ts-ignore
          return x.id == data.rows[0].id;
        }).length
      ) {
        // @ts-ignore
        data.rows.forEach(wine => {
          if (wine.price) {
            // @ts-ignore
            const priceArr = new Set(wine.price.split(','));
            wine.priceLevel = priceArr;
          } else {
            wine.priceLevel = new Set();
          }
        });

        // @ts-ignore
        this.wineList = this.wineList.concat(data.rows);
        // @ts-ignore
        this.maxPage = data.total / 9 + 1;
        // @ts-ignore
        this.downloadedPages++;
        this.page++;
        // @ts-ignore
        this.totalResults = data.total;
        this.downloading = false;
        // @ts-ignore
        // if (data.detail) {
        //   // @ts-ignore
        //   this.countDetails(data.detail);
        // }
      }

      this.changeDetector.detectChanges();
      // console.log(this.eventList);
    });
  }

  chooseTab(tab) {
    if (this.langService.editable) {
      return;
    }

    console.log(this.accountService.properties);

    this.tab.setValue(tab);
    if (this.reverseAddTimeTabs.includes(tab)) {

      this.order.setValue('addtime_reverse');
    }
    if (this.autosearchTabs.includes(tab)) {

      this.showWines();
    }

    this.changeQuery();
  }
  getTabColor(tab) {
    if (this.tab.value == tab) {
      return 'btn-menu-selected menu-2-active';
    } else {
      return '';
    }
  }
  getImage(row) {
    if (row.has_image) {
      return environment.wineImageStore + `${row.id + '_' + row.has_image}.png`;

    } else {
      // return this.noImage;
      return this.imagePlaceholder.getImagePlaceholder(row, 'card');
    }
  }

  ngOnDestroy(): void {

    clearInterval(this.interval);

    this.isNotDestroyed = false;
  }

  get isForWinery() {
    return this.wineListSearchbarService.form.get('isForWinery');
  }
  get country() {
    return this.wineListSearchbarService.form.get('country');
  }
  get regionsForm(): FormArray {
    return this.wineListSearchbarService.form.get('regionsForm') as FormArray;
  }
  backToWinery() {
    if (this.langService.editable) {
      return;
    }

    this.router.navigate(['/winery/' + this.winery]);
  }
  backToWineryLink() {
    return '/winery/' + this.winery;
  }
  backToShopLink() {
    return '/shop/' + this.shop;
  }
  get cardWidth() {
    const nCards = this.isBigScreen() ? Math.floor(this.cards.nativeElement.offsetWidth / 352) : 1;
    return this.cards.nativeElement.offsetWidth / nCards - 33;
  }

  paintMouseOver(element, color) {
    element.paintSpecial( color);
  }
  setSchema(schema) {
    this.schema = schema;
  }

  getWine(id) {
    // console.log(this.downloadedData);
    // const id = this.activatedroute.snapshot.params.id;

    const dialogRef = this.dialog.open(WinesSimplestoreSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '40%',
      maxHeight: '80vh',
      autoFocus: false,
      panelClass: 'mat-dialog-bonvino',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

  }

  wishToBuy(wine) {
    this.service.wishToBuy({wineId: wine.id}).subscribe(res => {
      console.log(res);
      if (res) {
        wine.wish = 'buy';
      }


    });
  }

  wishToTaste(wine) {
    this.service.wishToTaste({wineId: wine.id}).subscribe(res => {
      console.log(res);
      if (res) {
        wine.wish = 'taste';
      }
    });
  }

  unwish(wine) {
    this.service.unwish({wineId: wine.id}).subscribe(res => {
      console.log(res);
      if (res) {
        wine.wish = null;
      }
    });
  }


  getToPersonStorage(wine) {
    this.service.getToPersonStorage({wineId: wine.id}).subscribe(res => {
      console.log(res);
      if (res) {
        wine.storage = 1;
      }
    });
  }

  removeFromPersonStorage(wine) {
    this.service.removeFromPersonStorage({wineId: wine.id}).subscribe(res => {
      console.log(res);
      if (res) {
        wine.storage = null;
      }
    });
  }

  deleteWine(wine) {


    const dialogRef = this.dialog.open(AreYouSureComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '70%',
      height: '200px',
      autoFocus: false,
      panelClass: 'mat-dialog-bonvino',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.service.deleteWine({wineId: wine.id}).subscribe(res => {
          this.showWines();
        });
      }
    });
  }

  restoreWine(wine) {


    this.service.restoreWine({wineId: wine.id}).subscribe(res => {
      this.showWines();
    });
  }


  addToEvent(wine) {
    this.service.addWineToEvent({wineId: wine.id, eventId: this.specialPageId}).subscribe(res => {
      console.log(res);
      if (res) {
        wine.event = this.specialPageId;
      }
    });
  }


  removeFromEvent(wine) {
    this.service.removeFromEvent({wineId: wine.id, eventId: this.specialPageId}).subscribe(res => {
      console.log(res);
      if (res) {
        wine.event = null;
      }
    });
  }

  addToShop(wine) {
    this.service.addWineToShop({wineId: wine.id, shopId: this.specialPageId}).subscribe(res => {
      console.log(res);
      if (res) {
        wine.shop = this.specialPageId;
      }
    });
  }


  removeFromShop(wine) {
    this.service.removeFromShop({wineId: wine.id, shopId: this.specialPageId}).subscribe(res => {
      console.log(res);
      if (res) {
        wine.shop = null;
      }
    });
  }

  addWineToShop(wine) {
    // console.log(this.downloadedData);
    // const id = this.activatedroute.snapshot.params.id;

    const dialogRef = this.dialog.open(WinesShopAddSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '90%',
      maxHeight: '80vh',
      autoFocus: false,
      panelClass: 'mat-dialog-bonvino',
      data: {wine: wine.id, shop: this.specialPageId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  storeWine(wine) {
    // console.log(this.downloadedData);
    // const id = this.activatedroute.snapshot.params.id;

    const dialogRef = this.dialog.open(WinesStoreSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '90%',
      maxHeight: '80vh',
      autoFocus: false,
      panelClass: 'mat-dialog-bonvino',
      data: {
        wine
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  rateWine(id) {
    const wineData = of({id})
    const dialogRef = this.dialog.open(WinesVoteSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      // reposition(),
      width: '90%',
      // height: 'auto',
      maxHeight: '80vh',
      autoFocus: false,
      panelClass: 'mat-dialog-bonvino',
      data: wineData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  describeWine(id) {
    if (this.langService.editable) {
      return;
    }
    const wineData = of({id})
    const dialogRef = this.dialog.open(WineDescriptionSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      // reposition(),
      width: '90%',
      // height: 'auto',
      maxHeight: '80vh',
      autoFocus: false,
      panelClass: 'mat-dialog-bonvino',
      data: wineData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  isSpecialist() {
    return this.accountService.ifSpecialist();
  }
  isAdmin() {
    return this.accountService.isAdmin();
  }
  findWine(id) {
    const wineData = of({id})
    const dialogRef = this.dialog.open(FindWineComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      // reposition(),
      width: '90%',
      // height: 'auto',
      maxHeight: '80vh',
      autoFocus: false,
      panelClass: 'mat-dialog-bonvino',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  getSortingClass(sortarr) {
    let isOrdered = false;
    sortarr.forEach(sort => {
      if (this.order.value == sort) {
        isOrdered = true;
      }
    });
    if (isOrdered) {
      return 'sorting-col';
    } else {
      return '';
    }
  }

  orderTableBy(order) {
    this.order.setValue(order);
  }

  haveRightToEditWines() {

    // @ts-ignore
    return this.winery && this.wineryData &&
      (!this.wineryData.wineryinfo.userid || this.accountService.isSameUser(this.wineryData.wineryinfo.userid) || this.accountService.isAdmin());
  }
  getCurrentTabName() {
    const page = this.navigationTabs.find(nav => {
      return nav.value === this.tab.value;
    });
    console.log()
    if (page) {
      return page;
    }
    return {
      label: 'Navigate',
      place: 'navigate'
    };
  }
  getCurrentTabNameBengat() {
    const page = this.navigationTabsBengat.find(nav => {
      return nav.value === this.tab.value;
    });
    console.log()
    if (page) {
      return page;
    }
    return {
      label: 'Navigate',
      place: 'navigate'
    };
  }
  switchMobile() {
    this.mobileView = !this.mobileView;
  }
  getBodyMargin() {
    if(this.navigationRef_ && this.navigationRef_.nativeElement && this.navigationRef_.nativeElement.offsetHeight && this.resolutionService.isSmall()) {
// @ts-ignore
      return { 'margin-top': this.navigationRef_.nativeElement.offsetHeight + 8 + 'px' };
    } else {
      return 0;
    }
  }

  isTranslatable() {
    return this.accountService.isTranslator();
  }
  viewWineLink(id) {
    return '/wine-translate/' + id;
  }


  viewWinery(id) {
    this.isSubscreenOpened = true;
    this.location.go('/winery/' + id);
    this.langService.addLanguageParam();
    const wineryData = {id};


    const width = !this.isBigScreen() ? '100%' : '768px';
    const height = !this.isBigScreen() ? '100%' : '672px';

    const dialogRef = this.dialog.open(WineryShortSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.block(),
      // reposition(),
      width,
      height,
      autoFocus: false,
      panelClass: 'mat-dialog-bonvino',
      data: wineryData
    });

    dialogRef.afterClosed().subscribe(result => {
      this.closeSubScreenSubj.next(true);
      this.isSubscreenOpened = false;
      if(result != 'no query change' && this.isNotDestroyed) {
        this.changeQuery();
      }
    });


  }
  viewWine(id) {
    // this.closeSubscreenService.stopClosing();
    this.isSubscreenOpened = true;
    console.log(this.activatedroute.snapshot);
    this.location.go('/wine/' + id);
    this.langService.addLanguageParam();
    const wineData = {id};

    const width = !this.isBigScreen() ? '100%' : '768px';
    const height = !this.isBigScreen() ? '100%' : '672px';


    const dialogRef = this.dialog.open(WineOneUniversalSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.block(),
      // reposition(),
      width,
      height,
      autoFocus: false,
      panelClass: 'mat-dialog-bonvino',
      data: wineData
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.closeSubScreenSubj.next(true);
      this.isSubscreenOpened = false;
      if(result != 'no query change' && this.isNotDestroyed) {
        this.changeQuery();
      }
    });


  }
  isBigScreen() {
    return window.innerWidth > 1080
  }
  isMobileScreen() {
    return window.innerWidth < 768
  }
  isTinyScreen() {
    return window.innerWidth < 540
  }

  setAward(award) {
    this.competitionAward.setValue(award, {emitEvent:false});

    this.wineList = [];

    if (award) {
      this.changeQuery();
      // this.reloadCounts();
      this.showWines();
    }
  }


  grantAward(wine) {
    if (this.langService.editable) {
      return;
    }
    const data = {
      wine: wine.id,
      competition: this.activatedroute.snapshot.params.id,
      award: this.competitionAward.value,
      is_confirmed_competition: true,
      delete: false,
    };

    this.service.setAwardForWine(data).subscribe(res => {
      console.log(res);
      if (res) {
        wine.has_award = this.competitionAward.value;
        wine.is_confirmed_competition = true;
      }
    });
  }
  removeAward(wine) {
    if (this.langService.editable) {
      return;
    }
    const data = {
      wine: wine.id,
      competition: this.activatedroute.snapshot.params.id,
      award: this.competitionAward.value,
      is_confirmed_competition: true,
      delete: true,
    };

    this.service.setAwardForWine(data).subscribe(res => {
      console.log(res);
      if (res) {
        wine.has_award = false;
        wine.is_confirmed_competition = false;
      }
    });
  }
  grantConfirmation(wine) {
    if (this.langService.editable) {
      return;
    }
    const data = {
      wine: wine.id,
      competition: this.activatedroute.snapshot.params.id,
      award: this.competitionAward.value,
      is_confirmed_competition: true,
      delete: false,
    };

    this.service.setAwardForWine(data).subscribe(res => {
      console.log(res);
      if (res) {
        // wine.award = this.competitionAward.value;
        wine.is_confirmed_competition = true;
      }
    });
  }
  removeConfirmation(wine) {
    if (this.langService.editable) {
      return;
    }
    const data = {
      wine: wine.id,
      competition: this.activatedroute.snapshot.params.id,
      award: this.competitionAward.value,
      is_confirmed_competition: false,
      delete: false,
    };

    this.service.setAwardForWine(data).subscribe(res => {
      console.log(res);
      if (res) {
        // wine.award = this.competitionAward.value;
        wine.is_confirmed_competition = false;
      }
    });
  }

  ngAfterContentChecked(): void {


    // console.log('!!!');
  }

  public closeBarEvent() {
    this.wineListSearchbarService.openSwitchSubject.next(0);
  }
  public openBarEvent() {
    this.wineListSearchbarService.openSwitchSubject.next(1);
  }

  public closeBar() {
    this.sidenavRef_.close();
  }
  public openBar() {
    this.sidenavRef_.open();
  }

  resetSearch() {
    this.wineListSearchbarService.resetSearch();
  }
}
