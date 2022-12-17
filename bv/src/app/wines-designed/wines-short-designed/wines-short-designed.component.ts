import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ResolutionService} from '@src/app/services/resolution.service';
import {WineOneSubscreenComponent} from '@src/app/wines-designed/wine-one-subscreen/wine-one-subscreen.component';
import {
  boxMaterialList,
  boxPositionList,
  filtrationArr,
  finingArr,
  wrappingTypeList
} from '@src/app/wines-designed/wines-advanced-designed/wines-advanced-designed.component';
import {PlaceholderServiceService} from '@src/app/services/placeholder-service.service';
import {WinesVoteSubscreenComponent} from '@src/app/wines-designed/wines-vote-subscreen/wines-vote-subscreen.component';
import {ListsService} from '@src/app/services/api/lists.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {environment} from '@src/environments/environment';
import {WinesStoreSubscreenComponent} from '@src/app/wines-designed/wines-store-subscreen/wines-store-subscreen.component';
import {RequestsService} from '@src/app/services/api/requests.service';
import {forkJoin, of, ReplaySubject, Subject} from 'rxjs';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {Overlay} from '@angular/cdk/overlay';
import {brandAmountTypes} from '@src/app/wineries-designed/wineries-second/wineries-second.component';
import {
  champagneSweetness,
  color,
  gas,
  grandTypes,
  method,
  still,
  sweetness
} from '@src/app/wines-designed/wines-basic-designed/wines-basic-designed.component';
import {WineDescriptionSubscreenComponent} from '@src/app/wines-designed/wine-description-subscreen/wine-description-subscreen.component';
import {variables} from '@src/environments/variables';
import {FindWineComponent} from '@src/app/schemas/find-wine/find-wine.component';
import {CloseSubscreenSecviceService} from '@src/app/services/close-subscreen-secvice.service';
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-wines-short-designed',
  templateUrl: './wines-short-designed.component.html',
  styleUrls: ['./wines-short-designed.component.css']
})
export class WinesShortDesignedComponent implements OnInit, AfterViewInit {

  bengat = variables.bengat;

  id = null;

