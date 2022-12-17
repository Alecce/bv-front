import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {forkJoin, of, ReplaySubject} from 'rxjs';
import {SuperComponentWithTabsComponent} from '@src/app/schemas/super-component-with-tabs/super-component-with-tabs.component';
import {languagesContent} from '@src/environments/languages';
import {LoadingServiceService} from '@src/app/services/loading-service.service';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {Title} from '@angular/platform-browser';
import {RequestsService} from '@src/app/services/api/requests.service';
import {SuccessService} from '@src/app/services/success.service';
import {VineyardBasicDesignedComponent} from '@src/app/vineyard-designed/vineyard-basic-designed/vineyard-basic-designed.component';
import {VineyardAdditionalDesignedComponent} from '@src/app/vineyard-designed/vineyard-additional-designed/vineyard-additional-designed.component';
import {VineyardMenuDesignedComponent} from '@src/app/vineyard-designed/vineyard-menu-designed/vineyard-menu-designed.component';
import {InputData} from '@src/app/business-designed/business-designed.component';

@Component({
  selector: 'app-vineyard-create-designed',
  templateUrl: './vineyard-create-designed.component.html',
  styleUrls: ['./vineyard-create-designed.component.css']
})
// @ts-ignore
export class VineyardCreateDesignedComponent extends SuperComponentWithTabsComponent implements OnInit, AfterViewInit {


  routeData = {editable: false, download: false, available: true};


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
  };
  tab = this.tabs.basic;
  childMap = new Map();

  // @ts-ignore
  @ViewChild(VineyardBasicDesignedComponent) basicTab: VineyardBasicDesignedComponent;
  // @ts-ignore
  @ViewChild(VineyardAdditionalDesignedComponent) additionalTab: VineyardAdditionalDesignedComponent;
  // @ts-ignore
  @ViewChild(VineyardMenuDesignedComponent) menuTab: VineyardMenuDesignedComponent;



  downloadedData = new ReplaySubject(10);
  additionalStructure = new ReplaySubject(10);
  structure = [];

  additionalTabsSubject = new ReplaySubject(10);
  currentSubTab = new ReplaySubject(10);
  menuData = null;

  subTabs = [];

  chosenSubTab = '';

  showNoValidation = false;

  constructor(
              private service: RequestsService,
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
    const req = {business_type: 'vineyard'};

    this.service.getConstructorStructure(req).subscribe((data: InputData[]) => {

      this.structure = data;
      this.additionalStructure.next(this.structure);

    });

    this.additionalTabsSubject.subscribe(tabs => {
// @ts-ignore
      this.subTabs = tabs;
    });
  }




  back() {
    if (this.langService.editable) {
      return;
    }
    this.router.navigate(['/vineyard/' + this.activatedroute.snapshot.params.id],
      {queryParams: {tab: this.activatedroute.snapshot.queryParamMap.get('tab')}});
  }
  backLink() {
    return '/vineyard/' + this.activatedroute.snapshot.params.id;
  }

  create() {
    const requestData = this.basicTab.getData();


// @ts-ignore
    requestData.menu = this.menuTab.getMenuData();
// @ts-ignore
    requestData.additional = this.additionalTab.getAdditionalData();
    console.log(requestData);

    if (!this.activatedroute.snapshot.data.download) {
      this.service.addVineyard(requestData).subscribe(data => {

        // @ts-ignore
        this.router.navigate(['/vineyard/' + data.id]);
      });
    } else {
      // @ts-ignore
      requestData.id = this.activatedroute.snapshot.params.id;
      this.service.editVineyard(requestData.id, requestData).subscribe(() => {

      });
    }



    if (!this.activatedroute.snapshot.data.download) {
      this.service.addVineyard(requestData).subscribe(data => {
// @ts-ignore
        if (data.id) {

          let imageLoading;
          let emblemLoading;

          if (this.basicTab.isImageChanged) {
            // @ts-ignore
            imageLoading = this.service.setImage('vineyard', data.id, this.basicTab.fileToUpload);
          } else {
            imageLoading = of(true);
          }

          if (this.basicTab.isImageChangedEmblem) {
            // @ts-ignore
            emblemLoading = this.service.setImage('vineyard-emblem', data.id, this.basicTab.fileToUploadEmblem);
          } else {
            emblemLoading = of(true);
          }

          forkJoin(
            [imageLoading, emblemLoading]
          ).subscribe((res) => {
            // @ts-ignore
            this.router.navigate(['/vineyard/' + data.id]);
          });

        }
      });
    } else {

      // @ts-ignore
      requestData.id = this.activatedroute.snapshot.params.id;
      this.service.editVineyard(requestData.id, requestData).subscribe(() => {

        let imageLoading;
        let emblemLoading;

        if (this.basicTab.isImageChanged) {
          imageLoading = this.service.setImage('vineyard', requestData.id, this.basicTab.fileToUpload);
        } else {
          imageLoading = of(true);
        }

        if (this.basicTab.isImageChangedEmblem) {
          emblemLoading = this.service.setImage('vineyard-emblem', requestData.id, this.basicTab.fileToUploadEmblem);
        } else {
          emblemLoading = of(true);
        }

        forkJoin(
          [imageLoading, emblemLoading]
        ).subscribe((res) => {
          // @ts-ignore
          // this.router.navigate(['/vineyard/' + data.id]);
        });
      });
    }
  }




  private checkEditable(userId) {
    this.accountService.getProfile.subscribe(profile => {

      console.log(userId);
// @ts-ignore
      console.log(profile.id);
      console.log(this.accountService.isAdmin());

// @ts-ignore
      if (userId && userId != profile.id && !this.accountService.isAdmin()) {

        this.router.navigate(['/vineyard/' + this.activatedroute.snapshot.params.id]);
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

    this.choseStartingTab(this.childMap, this.menuTab);

    if (this.activatedroute.snapshot.data.download) {
      // @ts-ignore
      this.routeData.download = true;

      const id = this.activatedroute.snapshot.params.id;

      this.service.getVineyard(id).subscribe(data => {

        let title = '';
        // @ts-ignore
        if(data.commoninfo.language == this.langService.language && data.commoninfo.name_national) {
          // @ts-ignore
          title = data.commoninfo.name_national + ' edit vineyard - bonvino.com';
        } else {
          // @ts-ignore
          title = data.commoninfo.name_international + ' edit vineyard - bonvino.com';
        }
        this.titleService.setTitle(title);


// @ts-ignore
        this.checkEditable(data.user);
        this.downloadedData.next(data);


        console.log(data);


      });
    } else {


      let title = 'Add vineyard - bonvino.com';
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
