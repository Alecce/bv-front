import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from 'src/app/app-routing.noadmin.module';
import {AppComponent} from 'src/app/app.component';
import {LoginComponent} from 'src/app/login/login.component';
import {RegistrationPersonComponent} from 'src/app/registration-person/registration-person.component';
import {LogoutComponent} from 'src/app/logout/logout.component';
import {ProfileComponent} from 'src/app/profile/profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistrationComponent} from 'src/app/registration/registration.component';
import {RegistrationBusinessComponent} from 'src/app/registration-business/registration-business.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {UnauthComponent} from 'src/app/unauth/unauth.component';
import {PageComponent} from 'src/app/page/page.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  NgbCalendarHebrew,
  NgbDatepickerI18nHebrew,
  NgbDatepickerModule,
  NgbDropdownModule
} from '@ng-bootstrap/ng-bootstrap';
import {Page404Component} from 'src/app/page404/page404.component';
// import {TextComponent} from 'src/app/language/text-noadmin/text.component';
// import {LanguageNavigateComponent} from 'src/app/language/language-navigate/language-navigate.component';
import {AuthInterceptor} from 'src/app/services/auth-service/auth.interceptor';
// import {SuperimageComponent} from 'src/app/superimage/superimage.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions, MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
// import { SupermapComponent } from 'src/app/supermap/supermap.component';
// import { YandexGeolocationComponent } from 'src/app/yandex-geolocation/yandex-geolocation.component';
// import {YamapngModule, YaCoreModule} from 'yamapng';
// import {SuperComponentWithTabsComponent} from 'src/app/schemas/super-component-with-tabs/super-component-with-tabs.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {NavigationDesignedComponent} from 'src/app/navigation/navigation-designed/navigation-designed.component';
import {LoginDesignedComponent} from 'src/app/login/login-designed/login-designed.component';
import {AccauntDesignedComponent} from 'src/app/login/accaunt-designed/accaunt-designed.component';
import {LoginSubtableComponent} from 'src/app/login/login-subtable/login-subtable.component';
import {RegistrationSubtableComponent} from 'src/app/login/registration-subtable/registration-subtable.component';
import {WinesDesignedComponent} from 'src/app/wines-designed/wines-designed.component';
import {WinesBasicDesignedComponent} from 'src/app/wines-designed/wines-basic-designed/wines-basic-designed.component';
import {WinesAdvancedDesignedComponent} from 'src/app/wines-designed/wines-advanced-designed/wines-advanced-designed.component';
import {WinesGrapesDesignedComponent} from 'src/app/wines-designed/wines-grapes-designed/wines-grapes-designed.component';
import {WinesServingDesignedComponent} from 'src/app/wines-designed/wines-serving-designed/wines-serving-designed.component';
import {WinesVoteDesignedComponent} from 'src/app/wines-designed/wines-vote-designed/wines-vote-designed.component';
import {WineOneDesignedComponent} from 'src/app/wines-designed/wine-one-designed/wine-one-designed.component';
import {EventDesignedComponent} from 'src/app/event-designed/event-designed.component';
import {EventListDesignedComponent} from 'src/app/lists/event-list-designed/event-list-designed.component';
import {EventOneComponent} from 'src/app/event-designed/event-one/event-one.component';
// import { MapYandexDesignedComponent } from 'src/app/schemas/map-yandex-designed/map-yandex-designed.component';
import {EventDesignedCreateComponent} from 'src/app/event-designed/event-designed-create/event-designed-create.component';
import {WinesFullDesignedComponent} from 'src/app/wines-designed/wines-full-designed/wines-full-designed.component';
import {WineryOneDesignedComponent} from 'src/app/wineries-designed/winery-one-designed/winery-one-designed.component';
import {ProfileDesignedComponent} from 'src/app/profile-designed/profile-designed.component';
// import {PlaceOfOriginComponent} from 'src/app/schemas/place-of-origin/place-of-origin.component';
import {WineryInformationSubscreenComponent} from 'src/app/wineries-designed/winery-information-subscreen/winery-information-subscreen.component';
import {WineryContactsSubscreenComponent} from 'src/app/wineries-designed/winery-contacts-subscreen/winery-contacts-subscreen.component';
import {WineOneSubscreenComponent} from 'src/app/wines-designed/wine-one-subscreen/wine-one-subscreen.component';
import {WineryBasicComponent} from 'src/app/wineries-designed/winery-basic/winery-basic.component';
import {SuperlistDesignedComponent} from 'src/app/superlist-designed/superlist-designed.component';
// import {MapGoogleDesignedComponent} from 'src/app/schemas/map-google-designed/map-google-designed.component';
// import {SupermapGoogleComponent} from 'src/app/supermap-google/supermap-google.component';
import {ShopDesignedComponent} from 'src/app/shop-designed/shop-designed.component';
import {BusinessListDesignedComponent} from 'src/app/lists/business-list-designed/business-list-designed.component';
import {SpecialistSubscreenComponent} from 'src/app/lists/business-list-designed/specialist-subscreen/specialist-subscreen.component';
import {SuperTabComponent} from 'src/app/super-tab/super-tab.component';
import {BlankpageComponent} from 'src/app/blankpage/blankpage.component';
import {MainComponent} from 'src/app/main/main.component';
import {SuperSelectComponent} from 'src/app/lists/super-select/super-select.component';
import {WinesVoteSubscreenComponent} from 'src/app/wines-designed/wines-vote-subscreen/wines-vote-subscreen.component';
import {BusinessDesignedComponent} from 'src/app/business-designed/business-designed.component';
import {BusinessDescriptionSubscreenComponent} from 'src/app/lists/business-list-designed/business-description-subscreen/business-description-subscreen.component';
import {BusinessSubscreenComponent} from 'src/app/lists/business-list-designed/business-subscreen/business-subscreen.component';
// import {SelectBonvinoComponent} from 'src/app/schemas/select-bonvino/select-bonvino.component';
// import {SelectSearchBonvinoComponent} from 'src/app/schemas/select-search-bonvino/select-search-bonvino.component';
// import {CheckboxBonvinoComponent} from 'src/app/schemas/checkbox-bonvino/checkbox-bonvino.component';
// import {IconBonvinoComponent} from 'src/app/schemas/icon-bonvino/icon-bonvino.component';
// import {InputTimeBonvinoComponent} from 'src/app/schemas/input-time-bonvino/input-time-bonvino.component';
import {FooterComponent} from 'src/app/footer/footer.component';
import {ProfileViewComponent} from 'src/app/profile-designed/profile-view/profile-view.component';
// import {RadioBonvinoComponent} from 'src/app/schemas/radio-bonvino/radio-bonvino.component';
import {WinesStoreSubscreenComponent} from 'src/app/wines-designed/wines-store-subscreen/wines-store-subscreen.component';
// import {ScrollBonvinoComponent} from 'src/app/schemas/scroll-bonvino/scroll-bonvino.component';
import {InvalidDataErrorComponent} from 'src/app/services/invalid-data-error/invalid-data-error.component';
import {BusinessDesignedOneComponent} from 'src/app/business-designed/business-designed-one/business-designed-one.component';
// import {CheckboxGroupBonvinoComponent} from 'src/app/schemas/checkbox-group-bonvino/checkbox-group-bonvino.component';
import {WinesSimplestoreSubscreenComponent} from 'src/app/wines-designed/wines-simplestore-subscreen/wines-simplestore-subscreen.component';
import {WineriesMenuComponent} from 'src/app/wineries-designed/wineries-menu/wineries-menu.component';
import {WineryAdditionalComponent} from 'src/app/wineries-designed/winery-additional/winery-additional.component';
import {WineryAddComponent} from 'src/app/wineries-designed/winery-add/winery-add.component';
import {WineryAdditionalSubscreenComponent} from 'src/app/wineries-designed/winery-additional-subscreen/winery-additional-subscreen.component';
import {WinesMenuDesignedComponent} from 'src/app/wines-designed/wines-menu-designed/wines-menu-designed.component';
import {AutodescriptionDesignedComponent} from 'src/app/wines-designed/autodescription-designed/autodescription-designed.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {EventDesignedBasicComponent} from 'src/app/event-designed/event-designed-basic/event-designed-basic.component';
import {ShopDesignedOneComponent} from 'src/app/shop-designed/shop-designed-one/shop-designed-one.component';
import {ShopDesignedBasicComponent} from 'src/app/shop-designed/shop-designed-basic/shop-designed-basic.component';
import {ShopDesignedMenuComponent} from 'src/app/shop-designed/shop-designed-menu/shop-designed-menu.component';
import {ShopDesignedAdditionalComponent} from 'src/app/shop-designed/shop-designed-additional/shop-designed-additional.component';
import {ShopInformationSubscreenComponent} from 'src/app/shop-designed/shop-information-subscreen/shop-information-subscreen.component';
import {ShopContactsSubscreenComponent} from 'src/app/shop-designed/shop-contacts-subscreen/shop-contacts-subscreen.component';
import {EventDesignedAdditionalComponent} from 'src/app/event-designed/event-designed-additional/event-designed-additional.component';
import {EventDesignedMenuComponent} from 'src/app/event-designed/event-designed-menu/event-designed-menu.component';
// import {SearcherBonvinoComponent} from 'src/app/schemas/searcher-bonvino/searcher-bonvino.component';
import {AreYouSureComponent} from 'src/app/services/are-you-sure/are-you-sure.component';
import {AutoGeneratedComponent} from 'src/app/auto-generated/auto-generated.component';
// import {PopUpBonvinoComponent} from 'src/app/schemas/pop-up-bonvino/pop-up-bonvino.component';
import {HistoryComponent} from 'src/app/history/history.component';
import {VisitinghoursComponent} from 'src/app/visitinghours/visitinghours.component';
import {WineryDeletedComponent} from 'src/app/wineries-designed/winery-deleted/winery-deleted.component';
import {WineryChangelogComponent} from 'src/app/wineries-designed/winery-changelog/winery-changelog.component';
import {WineryHistoryComponent} from 'src/app/wineries-designed/winery-history/winery-history.component';
// import {MenuSchemaComponent} from 'src/app/schemas/menu-schema/menu-schema.component';
// import {AdditionalSchemaComponent} from 'src/app/schemas/additional-schema/additional-schema.component';
// import {AdditionalViewSchemaComponent} from 'src/app/schemas/additional-view-schema/additional-view-schema.component';
import {WineChangelogComponent} from 'src/app/wines-designed/wine-changelog/wine-changelog.component';
import {DescriptionGradesAddComponent} from 'src/app/wines-designed/description-grades-add/description-grades-add.component';
import {DescriptionGradesViewComponent} from 'src/app/wines-designed/description-grades-view/description-grades-view.component';
// import {TabsBarComponent} from 'src/app/schemas/tabs-bar/tabs-bar.component';
// import {ButtonRowComponent} from 'src/app/schemas/button-row/button-row.component';
// import {TemperatureInputBonvinoComponent} from 'src/app/schemas/temperature-input-bonvino/temperature-input-bonvino.component';
// import {TemperatureViewBonvinoComponent} from 'src/app/schemas/temperature-view-bonvino/temperature-view-bonvino.component';
// import {OriginInputBonvinoComponent} from 'src/app/schemas/origin-input-bonvino/origin-input-bonvino.component';
// import {OriginViewBonvinoComponent} from 'src/app/schemas/origin-view-bonvino/origin-view-bonvino.component';
// import {SubblockViewBonvinoComponent} from 'src/app/schemas/subblock-view-bonvino/subblock-view-bonvino.component';
// import {SubblockInputBonvinoComponent} from 'src/app/schemas/subblock-input-bonvino/subblock-input-bonvino.component';
// import {PersonSearchComponent} from 'src/app/schemas/person-search/person-search.component';
// import {PersonOneRowComponent} from 'src/app/schemas/person-one-row/person-one-row.component';
// import {LanguageListComponent} from 'src/app/language/language-list/language-list.component';
import {VineyardOneDesignedComponent} from 'src/app/vineyard-designed/vineyard-one-designed/vineyard-one-designed.component';
import {VineyardCreateDesignedComponent} from 'src/app/vineyard-designed/vineyard-create-designed/vineyard-create-designed.component';
import {VineyardBasicDesignedComponent} from 'src/app/vineyard-designed/vineyard-basic-designed/vineyard-basic-designed.component';
import {VineyardAdditionalDesignedComponent} from 'src/app/vineyard-designed/vineyard-additional-designed/vineyard-additional-designed.component';
import {VineyardMenuDesignedComponent} from 'src/app/vineyard-designed/vineyard-menu-designed/vineyard-menu-designed.component';
// import {TranscludeDirective} from 'src/app/language/text/transclude.directive';
// import {TextComplicatedComponent} from 'src/app/language/text-complicated/text-complicated.component';
import {WineriesSecondComponent} from 'src/app/wineries-designed/wineries-second/wineries-second.component';
import {CompetitionAddComponent} from 'src/app/competition-designed/competition-add/competition-add.component';
import {CompetitionOneComponent} from 'src/app/competition-designed/competition-one/competition-one.component';
import {CompetitionBasicComponent} from 'src/app/competition-designed/competition-basic/competition-basic.component';
import {CompetitionMenuComponent} from 'src/app/competition-designed/competition-menu/competition-menu.component';
import {CompetitionAdditionalComponent} from 'src/app/competition-designed/competition-additional/competition-additional.component';
// import {CompetitionSelectComponent} from 'src/app/schemas/competition-select/competition-select.component';
// import {CompetitionOneRowComponent} from 'src/app/schemas/competition-one-row/competition-one-row.component';
// import {AwardOneRowComponent} from 'src/app/schemas/award-one-row/award-one-row.component';
import {WineOneUniversalComponent} from 'src/app/wines-designed/wine-one-universal/wine-one-universal.component';
import {WineOneUniversalSubscreenComponent} from 'src/app/wines-designed/wine-one-universal-subscreen/wine-one-universal-subscreen.component';
// import {CompetitionWineSelectComponent} from 'src/app/schemas/competition-wine-select/competition-wine-select.component';
import {CompetitionGrantAwardsComponent} from 'src/app/competition-designed/competition-grant-awards/competition-grant-awards.component';
import {WineryListDesignedComponent} from 'src/app/lists/winery-list-designed/winery-list-designed.component';
import {WinesShortDesignedComponent} from 'src/app/wines-designed/wines-short-designed/wines-short-designed.component';
import {CompetitionPossibleAwardsComponent} from 'src/app/competition-designed/competition-possible-awards/competition-possible-awards.component';
// import {ExistedSchemaFormComponent} from 'src/app/schemas/existed-schema-form/existed-schema-form.component';
import {WineryShortComponent} from 'src/app/wineries-designed/winery-short/winery-short.component';
import {WineryShortSubscreenComponent} from 'src/app/wineries-designed/winery-short-subscreen/winery-short-subscreen.component';
import {EventShortDesignedComponent} from 'src/app/event-designed/event-short-designed/event-short-designed.component';
import {EventShortSubscreenComponent} from 'src/app/event-designed/event-short-subscreen/event-short-subscreen.component';
// import {AdditionalSearchSchemaComponent} from 'src/app/schemas/additional-search-schema/additional-search-schema.component';
import {LoadingInterceptor} from 'src/app/services/loading/auth.interceptor';
// import {MapHiddenComponent} from 'src/app/schemas/map-hidden/map-hidden.component';
// import {MapSubscreenComponent} from 'src/app/schemas/map-subscreen/map-subscreen.component';
import {WineAutodecriptionComponent} from 'src/app/wines-designed/wine-autodecription/wine-autodecription.component';
import {WineDescriptionComponent} from 'src/app/wines-designed/wine-description/wine-description.component';
import {WineDescriptionSubscreenComponent} from 'src/app/wines-designed/wine-description-subscreen/wine-description-subscreen.component';
// import {FindWineComponent} from 'src/app/schemas/find-wine/find-wine.component';
// import {BengatContactsComponent} from 'src/app/schemas/bengat-contacts/bengat-contacts.component';
// import {TitleComponent} from 'src/app/language/title/title.component';
import {WinesShopAddSubscreenComponent} from 'src/app/wines-designed/wines-shop-add-subscreen/wines-shop-add-subscreen.component';
// import {SubrouterComponent} from 'src/app/schemas/subrouter/subrouter.component';
// import {CalendarInputBonvinoComponent} from 'src/app/schemas/calendar-input-bonvino/calendar-input-bonvino.component';
import {VineyardSecondDesignedComponent} from 'src/app/vineyard-designed/vineyard-second-designed/vineyard-second-designed.component';
import {VineyardOneShortComponent} from 'src/app/vineyard-designed/vineyard-one-short/vineyard-one-short.component';
// import {DayOfWeekTimeBonvinoComponent} from 'src/app/schemas/day-of-week-time-bonvino/day-of-week-time-bonvino.component';
import {GrigorianComponent} from 'src/app/calendars/grigorian/grigorian.component';
import {JewishCalendarComponent} from 'src/app/calendars/jewish-calendar/jewish-calendar.component';
// import {CalendarViewBonvinoComponent} from 'src/app/schemas/calendar-view-bonvino/calendar-view-bonvino.component';
import {JewishCalendarViewComponent} from 'src/app/calendars/jewish-calendar-view/jewish-calendar-view.component';
import {CalendarViewComponent} from 'src/app/calendars/calendar-view/calendar-view.component';
import {CalendarSearchComponent} from 'src/app/calendars/calendar-search/calendar-search.component';
import {IslamicUmmAlQuraCalendarComponent} from "@src/app/calendars/islamic-umm-al-qura-calendar/islamic-umm-al-qura-calendar.component";
// import {GlassBonvinoComponent} from "@src/app/schemas/glass-bonvino/glass-bonvino.component";
// import {MapOpenLayersComponent} from "@src/app/schemas/map-open-layers/map-open-layers.component";
import {JalaliCalendarComponent} from "@src/app/calendars/jalali-calendar/jalali-calendar.component";
// import {LanguageNavigateMobileComponent} from "@src/app/language/language-navigate-mobile/language-navigate-mobile.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {WineListDesignedBComponent} from "@src/app/lists/wine-list-designed-b/wine-list-designed-b.component";
import {MenuMobileBonvinoComponent} from "@src/app/navigation/menu-mobile-bonvino/menu-mobile-bonvino.component";
import {BuddhistCalendarComponent} from "@src/app/calendars/buddhist-calendar/buddhist-calendar.component";
import {WineListNavigationComponent} from "@src/app/lists/wine-list-designed-b/wine-list-navigation/wine-list-navigation.component";
import {IslamicCalendarComponent} from "@src/app/calendars/islamic-calendar/islamic-calendar.component";
import {CollectorNavbarBonvinoComponent} from "@src/app/navigation/collector-navbar-bonvino/collector-navbar-bonvino.component";
import {SidebarButtonComponent} from "@src/app/navigation/sidebar-button/sidebar-button.component";
// import {SupermapOpenLayersComponent} from "@src/app/schemas/supermap-open-layers/supermap-open-layers.component";
import {WineListSearchbarComponent} from "@src/app/lists/wine-list-designed-b/wine-list-searchbar/wine-list-searchbar.component";
// import {LocationiqBonvinoComponent} from "@src/app/schemas/locationiq-bonvino/locationiq-bonvino.component";
import {OlMapComponent} from "@src/app/ol-map/ol-map.component";
// import {CenterMatmenuDirective} from "@src/app/schemas/glass-bonvino/center-matmenu.directive";
// import { AddButtonBonvinoComponent } from './schemas/add-button-bonvino/add-button-bonvino.component';
import {SchemasModule} from "./schemas/schemas.module";
import {LanguagePanelComponent} from "./language/language-panel/language-panel.component";
import { WinesDesignedModule } from './wines-designed/wines-designed.module';
import { WineryAddModule } from './wineries-designed/winery-add/winery-add.module';
import { MultiviewComponent } from './schemas/multiview/multiview.component';


