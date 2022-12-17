import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {WinesBasicDesignedComponent} from './wines-basic-designed/wines-basic-designed.component';
import {WinesAdvancedDesignedComponent} from './wines-advanced-designed/wines-advanced-designed.component';
import {WinesGrapesDesignedComponent} from './wines-grapes-designed/wines-grapes-designed.component';
import {SuperComponentWithTabsComponent} from '../schemas/super-component-with-tabs/super-component-with-tabs.component';
import {WinesServingDesignedComponent} from './wines-serving-designed/wines-serving-designed.component';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../services/api/requests.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LanguageServiceService} from '../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {WinesVoteDesignedComponent} from './wines-vote-designed/wines-vote-designed.component';
import {ReplaySubject} from 'rxjs';
import {LoadingServiceService} from '../services/loading-service.service';
import {WinesMenuDesignedComponent} from './wines-menu-designed/wines-menu-designed.component';
import {AccountServiceService} from '../services/account-service.service';
import {SuccessService} from '../services/success.service';
import {DescriptionGradesAddComponent} from '@src/app/wines-designed/description-grades-add/description-grades-add.component';
import {Title} from '@angular/platform-browser';
import {WineDescriptionComponent} from '@src/app/wines-designed/wine-description/wine-description.component';
import {WineAutodecriptionComponent} from '@src/app/wines-designed/wine-autodecription/wine-autodecription.component';

@Component({
  selector: 'app-wines-designed',
  templateUrl: './wines-designed.component.html',
  styleUrls: ['./wines-designed.component.css']
})
// @ts-ignore
export class WinesDesignedComponent extends SuperComponentWithTabsComponent implements OnInit, AfterViewInit {



  showNoValidation = false;
  downloadedData = new ReplaySubject(10);
  routeData = {editable: false, download: false, available: true};

  blancWinery = {
    additionalGrapes: [],
    additionalVineyards: [],
    kashruts: [],
    qualities: [],
    biodynamics: [],
    organics: [],
    vegans: [],
    series: [],
  };

  loading = false;

  // @ts-ignore
  @ViewChild(WinesMenuDesignedComponent) menuTab: WinesMenuDesignedComponent;
  // @ts-ignore
  @ViewChild(WinesBasicDesignedComponent) basicTab: WinesBasicDesignedComponent;
  // @ts-ignore
  @ViewChild(WinesAdvancedDesignedComponent) advancedTab: WinesAdvancedDesignedComponent;
  // @ts-ignore
  @ViewChild(WinesGrapesDesignedComponent) grapesTab: WinesGrapesDesignedComponent;
  // @ts-ignore
  @ViewChild(WinesServingDesignedComponent) servingTab: WinesServingDesignedComponent;
  // @ts-ignore
  @ViewChild(WinesVoteDesignedComponent) voteTab: WinesVoteDesignedComponent;
  // @ts-ignore
  @ViewChild(WineDescriptionComponent) textDescriptionTab: WineDescriptionComponent;
  // @ts-ignore
  @ViewChild(WineAutodecriptionComponent) autodescriptionTab: WineAutodecriptionComponent;
  // @ts-ignore
  @ViewChild(DescriptionGradesAddComponent) description: DescriptionGradesAddComponent;

  @Input() wineDataInput;
  tabs = {
    menu: 'menu',
    basic: 'basic',
    advanced: 'advanced',
    grapes: 'grapes',
    serving: 'serving',
    vote: 'vote',
    description: 'description',
    autodescription: 'autodescription',
    descriptionSelect: 'descriptionSelect',
  };
  tab = this.tabs.basic;
  childMap = new Map();

