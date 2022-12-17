import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {RequestsService} from '../../services/api/requests.service';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {LanguageServiceService} from '../../services/language-service.service';
import {languagesContent} from '../../../environments/languages';
import {MapGoogleDesignedComponent} from '../../schemas/map-google-designed/map-google-designed.component';
import {ReplaySubject} from 'rxjs';
import {SuperComponentWithTabsComponent} from '../../schemas/super-component-with-tabs/super-component-with-tabs.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoadingServiceService} from '../../services/loading-service.service';
import {EventDesignedBasicComponent} from '../event-designed-basic/event-designed-basic.component';
import {EventDesignedAdditionalComponent} from '../event-designed-additional/event-designed-additional.component';
import {EventDesignedMenuComponent} from '../event-designed-menu/event-designed-menu.component';
import {InputData} from '../../business-designed/business-designed.component';
import {AccountServiceService} from '../../services/account-service.service';
import {SuccessService} from '../../services/success.service';
import {Title} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {WineListDesignedBComponent} from "@src/app/lists/wine-list-designed-b/wine-list-designed-b.component";

@Component({
  selector: 'app-event-designed-create',
  templateUrl: './event-designed-create.component.html',
  styleUrls: ['./event-designed-create.component.css']
})
// @ts-ignore
export class EventDesignedCreateComponent extends SuperComponentWithTabsComponent implements OnInit, AfterViewInit {


  routeData = {editable: false, download: false, available: true};

  geoData =  new ReplaySubject(1);
// @ts-ignore
  @ViewChild(MapGoogleDesignedComponent) googleMap: MapGoogleDesignedComponent;

  form = new FormGroup({
    name_national: new FormControl(''),
    name_international: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(0),

    type: new FormControl('select'),
    language: new FormControl('select'),
    details: new FormControl(''),
    fee: new FormControl(''),
    active: new FormControl(''),
    public: new FormControl(''),

    from: new FormControl(''),
    to: new FormControl(''),
    start_time: new FormControl(''),
    end_time: new FormControl(''),
    phone: new FormControl(''),
    fax: new FormControl(''),
    email: new FormControl(''),
    web: new FormControl(''),
    imageDL: new FormControl(''),

    wineHelper: new FormControl(''),


    yours: new FormControl(''),
    userId: new FormControl(''),

    lat: new FormControl(''),
    lng: new FormControl(''),
  });


  countries = [];
  countriesMap = new Map();

  types = [
    {place: 'select', value: 'select', label: 'Select'},
    {place: 'auction', value: 'auction', label: 'Auction'},
    {place: 'course', value: 'course', label: 'Course'},
    {place: 'harvest', value: 'harvest', label: 'Harvest'},
    {place: 'lecture', value: 'lecture', label: 'Lecture'},
    {place: 'meeting', value: 'meeting', label: 'Meeting'},
    {place: 'new_wine_launch', value: 'new_wine_launch', label: 'New event Launch'},
    {place: 'wine_competition', value: 'wine_competition', label: 'Wine Competition'},
    {place: 'wine_exhibition', value: 'wine_exhibition', label: 'Wine exhibition'},
    {place: 'wine_tasting', value: 'wine_tasting', label: 'Wine tasting'},
    {place: 'wine_tour', value: 'wine_tour', label: 'Wine tour'},
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
    additional: 'additional',
    menu: 'menu',
    wines: 'wines',
  };
  tab = this.tabs.basic;
  childMap = new Map();

