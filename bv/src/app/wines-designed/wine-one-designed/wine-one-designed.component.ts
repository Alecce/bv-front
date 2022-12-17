import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {forkJoin, of, ReplaySubject} from 'rxjs';
import {Overlay} from '@angular/cdk/overlay';
import {MatDialog} from '@angular/material/dialog';
import {WineOneSubscreenComponent} from '../wine-one-subscreen/wine-one-subscreen.component';
import {WinesVoteSubscreenComponent} from '../wines-vote-subscreen/wines-vote-subscreen.component';
import {WinesStoreSubscreenComponent} from '../wines-store-subscreen/wines-store-subscreen.component';
import {ListsService} from '../../services/api/lists.service';
import {AccountServiceService} from '../../services/account-service.service';
import {PlaceholderServiceService} from '../../services/placeholder-service.service';
import {ResolutionService} from '@src/app/services/resolution.service';
import {Title} from '@angular/platform-browser';
import {
  champagneSweetness,
  color,
  gas,
  grandTypes,
  method,
  still,
  sweetness
} from '@src/app/wines-designed/wines-basic-designed/wines-basic-designed.component';
import {
  boxMaterialList,
  boxPositionList,
  filtrationArr,
  finingArr,
  wrappingTypeList
} from '@src/app/wines-designed/wines-advanced-designed/wines-advanced-designed.component';
import {brandAmountTypes} from '@src/app/wineries-designed/wineries-second/wineries-second.component';

@Component({
  selector: 'app-wine-one-designed',
  templateUrl: './wine-one-designed.component.html',
  styleUrls: ['./wine-one-designed.component.css']
})
export class WineOneDesignedComponent implements OnInit, AfterViewInit {

// @ts-ignore
  @ViewChild('navigation') private navigationRef_: ElementRef;
  wineData = null;
  noImage = '../../../assets/icons/placeholder-wine.svg';
  downloadedData = new ReplaySubject(1);

  grapeMap = new Map();
  vineyardMap = new Map();
  wrappingMap = new Map();
  awardMap = new Map();
  competitionMap = new Map();
  wineTypeMap = new Map();
  wineSubTypeMap = new Map();
  priceMap = new Map();

  allPermtted = {

    description: true,
    certification: true,
    awards: true,
    analysis: true,

    crushing: true,
    maceration_fermentation: true,
    grape: true,
    ageing: true,

    pressing: true,
    full_description: true,
    professional_points: true,
    bottle: true,
    serving: true,
  };

  glasses = [
    {id: 1, width: '16px', op: '0px'},
    {id: 2, width: '16px', op: '-30px'},
    {id: 3, width: '24px', op: '-58px'},
    {id: 4, width: '22px', op: '-94px'},
    {id: 5, width: '20px', op: '-126px'},
    {id: 6, width: '32px', op: '-156px'},
    {id: 7, width: '28px', op: '-194px'},
  ];
  countries = [];
  regiones = [];
  countriesMap = new Map();
  regionesMap = new Map();
  autodescriptionsMap = new Map();

  competitionList = [];
  awardList = [];
  wrappingList = [];
  priceList = [];
  corkList = [];
  wineTypeList = [];
  wineSubTypeList = [];
  barrelTypeList = [];
  barrelSizeList = [];
  servingTemperaturesList = [];
  sparklingSubTypeList = [];
  availableTypesForSubTypes = [];
  nongrapeSubTypeList = [];
  wrappingTypeList = wrappingTypeList;
  boxMaterialList = boxMaterialList;
  boxPositionList = boxPositionList;
  filtrationArr = filtrationArr;
  finingArr = finingArr;
  brandAmountTypes = brandAmountTypes;

  // wrappingTypeList = [
  //   {id: 'Glass bottle', text: 'Glass bottle'},
  //   {id: 'Can', text: 'Can'},
  //   {id: 'Ceramic bottle', text: 'Ceramic bottle'},
  //   {id: 'Ceramic jar', text: 'Ceramic jar'},
  //   {id: 'Pouche', text: 'Pouche'},
  //   {id: 'Tetra Pak', text: 'Tetra Pak'},
  //   {id: 'Plastic bottle', text: 'Plastic bottle'},
  //   {id: 'Bag-in-box - BIB', text: 'Bag-in-box - BIB'},
  //   {id: 'Wine barrel', text: 'Wine barrel'},
  // ];
  // boxMaterialList = [
  //   {id: 'Cardboard', text: 'Cardboard'},
  //   {id: 'Wood', text: 'Wood'},
  //   {id: 'Paper', text: 'Paper'},
  //   {id: 'Plastic', text: 'Plastic'},
  // ];
  // boxPositionList = [
  //   {id: 'Vertical', text: 'Vertical'},
  //   {id: 'Horizontal', text: 'Horizontal'},
  // ];

