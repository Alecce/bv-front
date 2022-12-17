import { NgModule } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';

import {WineryDeletedComponent} from "../bv/src/app/wineries-designed/winery-deleted/winery-deleted.component";
import {TranscludeDirective} from "../bv/src/app/language/text/transclude.directive";
import {GlassBonvinoComponent} from "../bv/src/app/schemas/glass-bonvino/glass-bonvino.component";
import {CalendarViewComponent} from "../bv/src/app/calendars/calendar-view/calendar-view.component";
import {QualityWinerySubtableComponent} from "../bv/src/app/admin/admin-winery/quality-winery-subtable/quality-winery-subtable.component";
import {PersonOneRowComponent} from "../bv/src/app/schemas/person-one-row/person-one-row.component";
import {CompetitionMenuComponent} from "../bv/src/app/competition-designed/competition-menu/competition-menu.component";
import {LanguageListComponent} from "../bv/src/app/language/language-list/language-list.component";
import {AdminSpecialistComponent} from "../bv/src/app/admin/admin-specialist/admin-specialist.component";
import {LoginDesignedComponent} from "../bv/src/app/login/login-designed/login-designed.component";
import {TemperatureViewBonvinoComponent} from "../bv/src/app/schemas/temperature-view-bonvino/temperature-view-bonvino.component";
import {VineyardBasicDesignedComponent} from "../bv/src/app/vineyard-designed/vineyard-basic-designed/vineyard-basic-designed.component";
import {BiodinamicComponent} from "../bv/src/app/biodinamic/biodinamic.component";
import {BusinessSubscreenComponent} from "../bv/src/app/lists/business-list-designed/business-subscreen/business-subscreen.component";
import {WineChangelogComponent} from "../bv/src/app/wines-designed/wine-changelog/wine-changelog.component";
import {WinesBasicDesignedComponent} from "../bv/src/app/wines-designed/wines-basic-designed/wines-basic-designed.component";
import {AdminPageConstructorBlockoptionlistComponent} from "../bv/src/app/admin/admin-page-constructor-blockoptionlist/admin-page-constructor-blockoptionlist.component";
import {WineListNavigationComponent} from "../bv/src/app/lists/wine-list-designed-b/wine-list-navigation/wine-list-navigation.component";
import {MainComponent} from "../bv/src/app/main/main.component";
import {WinesSubtableComponent} from "../bv/src/app/admin/admin-event/wines-subtable/wines-subtable.component";
import {EventDesignedCreateComponent} from "../bv/src/app/event-designed/event-designed-create/event-designed-create.component";
import {WineOneSubscreenComponent} from "../bv/src/app/wines-designed/wine-one-subscreen/wine-one-subscreen.component";
import {AdminVisitorsComponent} from "../bv/src/app/admin/admin-visitors/admin-visitors.component";
import {SupermapGoogleComponent} from "../bv/src/app/supermap-google/supermap-google.component";
import {LanguagePanelComponent} from "../bv/src/app/language/language-panel/language-panel.component";
import {PageComponent} from "../bv/src/app/page/page.component";
import {TextComponent} from "../bv/src/app/language/text/text.component";
import {ImageSubtableComponent} from "../bv/src/app/admin/admin-superlist/image-subtable/image-subtable.component";
import {VisittimeSubtableComponent} from "../bv/src/app/admin/admin-superlist/visittime-subtable/visittime-subtable.component";
import {InputTimeBonvinoComponent} from "../bv/src/app/schemas/input-time-bonvino/input-time-bonvino.component";
import {OriginViewBonvinoComponent} from "../bv/src/app/schemas/origin-view-bonvino/origin-view-bonvino.component";
import {TimeSubtableComponent} from "../bv/src/app/admin/admin-event/time-subtable/time-subtable.component";
import {PlaceOfOriginComponent} from "../bv/src/app/schemas/place-of-origin/place-of-origin.component";
import {FindWineComponent} from "../bv/src/app/schemas/find-wine/find-wine.component";
import {WineListSearchbarComponent} from "../bv/src/app/lists/wine-list-designed-b/wine-list-searchbar/wine-list-searchbar.component";
import {SuperTabComponent} from "../bv/src/app/super-tab/super-tab.component";
import {MenuSchemaComponent} from "../bv/src/app/schemas/menu-schema/menu-schema.component";
import {WineryShortSubscreenComponent} from "../bv/src/app/wineries-designed/winery-short-subscreen/winery-short-subscreen.component";
import {AdminAutodescriptionCategoriesComponent} from "../bv/src/app/admin/admin-autodescription-categories/admin-autodescription-categories.component";
import {CalendarSearchComponent} from "../bv/src/app/calendars/calendar-search/calendar-search.component";
import {AdminRegionComponent} from "../bv/src/app/admin/admin-region/admin-region.component";
import {BottleListComponent} from "../bv/src/app/lists/bottle-list/bottle-list.component";
import {CheckboxBonvinoComponent} from "../bv/src/app/schemas/checkbox-bonvino/checkbox-bonvino.component";
import {VineyardAdditionalDesignedComponent} from "../bv/src/app/vineyard-designed/vineyard-additional-designed/vineyard-additional-designed.component";
import {WineryAdditionalSubscreenComponent} from "../bv/src/app/wineries-designed/winery-additional-subscreen/winery-additional-subscreen.component";
import {LanguageNavigateMobileComponent} from "../bv/src/app/language/language-navigate-mobile/language-navigate-mobile.component";
import {AdditionalSearchSchemaComponent} from "../bv/src/app/schemas/additional-search-schema/additional-search-schema.component";
import {WinnerListComponent} from "../bv/src/app/lists/winner-list/winner-list.component";
import {ProfileDesignedComponent} from "../bv/src/app/profile-designed/profile-designed.component";
import {WinesStoreSubscreenComponent} from "../bv/src/app/wines-designed/wines-store-subscreen/wines-store-subscreen.component";
import {SubblockInputBonvinoComponent} from "../bv/src/app/schemas/subblock-input-bonvino/subblock-input-bonvino.component";
import {EventDesignedAdditionalComponent} from "../bv/src/app/event-designed/event-designed-additional/event-designed-additional.component";
import {CompetitionBasicComponent} from "../bv/src/app/competition-designed/competition-basic/competition-basic.component";
import {FooterComponent} from "../bv/src/app/footer/footer.component";
import {WinesFullDesignedComponent} from "../bv/src/app/wines-designed/wines-full-designed/wines-full-designed.component";
import {SubrouterComponent} from "../bv/src/app/schemas/subrouter/subrouter.component";
import {ShopContactsSubscreenComponent} from "../bv/src/app/shop-designed/shop-contacts-subscreen/shop-contacts-subscreen.component";
import {SubblockViewBonvinoComponent} from "../bv/src/app/schemas/subblock-view-bonvino/subblock-view-bonvino.component";
import {GrapesSubtableComponent} from "../bv/src/app/admin/admin-wine/grapes-subtable/grapes-subtable.component";
import {SuperlistDesignedComponent} from "../bv/src/app/superlist-designed/superlist-designed.component";
import {Page404Component} from "../bv/src/app/page404/page404.component";
import {VeganComponent} from "../bv/src/app/vegan/vegan.component";
import {AdminBiodynamicComponent} from "../bv/src/app/admin/admin-biodynamic/admin-biodynamic.component";
import {AdditionalListDesignedComponent} from "../bv/src/app/lists/additional-list-designed/additional-list-designed.component";
import {BusinessDescriptionSubscreenComponent} from "../bv/src/app/lists/business-list-designed/business-description-subscreen/business-description-subscreen.component";
import {SuperlistComponent} from "../bv/src/app/lists/superlist/superlist.component";
import {BusinessDesignedComponent} from "../bv/src/app/business-designed/business-designed.component";
import {VineyardOneShortComponent} from "../bv/src/app/vineyard-designed/vineyard-one-short/vineyard-one-short.component";
import {EventDesignedComponent} from "../bv/src/app/event-designed/event-designed.component";
import {OriginInputBonvinoComponent} from "../bv/src/app/schemas/origin-input-bonvino/origin-input-bonvino.component";
import {KashrutListComponent} from "../bv/src/app/lists/kashrut-list/kashrut-list.component";
import {WineryAddComponent} from "../bv/src/app/wineries-designed/winery-add/winery-add.component";
import {CheckboxGroupBonvinoComponent} from "../bv/src/app/schemas/checkbox-group-bonvino/checkbox-group-bonvino.component";
import {TextComplicatedComponent} from "../bv/src/app/language/text-complicated/text-complicated.component";
import {JewishCalendarComponent} from "../bv/src/app/calendars/jewish-calendar/jewish-calendar.component";
import {EventDesignedBasicComponent} from "../bv/src/app/event-designed/event-designed-basic/event-designed-basic.component";
import {MapSubtableComponent} from "../bv/src/app/admin/admin-superlist/map-subtable/map-subtable.component";
import {WineOneDesignedComponent} from "../bv/src/app/wines-designed/wine-one-designed/wine-one-designed.component";
import {WineryOneDesignedComponent} from "../bv/src/app/wineries-designed/winery-one-designed/winery-one-designed.component";
import {AdminHomeComponent} from "../bv/src/app/admin/admin-home/admin-home.component";
import {LoadingInterceptor} from "../bv/src/app/services/loading/auth.interceptor";
import {VeganListComponent} from "../bv/src/app/lists/vegan-list/vegan-list.component";
import {BusinessListComponent} from "../bv/src/app/lists/business-list/business-list.component";
import {WineOneUniversalSubscreenComponent} from "../bv/src/app/wines-designed/wine-one-universal-subscreen/wine-one-universal-subscreen.component";
import {AdminPageConstructorPagelistComponent} from "../bv/src/app/admin/admin-page-constructor-pagelist/admin-page-constructor-pagelist.component";
import {AdminWineMergingComponent} from "../bv/src/app/admin/admin-wine-merging/admin-wine-merging.component";
import {LoginComponent} from "../bv/src/app/login/login.component";
import {MenuMobileBonvinoComponent} from "../bv/src/app/navigation/menu-mobile-bonvino/menu-mobile-bonvino.component";
import {KashrutSubtableComponent} from "../bv/src/app/admin/admin-wine/kashrut-subtable/kashrut-subtable.component";
import {VineyardMenuDesignedComponent} from "../bv/src/app/vineyard-designed/vineyard-menu-designed/vineyard-menu-designed.component";
import {TitleComponent} from "../bv/src/app/language/title/title.component";
import {AdminUserlistComponent} from "../bv/src/app/admin/admin-userlist/admin-userlist.component";
import {CollectorNavbarBonvinoComponent} from "../bv/src/app/navigation/collector-navbar-bonvino/collector-navbar-bonvino.component";
import {AutodescriptionDesignedComponent} from "../bv/src/app/wines-designed/autodescription-designed/autodescription-designed.component";
import {SelectSearchBonvinoComponent} from "../bv/src/app/schemas/select-search-bonvino/select-search-bonvino.component";
import {WinesAdvancedDesignedComponent} from "../bv/src/app/wines-designed/wines-advanced-designed/wines-advanced-designed.component";
import {SuperformComponent} from "../bv/src/app/superform/superform.component";
import {EventListComponent} from "../bv/src/app/lists/event-list/event-list.component";
import {WinesVoteSubscreenComponent} from "../bv/src/app/wines-designed/wines-vote-subscreen/wines-vote-subscreen.component";
import {WineryShortComponent} from "../bv/src/app/wineries-designed/winery-short/winery-short.component";
import {SupermapOpenLayersComponent} from "../bv/src/app/schemas/supermap-open-layers/supermap-open-layers.component";
import {WineryAdditionalComponent} from "../bv/src/app/wineries-designed/winery-additional/winery-additional.component";
import {VineyardSecondDesignedComponent} from "../bv/src/app/vineyard-designed/vineyard-second-designed/vineyard-second-designed.component";
import {WineryListDesignedComponent} from "../bv/src/app/lists/winery-list-designed/winery-list-designed.component";
import {IslamicUmmAlQuraCalendarComponent} from "../bv/src/app/calendars/islamic-umm-al-qura-calendar/islamic-umm-al-qura-calendar.component";
import {PersonSearchComponent} from "../bv/src/app/schemas/person-search/person-search.component";
import {BengatContactsComponent} from "../bv/src/app/schemas/bengat-contacts/bengat-contacts.component";
import {SpecialistSubscreenComponent} from "../bv/src/app/lists/business-list-designed/specialist-subscreen/specialist-subscreen.component";
import {SearcherBonvinoComponent} from "../bv/src/app/schemas/searcher-bonvino/searcher-bonvino.component";
import {AdditionalSchemaComponent} from "../bv/src/app/schemas/additional-schema/additional-schema.component";
import {HistoryComponent} from "../bv/src/app/history/history.component";
import {UserListComponent} from "../bv/src/app/lists/user-list/user-list.component";
import {TabsBarComponent} from "../bv/src/app/schemas/tabs-bar/tabs-bar.component";
import {RegistrationPersonComponent} from "../bv/src/app/registration-person/registration-person.component";
import {GrapesWinerySubtableComponent} from "../bv/src/app/admin/admin-winery/grapes-winery-subtable/grapes-winery-subtable.component";
import {ShopDesignedMenuComponent} from "../bv/src/app/shop-designed/shop-designed-menu/shop-designed-menu.component";
import {AdminGrapeClonesComponent} from "../bv/src/app/admin/admin-grape-clones/admin-grape-clones.component";
import {OrganicWinerySubtableComponent} from "../bv/src/app/admin/admin-winery/organic-winery-subtable/organic-winery-subtable.component";
import {AdminAutodescriptionComponent} from "../bv/src/app/admin/admin-autodescription/admin-autodescription.component";
import {WineryContactsSubscreenComponent} from "../bv/src/app/wineries-designed/winery-contacts-subscreen/winery-contacts-subscreen.component";
import {JewishCalendarViewComponent} from "../bv/src/app/calendars/jewish-calendar-view/jewish-calendar-view.component";
import {WinesServingDesignedComponent} from "../bv/src/app/wines-designed/wines-serving-designed/wines-serving-designed.component";
import {AdminWineryComponent} from "../bv/src/app/admin/admin-winery/admin-winery.component";
import {RegionListComponent} from "../bv/src/app/lists/region-list/region-list.component";
import {WinesDesignedComponent} from "../bv/src/app/wines-designed/wines-designed.component";
import {ShopDesignedComponent} from "../bv/src/app/shop-designed/shop-designed.component";
import {CenterMatmenuDirective} from "../bv/src/app/schemas/glass-bonvino/center-matmenu.directive";
import {BlocksConstructorComponent} from "../bv/src/app/admin/blocks-constructor/blocks-constructor.component";
import {ProfileComponent} from "../bv/src/app/profile/profile.component";
import {AdminQualityComponent} from "../bv/src/app/admin/admin-quality/admin-quality.component";
import {OrganicSubtableComponent} from "../bv/src/app/admin/admin-wine/organic-subtable/organic-subtable.component";
import {LocationiqBonvinoComponent} from "../bv/src/app/schemas/locationiq-bonvino/locationiq-bonvino.component";
import {AdminWineryMergingComponent} from "../bv/src/app/admin/admin-winery-merging/admin-winery-merging.component";
import {VineyardCreateDesignedComponent} from "../bv/src/app/vineyard-designed/vineyard-create-designed/vineyard-create-designed.component";
import {WineDescriptionSubscreenComponent} from "../bv/src/app/wines-designed/wine-description-subscreen/wine-description-subscreen.component";
import {AdminOrganicComponent} from "../bv/src/app/admin/admin-organic/admin-organic.component";
import {BusinessListDesignedComponent} from "../bv/src/app/lists/business-list-designed/business-list-designed.component";
import {CalendarViewBonvinoComponent} from "../bv/src/app/schemas/calendar-view-bonvino/calendar-view-bonvino.component";
import {RadioBonvinoComponent} from "../bv/src/app/schemas/radio-bonvino/radio-bonvino.component";
import {WireryListComponent} from "../bv/src/app/lists/wirery-list/wirery-list.component";
import {WinesGrapesDesignedComponent} from "../bv/src/app/wines-designed/wines-grapes-designed/wines-grapes-designed.component";
import {CompetitionAdditionalComponent} from "../bv/src/app/competition-designed/competition-additional/competition-additional.component";
import {UserVotesListComponent} from "../bv/src/app/lists/user-votes-list/user-votes-list.component";
import {AdminSuperlistComponent} from "../bv/src/app/admin/admin-superlist/admin-superlist.component";
import {WineDescriptionComponent} from "../bv/src/app/wines-designed/wine-description/wine-description.component";
import {IconBonvinoComponent} from "../bv/src/app/schemas/icon-bonvino/icon-bonvino.component";
import {AdminNongrapeComponent} from "../bv/src/app/admin/admin-nongrape/admin-nongrape.component";
import {ScrollBonvinoComponent} from "../bv/src/app/schemas/scroll-bonvino/scroll-bonvino.component";
import {CompetitionOneComponent} from "../bv/src/app/competition-designed/competition-one/competition-one.component";
import {UnauthComponent} from "../bv/src/app/unauth/unauth.component";
import {MapGoogleDesignedComponent} from "../bv/src/app/schemas/map-google-designed/map-google-designed.component";
import {IslamicCalendarComponent} from "../bv/src/app/calendars/islamic-calendar/islamic-calendar.component";
import {AdminSparklingComponent} from "../bv/src/app/admin/admin-sparkling/admin-sparkling.component";
import {CompetitionSelectComponent} from "../bv/src/app/schemas/competition-select/competition-select.component";
import {InvalidDataErrorComponent} from "../bv/src/app/services/invalid-data-error/invalid-data-error.component";
import {DescriptionGradesAddComponent} from "../bv/src/app/wines-designed/description-grades-add/description-grades-add.component";
import {RegistrationComponent} from "../bv/src/app/registration/registration.component";
import {BlankpageComponent} from "../bv/src/app/blankpage/blankpage.component";
import {AdminComponent} from "../bv/src/app/admin/admin.component";
import {TemperatureInputBonvinoComponent} from "../bv/src/app/schemas/temperature-input-bonvino/temperature-input-bonvino.component";
import {LanguageNavigateComponent} from "../bv/src/app/language/language-navigate/language-navigate.component";
import {WineListDesignedComponent} from "../bv/src/app/lists/wine-list-designed/wine-list-designed.component";
import {SubtableComponent} from "../bv/src/app/admin/admin-superlist/subtable/subtable.component";
import {AdminBarrelComponent} from "../bv/src/app/admin/admin-barrel/admin-barrel.component";
import {AuthInterceptor} from "../bv/src/app/services/auth-service/auth.interceptor";
import {AdminVeganComponent} from "../bv/src/app/admin/admin-vegan/admin-vegan.component";
import {ShopInformationSubscreenComponent} from "../bv/src/app/shop-designed/shop-information-subscreen/shop-information-subscreen.component";
import {SuperComponentWithTabsComponent} from "../bv/src/app/schemas/super-component-with-tabs/super-component-with-tabs.component";
import {CompetitionWineSelectComponent} from "../bv/src/app/schemas/competition-wine-select/competition-wine-select.component";
import {EventOneComponent} from "../bv/src/app/event-designed/event-one/event-one.component";
import {AdminPageConstructorBlocksComponent} from "../bv/src/app/admin/admin-page-constructor-blocks/admin-page-constructor-blocks.component";
import {SuperSelectComponent} from "../bv/src/app/lists/super-select/super-select.component";
import {WineryChangelogComponent} from "../bv/src/app/wineries-designed/winery-changelog/winery-changelog.component";
import {RegistrationSubtableComponent} from "../bv/src/app/login/registration-subtable/registration-subtable.component";
import {AwardOneRowComponent} from "../bv/src/app/schemas/award-one-row/award-one-row.component";
import {AppRoutingModule} from "../bv/src/app/app-routing.module";
import {SuperimageComponent} from "../bv/src/app/superimage/superimage.component";
import {WinesMenuDesignedComponent} from "../bv/src/app/wines-designed/wines-menu-designed/wines-menu-designed.component";
import {WineListDesignedBComponent} from "../bv/src/app/lists/wine-list-designed-b/wine-list-designed-b.component";
import {BiodynamicWinerySubtableComponent} from "../bv/src/app/admin/admin-winery/biodynamic-winery-subtable/biodynamic-winery-subtable.component";
import {VineyardListComponent} from "../bv/src/app/lists/vineyard-list/vineyard-list.component";
import {WineryInformationSubscreenComponent} from "../bv/src/app/wineries-designed/winery-information-subscreen/winery-information-subscreen.component";
import {CompetitionListComponent} from "../bv/src/app/lists/competition-list/competition-list.component";
import {EventShortSubscreenComponent} from "../bv/src/app/event-designed/event-short-subscreen/event-short-subscreen.component";
import {CalendarInputBonvinoComponent} from "../bv/src/app/schemas/calendar-input-bonvino/calendar-input-bonvino.component";
import {CompetitionOneRowComponent} from "../bv/src/app/schemas/competition-one-row/competition-one-row.component";
import {PopUpBonvinoComponent} from "../bv/src/app/schemas/pop-up-bonvino/pop-up-bonvino.component";
import {AdminEventComponent} from "../bv/src/app/admin/admin-event/admin-event.component";
import {ExistedSchemaFormComponent} from "../bv/src/app/schemas/existed-schema-form/existed-schema-form.component";
import {BuddhistCalendarComponent} from "../bv/src/app/calendars/buddhist-calendar/buddhist-calendar.component";
import {ShopDesignedBasicComponent} from "../bv/src/app/shop-designed/shop-designed-basic/shop-designed-basic.component";
import {EventShortDesignedComponent} from "../bv/src/app/event-designed/event-short-designed/event-short-designed.component";
import {AdminGrapesComponent} from "../bv/src/app/admin/admin-grapes/admin-grapes.component";
import {ButtonRowComponent} from "../bv/src/app/schemas/button-row/button-row.component";
import {WinesSimplestoreSubscreenComponent} from "../bv/src/app/wines-designed/wines-simplestore-subscreen/wines-simplestore-subscreen.component";
import {MapSubscreenComponent} from "../bv/src/app/schemas/map-subscreen/map-subscreen.component";
import {RegionsSubtableComponent} from "../bv/src/app/admin/admin-quality/regions-subtable/regions-subtable.component";
import {BusinessDesignedOneComponent} from "../bv/src/app/business-designed/business-designed-one/business-designed-one.component";
import {VeganSubtableComponent} from "../bv/src/app/admin/admin-wine/vegan-subtable/vegan-subtable.component";
import {AdminWinetypeComponent} from "../bv/src/app/admin/admin-winetype/admin-winetype.component";
import {WinesShopAddSubscreenComponent} from "../bv/src/app/wines-designed/wines-shop-add-subscreen/wines-shop-add-subscreen.component";
import {NavigationComponent} from "../bv/src/app/navigation/navigation.component";
import {AccauntDesignedComponent} from "../bv/src/app/login/accaunt-designed/accaunt-designed.component";
import {ProfileViewComponent} from "../bv/src/app/profile-designed/profile-view/profile-view.component";
import {AdminWinesubtypeComponent} from "../bv/src/app/admin/admin-winesubtype/admin-winesubtype.component";
import {SpecialistListComponent} from "../bv/src/app/lists/specialist-list/specialist-list.component";
import {GrigorianComponent} from "../bv/src/app/calendars/grigorian/grigorian.component";
import {DescriptionGradesViewComponent} from "../bv/src/app/wines-designed/description-grades-view/description-grades-view.component";
import {AreYouSureComponent} from "../bv/src/app/services/are-you-sure/are-you-sure.component";
import {MapOpenLayersComponent} from "../bv/src/app/schemas/map-open-layers/map-open-layers.component";
import {JalaliCalendarComponent} from "../bv/src/app/calendars/jalali-calendar/jalali-calendar.component";
import {OlMapComponent} from "../bv/src/app/ol-map/ol-map.component";
import {BiodinamicListComponent} from "../bv/src/app/lists/biodinamic-list/biodinamic-list.component";
import {LogoutComponent} from "../bv/src/app/logout/logout.component";
import {AdminWineimagesComponent} from "../bv/src/app/admin/admin-wineimages/admin-wineimages.component";
import {AdminAutodescriptionOptionsComponent} from "../bv/src/app/admin/admin-autodescription-options/admin-autodescription-options.component";
import {NavigationDesignedComponent} from "../bv/src/app/navigation/navigation-designed/navigation-designed.component";
import {WinesVoteDesignedComponent} from "../bv/src/app/wines-designed/wines-vote-designed/wines-vote-designed.component";
import {WineOneUniversalComponent} from "../bv/src/app/wines-designed/wine-one-universal/wine-one-universal.component";
import {QualityListComponent} from "../bv/src/app/lists/quality-list/quality-list.component";
import {AdminVineyardComponent} from "../bv/src/app/admin/admin-vineyard/admin-vineyard.component";
import {AutoGeneratedComponent} from "../bv/src/app/auto-generated/auto-generated.component";
import {AwardListComponent} from "../bv/src/app/lists/award-list/award-list.component";
import {AdminSupermergeComponent} from "../bv/src/app/admin/admin-supermerge/admin-supermerge.component";
import {AdminBottleComponent} from "../bv/src/app/admin/admin-bottle/admin-bottle.component";
import {SidebarButtonComponent} from "../bv/src/app/navigation/sidebar-button/sidebar-button.component";
import {MapHiddenComponent} from "../bv/src/app/schemas/map-hidden/map-hidden.component";
import {EventListDesignedComponent} from "../bv/src/app/lists/event-list-designed/event-list-designed.component";
import {WineryBasicComponent} from "../bv/src/app/wineries-designed/winery-basic/winery-basic.component";
import {WineriesMenuComponent} from "../bv/src/app/wineries-designed/wineries-menu/wineries-menu.component";
import {ShopDesignedAdditionalComponent} from "../bv/src/app/shop-designed/shop-designed-additional/shop-designed-additional.component";
import {VisitinghoursComponent} from "../bv/src/app/visitinghours/visitinghours.component";
import {WineListComponent} from "../bv/src/app/lists/wine-list/wine-list.component";
import {OrganicComponent} from "../bv/src/app/organic/organic.component";
import {LoginSubtableComponent} from "../bv/src/app/login/login-subtable/login-subtable.component";
import {MultiselectSubtableComponent} from "../bv/src/app/admin/multiselect-subtable/multiselect-subtable.component";
import {VineyardWinerySubtableComponent} from "../bv/src/app/admin/admin-winery/vineyard-winery-subtable/vineyard-winery-subtable.component";
import {VeganWinerySubtableComponent} from "../bv/src/app/admin/admin-winery/vegan-winery-subtable/vegan-winery-subtable.component";
import {AdminLanguageComponent} from "../bv/src/app/admin/admin-language/admin-language.component";
import {WineriesSecondComponent} from "../bv/src/app/wineries-designed/wineries-second/wineries-second.component";
import {AdditionalViewSchemaComponent} from "../bv/src/app/schemas/additional-view-schema/additional-view-schema.component";
import {QualityComponent} from "../bv/src/app/quality/quality.component";
import {SelectBonvinoComponent} from "../bv/src/app/schemas/select-bonvino/select-bonvino.component";
import {EventDesignedMenuComponent} from "../bv/src/app/event-designed/event-designed-menu/event-designed-menu.component";
import {CompetitionAddComponent} from "../bv/src/app/competition-designed/competition-add/competition-add.component";
import {OrganicListComponent} from "../bv/src/app/lists/organic-list/organic-list.component";
import {AdminCorkComponent} from "../bv/src/app/admin/admin-cork/admin-cork.component";
import {ShopDesignedOneComponent} from "../bv/src/app/shop-designed/shop-designed-one/shop-designed-one.component";
import {AdminWineComponent} from "../bv/src/app/admin/admin-wine/admin-wine.component";
import {VineyardSubtableComponent} from "../bv/src/app/admin/admin-wine/vineyard-subtable/vineyard-subtable.component";
import {CompetitionPossibleAwardsComponent} from "../bv/src/app/competition-designed/competition-possible-awards/competition-possible-awards.component";
import {KashrutComponent} from "../bv/src/app/kashrut/kashrut.component";
import {QualitySubtableComponent} from "../bv/src/app/admin/admin-wine/quality-subtable/quality-subtable.component";
import {AdminBarrelsizeComponent} from "../bv/src/app/admin/admin-barrelsize/admin-barrelsize.component";
import {RegistrationBusinessComponent} from "../bv/src/app/registration-business/registration-business.component";
import {AdminPageConstructorBlocklistComponent} from "../bv/src/app/admin/admin-page-constructor-blocklist/admin-page-constructor-blocklist.component";
import {WineryHistoryComponent} from "../bv/src/app/wineries-designed/winery-history/winery-history.component";
import {GrapeListComponent} from "../bv/src/app/lists/grape-list/grape-list.component";
import {WinesShortDesignedComponent} from "../bv/src/app/wines-designed/wines-short-designed/wines-short-designed.component";
import {DayOfWeekTimeBonvinoComponent} from "../bv/src/app/schemas/day-of-week-time-bonvino/day-of-week-time-bonvino.component";
import {KashrutWinerySubtableComponent} from "../bv/src/app/admin/admin-winery/kashrut-winery-subtable/kashrut-winery-subtable.component";
import {BiodynamicSubtableComponent} from "../bv/src/app/admin/admin-wine/biodynamic-subtable/biodynamic-subtable.component";
import {AdminKashrutComponent} from "../bv/src/app/admin/admin-kashrut/admin-kashrut.component";
import {VineyardOneDesignedComponent} from "../bv/src/app/vineyard-designed/vineyard-one-designed/vineyard-one-designed.component";
import {CompetitionGrantAwardsComponent} from "../bv/src/app/competition-designed/competition-grant-awards/competition-grant-awards.component";
import {WineAutodecriptionComponent} from "../bv/src/app/wines-designed/wine-autodecription/wine-autodecription.component";
import {AppComponent} from "../bv/src/app/app.component";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AgmCoreModule} from "@agm/core";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions, MatCheckboxModule} from "@angular/material/checkbox";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
    NgbCalendarHebrew,
    NgbDatepickerI18nHebrew,
    NgbDatepickerModule,
    NgbDropdownModule
} from "@ng-bootstrap/ng-bootstrap";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatMenuModule} from "@angular/material/menu";
import {CookieService} from "ngx-cookie-service";
// import { RoootComponent } from './test/rooot/rooot.component';
// import { SubComponent } from './test/sub/sub.component';