@NgModule({
  declarations: [
    AppComponent,
    // NavigationComponent,
    LoginComponent,
    RegistrationPersonComponent,
    RegistrationBusinessComponent,
    LogoutComponent,
    ProfileComponent,
    RegistrationComponent,
    // WireryListComponent,
    UnauthComponent,
    PageComponent,
    // WineListComponent,
    // RegionListComponent,
    // VineyardListComponent,
    // KashrutListComponent,
    // GrapeListComponent,
    // QualityListComponent,
    // BottleListComponent,
    // CompetitionListComponent,
    // WinnerListComponent,
    // SpecialistListComponent,
    // AwardListComponent,
    // UserListComponent,
    // SuperlistComponent,
    // BusinessListComponent,
    // UserVotesListComponent,
    Page404Component,

    // TextComponent,
    // LanguageNavigateComponent,
    // SuperformComponent,
    // EventListComponent,
    // QualityComponent,
    // SuperimageComponent,
    // KashrutComponent,
    // BiodinamicComponent,
    // BiodinamicListComponent,
    // OrganicComponent,
    // OrganicListComponent,
    // VeganListComponent,
    // VeganComponent,
    // SupermapComponent,
    // YandexGeolocationComponent,
    // SuperComponentWithTabsComponent,
    // SubtableComponent,
    // KashrutSubtableComponent,
    // QualitySubtableComponent,
    // BiodynamicSubtableComponent,
    // OrganicSubtableComponent,
    // VeganSubtableComponent,
    // VineyardSubtableComponent,
    // GrapesSubtableComponent,
    // ImageSubtableComponent,
    // VisittimeSubtableComponent,
    // GrapesWinerySubtableComponent,
    // VineyardWinerySubtableComponent,
    // QualityWinerySubtableComponent,
    // BiodynamicWinerySubtableComponent,
    // OrganicWinerySubtableComponent,
    // VeganWinerySubtableComponent,
    // KashrutWinerySubtableComponent,
    // MapSubtableComponent,
    // WinesSubtableComponent,
    // TimeSubtableComponent,
    // RegionsSubtableComponent,
    NavigationDesignedComponent,
    LoginDesignedComponent,
    AccauntDesignedComponent,
    LoginSubtableComponent,
    RegistrationSubtableComponent,
    // WineListDesignedComponent,
    // WinesDesignedComponent,
    // WinesBasicDesignedComponent,
    // WinesAdvancedDesignedComponent,
    // WinesGrapesDesignedComponent,
    // WinesServingDesignedComponent,
    WinesVoteDesignedComponent,
    WineOneDesignedComponent,
    EventDesignedComponent,
    EventListDesignedComponent,
    EventOneComponent,
    // MapYandexDesignedComponent,
    EventDesignedCreateComponent,
    WinesFullDesignedComponent,
    WineryOneDesignedComponent,
    ProfileDesignedComponent,
    // PlaceOfOriginComponent,
    WineryInformationSubscreenComponent,
    WineryContactsSubscreenComponent,
    WineOneSubscreenComponent,
    // WineryBasicComponent,
    SuperlistDesignedComponent,
    // MapGoogleDesignedComponent,
    // SupermapGoogleComponent,
    ShopDesignedComponent,
    BusinessListDesignedComponent,
    SpecialistSubscreenComponent,
    // MultiselectSubtableComponent,
    SuperTabComponent,
    BlankpageComponent,
    MainComponent,
    SuperSelectComponent,
    WinesVoteSubscreenComponent,
    BusinessDesignedComponent,
    BusinessDescriptionSubscreenComponent,
    BusinessSubscreenComponent,
    // SelectBonvinoComponent,
    // SelectSearchBonvinoComponent,
    // CheckboxBonvinoComponent,
    // IconBonvinoComponent,
    // InputTimeBonvinoComponent,
    FooterComponent,
    ProfileViewComponent,
    // RadioBonvinoComponent,
    WinesStoreSubscreenComponent,
    // ScrollBonvinoComponent,
    InvalidDataErrorComponent,
    BusinessDesignedOneComponent,
    // CheckboxGroupBonvinoComponent,
    WinesSimplestoreSubscreenComponent,
    // WineriesMenuComponent,
    // WineryAdditionalComponent,
    // WineryAddComponent,
    WineryAdditionalSubscreenComponent,
    // WinesMenuDesignedComponent,
    // AutodescriptionDesignedComponent,

    EventDesignedBasicComponent,
    ShopDesignedOneComponent,
    ShopDesignedBasicComponent,
    ShopDesignedMenuComponent,
    ShopDesignedAdditionalComponent,
    ShopInformationSubscreenComponent,
    ShopContactsSubscreenComponent,
    EventDesignedAdditionalComponent,
    EventDesignedMenuComponent,
    // SearcherBonvinoComponent,
    AreYouSureComponent,
    AutoGeneratedComponent,
    // PopUpBonvinoComponent,
    HistoryComponent,
    VisitinghoursComponent,
    WineryDeletedComponent,
    WineryChangelogComponent,
    WineryHistoryComponent,
    // MenuSchemaComponent,
    // AdditionalSchemaComponent,
    // AdditionalViewSchemaComponent,
    WineChangelogComponent,
    // DescriptionGradesAddComponent,
    DescriptionGradesViewComponent,

    // TabsBarComponent,
    // ButtonRowComponent,
    // TemperatureInputBonvinoComponent,
    // TemperatureViewBonvinoComponent,
    // OriginInputBonvinoComponent,
    // OriginViewBonvinoComponent,
    // SubblockViewBonvinoComponent,
    // SubblockInputBonvinoComponent,
    // BlocksConstructorComponent,
    // AdditionalListDesignedComponent,
    // PersonSearchComponent,
    // PersonOneRowComponent,
    // LanguageListComponent,
    VineyardOneDesignedComponent,
    VineyardCreateDesignedComponent,
    VineyardBasicDesignedComponent,
    VineyardAdditionalDesignedComponent,
    VineyardMenuDesignedComponent,
    // TranscludeDirective,
    // TextComplicatedComponent,
    // WineriesSecondComponent,
    CompetitionAddComponent,
    CompetitionOneComponent,
    CompetitionBasicComponent,
    CompetitionMenuComponent,
    CompetitionAdditionalComponent,
    // CompetitionSelectComponent,
    // CompetitionOneRowComponent,
    // AwardOneRowComponent,
    WineOneUniversalComponent,
    WineOneUniversalSubscreenComponent,
    // CompetitionWineSelectComponent,
    CompetitionGrantAwardsComponent,
    WineryListDesignedComponent,
    WinesShortDesignedComponent,
    CompetitionPossibleAwardsComponent,
    // ExistedSchemaFormComponent,
    WineryShortComponent,
    WineryShortSubscreenComponent,
    EventShortDesignedComponent,
    EventShortSubscreenComponent,
    // AdditionalSearchSchemaComponent,
    // MapHiddenComponent,
    // MapSubscreenComponent,

    // WineAutodecriptionComponent,

    // WineDescriptionComponent,
    WineDescriptionSubscreenComponent,
    // FindWineComponent,
    // BengatContactsComponent,
    // TitleComponent,
    WinesShopAddSubscreenComponent,
    // SubrouterComponent,
    // CalendarInputBonvinoComponent,
    VineyardSecondDesignedComponent,
    VineyardOneShortComponent,
    // DayOfWeekTimeBonvinoComponent,
    GrigorianComponent,
    JewishCalendarComponent,
    // CalendarViewBonvinoComponent,
    JewishCalendarViewComponent,
    CalendarViewComponent,
    CalendarSearchComponent,
    JalaliCalendarComponent,
    IslamicCalendarComponent,
    IslamicUmmAlQuraCalendarComponent,
    BuddhistCalendarComponent,
    CollectorNavbarBonvinoComponent,
    MenuMobileBonvinoComponent,
    // LanguageNavigateMobileComponent,
    SidebarButtonComponent,
    WineListSearchbarComponent,
    WineListDesignedBComponent,
    WineListNavigationComponent,
    // MapOpenLayersComponent,
    // SupermapOpenLayersComponent,
    OlMapComponent,
    // GlassBonvinoComponent,
    // CenterMatmenuDirective,
    // LocationiqBonvinoComponent,
    // AddButtonBonvinoComponent,


    LanguagePanelComponent,
    MultiviewComponent,
  ],
  imports: [

    NgxPaginationModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatSnackBarModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgxMaterialTimepickerModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    DragDropModule,
    MatMenuModule,
    // WinesDesignedModule,

    SchemasModule,

  ],
  providers: [
    CookieService,
    NgbDatepickerI18nHebrew,
    NgbCalendarHebrew,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },

    // {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
    {provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'check' } as MatCheckboxDefaultOptions}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    InvalidDataErrorComponent,

    // AdminSuperlistComponent,
    // SubtableComponent,
    // KashrutSubtableComponent,
    // QualitySubtableComponent,
    // BiodynamicSubtableComponent,
    // OrganicSubtableComponent,
    // VeganSubtableComponent,
    // GrapesSubtableComponent,
    // ImageSubtableComponent,
    //
    // AdminWineryComponent,
    // VisittimeSubtableComponent,
    // GrapesWinerySubtableComponent,
    // VineyardWinerySubtableComponent,
    // QualityWinerySubtableComponent,
    // BiodynamicWinerySubtableComponent,
    // OrganicWinerySubtableComponent,
    // VeganWinerySubtableComponent,
    // KashrutWinerySubtableComponent,
    // MapSubtableComponent,
    //
    // WinesSubtableComponent,
    //
    // RegionsSubtableComponent,

    LoginSubtableComponent,
    RegistrationSubtableComponent,

    // PlaceOfOriginComponent,

    WineryInformationSubscreenComponent,
    WineryContactsSubscreenComponent,
    WineryAdditionalSubscreenComponent,

    // WineOneDesignedComponent,
    WineOneSubscreenComponent,

    SpecialistSubscreenComponent,
    WinesVoteSubscreenComponent,
    BusinessDescriptionSubscreenComponent,
    BusinessSubscreenComponent,
    WinesStoreSubscreenComponent,
    WinesSimplestoreSubscreenComponent,

    ShopInformationSubscreenComponent,
    ShopContactsSubscreenComponent,

    AreYouSureComponent,

    NavigationDesignedComponent,
    // PopUpBonvinoComponent,
    WineOneUniversalSubscreenComponent,

    // MapSubscreenComponent,
    // FindWineComponent,
    // BengatContactsComponent,
    WinesShopAddSubscreenComponent
  ],
})
export class AppModule {
  constructor(
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer
  ) {
    // matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg'));
  }
}