  tabsData = [
    {
      page: 'wines',
      default: 'Menu',
      tab: this.tabs.menu,
      onlyBusiness: false,
      disabledForYou: false,
      onlyAdmin: false,
    },
    {
      page: 'wines',
      place: 'basic_info',
      default: 'Basic info',
      tab: this.tabs.basic,
      onlyBusiness: false,
      disabledForYou: false,
      onlyAdmin: false,
    },
    {
      page: 'wines',
      place: 'advanced',
      default: 'Advanced features',
      tab: this.tabs.advanced,
      onlyBusiness: false,
      disabledForYou: false,
      onlyAdmin: false,
    },
    {
      page: 'wines',
      place: 'grapes',
      default: 'Grapes',
      tab: this.tabs.grapes,
      onlyBusiness: false,
      disabledForYou: false,
      onlyAdmin: false,
    },
    {
      page: 'wines',
      default: 'Serving',
      tab: this.tabs.serving,
      onlyBusiness: true,
      disabledForYou: false,
      onlyAdmin: false,
    },
    {
      page: 'wines',
      default: 'Description',
      tab: this.tabs.description,
      onlyBusiness: true,
      disabledForYou: false,
      onlyAdmin: false,
    },
    {
      page: 'wines',
      default: 'Text description generator',
      tab: this.tabs.autodescription,
      onlyBusiness: true,
      disabledForYou: false,
      onlyAdmin: true,
      specialCondition: true,
    },
    {
      page: 'wines',
      default: 'Text description',
      tab: this.tabs.descriptionSelect,
      onlyBusiness: false,
      disabledForYou: false,
      onlyAdmin: false,
    },
  ];

  tabSubject = new ReplaySubject(10);

  isWineryOwnerSubject = new ReplaySubject(10);
  isWineryOwner = false;


  descriptionsSubject = new ReplaySubject(10);
  generatedDescriptionSubject = new ReplaySubject(10);

  wineryCorrectlyLoaded = false;

  constructor(private service: RequestsService,
              public activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              private accountService: AccountServiceService,
              private successService: SuccessService,
              private router: Router,
              public langService: LanguageServiceService,
              private snackBar: MatSnackBar,
              private titleService: Title,
              public loadingService: LoadingServiceService) {
    super(service,
      activatedroute,
      cookieService,
      router,
      langService,
      snackBar);

  }

