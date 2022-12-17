import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {SuperComponentWithTabsComponent} from '../../schemas/super-component-with-tabs/super-component-with-tabs.component';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingServiceService} from '../../services/loading-service.service';
import {RequestsService} from '../../services/api/requests.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LanguageServiceService} from '../../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {forkJoin, of, ReplaySubject} from 'rxjs';
import {WineryBasicComponent} from '../winery-basic/winery-basic.component';
import {WineryAdditionalComponent} from '../winery-additional/winery-additional.component';
import {WineriesMenuComponent} from '../wineries-menu/wineries-menu.component';
import {InputData} from '../../business-designed/business-designed.component';
import {AccountServiceService} from '../../services/account-service.service';
import {SuccessService} from '../../services/success.service';
// import {Subject} from 'angular2-yandex-maps/lib/rxjs';
import {AdditionalServiceService} from '@src/app/services/additional-service.service';
import {Title} from '@angular/platform-browser';
import {WineriesSecondComponent} from '@src/app/wineries-designed/wineries-second/wineries-second.component';

@Component({
  selector: 'app-winery-add',
  templateUrl: './winery-add.component.html',
  styleUrls: ['./winery-add.component.css']
})
// @ts-ignore
export class WineryAddComponent extends SuperComponentWithTabsComponent implements OnInit, AfterViewInit {

  @Input() logReload;
  @Input() historyId;
  @Input() wineryDataInput;
  @Input() historyTimestamp;
  routeData = {editable: false, download: false, available: true};
  downloadedData = new ReplaySubject(10);
  additionalStructure = new ReplaySubject(10);
  structure = [];

  additionalTabsSubject = new ReplaySubject(10);
  currentSubTab = new ReplaySubject(10);
  menuData = null;
  wineryDeleted = false;
  userId = null;
  showNoValidation = false;


  // @ts-ignore
  @ViewChild(WineryBasicComponent) basicTab: WineryBasicComponent;
  // @ts-ignore
  @ViewChild(WineriesSecondComponent) secondTab: WineriesSecondComponent;
  // @ts-ignore
  @ViewChild(WineryAdditionalComponent) additionalTab: WineryAdditionalComponent;
  // @ts-ignore
  @ViewChild(WineriesMenuComponent) menuTab: WineriesMenuComponent;

  tabs = {
    basic: 'basic',
    second: 'second',
    additional: 'additional',
    menu: 'menu',
  };

  subTabs = [];
  tab = this.tabs.menu;
  childMap = new Map();

  chosenSubTab = '';