  tabs = {
    basic: 'basic',
    advanced: 'advanced'
  };
  tab = this.tabs.basic;

  viewWineOptions = {


    certification: false,
    vinification: false,
    harvest: false,
    analysis: false,
    serving: false,
    description: false,
    awards: false,
    packaging: false,

  };

  LOCAL_STORAGE_OPEN_TABS = 'bonvino_opened_wine_tabs';
  trigger = new ReplaySubject();

testVal = true;
  // @ViewChildren(ScrollBonvinoComponent) scrolls: QueryList<ScrollBonvinoComponent>;


  grandTypesArr = grandTypes;
  stillArr = still;
  methodArr = method;
  sweetnessArr = sweetness;
  champagneSweetnessArr = champagneSweetness;
  gasArr = gas;
  colorArr = color;

  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              private accountService: AccountServiceService,
              public dialog: MatDialog,
              public overlay: Overlay,
              public imagePlaceholder: PlaceholderServiceService,
              public  resolutionService: ResolutionService,
              private titleService: Title,
              private listService: ListsService) { }


  ngAfterViewInit(): void {



    // console.log(this.scrolls.toArray());
    // this.scrolls.toArray().forEach(scroll => {
    //   console.log(scroll.trigger);
    // });
  }

  ngOnInit() {

    const openTabsJSON = localStorage.getItem(this.LOCAL_STORAGE_OPEN_TABS);
    if (openTabsJSON) {
      const openTabs = JSON.parse(openTabsJSON);
      if (openTabs) {
        Object.keys(this.viewWineOptions).forEach(key => {
          if (openTabs[key]) {
            this.viewWineOptions[key] = openTabs[key];
          }
        });
      }
      // this.viewWineOptions = openTabs;
    }

    this.trigger.subscribe(() => {

      console.log(this.viewWineOptions);
      console.log(this.testVal);
      const opj = JSON.stringify(this.viewWineOptions);

      localStorage.setItem(this.LOCAL_STORAGE_OPEN_TABS, opj);
    });


    this.langService.getLanguage()
    const getAwardsList = this.service.getAwardsList();
    const getCompetitionsList = this.service.getCompetitionsList();
    const getWrapList = this.service.getWrapList();
    const getBarrelTypeList = this.service.getBarrelTypeList();
    const getBarrelSizeList = this.service.getBarrelSizeList();
    const getPriceList = this.service.getPriceList();
    const getWineType = this.service.getWineType();
    const getSubTypeList = this.service.getWineSubType();
    const getCountries = this.service.getCountries();
    const getRegions = this.service.getRegiones();
    const getServingTemperatures = this.service.getServingTemperatures();
    const getCorkTypeList = this.service.getCorkTypes();
    const getSparklingSubType = this.service.getSparklingType();
    const getNongrapeSubType = this.service.getNongrapeTypes();



    forkJoin([getAwardsList, getCompetitionsList, getWrapList, getPriceList, getWineType,
      getSubTypeList, getCountries, getRegions, getBarrelTypeList, getPriceList,
      getServingTemperatures, getBarrelSizeList, getCorkTypeList, getSparklingSubType, getNongrapeSubType]).subscribe(results => {
      // @ts-ignore
      this.awardList = results[0];
      this.awardList.forEach(a => {
        this.awardMap.set(a.id * 1, a.international_name);
      });

      // @ts-ignore
      this.competitionList = results[1];
      this.competitionList.forEach(c => {
        this.competitionMap.set(c.id * 1, c.compname_en);
      });


      this.wrappingList.forEach(w => {
        this.wrappingMap.set(w.id * 1, w.size);
      });
      // @ts-ignore
      this.wrappingList = results[2];

      this.wrappingList.forEach(w => {
        this.wrappingMap.set(w.id * 1, w.size);
      });
      // @ts-ignore
      this.priceList = results[3];
      // @ts-ignore
      this.wineTypeList = results[4];

      this.wineTypeList.forEach(w => {
        this.wineTypeMap.set(w.id * 1, w.type);
      });
      // @ts-ignore
      this.wineSubTypeList = results[5];

      this.wineSubTypeList.forEach(w => {
        this.wineSubTypeMap.set(w.id + '', w.name);
      });

// @ts-ignore
      this.countries = results[6];
      this.countries.forEach(x => {
        this.countriesMap.set(x.id, x.name);
      });

// @ts-ignore
      this.regiones = results[7];
      this.regiones.forEach(x => {
        this.regionesMap.set(x.id, x.name);
      });


      // @ts-ignore
      this.barrelTypeList = results[8];
      // @ts-ignore
      this.barrelSizeList = results[11];

      // @ts-ignore
      this.priceList = results[9];
      this.priceList.forEach(x => {
        this.priceMap.set(x.id, x.price);
        // this.profMap.
      });


      // @ts-ignore
      this.servingTemperaturesList = results[10];


      // @ts-ignore
      this.corkList = results[12];


      // @ts-ignore
      this.sparklingSubTypeList = results[13];
      // @ts-ignore
      this.nongrapeSubTypeList = results[14];
    });

    const id = this.activatedroute.snapshot.params.id;
    this.service.getWine(id, {}).subscribe(data => {
      let title = '';
      // @ts-ignore
      if(data.basic_designed.language == this.langService.language && data.basic_designed.name_national) {
        // @ts-ignore
        title = data.basic_designed.name_national + ' wine - bonvino.com';
      } else {
        // @ts-ignore
        title = data.basic_designed.name_international + ' wine - bonvino.com';
      }
      this.titleService.setTitle(title);
      // this.downloadedData.next(data);
      console.log(data);
      this.wineData = data;

      let series = this.wineData.wineryinfo.series;

      // console.log(this.wineData.wineryinfo.series);
      // console.log(this.wineData.basic_designed.brand);

      if(series && series.length) {
        series = series.filter(x => {
          return x.id == this.wineData.basic_designed.brand;
        });
        if(series.length) {
          this.wineData.series = series[0];
        }
      }


      // console.log(this.wineData.series);

      // @ts-ignore
      if (data.dumpgrape) {
        // @ts-ignore
        this.wineData.grapes = JSON.parse(data.dumpgrape);
      }

      // @ts-ignore
      if (data.palletDB) {
        // @ts-ignore
        this.wineData.pallet = JSON.parse(data.palletDB);
      }

      // @ts-ignore
      if (data.wrappingDB) {
        // @ts-ignore
        this.wineData.wrapping = JSON.parse(data.wrappingDB);
      }

      // @ts-ignore
      if (data.barrelsDB) {
        // @ts-ignore
        this.wineData.barrels = JSON.parse(data.barrelsDB);
      }

      // @ts-ignore
      if (data.pressingDB) {
        // @ts-ignore
        this.wineData.pressing = JSON.parse(data.pressingDB);
      }

      // @ts-ignore
      if (data.competitionDB) {
        // @ts-ignore
        this.wineData.competition = JSON.parse(data.competitionDB);
      }

      // @ts-ignore
      if (data.descriptionDB) {

        // console.log(JSON.parse(data.descriptionDB));
        // @ts-ignore
        this.wineData.gradeDescription = of(JSON.parse(data.descriptionDB));
      }


      // @ts-ignore
      if (data.autodescription) {


        this.listService.getAutodescriptionsList().subscribe(autodescriptionData => {


          // @ts-ignore
          this.wineData.autodescription = JSON.parse(data.autodescription);
          // @ts-ignore
          const schemas = autodescriptionData.rows;
          schemas.forEach(row => {
            if (this.wineData.autodescription['description_' + row.id]) {
              this.autodescriptionsMap.set(row.language, this.wineData.autodescription['description_' + row.id]);
            }
          });

          // console.log(this.autodescriptionsMap);
        });
        // console.log(this.wineData.menu);
      }

      // @ts-ignore
      if (data.menu) {
        // @ts-ignore
        this.wineData.menu = JSON.parse(data.menu);
      } else {
        this.wineData.menu = this.allPermtted;
      }

      // console.log(this.wineData.menu);
      // additionalGrapes: [{id: 1, name: "Abouriou"}]
      // 0: {id: 1, name: "Abouriou"}
      this.wineData.additionalGrapes.forEach(g => {
        this.grapeMap.set(g.id * 1, g.name);
      });

      // @ts-ignore
      data.additionalVineyards.forEach(x => {
        // @ts-ignore
        this.vineyardMap.set(x.id, x);
        // this.profMap.
      });
      this.downloadedData.next(data);


    }, err => {

    });
  }

  getImage() {
    if (this.wineData && this.wineData.image) {
      return environment.wineImageStore + `${this.wineData.id + '_' + this.wineData.image}.png`;

    } else {
      return this.imagePlaceholder.getImagePlaceholder(this.wineData.basic_designed, 'page');
      // return this.noImage;
    }
  }


  moreInfo() {
    if (this.langService.editable) {
      return;
    }
    const dialogRef = this.dialog.open(WineOneSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: '90%',
      height: '90%',
      autoFocus: false,
      data: this.downloadedData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }


  storeWine() {
    if (this.langService.editable) {
      return;
    }
    // console.log(this.downloadedData);
    const id = this.activatedroute.snapshot.params.id;
    const dialogRef = this.dialog.open(WinesStoreSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '90%',
      maxHeight: '80vh',
      autoFocus: false,
      panelClass: 'mat-dialog-bonvino',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  // getWine() {
  //   // console.log(this.downloadedData);
  //   // const id = this.activatedroute.snapshot.params.id;
  //
  //   const id = this.activatedroute.snapshot.params.id;
  //   const dialogRef = this.dialog.open(WinesSimplestoreSubscreenComponent, {
  //     scrollStrategy: this.overlay.scrollStrategies.noop(),
  //     width: '40%',
  //     maxHeight: '80vh',
  //     autoFocus: false,
  //     panelClass: 'mat-dialog-bonvino',
  //     data: {id}
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //   });
  //
  // }
  rateWine() {
    if (this.langService.editable) {
      return;
    }
    const dialogRef = this.dialog.open(WinesVoteSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      // reposition(),
      width: '90%',
      // height: 'auto',
      maxHeight: '80vh',
      autoFocus: false,
      panelClass: 'mat-dialog-bonvino',
      data: this.downloadedData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  editWine() {
    if (this.langService.editable) {
      return;
    }
    this.router.navigate(['/wine-edit/' + this.activatedroute.snapshot.params.id]);
  }
  editWineLink() {
    return '/wine-edit/' + this.activatedroute.snapshot.params.id;
  }

  getRegion(regions) {
    // console.log(regions);
    let res = '';
    regions.forEach(x => {
      if (x) {
        // console.log(x);
        res += this.langService.getText('country_names', '', x) ||
          this.langService.getTextInEnglish('country_names', '', x) || this.regionesMap.get(x);
        res += ', ';
      }
    });
    if (res) {
      res = res.slice(0, -2);
    }
    return res;
  }


  getTabColor(tab) {
    if (this.tab == tab) {
      return 'btn-menu-selected menu-2-active';
    } else {
      return '';
    }
  }

  chooseTab(tab) {
    if (this.langService.editable) {
      return;
    }
    this.tab = tab;
  }


  celsiusToFahrenheit(cel) {
    if (cel === '' || cel === null) {
      return '';
    }
    return Math.round((32 + cel * 9 / 5) * 10) / 10;
  }
  fahrenheitToCelsius(fah) {
    if (fah === '' || fah === null) {
      return '';
    }
    return Math.round(((fah - 32) * 5 / 9) * 10) / 10;
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

  getWine(wine) {
    this.service.getToPersonStorage({wineId: wine.id}).subscribe(res => {
      console.log(res);
      if (res) {
        wine.storage = 1;
      }
    });
  }

  removeWine(wine) {
    this.service.removeFromPersonStorage({wineId: wine.id}).subscribe(res => {
      console.log(res);
      if (res) {
        wine.storage = null;
      }
    });
  }

  isEditable() {
    return !this.wineData.user || this.accountService.isSameUser(this.wineData.user) || this.accountService.isAdmin();
  }
  getBodyMargin() {
    if(this.navigationRef_ && this.navigationRef_.nativeElement && this.navigationRef_.nativeElement.offsetHeight && this.resolutionService.isSmall()) {
// @ts-ignore
      return { 'margin-top': this.navigationRef_.nativeElement.offsetHeight + 'px' };
    } else {
      return 0;
    }
  }
  isBigScreen() {
    return window.innerWidth > 1080
  }
  vineyardLink(vineyard) {

    return '/vineyard/' + vineyard;
  }

  getVineyardName(vineyard) {

    // return '/vineyard/' + vineyard;
    if (vineyard) {
      if (vineyard.name && (vineyard.name == vineyard.international || !vineyard.international)) {
        return `${vineyard.name}`;
      }
      if (vineyard.international && !vineyard.name) {
        return `${vineyard.international}`;
      }
      return `${vineyard.name} (${vineyard.international})`;
    }
  }


  getSeriesName(series) {
    if(!series.name || !series.international || series.name  == series.international) {
      return series.name || series.international;
    } else {
      return `${series.name} (${series.international})`
    }
  }
  getSeriesDescription(series, wineryLanguage) {

    if(!series.description || !series.int_description || series.description  == series.int_description) {
      return series.description || series.int_description;
    } else {

      if(wineryLanguage == this.langService.getLanguage()) {
        return series.description;
      } else {
        return series.int_description;
      }
    }
  }
}