  // @ts-ignore
  @ViewChild(EventDesignedBasicComponent) basicTab: EventDesignedBasicComponent;
  // @ts-ignore
  @ViewChild(EventDesignedAdditionalComponent) additionalTab: EventDesignedAdditionalComponent;
  // @ts-ignore
  @ViewChild(EventDesignedMenuComponent) menuTab: EventDesignedMenuComponent;
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

  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              private accountService: AccountServiceService,
              private successService: SuccessService,
              public langService: LanguageServiceService,
              private snackBar: MatSnackBar,
              private titleService: Title,
              public loadingService: LoadingServiceService,
              private http: HttpClient
  ) {
    super(service,
      activatedroute,
      cookieService,
      router,
      langService,
      snackBar);

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
  ngOnInit() {

    this.switchListerner.subscribe(x => {
      this.basicTab.reloadMap();
    });

    const req = {business_type: 'event'};

    this.service.getConstructorStructure(req).subscribe((data: InputData[]) => {

      this.structure = data;
      this.additionalStructure.next(this.structure);

    });

    this.additionalTabsSubject.subscribe(tabs => {
// @ts-ignore
      this.subTabs = tabs;
    });
  }

  get name_national() {
    return this.form.get('name_national');
  }
  get name_international() {
    return this.form.get('name_international');
  }
  get address() {
    return this.form.get('address');
  }
  get city() {
    return this.form.get('city');
  }
  get type() {
    return this.form.get('type');
  }
  get language() {
    return this.form.get('language');
  }
  get details() {
    return this.form.get('details');
  }
  get fee() {
    return this.form.get('fee');
  }
  get active() {
    return this.form.get('active');
  }
  get public() {
    return this.form.get('public');
  }
  get from() {
    return this.form.get('from');
  }
  get to() {
    return this.form.get('to');
  }
  get start_time() {
    return this.form.get('start_time');
  }
  get end_time() {
    return this.form.get('end_time');
  }
  get phone() {
    return this.form.get('phone');
  }
  get fax() {
    return this.form.get('fax');
  }
  get email() {
    return this.form.get('email');
  }
  get web() {
    return this.form.get('web');
  }
  get image() {
    return this.form.get('image');
  }
  get country() {
    return this.form.get('country');
  }
  get wineHelper() {
    return this.form.get('wineHelper');
  }
  get lat() {
    return this.form.get('lat');
  }
  get lng() {
    return this.form.get('lng');
  }

  placeMark() {

    console.log(this.country.value);
    console.log(this.countriesMap);
    const geoData = {address: this.countriesMap.get(this.country.value * 1) + ', ' + this.city.value + ', ' + this.address.value }
    this.service.coordinatesByAddress(geoData).subscribe(res => {
// @ts-ignore
      if (res.geo) {
// @ts-ignore
        this.googleMap.setMarker(res.geo)
      }
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
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        // @ts-ignore
        this.url = event.target.result;
      }
      this.fileToUpload = event.target.files.item(0);

      this.isImageChanged = true;
    }
  }
  deleteImage() {
    if (this.langService.editable) {
      return;
    }
    this.imageLink = null;
    this.fileToUpload = null;
    this.isImageChanged = true;
  }

  downloadWines() {
    // this.listService.getWines({search: this.wineHelper.value, page: this.winePage}).subscribe(data => {
    //     // @ts-ignore
    //     this.wineList = data.rows;
    //   }
    // );
  }
  selectWine(wine) {
    // console.log(id);
    this.chosenWines.forEach(w => {
      if (w.id == wine.id) {
        return;
      }
    });
    this.chosenWines.push(wine);
    // this.winery.setValue(id);
    // if (id) {
    //   this.wineryName = this.wineryList.filter(x => x.id == id)[0];
    // } else {
    //   this.wineryName = null;
    // }
  }
  getWineName(wine) {
    if (wine) {
      if (wine.international_wn == wine.name || !wine.name) {
        return `${wine.international_wn}`;
      }
      return `${wine.international_wn} (${wine.name})`;
    }
  }
  removeWine(wine) {
    this.chosenWines = this.chosenWines.filter(w => {
      return w.id != wine.id;
    });
  }





  back() {
    if (this.langService.editable) {
      return;
    }
    this.router.navigate(['/event/' + this.activatedroute.snapshot.params.id],
      {queryParams: {tab: this.activatedroute.snapshot.queryParamMap.get('tab')}});
  }
  backLink() {
    return '/event/' + this.activatedroute.snapshot.params.id;
  }

  selectWinesLink() {
    return '/event-wine-list/' + this.activatedroute.snapshot.params.id;
  }
  create() {
    const requestData = this.basicTab.getData();


// @ts-ignore
    requestData.menu = this.menuTab.getMenuData();
// @ts-ignore
    requestData.additional = this.additionalTab.getAdditionalData();
    console.log(requestData);

    if (!this.activatedroute.snapshot.data.download) {
      this.service.addEvent(requestData).subscribe(data => {

        if (this.basicTab.isImageChanged) {
// @ts-ignore
          this.service.setImage('event', data.id, this.basicTab.fileToUpload).subscribe(() => {
            // this.service.setWineImage(this.image.fileToUpload, data.id).subscribe(() => {
            // @ts-ignore
            this.router.navigate(['/event/' + data.id]);
          });
        } else {
          // @ts-ignore
          this.router.navigate(['/event/' + data.id]);
        }
      });
    } else {
      // @ts-ignore
      requestData.id = this.activatedroute.snapshot.params.id;
      this.service.editEvent(requestData.id, requestData).subscribe(() => {

        if (this.basicTab.isImageChanged) {
// @ts-ignore
          this.service.setImage('event', requestData.id, this.basicTab.fileToUpload).subscribe(() => {
          });
        }
      });
    }
  }



  clone() {
    const requestData = {id: this.activatedroute.snapshot.params.id};

    this.service.cloneEvent(requestData).subscribe(data => {

      // @ts-ignore
      this.router.navigate(['/event/' + data.id]);

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


  setWinePage(page) {
    if (this.langService.editable) {
      return;
    }
    this.winePage = page;
    this.downloadWines();
    return page;
  }


  private checkEditable(userId) {
    this.accountService.getProfile.subscribe(profile => {
// @ts-ignore
      if (this.accountService.isNoUser() || (userId && userId != profile.id && !this.accountService.isAdmin())) {

        this.router.navigate(['/event/' + this.activatedroute.snapshot.params.id]);
        this.successService.showError();
      }
    });
  }

  ngAfterViewInit(): void {

    this.activatedroute.data.subscribe(data => {
      if (data.download) {
        this.routeData.download = true;
      }
    });

    this.childMap.set(this.tabs.basic, this.basicTab);
    this.childMap.set(this.tabs.additional, this.additionalTab);
    this.childMap.set(this.tabs.menu, this.menuTab);
    this.childMap.set(this.tabs.wines, this.winesTab);

    this.choseStartingTab(this.childMap, this.menuTab);

//     this.geoData.subscribe(data => {
//       console.log(data);
//
// // @ts-ignore
//       this.lng.setValue(data.lng);
// // @ts-ignore
//       this.lat.setValue(data.lat);
//     });
//
//     this.service.getCountries().subscribe(data => {
// // @ts-ignore
//       this.countries = data;
//       this.countries.forEach(x => {
//         this.countriesMap.set(x.id, x.name);
//       });
//     });
//
//     this.wineHelper.valueChanges.pipe(
//       debounceTime(1000),
//       filter(form => !form.invalid),
//     ).subscribe(() => {
//       this.downloadWines();
//     });


    if (this.activatedroute.snapshot.data.download) {
      // @ts-ignore
      this.routeData.download = true;

      const id = this.activatedroute.snapshot.params.id;

      this.service.getEvent(id).subscribe(data => {

        let title = '';
        // @ts-ignore
        if(data.commoninfo.language == this.langService.language && data.commoninfo.name_national) {
          // @ts-ignore
          title = data.commoninfo.name_national + ' edit event - bonvino.com';
        } else {
          // @ts-ignore
          title = data.commoninfo.name_international + ' edit event - bonvino.com';
        }
        this.titleService.setTitle(title);


// @ts-ignore
        this.checkEditable(data.user);
        this.downloadedData.next(data);


        console.log(data);


//         Object.keys(this.form.controls).forEach(key => {
// // @ts-ignore
//           if (this.form.get(key) instanceof FormControl && data.commoninfo[key]) {
// // @ts-ignore
//             this.form.get(key).setValue(data.commoninfo[key]);
//           }
//         });
//
//         // console.log(data.commoninfo.image);
// // @ts-ignore
//         if (data.commoninfo.image * 1) {
// // @ts-ignore
//           this.imageLink = environment.eventImageStore + `${this.activatedroute.snapshot.params.id + '_' + data.commoninfo.image}.png`;
//         }
//
// // @ts-ignore
//         this.chosenWines = data.winelist.wine_list;
      });
    } else {


      let title = 'Add event - bonvino.com';
      this.titleService.setTitle(title);
    }
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
      return (x.tab == tab && this.menuTab && this.menuTab.getFormValue(x.block_name));
    });
    return res.length;
  }

}