  // @ts-ignore
  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private router: Router,
              public langService: LanguageServiceService,
              private accountService: AccountServiceService,
              private successService: SuccessService,
              private snackBar: MatSnackBar,
              public loadingService: LoadingServiceService,
              private titleService: Title,
              private additionalService: AdditionalServiceService) {
    super(service,
      activatedroute,
      cookieService,
      router,
      langService,
      snackBar);

  }

  ngOnInit() {

    this.switchListerner.subscribe(x => {
      this.basicTab.reloadMap();
    });

    const id = this.activatedroute.snapshot.params.id;

    // console.log(this.activatedroute.snapshot.data);

    if (this.activatedroute.snapshot.data.download) {
      this.routeData.download = true;
      let getWinery;
      if(this.wineryDataInput) {
        getWinery = this.wineryDataInput;
      } else {
        getWinery = this.service.getWinery(id);
      }

      getWinery.subscribe(data => {

        let title = '';
        // @ts-ignore
        if(data.commoninfo.language == this.langService.language && data.commoninfo.name_national) {
          // @ts-ignore
          title = data.commoninfo.name_national + ' edit winery - bonvino.com';
        } else {
          // @ts-ignore
          title = data.commoninfo.name_international + ' edit winery - bonvino.com';
        }
        this.titleService.setTitle(title);

// @ts-ignore
        this.wineryDeleted = data.deleted;
// @ts-ignore
        this.userId = data.user;

        if (this.wineryDeleted) {
          return;
        }
        // console.log(data);
        this.downloadedData.next(data);
// @ts-ignore
        this.checkEditable(data.user);
      });
    } else {


      let title = 'Add winery - bonvino.com';
      this.titleService.setTitle(title);
    }


    const req = {business_type: 'winery'};

    this.service.getConstructorStructure(req).subscribe((data: InputData[]) => {

      this.structure = data;
      this.additionalStructure.next(this.structure);

    });

    this.additionalTabsSubject.subscribe(tabs => {
// @ts-ignore
      this.subTabs = tabs;
    });

  }


  private checkEditable(userId) {
    this.accountService.getProfile.subscribe(profile => {
// @ts-ignore
      if (this.accountService.isNoUser() || (userId && userId != profile.id && !this.accountService.isAdmin())) {

        this.router.navigate(['/winery/' + this.activatedroute.snapshot.params.id]);
        this.successService.showError();
      }
    });
  }

  getTabColor(tab) {


    if (this.chosenTab == tab) {
      return 'btn-menu-selected menu-2-active';
    } else {
      return '';
    }
    // if (this.chosenTab == tab) {
    //   return 'btn-secondary';
    // } else {
    //   return 'btn-info';
    // }
  }

  getSubTabColor(subTab) {


    if (this.chosenTab == this.tabs.additional && this.chosenSubTab == subTab) {
      return 'btn-menu-selected menu-2-active';
    } else {
      return '';
    }
  }


  // isSubTabExist(subTab) {
  //
  //
  //   return this.additionalService.getStructureForTab(this.structure, this.subTab);
  // }

  choseSubtab(subTab) {
    this.chosenSubTab = subTab;
    this.currentSubTab.next(subTab);
  }

  showTab(tab) {
    return this.chosenTab == tab;
  }


  editWineryHistory() {
    this.service.editWineryHistory({wineryId: this.activatedroute.snapshot.params.id}).subscribe();
  }


  deleteWinery() {
    this.service.deleteWinery({wineryId: this.activatedroute.snapshot.params.id}).subscribe(() => {
      location.reload();
    });
  }

  restoreWinery() {
    this.service.restoreWinery({wineryId: this.activatedroute.snapshot.params.id}).subscribe(() => {
      location.reload();
    });
  }


  getFormData() {

    const formsData = this.basicTab.getBasicData();

// @ts-ignore
    formsData.menu = this.menuTab.getMenuData();
// @ts-ignore
    formsData.additional = this.additionalTab.getAdditionalData();
// @ts-ignore
    formsData.picture = this.basicTab.isImageChanged;
// @ts-ignore
    formsData.emblem = this.basicTab.isImageChangedEmblem;
// @ts-ignore
    formsData.series = this.secondTab.getSeriesData();


    if (this.activatedroute.snapshot.data.download) {
// @ts-ignore
      formsData.wineryId = this.activatedroute.snapshot.params.id;
    }

    return formsData;
  }

  saveHistory() {
    let formsData = this.getFormData();
    let setImage;
    let setEmblem;

    if (this.basicTab.isImageChanged) {
// @ts-ignore
      setImage = this.service.setImageNoDB('wineries', formsData.wineryId, this.basicTab.fileToUpload);
    } else {
      setImage = of(false);
    }
    if (this.basicTab.isImageChangedEmblem) {
// @ts-ignore
      setEmblem = this.service.setImageNoDB('winery-emblem', formsData.wineryId, this.basicTab.fileToUploadEmblem);
    } else {
      setEmblem = of(false);
    }


    forkJoin([setImage, setEmblem]).subscribe(results => {

      console.log(results);
      if(results[0]) {
        // @ts-ignore
        this.basicTab.setImage(results[0].timestamp);
      }
      if(results[1]) {
        // @ts-ignore
        this.basicTab.setEmblem(results[1].timestamp);
      }

      formsData = this.getFormData();

      if(this.historyTimestamp) {
// @ts-ignore
        formsData.timestamp = new Date(this.historyTimestamp.value).getTime() / 1000;
// @ts-ignore
        formsData.id = this.historyId;
      }

      this.service.editWineryHistory(formsData).subscribe(() => {
        this.logReload.next(true);
      });
    });




  }
  create() {

    console.log(this.basicTab.country)

    if(this.isInvalid()) {
      this.showNoValidation = true;
      return;
    }



    const formsData = this.getFormData();


    if (!this.activatedroute.snapshot.data.download) {
      this.service.addWinery(formsData).subscribe(data => {
// @ts-ignore
        if (data.id) {


          if (this.basicTab.isImageChanged) {
// @ts-ignore
            this.service.setImage('wineries', data.id, this.basicTab.fileToUpload).subscribe(() => {
              // this.service.setWineImage(this.image.fileToUpload, data.id).subscribe(() => {
              // @ts-ignore

              if (this.basicTab.isImageChangedEmblem) {
// @ts-ignore
                this.service.setImage('winery-emblem', data.id, this.basicTab.fileToUploadEmblem).subscribe(() => {

// @ts-ignore
                  this.router.navigate(['/winery/' + data.id]);
                });
              }
// @ts-ignore
              this.router.navigate(['/winery/' + data.id]);
            });
          } else {

            if (this.basicTab.isImageChangedEmblem) {
// @ts-ignore
              this.service.setImage('winery-emblem', data.id, this.basicTab.fileToUploadEmblem).subscribe(() => {

// @ts-ignore
                this.router.navigate(['/winery/' + data.id]);
              });
            }
            // @ts-ignore
            this.router.navigate(['/winery/' + data.id]);
          }
// @ts-ignore
//           this.router.navigate(['/winery/' + data.id]);
        }
      });
    } else {
      this.service.editWinery(formsData).subscribe(() => {
        if (this.basicTab.isImageChanged) {
// @ts-ignore
          this.service.setImage('wineries', formsData.wineryId, this.basicTab.fileToUpload).subscribe((timestamp) => {
            this.basicTab.setImage(timestamp);
          });
        }
        if (this.basicTab.isImageChangedEmblem) {
// @ts-ignore
          this.service.setImage('winery-emblem', formsData.wineryId, this.basicTab.fileToUploadEmblem).subscribe((timestamp) => {
            this.basicTab.setEmblem(timestamp);
          });
        }
      });
    }
  }

  back() {
    if (this.langService.editable) {
      return;
    }
    if (this.routeData.download) {
      this.router.navigate(['/winery/' + this.activatedroute.snapshot.params.id]);
    } else {
      this.router.navigate(['/wine-list/']);
    }
  }

  backLink() {
    if (this.routeData.download) {
      return '/winery/' + this.activatedroute.snapshot.params.id;
    } else {
      return '/wine-list/';
    }
  }

  wineryEditLink() {
    return '/winery-edit/' + this.activatedroute.snapshot.params.id;
  }

  historyLink() {
    return '/winery-history/' + this.activatedroute.snapshot.params.id;
  }

  changelogLink() {
    return '/winery-changelog/' + this.activatedroute.snapshot.params.id;
  }

  ngAfterViewInit(): void {
    this.childMap.set(this.tabs.basic, this.basicTab);
    this.childMap.set(this.tabs.second, this.secondTab);
    this.childMap.set(this.tabs.additional, this.additionalTab);
    this.childMap.set(this.tabs.menu, this.menuTab);
    this.menuData = this.menuTab.getMenuForm();

    this.choseStartingTab(this.childMap, this.menuTab);
  }

  isTabExist(tab) {
    const res = this.structure.filter(x => {
      return (x.tab == tab && this.menuTab && this.menuTab.getFormValue(x.block_name));
    });
    return res.length;
  }

  isInvalid() {
    return this.basicTab && this.basicTab.form.invalid;
  }
}
