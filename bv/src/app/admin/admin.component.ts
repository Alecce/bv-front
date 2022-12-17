import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {LanguageServiceService} from '../services/language-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../services/api/requests.service';
import {CookieService} from 'ngx-cookie-service';
import {ReplaySubject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SuperComponentWithTabsComponent} from '../schemas/super-component-with-tabs/super-component-with-tabs.component';
import {AdminUserlistComponent} from './admin-userlist/admin-userlist.component';
import {AdminWineComponent} from './admin-wine/admin-wine.component';
import {AdminService} from '../services/api/admin.service';
import {AdminWineryComponent} from './admin-winery/admin-winery.component';
import {AdminEventComponent} from './admin-event/admin-event.component';
import {AdminVineyardComponent} from './admin-vineyard/admin-vineyard.component';
import {AdminSpecialistComponent} from './admin-specialist/admin-specialist.component';
import {AdminKashrutComponent} from './admin-kashrut/admin-kashrut.component';
import {AdminQualityComponent} from './admin-quality/admin-quality.component';
import {AdminGrapesComponent} from './admin-grapes/admin-grapes.component';
import {AdminBiodynamicComponent} from './admin-biodynamic/admin-biodynamic.component';
import {AdminOrganicComponent} from './admin-organic/admin-organic.component';
import {AdminVeganComponent} from './admin-vegan/admin-vegan.component';
import {AdminAutodescriptionComponent} from './admin-autodescription/admin-autodescription.component';
import {AdminAutodescriptionCategoriesComponent} from './admin-autodescription-categories/admin-autodescription-categories.component';
import {AdminAutodescriptionOptionsComponent} from './admin-autodescription-options/admin-autodescription-options.component';
import {AdminWineMergingComponent} from './admin-wine-merging/admin-wine-merging.component';
import {AdminWineryMergingComponent} from './admin-winery-merging/admin-winery-merging.component';
import {AdminLanguageComponent} from './admin-language/admin-language.component';
import {AdminWinetypeComponent} from './admin-winetype/admin-winetype.component';
import {AdminWinesubtypeComponent} from './admin-winesubtype/admin-winesubtype.component';
import {AdminSparklingComponent} from './admin-sparkling/admin-sparkling.component';
import {AdminNongrapeComponent} from './admin-nongrape/admin-nongrape.component';
import {AdminCorkComponent} from './admin-cork/admin-cork.component';
import {AdminBarrelComponent} from './admin-barrel/admin-barrel.component';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {AdminPageConstructorPagelistComponent} from './admin-page-constructor-pagelist/admin-page-constructor-pagelist.component';
import {AdminPageConstructorBlocksComponent} from './admin-page-constructor-blocks/admin-page-constructor-blocks.component';
import {AdminPageConstructorBlocklistComponent} from './admin-page-constructor-blocklist/admin-page-constructor-blocklist.component';
import {AdminPageConstructorBlockoptionlistComponent} from './admin-page-constructor-blockoptionlist/admin-page-constructor-blockoptionlist.component';
import {AdminBarrelsizeComponent} from './admin-barrelsize/admin-barrelsize.component';
import {AdminRegionComponent} from './admin-region/admin-region.component';
import {AdminGrapeClonesComponent} from './admin-grape-clones/admin-grape-clones.component';
import {AdminWineimagesComponent} from './admin-wineimages/admin-wineimages.component';
import {AdminBottleComponent} from '@src/app/admin/admin-bottle/admin-bottle.component';
import {BlocksConstructorComponent} from '@src/app/admin/blocks-constructor/blocks-constructor.component';
import {Title} from '@angular/platform-browser';
import {AdminVisitorsComponent} from '@src/app/admin/admin-visitors/admin-visitors.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
// @ts-ignore
export class AdminComponent extends SuperComponentWithTabsComponent implements OnInit, AfterViewInit {
  dowloadedData = new ReplaySubject(10);
  qwerty = 'qwerty';
  chosenTab;
  shareData = {};
  // @ts-ignore
  wineryData: ReplaySubject  = new ReplaySubject(1);
  childMap = new Map();

