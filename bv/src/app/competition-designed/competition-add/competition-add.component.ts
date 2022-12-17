import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {SuccessService} from '@src/app/services/success.service';
import {LoadingServiceService} from '@src/app/services/loading-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {HttpClient} from '@angular/common/http';
import {Title} from '@angular/platform-browser';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SuperComponentWithTabsComponent} from '@src/app/schemas/super-component-with-tabs/super-component-with-tabs.component';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {ReplaySubject} from 'rxjs';
import {CompetitionBasicComponent} from '@src/app/competition-designed/competition-basic/competition-basic.component';
import {CompetitionAdditionalComponent} from '@src/app/competition-designed/competition-additional/competition-additional.component';
import {CompetitionMenuComponent} from '@src/app/competition-designed/competition-menu/competition-menu.component';
import {CompetitionPossibleAwardsComponent} from '@src/app/competition-designed/competition-possible-awards/competition-possible-awards.component';

@Component({
  selector: 'app-competition-add',
  templateUrl: './competition-add.component.html',
  styleUrls: ['./competition-add.component.css']
})
// @ts-ignore
export class CompetitionAddComponent extends SuperComponentWithTabsComponent implements OnInit, AfterViewInit {

  routeData = {editable: false, download: false, available: true};

  tabs = {
    basic: 'basic',
    awards: 'awards',
    additional: 'additional',
    menu: 'menu',
    wines: 'wines',
  };
  tab = this.tabs.basic;
  childMap = new Map();

  // @ts-ignore
  @ViewChild(CompetitionBasicComponent) basicTab: CompetitionBasicComponent;
  // @ts-ignore
  @ViewChild(CompetitionPossibleAwardsComponent) awardsTab: CompetitionPossibleAwardsComponent;
  // @ts-ignore
  @ViewChild(CompetitionAdditionalComponent) additionalTab: CompetitionAdditionalComponent;
  // @ts-ignore
  @ViewChild(CompetitionMenuComponent) menuTab: CompetitionMenuComponent;
  // // @ts-ignore
  // @ViewChild(WineListDesignedComponent) winesTab: WineListDesignedComponent;


  downloadedData = new ReplaySubject(10);
  fullDownloadedData = new ReplaySubject(10);
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

    const req = {business_type: 'competition'};

    this.service.getConstructorStructure(req).subscribe((data: InputData[]) => {

      this.structure = data;
      this.additionalStructure.next(this.structure);

    });

    this.additionalTabsSubject.subscribe(tabs => {
// @ts-ignore
      this.subTabs = tabs;
    });
  }

  ngAfterViewInit(): void {

    this.activatedroute.data.subscribe(data => {
      if (data.download) {
        this.routeData.download = true;
      }
    });

    this.childMap.set(this.tabs.basic, this.basicTab);
    this.childMap.set(this.tabs.awards, this.awardsTab);
    this.childMap.set(this.tabs.additional, this.additionalTab);
    this.childMap.set(this.tabs.menu, this.menuTab);
    // this.childMap.set(this.tabs.wines, this.winesTab);

    this.choseStartingTab(this.childMap, this.menuTab);


    if (this.activatedroute.snapshot.data.download) {
      // @ts-ignore
      this.routeData.download = true;

      const id = this.activatedroute.snapshot.params.id;

      this.service.getCompetition(id).subscribe(data => {

        let title = '';
        // @ts-ignore
        if(data.competition.commoninfo.language == this.langService.language && data.competition.commoninfo.name_national) {
          // @ts-ignore
          title = data.competition.commoninfo.name_national + ' edit competition - bonvino.com';
        } else {
          // @ts-ignore
          title = data.competition.commoninfo.name_international + ' edit competition - bonvino.com';
        }
        this.titleService.setTitle(title);


// @ts-ignore
        this.checkEditable(data.competition.user);
// @ts-ignore
        this.downloadedData.next(data.competition);
// @ts-ignore
        this.fullDownloadedData.next(data);


        console.log(data);


      });
    } else {


      let title = 'Add competition - bonvino.com';
      this.titleService.setTitle(title);
    }
    this.menuData = this.menuTab.getMenuForm();
  }

  saveAwards(data) {
    this.basicTab.prizes.value.forEach((prize, i) => {

// @ts-ignore
      const award = data.awards.filter(x => {
        return x.timestamp == prize.timestamp;
      });

      let awardId = null;
      if(award.length) {
        awardId = award[0].id;
      }

      if(prize.isImageChanged && awardId) {

// @ts-ignore
        this.service.setImage('awards', awardId, prize.fileToUpload).subscribe(() => {});

      }
    });
  }

  create() {
    const requestData = this.basicTab.getData();


// @ts-ignore
    requestData.menu = this.menuTab.getMenuData();
// @ts-ignore
    requestData.awards = this.awardsTab.getAwardData();
// @ts-ignore
    requestData.additional = this.additionalTab.getAdditionalData();
    console.log(requestData);

    if (!this.activatedroute.snapshot.data.download) {
      this.service.addCompetition(requestData).subscribe(data => {

        this.saveAwards(data);
      });
    } else {
      // @ts-ignore
      requestData.id = this.activatedroute.snapshot.params.id;
      this.service.editCompetition(requestData).subscribe((data) => {

        this.saveAwards(data);
//         if (this.basicTab.isImageChanged) {
// // @ts-ignore
//           this.service.setImage('event', requestData.id, this.basicTab.fileToUpload).subscribe(() => {
//           });
//         }
      });
    }
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

  private checkEditable(userId) {
    this.accountService.getProfile.subscribe(profile => {
// @ts-ignore
      if (userId && userId != profile.id && !this.accountService.isAdmin()) {

        this.router.navigate(['/competition/' + this.activatedroute.snapshot.params.id]);
        this.successService.showError();
      }
    });
  }
  backLink() {
    return '/competition/' + this.activatedroute.snapshot.params.id;
  }
  grantAwardsLink() {
    return '/grant-awards/' + this.activatedroute.snapshot.params.id;
  }

}
