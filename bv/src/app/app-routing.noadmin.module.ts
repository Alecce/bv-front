import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {RegistrationComponent} from './registration/registration.component';
import {Page404Component} from './page404/page404.component';
import {WinesDesignedComponent} from './wines-designed/wines-designed.component';
import {EventListDesignedComponent} from './lists/event-list-designed/event-list-designed.component';
import {EventOneComponent} from './event-designed/event-one/event-one.component';
import {EventDesignedCreateComponent} from './event-designed/event-designed-create/event-designed-create.component';
import {ProfileDesignedComponent} from './profile-designed/profile-designed.component';
import {ShopDesignedComponent} from './shop-designed/shop-designed.component';
import {BlankpageComponent} from './blankpage/blankpage.component';
import {ProfileViewComponent} from './profile-designed/profile-view/profile-view.component';
import {BusinessDesignedComponent} from './business-designed/business-designed.component';
import {BusinessDesignedOneComponent} from './business-designed/business-designed-one/business-designed-one.component';
import {WineryAddComponent} from './wineries-designed/winery-add/winery-add.component';
import {ShopDesignedOneComponent} from './shop-designed/shop-designed-one/shop-designed-one.component';
import {WineryHistoryComponent} from 'src/app/wineries-designed/winery-history/winery-history.component';
import {WineryChangelogComponent} from 'src/app/wineries-designed/winery-changelog/winery-changelog.component';
import {WineChangelogComponent} from 'src/app/wines-designed/wine-changelog/wine-changelog.component';
import {VineyardCreateDesignedComponent} from 'src/app/vineyard-designed/vineyard-create-designed/vineyard-create-designed.component';
import {CompetitionAddComponent} from 'src/app/competition-designed/competition-add/competition-add.component';
import {CompetitionOneComponent} from 'src/app/competition-designed/competition-one/competition-one.component';
import {WineOneUniversalComponent} from 'src/app/wines-designed/wine-one-universal/wine-one-universal.component';
import {CompetitionGrantAwardsComponent} from 'src/app/competition-designed/competition-grant-awards/competition-grant-awards.component';
import {WineryListDesignedComponent} from 'src/app/lists/winery-list-designed/winery-list-designed.component';
import {WinesShortDesignedComponent} from 'src/app/wines-designed/wines-short-designed/wines-short-designed.component';
import {WineryShortComponent} from 'src/app/wineries-designed/winery-short/winery-short.component';
import {VineyardOneShortComponent} from 'src/app/vineyard-designed/vineyard-one-short/vineyard-one-short.component';
import {WineListDesignedBComponent} from "@src/app/lists/wine-list-designed-b/wine-list-designed-b.component";
import {BusinessListDesignedComponent} from "@src/app/lists/business-list-designed/business-list-designed.component";
import {MultiviewComponent} from "./schemas/multiview/multiview.component";