  routeData = {editable: false, download: false, available: true};

  // @ts-ignore
  @ViewChild(AdminUserlistComponent) userlist: AdminUserlistComponent;

  // @ts-ignore
  @ViewChild(AdminWineComponent) winelist: AdminWineComponent;

  // @ts-ignore
  @ViewChild(AdminWineryComponent) winerylist: AdminWineryComponent;

  // @ts-ignore
  @ViewChild(AdminEventComponent) eventlist: AdminEventComponent;

  // @ts-ignore
  @ViewChild(AdminVineyardComponent) vineyardlist: AdminVineyardComponent;

  // @ts-ignore
  @ViewChild(AdminSpecialistComponent) specialistlist: AdminSpecialistComponent;

  // @ts-ignore
  @ViewChild(AdminKashrutComponent) kashrutlist: AdminKashrutComponent;

  // @ts-ignore
  @ViewChild(AdminQualityComponent) qualitylist: AdminQualityComponent;

  // @ts-ignore
  @ViewChild(AdminRegionComponent) regionlist: AdminRegionComponent;

  // @ts-ignore
  @ViewChild(AdminGrapesComponent) grapeslist: AdminGrapesComponent;

  // @ts-ignore
  @ViewChild(AdminGrapeClonesComponent) grapeCloneslist: AdminGrapeClonesComponent;

  // @ts-ignore
  @ViewChild(AdminBiodynamicComponent) biodynamiclist: AdminBiodynamicComponent;

  // @ts-ignore
  @ViewChild(AdminOrganicComponent) organiclist: AdminOrganicComponent;

  // @ts-ignore
  @ViewChild(AdminVeganComponent) veganlist: AdminVeganComponent;

  // @ts-ignore
  @ViewChild(AdminAutodescriptionComponent) autodescriptionlist: AdminAutodescriptionComponent;

  // @ts-ignore
  @ViewChild(AdminAutodescriptionCategoriesComponent) autodescriptionCategorylist: AdminAutodescriptionCategoriesComponent;

  // @ts-ignore
  @ViewChild(AdminAutodescriptionOptionsComponent) autodescriptionOptionlist: AdminAutodescriptionOptionsComponent;

  // @ts-ignore
  @ViewChild(AdminWineMergingComponent) wineMerging: AdminWineMergingComponent;

  // @ts-ignore
  @ViewChild(AdminWineryMergingComponent) wineryMerging: AdminWineryMergingComponent;

  // @ts-ignore
  @ViewChild(AdminLanguageComponent) languagelist: AdminLanguageComponent;

  // @ts-ignore
  @ViewChild(AdminWinetypeComponent) winetypelist: AdminWinetypeComponent;

  // @ts-ignore
  @ViewChild(AdminWinesubtypeComponent) winesubtypelist: AdminWinesubtypeComponent;

  // @ts-ignore
  @ViewChild(AdminSparklingComponent) sparklinglist: AdminSparklingComponent;

  // @ts-ignore
  @ViewChild(AdminNongrapeComponent) nongrapelist: AdminNongrapeComponent;

  // @ts-ignore
  @ViewChild(AdminCorkComponent) corklist: AdminCorkComponent;

  // @ts-ignore
  @ViewChild(AdminBarrelComponent) barrellist: AdminBarrelComponent;

  // @ts-ignore
  @ViewChild(AdminBarrelsizeComponent) barrelsizelist: AdminBarrelsizeComponent;

  // @ts-ignore
  @ViewChild(AdminBottleComponent) bottlelist: AdminBottleComponent;

  // @ts-ignore
  @ViewChild(AdminHomeComponent) homepage: AdminHomeComponent;

  // @ts-ignore
  @ViewChild(AdminPageConstructorPagelistComponent) constructorPages: AdminPageConstructorPagelistComponent;

  // @ts-ignore
  @ViewChild(AdminPageConstructorBlocksComponent) constructorBlocks: AdminPageConstructorBlocksComponent;

  // @ts-ignore
  @ViewChild(AdminPageConstructorBlocklistComponent) constructorPageBlocks: AdminPageConstructorBlocklistComponent;

