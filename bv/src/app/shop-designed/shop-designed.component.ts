import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {languagesInterface} from '../../environments/languages';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../services/language-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../services/api/requests.service';
import {LoadingServiceService} from '../services/loading-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CookieObserverService} from '../services/cookieObserver/cookie-observer.service';
import {SuperComponentWithTabsComponent} from '../schemas/super-component-with-tabs/super-component-with-tabs.component';
// import {WineListDesignedComponent} from '../lists/wine-list-designed/wine-list-designed.component';
import {ShopDesignedBasicComponent} from './shop-designed-basic/shop-designed-basic.component';
import {ShopDesignedAdditionalComponent} from './shop-designed-additional/shop-designed-additional.component';
import {ShopDesignedMenuComponent} from './shop-designed-menu/shop-designed-menu.component';
import {InputData} from '../business-designed/business-designed.component';
import {ReplaySubject} from 'rxjs';
import {AccountServiceService} from '../services/account-service.service';
import {SuccessService} from '../services/success.service';
import {Title} from '@angular/platform-browser';
import {WineListDesignedBComponent} from "@src/app/lists/wine-list-designed-b/wine-list-designed-b.component";

@Component({
  selector: 'app-shop-designed',
  templateUrl: './shop-designed.component.html',
  styleUrls: ['./shop-designed.component.css']
})
// @ts-ignore
export class ShopDesignedComponent extends SuperComponentWithTabsComponent  implements OnInit, AfterViewInit {