const routes: Routes = [

  // {
  //   path: 'test',
  //   component: BlocksConstructorComponent,
  // },

  // {
  //   path: 'business-search',
  //   component: AdditionalListDesignedComponent,
  // },

  // technical page. Do not delete - Engine use this page for routing.
  {
    path: 'blank',
    component: BlankpageComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    data: {editable: true, download: false}
  },
  {
    path: 'profile/:id',
    component: ProfileViewComponent,
    data: {editable: false, download: true}
  },
  {
    path: 'profile-edit/:id',
    component: ProfileDesignedComponent,
    data: {editable: true, download: true}
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'shop/:id',
    component: ShopDesignedOneComponent,
    data: {editable: true, download: true},
  },
  {
    path: 'shop-edit/:id',
    component: ShopDesignedComponent,
    data: {editable: true, download: true},
  },
  {
    path: 'shop-add',
    component: ShopDesignedComponent,
    data: {editable: true, download: false},
  },
  {
    path: 'competition/:id',
    component: CompetitionOneComponent,
    data: {editable: true, download: true},
  },
  {
    path: 'grant-awards/:id',
    component: CompetitionGrantAwardsComponent,
    data: {editable: true, download: true},
  },
  {
    path: 'competition-edit/:id',
    component: CompetitionAddComponent,
    data: {editable: true, download: true},
  },
  {
    path: 'competition-add',
    component: CompetitionAddComponent,
    data: {editable: true, download: false},
  },
  {
    path: 'wine-list',
    component: WineListDesignedBComponent,
    data: {editable: true, download: false, isWineList: true},
  },
  {
    path: 'wine/:id',
    component: WinesShortDesignedComponent,
    data: {editable: true, download: false, showOptions: true},
  },
  // {
  //   path: 'wine/:id',
  //   component: MultiviewComponent,
  //   data: {editable: true, download: false, showOptions: true},
  // },
  {
    path: 'wine-translate-full/:id',
    component: WineOneUniversalComponent,
    data: {editable: true, download: false, showOptions: true},
  },
  {
    path: 'event-wine-list/:id',
    component: WineListDesignedBComponent,
    data: {editable: true, download: false, special: 'event'},
  },
  // {
  //   path: 'wine/:id',
  //   component: WineListDesignedComponent,
  //   data: {editable: false, download: true, showWine: true},
  // },
  // {
  //   path: 'wine-full/:id',
  //   component: WinesFullDesignedComponent,
  //   data: {editable: false, download: true},
  // },
  {
    path: 'wine-edit/:id',
    // component: WinesDesignedComponent,
    loadChildren: () => import('./wines-designed/wines-designed.module').then(m => m.WinesDesignedModule),
    data: {editable: true, download: true}
  },
  {
    path: 'wines-add/:id',
    // component: WinesDesignedComponent,
    loadChildren: () => import('./wines-designed/wines-designed.module').then(m => m.WinesDesignedModule),
    data: {editable: true, download: false},
  },
  {
    path: 'wine-changelog/:id',
    component: WineChangelogComponent,
    data: {editable: true, download: true},
  },
  {
    path: 'event/:id',
    component: EventOneComponent,
    data: {editable: false, download: true},
  },
  {
    path: 'event-edit/:id',
    component: EventDesignedCreateComponent,
    data: {editable: true, download: true},
  },
  {
    path: 'event-add',
    component: EventDesignedCreateComponent,
    data: {editable: true, download: false},
  },
  // {
  //   path: 'winery-list',
  //   component: WireryListComponent
  // },
  {
    path: 'winery-list',
    component: WineryListDesignedComponent
  },
  // {
  //   path: 'winery/:id',
  //   component: WineListDesignedComponent,
  //   data: {editable: false, download: true, showWinery: true},
  // },
  {
    path: 'winery/:id',
    component: WineryShortComponent,
    data: {editable: true, download: false, showOptions: true},
  },
  {
    path: 'winery-edit/:id',
    // component: WineryAddComponent,
    loadChildren: () => import('./wineries-designed/winery-add/winery-add.module').then(m => m.WineryAddModule),
    data: {editable: true, download: true},
  },
  {
    path: 'winery-add',
    // component: WineryAddComponent,
    loadChildren: () => import('./wineries-designed/winery-add/winery-add.module').then(m => m.WineryAddModule),
    data: {editable: true, download: false},
  },
  {
    path: 'winery-history/:id',
    component: WineryHistoryComponent,
    data: {editable: true, download: true},
  },
  {
    path: 'winery-changelog/:id',
    component: WineryChangelogComponent,
    data: {editable: true, download: true},
  },
  {
    path: 'business/:type/:id',
    component: BusinessDesignedOneComponent,
    data: {editable: true, download: true},
  },
  {
    path: 'business-edit/:type/:id',
    component: BusinessDesignedComponent,
    data: {editable: true, download: true},
  },
  {
    path: 'vineyard/:id',
    component: VineyardOneShortComponent,
    data: {editable: false, download: true, showOptions: true},
  },
  {
    path: 'vineyard-edit/:id',
    component: VineyardCreateDesignedComponent,
    data: {editable: true, download: true},
  },
  {
    path: 'vineyard-add',
    component: VineyardCreateDesignedComponent,
    data: {editable: true, download: false},
  },



  {
    path: 'my-business/:id',
    component: BusinessListDesignedComponent
  },
  // {
  //   path: 'award-list',
  //   component: AwardListComponent
  // },
  // {
  //   path: 'competition-list',
  //   component: CompetitionListComponent
  // },
  // {
  //   path: 'grape-list',
  //   component: GrapeListComponent
  // },
  // {
  //   path: 'kashrut-list',
  //   component: KashrutListComponent
  // },
  // {
  //   path: 'kashrut/:id',
  //   component: KashrutComponent,
  //   data: {editable: false, download: true},
  // },
  // {
  //   path: 'kashrut-edit/:id',
  //   component: KashrutComponent,
  //   data: {editable: true, download: true},
  // },
  // {
  //   path: 'kashrut-add',
  //   component: KashrutComponent,
  //   data: {editable: true, download: false},
  // },
  //
  // {
  //   path: 'biodinamic-list',
  //   component: BiodinamicListComponent
  // },
  // {
  //   path: 'biodinamic/:id',
  //   component: BiodinamicComponent,
  //   data: {editable: false, download: true},
  // },
  // {
  //   path: 'biodinamic-edit/:id',
  //   component: BiodinamicComponent,
  //   data: {editable: true, download: true},
  // },
  // {
  //   path: 'biodinamic-add',
  //   component: BiodinamicComponent,
  //   data: {editable: true, download: false},
  // },
  //
  // {
  //   path: 'organic-list',
  //   component: OrganicListComponent
  // },
  // {
  //   path: 'organic/:id',
  //   component: OrganicComponent,
  //   data: {editable: false, download: true},
  // },
  // {
  //   path: 'organic-edit/:id',
  //   component: OrganicComponent,
  //   data: {editable: true, download: true},
  // },
  // {
  //   path: 'organic-add',
  //   component: OrganicComponent,
  //   data: {editable: true, download: false},
  // },
  //
  // {
  //   path: 'vegan-list',
  //   component: VeganListComponent
  // },
  // {
  //   path: 'vegan/:id',
  //   component: VeganComponent,
  //   data: {editable: false, download: true},
  // },
  // {
  //   path: 'vegan-edit/:id',
  //   component: VeganComponent,
  //   data: {editable: true, download: true},
  // },
  // {
  //   path: 'vegan-add',
  //   component: VeganComponent,
  //   data: {editable: true, download: false},
  // },
  //
  // {
  //   path: 'quality-list',
  //   component: QualityListComponent
  // },
  // {
  //   path: 'quality/:id',
  //   component: QualityComponent,
  //   data: {editable: false, download: true},
  // },
  // {
  //   path: 'quality-edit/:id',
  //   component: QualityComponent,
  //   data: {editable: true, download: true},
  // },
  // {
  //   path: 'quality-add',
  //   component: QualityComponent,
  //   data: {editable: true, download: false},
  // },
  // {
  //   path: 'region-list',
  //   component: RegionListComponent
  // },
  // {
  //   path: 'specialist-list',
  //   component: SpecialistListComponent
  // },
  // {
  //   path: 'vineyard-list',
  //   component: VineyardListComponent
  // },
  // {
  //   path: 'user-list',
  //   component: UserListComponent
  // },
  {
    path: 'event-list',
    component: EventListDesignedComponent
  },
  // {
  //   path: 'business-list',
  //   component: BusinessListComponent
  // },
  {
    path: 'page404',
    component: Page404Component
  },
  {
    path: 'admin',
    // component: AdminComponent,

    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: {editable: true, download: true}
  },
  {
    path: '',
    redirectTo: '/wine-list',
    // component: WineListDesignedComponent,
    // data: {editable: true, download: false},
    pathMatch: 'full'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