  // @ts-ignore
  @Input() data: Subject;
  // @ts-ignore
  @Input() eventListerner: Subject;
  // @ts-ignore
  @Input() wineryVineyardIdSubscriber: Subject;


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
  specialistDescriptionsMap = new Map();

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
  showOptions = false;

  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              public accountService: AccountServiceService,
              public dialog: MatDialog,
              public overlay: Overlay,
              public imagePlaceholder: PlaceholderServiceService,
              public  resolutionService: ResolutionService,
              public closeSubscreenService: CloseSubscreenSecviceService,
              private metaTagService: Meta,
              private listService: ListsService) { }


  ngAfterViewInit(): void {

    this.showOptions = this.activatedroute.snapshot.data.showOptions;

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


    this.langService.getLanguage();
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
      getServingTemperatures, getBarrelSizeList, getCorkTypeList, getSparklingSubType, getNongrapeSubType]).subscribe(
        results => {
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


      // this.wrappingList.forEach(w => {
      //   this.wrappingMap.set(w.id * 1, w.size);
      // });
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

    // let id;
    if(this.data) {
      // @ts-ignore
      this.id = this.data.id;
    } else {

      this.id = this.activatedroute.snapshot.params.id;
    }
    let userdata;
    if(this.bengat) {
      userdata = {user: 114};
    } else {

      userdata = {user: this.accountService.getCookieData().myId};
    }
    this.service.getWine(this.id, userdata).subscribe(data => {

      if(data) {

        const visitinData = {
          page: 'wine',
          id: this.id
        };
        this.service.visiting(visitinData).subscribe(x => {
          console.log(x);
        });
      }

      // this.downloadedData.next(data);
      console.log(data);
      this.wineData = JSON.parse(JSON.stringify(data));


      if(this.wineData.specialistData) {

        // this.specialistDescriptionsMap.add()
        // @ts-ignore
        this.wineData.specialistData.description.forEach(d => {

          // @ts-ignore
          this.specialistDescriptionsMap.set(d.language, d.description);

        });

        if(this.wineData.specialistData.collection && this.wineData.specialistData.collection.price) {

        }
      }

      const wineryVineyardsId = {
        winery: null,
        vineyards: []
      };
      if(this.wineData.wineryinfo) {
        wineryVineyardsId.winery = this.wineData.wineryinfo.id;
        // this.wineryVineyardIdSubscriber.next({
        //   winery: this.wineData.wineryinfo.id
        // })
      }

      let series;

      if(this.wineData.wineryinfo && this.wineData.wineryinfo.series) {

        series = this.wineData.wineryinfo.series;
      }

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
        this.wineData.gradeDescriptionObj = JSON.parse(data.descriptionDB);
        this.wineData.gradeDescription = of(this.wineData.gradeDescriptionObj);
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
      if(this.wineData.additionalGrapes) {

        this.wineData.additionalGrapes.forEach(g => {
          this.grapeMap.set(g.id * 1, g.name);
        });
        // setTimeout(() => {
        //
        // }, 10000);
      }


      // @ts-ignore
      if(data.additionalVineyards) {

        // @ts-ignore
        data.additionalVineyards.forEach(x => {
          // @ts-ignore
          this.vineyardMap.set(x.id, x);
          // this.profMap.
        });
      }
      this.downloadedData.next(data);

      console.log(this.vineyardMap);
      console.log(this.wineData);

      if(this.isAmphora()) {
        this.wineData.isAmphora = true;
      } else {
        this.wineData.isAmphora = false;
      }

      if(this.isBarrel()) {
        this.wineData.isBarrel = true;
      } else {
        this.wineData.isBarrel = false;
      }

      if(this.isHandPicked()) {
        this.wineData.isHandPicked = true;
      } else {
        this.wineData.isHandPicked = false;
      }

      if(this.isNightHarvest()) {
        this.wineData.isNightHarvest = true;
      } else {
        this.wineData.isNightHarvest = false;
      }

      forkJoin({
        mapReplacesSubject: this.langService.mapReplacesSubject,
        mapSameLanguagesSubject: this.langService.mapSameLanguagesSubject,

      }).subscribe(
        results => {

          // console.log(results);

          const descriptionText = this.getSpecialistDescription();
          console.log(descriptionText);
          if(descriptionText) {

            this.metaTagService.addTags([
              {name: 'description', content: descriptionText},
            ]);
          }

        }
      );

      if(this.wineryVineyardIdSubscriber){
        this.wineryVineyardIdSubscriber.next(wineryVineyardsId);
        this.wineryVineyardIdSubscriber.complete();
      }

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
    const wine = this.wineData;
    const dialogRef = this.dialog.open(WinesStoreSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      width: '90%',
      maxHeight: '80vh',
      autoFocus: false,
      panelClass: 'mat-dialog-bonvino',
      data: {wine}
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
  describeWine() {
    if (this.langService.editable) {
      return;
    }
    const dialogRef = this.dialog.open(WineDescriptionSubscreenComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      // reposition(),
      width: '90%',
      // height: 'auto',
      maxHeight: '90vh',
      autoFocus: false,
      panelClass: ['mat-dialog-bonvino', 'mat-dialog-bonvino-noscrolling'],
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
    this.router.navigate(['/wine-edit/' + this.id]);
  }
  editWineLink() {
    return '/wine-edit/' + this.id;
  }
  viewWineLink() {
    return '/wine-translate/' + this.id;
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

  isTranslatable() {
    return this.accountService.isTranslator();
  }

  isAdmin() {
    return this.accountService.isAdmin();
  }

  isSpecialist() {
    return this.accountService.ifSpecialist();
  }


  isRegistratedUser() {
    return !this.accountService.isNoUser();
  }
  getBodyMargin() {
    if(this.navigationRef_ && this.navigationRef_.nativeElement && this.navigationRef_.nativeElement.offsetHeight && this.resolutionService.isSmall()) {
// @ts-ignore
      return { 'margin-top': this.navigationRef_.nativeElement.offsetHeight + 'px' };
    } else {
      return 0;
    }
  }
  vineyardLink(vineyard) {

    return '/vineyard/' + vineyard;
  }

  // getVineyardMap()

  getVineyardName(vineyard) {
    if(vineyard.language == this.langService.getLanguage() && vineyard.name) {
      return `${vineyard.name}`;
    } else {
      return `${vineyard.international}`;
    }

    // console.log(vineyard);
    // return '/vineyard/' + vineyard;
    // if (vineyard) {
    //   if (vineyard.name && (vineyard.name == vineyard.international || !vineyard.international)) {
    //     return `${vineyard.name}`;
    //   }
    //   if (vineyard.international && !vineyard.name) {
    //     return `${vineyard.international}`;
    //   }
    //   return `${vineyard.name} (${vineyard.international})`;
    // }
  }

  getSeriesName(series) {
    return series.name;
    // if(!series.name || !series.international || series.name  == series.international) {
    //   return series.name || series.international;
    // } else {
    //   return `${series.name} (${series.international})`
    // }
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

  getMaximumLengthOfAging(barrelsData) {
    let res = '';

    if(barrelsData) {

      barrelsData.forEach(b => {
        if(this.numberValueIfPossible(b.month) > this.numberValueIfPossible(res)) {
          res = b.month;
        }
      });
    }

    return res;
  }

  numberValueIfPossible(v) {
    try {
      return v * 1;
    } catch {
      return v;
    }
  }



  numberValueElseZero(v) {
    try {
      return v * 1;
    } catch {
      return 0;
    }
  }

  getBottlesQuantity(bottlesData) {
    let res = 0;

    bottlesData.forEach(b => {
      res = res + this.numberValueElseZero(b.total_bottles);
    });

    return res;

  }

  routeToWinery(id) {
    // this.router.navigateByUrl('/blank', {skipLocationChange: true}).then(() =>
    //   this.router.navigate(['winery/'+id])
    // );
    // console.log(this.router.url)
    this.eventListerner.next(
      {
        type: 'winery',
        id
      }
    );
  }

  routeToVineyard(id) {
    // this.router.navigateByUrl('/blank', {skipLocationChange: true}).then(() =>
    //   this.router.navigate(['winery/'+id])
    // );
    // console.log(this.router.url)
    this.eventListerner.next(
      {
        type: 'vineyard',
        id
      }
    );
  }

  hasGrapes() {

    if(!this.wineData.grapes || !this.wineData.grapes.length) {
      return false;
    }
    let res = false;
    this.wineData.grapes.forEach(grape => {
      if(grape.grape) {
        res = true;
      }
    });
    return res;
  }

  getGrapes() {

    if(!this.wineData.grapes || !this.wineData.grapes.length) {
      return [];
    }
    const counter = new Map();
    this.wineData.grapes.forEach(grape => {
      if(!counter.has(grape.grape)) {
        counter.set(grape.grape, {grape: grape.grape, percent: 0});
      }
      counter.get(grape.grape).percent += Number(grape.percent) || 0;

      // if(grape.grape) {
      //   res = true;
      // }
    });

    return Array.from(counter.values());
  }

  hasVineyards() {

    if(!this.wineData.grapes || !this.wineData.grapes.length) {
      return false;
    }
    let res = false;
    this.wineData.grapes.forEach(grape => {
      if(grape.vineyard) {
        res = true;
      }
    });
    return res;
  }

  getVineyards() {
    //
    if(!this.wineData.grapes || !this.wineData.grapes.length) {
      return [];
    }


    const set = new Set();

    this.wineData.grapes.forEach(b => {
      set.add(b.vineyard);
    });

    return Array.from(set);
  }

  bottleSizes() {

    // console.log(this.wineData);
    // const res = [];

    const set = new Set();

    this.wineData.wrapping.forEach(bottle => {
      if(bottle.type != 'Wine on tap' && bottle.size * 1) {
        // console.log(bottle.type, bottle.size * 1);
        set.add(bottle.size);
      }
    });

    return Array.from(set);
  }

  isWineOnTap() {
    // wine_on_tap
    if(!this.wineData.wrapping || !this.wineData.wrapping.length) {
      return false;
    }
    let res = false;
    this.wineData.wrapping.forEach(bottle => {
      if(bottle.type == 'Wine on tap') {
        res = true;
      }
    });
    return res;
  }


  getBarrels() {

    if(!this.wineData.grapes || !this.wineData.grapes.length) {
      return [];
    }
    const map = new Map();
    this.wineData.barrels.forEach(barrel => {
      const key = barrel.stuff + '_' + barrel.type;
      if(!map.has(key)) {
        map.set(key, barrel);
      }

      // if(grape.grape) {
      //   res = true;
      // }
    });

    return Array.from(map.values());
  }
  hasRatingDescription() {

    // console.log(this.wineData);
    if(!this.wineData.gradeDescriptionObj) {
      return false;
    }
    let res = false;

    Object.keys(this.wineData.gradeDescriptionObj).forEach(g => {
      // console.log(g);
      // console.log(this.wineData.gradeDescriptionObj[g]);
      if(this.wineData.gradeDescriptionObj[g]) {
        res = true;
      }
    });
    return res;
  }

  isMobileScreen() {
    return window.innerWidth < 768;
  }
  isBigScreen() {
    return window.innerWidth > 1080
  }
  hasSpecialistDescription() {
    return this.specialistDescriptionsMap.size;
  }
  getSpecialistDescription() {
    let description = null;
    this.langService.sameLanguagesArr.forEach(language => {
      if(!description && this.specialistDescriptionsMap.get(language)) {
        description = this.specialistDescriptionsMap.get(language);
      }
    });
    this.langService.chainLanguage.forEach(language => {
      if(!description && this.specialistDescriptionsMap.get(language)) {
        description = this.specialistDescriptionsMap.get(language);
      }
    });

    return description;
    //
    // if(this.specialistDescriptionsMap.get(this.langService.getLanguage())){
    //   return this.specialistDescriptionsMap.get(this.langService.getLanguage());
    // } else if (this.specialistDescriptionsMap.get(this.langService.english)) {
    //   return this.specialistDescriptionsMap.get(this.langService.english);
    // }
  }

  close() {
    this.eventListerner.next();
  }

  needCorkScrew(cork) {
    let res = 0;
    this.corkList.forEach(c => {
      if(c.name == cork) {
        res = c.corkscrew * 1;
      }
    })

    // console.log(res);
    return res;
  }

  isAmphora(){
    let res = false;
    this.wineData.barrels.forEach(x => {
      if(x.stuff == 'clay' && x.type == 21 && this.wineData.menu.ageing) {
        res = true;
      }
    });
    return res;
  }

  isBarrel(){
    let res = false;
    this.wineData.barrels.forEach(x => {
      if(x.stuff == 'wood oak' && this.wineData.menu.ageing) {
        res = true;
      }
    });
    return res;
  }
  isHandPicked() {

    let res = false;
    this.wineData.grapes.forEach(x => {
      if(x.handPicked && this.wineData.menu.grape) {
        res = true;
      }
    });
    return res;
  }
  isNightHarvest() {

    let res = false;
    this.wineData.grapes.forEach(x => {
      if(x.nightHarvest && this.wineData.menu.grape) {
        res = true;
      }
    });
    return res;
  }
}