  // @ts-ignore
  @ViewChild(AdminPageConstructorBlockoptionlistComponent) constructorBlockOptions: AdminPageConstructorBlockoptionlistComponent;

  // @ts-ignore
  @ViewChild(AdminWineimagesComponent) wineImages: AdminWineimagesComponent;

  // @ts-ignore
  @ViewChild(BlocksConstructorComponent) blocksConstructor: BlocksConstructorComponent;

  // @ts-ignore
  @ViewChild(AdminVisitorsComponent) visitors: AdminVisitorsComponent;

  constructor(
    private service: RequestsService,
    private adminService: AdminService,
    public activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router,
    public langService: LanguageServiceService,
    private titleService: Title,
    private snackBar: MatSnackBar
  ) {
    super(
      service,
      activatedroute,
      cookieService,
      router,
      langService,
      snackBar
    );
  }

  ngOnInit() {

    let title = 'Admin page - bonvino.com';
    this.titleService.setTitle(title);

  }

  ngAfterViewInit(): void {

    this.adminService.getAdminOptions();

    this.childMap.set(this.userlist.tab, this.userlist);
    this.childMap.set(this.winelist.tab, this.winelist);
    this.childMap.set(this.winerylist.tab, this.winerylist);
    this.childMap.set(this.eventlist.tab, this.eventlist);
    this.childMap.set(this.vineyardlist.tab, this.vineyardlist);

    this.childMap.set(this.specialistlist.tab, this.specialistlist);
    this.childMap.set(this.kashrutlist.tab, this.kashrutlist);
    this.childMap.set(this.qualitylist.tab, this.qualitylist);
    this.childMap.set(this.regionlist.tab, this.regionlist);
    this.childMap.set(this.grapeslist.tab, this.grapeslist);
    this.childMap.set(this.grapeCloneslist.tab, this.grapeCloneslist);
    this.childMap.set(this.biodynamiclist.tab, this.biodynamiclist);
    this.childMap.set(this.organiclist.tab, this.organiclist);
    this.childMap.set(this.veganlist.tab, this.veganlist);
    this.childMap.set(this.autodescriptionlist.tab, this.autodescriptionlist);
    this.childMap.set(this.autodescriptionCategorylist.tab, this.autodescriptionCategorylist);
    this.childMap.set(this.autodescriptionOptionlist.tab, this.autodescriptionOptionlist);

    this.childMap.set(this.wineryMerging.tab, this.wineryMerging);
    this.childMap.set(this.wineMerging.tab, this.wineMerging);
    this.childMap.set(this.languagelist.tab, this.languagelist);
    this.childMap.set(this.winetypelist.tab, this.winetypelist);
    this.childMap.set(this.winesubtypelist.tab, this.winesubtypelist);
    this.childMap.set(this.sparklinglist.tab, this.sparklinglist);
    this.childMap.set(this.nongrapelist.tab, this.nongrapelist);
    this.childMap.set(this.corklist.tab, this.corklist);
    this.childMap.set(this.barrellist.tab, this.barrellist);
    this.childMap.set(this.barrelsizelist.tab, this.barrelsizelist);


    this.childMap.set(this.homepage.tab, this.homepage);
    this.childMap.set(this.constructorPages.tab, this.constructorPages);
    this.childMap.set(this.constructorBlocks.tab, this.constructorBlocks);
    this.childMap.set(this.constructorPageBlocks.tab, this.constructorPageBlocks);
    this.childMap.set(this.constructorBlockOptions.tab, this.constructorBlockOptions);
    this.childMap.set(this.wineImages.tab, this.wineImages);
    this.childMap.set(this.bottlelist.tab, this.bottlelist);
    this.childMap.set(this.blocksConstructor.tab, this.blocksConstructor);
    this.childMap.set(this.visitors.tab, this.visitors);


    this.routeData.download = this.activatedroute.snapshot.data.download;
    this.routeData.editable = this.activatedroute.snapshot.data.editable;
    console.log(this.activatedroute.snapshot.queryParamMap);
    this.choseStartingTab(this.childMap, this.userlist);

  }

}