@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        LoginComponent,
        RegistrationPersonComponent,
        RegistrationBusinessComponent,
        LogoutComponent,
        ProfileComponent,
        RegistrationComponent,
        WireryListComponent,
        UnauthComponent,
        PageComponent,
        WineListComponent,
        RegionListComponent,
        VineyardListComponent,
        KashrutListComponent,
        GrapeListComponent,
        QualityListComponent,
        BottleListComponent,
        CompetitionListComponent,
        WinnerListComponent,
        SpecialistListComponent,
        AwardListComponent,
        UserListComponent,
        SuperlistComponent,
        BusinessListComponent,
        UserVotesListComponent,
        Page404Component,
        TextComponent,
        LanguageNavigateComponent,
        LanguagePanelComponent,
        SuperformComponent,
        EventListComponent,
        QualityComponent,
        SuperimageComponent,
        KashrutComponent,
        BiodinamicComponent,
        BiodinamicListComponent,
        OrganicComponent,
        OrganicListComponent,
        VeganListComponent,
        VeganComponent,
        // SupermapComponent,
        // YandexGeolocationComponent,
        SuperComponentWithTabsComponent,
        AdminComponent,
        AdminSuperlistComponent,
        AdminUserlistComponent,
        AdminWineComponent,
        SubtableComponent,
        KashrutSubtableComponent,
        QualitySubtableComponent,
        BiodynamicSubtableComponent,
        OrganicSubtableComponent,
        VeganSubtableComponent,
        VineyardSubtableComponent,
        GrapesSubtableComponent,
        ImageSubtableComponent,
        AdminWineryComponent,
        VisittimeSubtableComponent,
        GrapesWinerySubtableComponent,
        VineyardWinerySubtableComponent,
        QualityWinerySubtableComponent,
        BiodynamicWinerySubtableComponent,
        OrganicWinerySubtableComponent,
        VeganWinerySubtableComponent,
        KashrutWinerySubtableComponent,
        MapSubtableComponent,
        AdminEventComponent,
        WinesSubtableComponent,
        TimeSubtableComponent,
        AdminVineyardComponent,
        AdminSpecialistComponent,
        AdminQualityComponent,
        AdminKashrutComponent,
        AdminGrapesComponent,
        AdminBiodynamicComponent,
        AdminOrganicComponent,
        AdminVeganComponent,
        RegionsSubtableComponent,
        AdminAutodescriptionComponent,
        AdminAutodescriptionCategoriesComponent,
        AdminAutodescriptionOptionsComponent,
        NavigationDesignedComponent,
        LoginDesignedComponent,
        AccauntDesignedComponent,
        LoginSubtableComponent,
        RegistrationSubtableComponent,
        WineListDesignedComponent,
        WinesDesignedComponent,
        WinesBasicDesignedComponent,
        WinesAdvancedDesignedComponent,
        WinesGrapesDesignedComponent,
        WinesServingDesignedComponent,
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
        PlaceOfOriginComponent,
        WineryInformationSubscreenComponent,
        WineryContactsSubscreenComponent,
        WineOneSubscreenComponent,
        WineryBasicComponent,
        SuperlistDesignedComponent,
        MapGoogleDesignedComponent,
        SupermapGoogleComponent,
        AdminWineMergingComponent,
        AdminSupermergeComponent,
        AdminWineryMergingComponent,
        AdminLanguageComponent,
        ShopDesignedComponent,
        BusinessListDesignedComponent,
        SpecialistSubscreenComponent,
        AdminWinetypeComponent,
        AdminWinesubtypeComponent,
        MultiselectSubtableComponent,
        SuperTabComponent,
        AdminBarrelComponent,
        AdminSparklingComponent,
        AdminCorkComponent,
        AdminNongrapeComponent,
        BlankpageComponent,
        MainComponent,
        SuperSelectComponent,
        WinesVoteSubscreenComponent,
        BusinessDesignedComponent,
        BusinessDescriptionSubscreenComponent,
        BusinessSubscreenComponent,
        SelectBonvinoComponent,
        SelectSearchBonvinoComponent,
        CheckboxBonvinoComponent,
        IconBonvinoComponent,
        InputTimeBonvinoComponent,
        FooterComponent,
        ProfileViewComponent,
        RadioBonvinoComponent,
        WinesStoreSubscreenComponent,
        ScrollBonvinoComponent,
        InvalidDataErrorComponent,
        AdminHomeComponent,
        AdminPageConstructorPagelistComponent,
        AdminPageConstructorBlocklistComponent,
        AdminPageConstructorBlockoptionlistComponent,
        AdminPageConstructorBlocksComponent,
        BusinessDesignedOneComponent,
        CheckboxGroupBonvinoComponent,
        AdminBarrelsizeComponent,
        AdminRegionComponent,
        WinesSimplestoreSubscreenComponent,
        WineriesMenuComponent,
        WineryAdditionalComponent,
        WineryAddComponent,
        WineryAdditionalSubscreenComponent,
        WinesMenuDesignedComponent,
        AutodescriptionDesignedComponent,
        EventDesignedBasicComponent,
        ShopDesignedOneComponent,
        ShopDesignedBasicComponent,
        ShopDesignedMenuComponent,
        ShopDesignedAdditionalComponent,
        ShopInformationSubscreenComponent,
        ShopContactsSubscreenComponent,
        EventDesignedAdditionalComponent,
        EventDesignedMenuComponent,
        AdminGrapeClonesComponent,
        AdminWineimagesComponent,
        SearcherBonvinoComponent,
        AreYouSureComponent,
        AutoGeneratedComponent,
        PopUpBonvinoComponent,
        HistoryComponent,
        VisitinghoursComponent,
        WineryDeletedComponent,
        WineryChangelogComponent,
        WineryHistoryComponent,
        MenuSchemaComponent,
        AdditionalSchemaComponent,
        AdditionalViewSchemaComponent,
        WineChangelogComponent,
        DescriptionGradesAddComponent,
        DescriptionGradesViewComponent,
        TabsBarComponent,
        ButtonRowComponent,
        AdminBottleComponent,
        TemperatureInputBonvinoComponent,
        TemperatureViewBonvinoComponent,
        OriginInputBonvinoComponent,
        OriginViewBonvinoComponent,
        SubblockViewBonvinoComponent,
        SubblockInputBonvinoComponent,
        BlocksConstructorComponent,
        AdditionalListDesignedComponent,
        PersonSearchComponent,
        PersonOneRowComponent,
        LanguageListComponent,
        VineyardOneDesignedComponent,
        VineyardCreateDesignedComponent,
        VineyardBasicDesignedComponent,
        VineyardAdditionalDesignedComponent,
        VineyardMenuDesignedComponent,
        TranscludeDirective,
        TextComplicatedComponent,
        WineriesSecondComponent,
        CompetitionAddComponent,
        CompetitionOneComponent,
        CompetitionBasicComponent,
        CompetitionMenuComponent,
        CompetitionAdditionalComponent,
        CompetitionSelectComponent,
        CompetitionOneRowComponent,
        AwardOneRowComponent,
        WineOneUniversalComponent,
        WineOneUniversalSubscreenComponent,
        CompetitionWineSelectComponent,
        CompetitionGrantAwardsComponent,
        WineryListDesignedComponent,
        WinesShortDesignedComponent,
        CompetitionPossibleAwardsComponent,
        ExistedSchemaFormComponent,
        WineryShortComponent,
        WineryShortSubscreenComponent,
        EventShortDesignedComponent,
        EventShortSubscreenComponent,
        AdditionalSearchSchemaComponent,
        MapHiddenComponent,
        MapSubscreenComponent,
        WineAutodecriptionComponent,
        WineDescriptionComponent,
        WineDescriptionSubscreenComponent,
        FindWineComponent,
        BengatContactsComponent,
        TitleComponent,
        WinesShopAddSubscreenComponent,
        SubrouterComponent,
        CalendarInputBonvinoComponent,
        VineyardSecondDesignedComponent,
        VineyardOneShortComponent,
        DayOfWeekTimeBonvinoComponent,
        GrigorianComponent,
        JewishCalendarComponent,
        CalendarViewBonvinoComponent,
        JewishCalendarViewComponent,
        CalendarViewComponent,
        CalendarSearchComponent,
        JalaliCalendarComponent,
        IslamicCalendarComponent,
        IslamicUmmAlQuraCalendarComponent,
        BuddhistCalendarComponent,
        CollectorNavbarBonvinoComponent,
        MenuMobileBonvinoComponent,
        LanguageNavigateMobileComponent,
        SidebarButtonComponent,
        WineListSearchbarComponent,
        WineListDesignedBComponent,
        WineListNavigationComponent,
        MapOpenLayersComponent,
        SupermapOpenLayersComponent,
        OlMapComponent,
        GlassBonvinoComponent,
        CenterMatmenuDirective,
        LocationiqBonvinoComponent,
        AdminVisitorsComponent
    ],
    imports: [
        NgxPaginationModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBqjUgRhoeb_phDjTmVYJHPgxlaqGYiZzU'
        }),
        MatSidenavModule,
        MatIconModule,
        MatSnackBarModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
        // NgModule,
        // NgbModule,
        NgbDropdownModule,
        NgbDatepickerModule,
        // YamapngModule,
        // YaCoreModule.forRoot({
        //   apiKey: 'fb718445-eb8b-4e81-8eed-8e9afc51b160'
        // }),
        NgxMaterialTimepickerModule,
        MatDialogModule,
        // FontAwesomeModule,
        MatInputModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        DragDropModule,

        MatMenuModule,
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

        AdminSuperlistComponent,
        SubtableComponent,
        KashrutSubtableComponent,
        QualitySubtableComponent,
        BiodynamicSubtableComponent,
        OrganicSubtableComponent,
        VeganSubtableComponent,
        GrapesSubtableComponent,
        ImageSubtableComponent,

        AdminWineryComponent,
        VisittimeSubtableComponent,
        GrapesWinerySubtableComponent,
        VineyardWinerySubtableComponent,
        QualityWinerySubtableComponent,
        BiodynamicWinerySubtableComponent,
        OrganicWinerySubtableComponent,
        VeganWinerySubtableComponent,
        KashrutWinerySubtableComponent,
        MapSubtableComponent,

        WinesSubtableComponent,

        RegionsSubtableComponent,

        LoginSubtableComponent,
        RegistrationSubtableComponent,

        PlaceOfOriginComponent,

        WineryInformationSubscreenComponent,
        WineryContactsSubscreenComponent,
        WineryAdditionalSubscreenComponent,

        // WineOneDesignedComponent,
        WineOneSubscreenComponent,

        SpecialistSubscreenComponent,
        MultiselectSubtableComponent,
        WinesVoteSubscreenComponent,
        BusinessDescriptionSubscreenComponent,
        BusinessSubscreenComponent,
        WinesStoreSubscreenComponent,
        WinesSimplestoreSubscreenComponent,

        ShopInformationSubscreenComponent,
        ShopContactsSubscreenComponent,

        AreYouSureComponent,

        NavigationDesignedComponent,
        PopUpBonvinoComponent,
        WineOneUniversalSubscreenComponent,

        MapSubscreenComponent,
        FindWineComponent,
        BengatContactsComponent,
        WinesShopAddSubscreenComponent
    ],
})
export class AppSecondModule {
    constructor(
        matIconRegistry: MatIconRegistry,
        domSanitizer: DomSanitizer
    ) {
        // matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg'));
    } }