  languageArr = languagesInterface;
  loading = false;

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
    0: new FormArray([]),
    1: new FormArray([]),
    2: new FormArray([]),
    3: new FormArray([]),
    4: new FormArray([]),
    5: new FormArray([]),
    6: new FormArray([])
  });

  form = new FormGroup({

    name_national: new FormControl(''),
    name_international: new FormControl('', Validators.required),
    emblem: new FormControl(''),
    owner: new FormControl(''),
    country: new FormControl(0),
    regionsForm: new FormArray([
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
      new FormControl(0),
    ]),

    address: new FormControl(''),
    zip: new FormControl(''),
    phone: new FormControl(''),
    mobile: new FormControl(''),
    fax: new FormControl(''),
    email: new FormControl(''),
    web: new FormControl(''),

    parking: new FormControl(''),
    type: new FormControl('select'),
    branch: new FormControl(''),
    unique: new FormControl('select'),
    language: new FormControl(this.langService.getLanguage()),
    refrigerator: new FormControl('select'),
    area: new FormControl('select'),
    quality: new FormControl('select'),
    tasting: new FormControl(''),
    venue: new FormControl(''),
    consultant: new FormControl(''),
    delivery: new FormControl(''),
    delivery_cost: new FormControl(''),
    delivery_upon_purchase: new FormControl(''),
    strongAlcohol: new FormControl(''),
    beer: new FormControl(''),
    tobacco: new FormControl(''),
    cheese: new FormControl(''),
    meat: new FormControl(''),
    bread: new FormControl(''),

    yours: new FormControl(false),
    userId: new FormControl(0),
  });


  routeData = {editable: false, download: false, available: true};

  countries = [];
  regiones = [];
  countriesMap = new Map();
  regionesMap = new Map();

  fileToUpload: File = null;
  noImage = '../../../assets/images/no-image.png';
  imageLink;
  isImageChanged = false;
  url;


  fileToUploadEmblem: File = null;
  imageLinkEmblem;
  isImageChangedEmblem = false;
  urlEmblem;

  cookies;
  tabs = {
    basic: 'basic',
    additional: 'additional',
    menu: 'menu',
    wines: 'wines',
  };
  tab = this.tabs.menu;
  childMap = new Map();

  // @ts-ignore
  @ViewChild(ShopDesignedBasicComponent) basicTab: ShopDesignedBasicComponent;
  // @ts-ignore
  @ViewChild(ShopDesignedAdditionalComponent) additionalTab: ShopDesignedAdditionalComponent;
  // @ts-ignore
  @ViewChild(ShopDesignedMenuComponent) menuTab: ShopDesignedMenuComponent;
  // @ts-ignore
  @ViewChild(WineListDesignedBComponent) winesTab: WineListDesignedBComponent;


  downloadedData = new ReplaySubject(10);
  additionalStructure = new ReplaySubject(10);
  structure = [];

  additionalTabsSubject = new ReplaySubject(10);
  currentSubTab = new ReplaySubject(10);
  menuData = null;

  subTabs = [];

  chosenSubTab = '';



  // @ts-ignore
  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              private accountService: AccountServiceService,
              private successService: SuccessService,
              public langService: LanguageServiceService,
              private snackBar: MatSnackBar,
              public loadingService: LoadingServiceService,
              private titleService: Title,
              private cookieObserver: CookieObserverService,
              ) {
    super(service,
      activatedroute,
      cookieService,
      router,
      langService,
      snackBar);

  }

  ngOnInit() {

    const id = this.activatedroute.snapshot.params.id;

    // console.log(this.activatedroute.snapshot.data);

    if (this.activatedroute.snapshot.data.download) {
      this.routeData.download = true;

      this.service.getShop(id).subscribe(data => {


        let title = '';
        // @ts-ignore
        if(data.commoninfo.language == this.langService.language && data.commoninfo.name_national) {
          // @ts-ignore
          title = data.commoninfo.name_national + ' edit shop - bonvino.com';
        } else {
          // @ts-ignore
          title = data.commoninfo.name_international + ' edit shop - bonvino.com';
        }
        this.titleService.setTitle(title);

        // console.log(data);
        this.downloadedData.next(data);
// @ts-ignore
        this.checkEditable(data.user);
      });
    } else {


      let title = 'Add shop - bonvino.com';
      this.titleService.setTitle(title);
    }


    const req = {business_type: 'shop'};

    this.service.getConstructorStructure(req).subscribe((data: InputData[]) => {

      this.structure = data;
      this.additionalStructure.next(this.structure);

    });

    this.additionalTabsSubject.subscribe(tabs => {
// @ts-ignore
      this.subTabs = tabs;
    });

  }

  getTabColor(tab) {


    if (this.chosenTab == tab) {
      return 'btn-menu-selected menu-2-active';
    } else {
      return '';
    }
  }

  showTab(tab) {
    return this.chosenTab == tab;
  }

  backLink() {
    if (this.routeData.download) {
      return '/shop/' + this.activatedroute.snapshot.params.id;
    } else {
      return '/my-business/' + this.cookieObserver.cookies.id;
    }

  }
  create() {

    if (this.langService.editable) {
      return;
    }


    const formsData = this.basicTab.getBasicData();

// @ts-ignore
    formsData.menu = this.menuTab.getMenuData();
// @ts-ignore
    formsData.additional = this.additionalTab.getAdditionalData();


    if (!this.activatedroute.snapshot.data.download) {
      this.service.addShop(formsData).subscribe(data => {
// @ts-ignore
        if (data.id) {



          if (this.basicTab.isImageChangedEmblem) {
// @ts-ignore
            this.service.setImage('shop-emblem', data.id, this.basicTab.fileToUploadEmblem).subscribe(() => {

// @ts-ignore
              this.router.navigate(['/shop-edit/' + data.id]);
            });
          } else {
            // @ts-ignore
            this.router.navigate(['/shop-edit/' + data.id]);
          }
// @ts-ignore
//           this.router.navigate(['/winery/' + data.id]);
        }
      });
    } else {
// @ts-ignore
      formsData.shopId = this.activatedroute.snapshot.params.id;
      this.service.editShop(formsData).subscribe(() => {
        if (this.basicTab.isImageChangedEmblem) {
// @ts-ignore
          this.service.setImage('shop-emblem', formsData.shopId, this.basicTab.fileToUploadEmblem).subscribe(() => {
          });
        }
      });
    }
  }
  private checkEditable(userId) {
    this.accountService.getProfile.subscribe(profile => {
// @ts-ignore
      if (userId && userId != profile.id && !this.accountService.isAdmin()) {

        this.router.navigate(['/shop/' + this.activatedroute.snapshot.params.id]);
        this.successService.showError();
      }
    });
  }

  ngAfterViewInit(): void {
    this.childMap.set(this.tabs.basic, this.basicTab);
    this.childMap.set(this.tabs.additional, this.additionalTab);
    this.childMap.set(this.tabs.menu, this.menuTab);
    this.childMap.set(this.tabs.wines, this.winesTab);

    this.choseStartingTab(this.childMap, this.menuTab);


    this.menuData = this.menuTab.getMenuForm();
  }

  getSubTabColor(subTab) {


    if (this.chosenTab == this.tabs.additional && this.chosenSubTab == subTab) {
      return 'btn-menu-selected menu-2-active';
    } else {
      return '';
    }
  }

  choseSubtab(subTab) {
    this.chosenSubTab = subTab;
    this.currentSubTab.next(subTab);
  }

  isTabExist(tab) {
    const res = this.structure.filter(x => {
      return (x.tab == tab && this.menuTab.getFormValue(x.block_name));
    });
    return res.length;
  }

}