  ngOnInit() {
    this.isWineryOwnerSubject.subscribe(v => {
      // @ts-ignore
      this.isWineryOwner = v;

      console.log(v);

      if(!v) {
        this.tabsData.forEach(tab => {
          if(
            tab.tab == this.tabs.serving ||
            tab.tab == this.tabs.description ||
            tab.tab == this.tabs.autodescription
            // ||
            // tab.tab == this.tabs.descriptionSelect
          ){
            tab.onlyBusiness = true;
            tab.disabledForYou = true;
          }
        })


      } else {

        this.tabsData.forEach(tab => {
          if(
            tab.tab == this.tabs.serving ||
            tab.tab == this.tabs.description ||
            tab.tab == this.tabs.autodescription ||
            tab.tab == this.tabs.descriptionSelect
          ){
            tab.onlyBusiness = false;
            tab.disabledForYou = false;
          }
        })
      }
      console.log(this.tabsData);




    });

    this.tabSubject.subscribe(tab => {
      this.chosenTab = tab;
    });

    if (this.activatedroute.snapshot.data.download) {
      // @ts-ignore
      this.routeData.download = true;
      const id = this.activatedroute.snapshot.params.id;

      let getWine;
      if(this.wineDataInput) {
        getWine = this.wineDataInput;
      } else {
        getWine = this.service.getWine(id, {});
      }


      getWine.subscribe(ddata => {
        const data = JSON.parse(JSON.stringify(ddata));
        if(data) {
          let title = '';
          // @ts-ignore
          if(data.basic_designed.language == this.langService.language && data.basic_designed.name_national) {
            // @ts-ignore
            title = data.basic_designed.name_national + ' edit wine - bonvino.com';
          } else {
            // @ts-ignore
            title = data.basic_designed.name_international + ' edit wine - bonvino.com';
          }
          this.titleService.setTitle(title);

          this.downloadedData.next(data);

          // @ts-ignore
          if (data.user !== 0 && this.cookieService.get('myId') * 1 !== data.user * 1 && this.cookieService.get('sequrity') != 4) {
            this.routeData.available = false;
          }
// @ts-ignore
          this.checkEditable(data.user);
        }
      }, err => {

      });
    } else {


      let title = 'Add wine - bonvino.com';
      this.titleService.setTitle(title);
    }
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

  showTab(tab) {
    return this.chosenTab == tab;
  }


  back() {
    if (this.langService.editable) {
      return;
    }
    if (this.routeData.download) {
      this.router.navigate(['/wine/' + this.activatedroute.snapshot.params.id]);
    } else {
      this.router.navigate(['/wine-list/']);
    }
  }
  backLink() {
    if (this.routeData.download) {
      return '/wine/' + this.activatedroute.snapshot.params.id;
    } else {
      return '/wine-list/';
    }
  }
  changelogLink() {
    return '/wine-changelog/' + this.activatedroute.snapshot.params.id;
  }

  create() {
    if (this.langService.editable) {
      return;
    }

    if(this.isInvalid()) {
      this.showNoValidation = true;
      return;
    }

    this.loadingService.loading = true;


    const profPoints = this.basicTab.form.get('professional_points').value;
    const profPointsConfirmation = this.basicTab.form.get('professional_confirmation').value;
    // const profPointsDB = JSON.stringify(profPoints);

    const wrappingBD = JSON.stringify(this.advancedTab.form.get('wrappings').value);

    const dumpgrapeDB = JSON.stringify(this.grapesTab.form.get('grapesData').value);

    const barrelsDB = JSON.stringify(this.advancedTab.form.get('barrel_full').value);

    const competitionDB = JSON.stringify(this.advancedTab.form.get('competitions').value);

    const pressingDB = JSON.stringify(this.advancedTab.form.get('pressing').value);

    const palletDB = JSON.stringify(this.advancedTab.form.get('pallet').value);

    const descriptionDB = JSON.stringify(this.description.getFormData());

    const autodescription = JSON.stringify(this.autodescriptionTab.getSimpleFormValue());

    const textDescriptionDB = this.textDescriptionTab.getFormValue();

    const textDescriptionConfirmationDB = this.textDescriptionTab.getConfirmatonValue();

    const menuDB = this.menuTab.form.value;

    let grapelistDB = '';

    const grapeList = this.grapesTab.form.value.grapes;

    console.log(this.grapesTab.form.value);
    for (const key in grapeList) {
      if (grapeList[key]) {
        grapelistDB += `${key},`;
      }
    }

    if (grapelistDB) {
      grapelistDB = grapelistDB.slice(0, -1);
    }

    const additionalGrapes = [];
    const additionalGrapeSynonims = [];
    this.grapesTab.wineryGrapeList.forEach(x => {
      additionalGrapes.push(x.id * 1);
      additionalGrapeSynonims.push(x.synonim);
    });
    const additionalVineyards = [];
    this.grapesTab.wineryVineyardList.forEach(x => {
      additionalVineyards.push(x.id * 1);
    });


    const kashrutsDB = [];
    this.advancedTab.kashrutList.forEach(x => {
      kashrutsDB.push(x.id * 1);
    });
    const qualitiesDB = [];
    this.advancedTab.qualityList.forEach(x => {
      qualitiesDB.push(x.id * 1);
    });
    const biodynamicDB = [];
    this.advancedTab.biodynamicList.forEach(x => {
      biodynamicDB.push(x.id * 1);
    });
    const organicDB = [];
    this.advancedTab.organicList.forEach(x => {
      organicDB.push(x.id * 1);
    });
    const veganDB = [];
    this.advancedTab.veganList.forEach(x => {
      veganDB.push(x.id * 1);
    });

    const qualitiesWine = this.advancedTab.getQualitiesWine();
    const kashrutsWine = this.advancedTab.getKashrutsWine();
    const biodynamicWine = this.advancedTab.getBiodynamicWine();
    const organicWine = this.advancedTab.getOrganicWine();
    const veganWine = this.advancedTab.getVeganWine();

    // console.log(this.image.fileToUpload);
    const fd = new FormData();
    const formsData = {
      qualitiesWine,
      kashrutsWine,
      biodynamicWine,
      organicWine,
      veganWine,

      commoninfo: this.basicTab.getResult(),
      wineryinfo: this.basicTab.winery.value,
      advanced: this.advancedTab.form.value,
      grapes: this.grapesTab.getResult(),
      // description: this.description.form.value,
      instruction: this.servingTab.form.value,
      image: this.basicTab.isImageChanged,
      autodescription,
      profPoints,
      profPointsConfirmation,
      wrappingBD,
      dumpgrapeDB,
      pressingDB,
      palletDB,
      barrelsDB,
      grapelistDB,
      competitionDB,
      descriptionDB,
      textDescriptionDB,
      textDescriptionConfirmationDB,
      menuDB,
      qualitiesDB: JSON.stringify(qualitiesDB),
      kashrutsDB: JSON.stringify(kashrutsDB),
      biodynamicDB: JSON.stringify(biodynamicDB),
      organicDB: JSON.stringify(organicDB),
      veganDB: JSON.stringify(veganDB),
      additionalGrapes: JSON.stringify(additionalGrapes),
      additionalGrapeSynonims: JSON.stringify(additionalGrapeSynonims),
      additionalVineyards: JSON.stringify(additionalVineyards),

      wineryCorrectlyLoaded: this.wineryCorrectlyLoaded
      // confirmaition: this.getConfirmation(),
    };
    // console.log(formsData);


    if (!this.activatedroute.snapshot.data.download) {
      console.log(formsData);
      this.service.addWine(formsData).subscribe(data => {
// @ts-ignore
        if (data.id) {
          if (this.basicTab.isImageChanged) {
// @ts-ignore
            this.service.setImage('wineImages', data.id, this.basicTab.fileToUpload).subscribe(() => {
              // this.service.setWineImage(this.image.fileToUpload, data.id).subscribe(() => {
              // @ts-ignore
              this.router.navigate(['/wine/' + data.id]);
            });
          } else {
            // @ts-ignore
            this.router.navigate(['/wine/' + data.id]);
          }
        }
      });
    } else {
      // @ts-ignore
      formsData.wineId = this.activatedroute.snapshot.params.id;
      // console.log(formsData);
      this.service.editWine(formsData).subscribe(() => {

        if (this.basicTab.isImageChanged) {
          // this.service.setWineImage(this.image.fileToUpload, this.activatedroute.snapshot.params.id).subscribe();
          this.service.setImage('wineImages', this.activatedroute.snapshot.params.id, this.basicTab.fileToUpload).subscribe(() => {

            this.loadingService.loading = false;
          });
        } else {

          this.loadingService.loading = false;
        }
      });
    }

  }


  private checkEditable(userId) {
    this.accountService.getProfile.subscribe(profile => {
// @ts-ignore
      if (this.accountService.isNoUser() || (userId && userId != profile.id && !this.accountService.isAdmin())) {

        this.router.navigate(['/wine/' + this.activatedroute.snapshot.params.id]);
        this.successService.showError();
      }
    });
  }

  cloneWine() {
    this.service.cloneWine(this.activatedroute.snapshot.params.id).subscribe(result => {

// @ts-ignore
      this.router.navigate(['/wine/' + result.id]);
    })
  }

  ngAfterViewInit(): void {

    this.childMap.set(this.tabs.menu, this.menuTab);
    this.childMap.set(this.tabs.basic, this.basicTab);
    this.childMap.set(this.tabs.advanced, this.advancedTab);
    this.childMap.set(this.tabs.grapes, this.grapesTab);
    this.childMap.set(this.tabs.serving, this.servingTab);
    this.childMap.set(this.tabs.vote, this.voteTab);
    this.childMap.set(this.tabs.autodescription, this.autodescriptionTab);
    this.childMap.set(this.tabs.descriptionSelect, this.textDescriptionTab);
    this.childMap.set(this.tabs.description, this.description);


    this.choseStartingTab(this.childMap, this.basicTab);


    this.basicTab.winery.valueChanges.subscribe(winery => {
      this.wineryCorrectlyLoaded = false;
      if (winery == '') {

        this.grapesTab.reloadGrapes(this.blancWinery);
        this.advancedTab.reloadSertifications(this.blancWinery);
        this.basicTab.reloadBrands(this.blancWinery);


        this.accountService.getProfile.subscribe(() => {
          if(this.accountService.isAdmin()) {
            this.isWineryOwnerSubject.next(true);
          } else {

            this.isWineryOwnerSubject.next(false);
          }
        });


      } else {
        this.service.getWineryData(winery).subscribe(data => {
          // // @ts-ignore
          // this.wineryGrapeList = data.additionalGrapes;
          // // @ts-ignore
          // this.wineryVineyardList = data.additionalVineyards;
          if(this.accountService.isSameUser(data.wineryinfo.userid) || this.accountService.isAdmin()) {
            this.isWineryOwnerSubject.next(true);
          } else {
            this.isWineryOwnerSubject.next(false);
          }


          console.log(data);
          this.grapesTab.reloadGrapes(data);
          this.advancedTab.reloadSertifications(data);
          this.basicTab.reloadBrands(data);

          this.wineryCorrectlyLoaded = true;
        });
      }


    });


  }

  isInvalid() {
    return this.basicTab && this.basicTab.form.invalid;
  }


  isBigScreen() {
    return window.innerWidth > 1080
  }
}
