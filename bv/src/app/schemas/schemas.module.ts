import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShopContactsSubscreenComponent} from "../shop-designed/shop-contacts-subscreen/shop-contacts-subscreen.component";
import {WineOneUniversalSubscreenComponent} from "../wines-designed/wine-one-universal-subscreen/wine-one-universal-subscreen.component";
import {WinesShopAddSubscreenComponent} from "../wines-designed/wines-shop-add-subscreen/wines-shop-add-subscreen.component";
import {InvalidDataErrorComponent} from "../services/invalid-data-error/invalid-data-error.component";
import {AreYouSureComponent} from "../services/are-you-sure/are-you-sure.component";
import {WineryInformationSubscreenComponent} from "../wineries-designed/winery-information-subscreen/winery-information-subscreen.component";
import {SpecialistSubscreenComponent} from "../lists/business-list-designed/specialist-subscreen/specialist-subscreen.component";
import {WinesVoteSubscreenComponent} from "../wines-designed/wines-vote-subscreen/wines-vote-subscreen.component";
import {NavigationDesignedComponent} from "../navigation/navigation-designed/navigation-designed.component";
import {ShopInformationSubscreenComponent} from "../shop-designed/shop-information-subscreen/shop-information-subscreen.component";
import {BusinessDescriptionSubscreenComponent} from "../lists/business-list-designed/business-description-subscreen/business-description-subscreen.component";
import {LoginSubtableComponent} from "../login/login-subtable/login-subtable.component";
import {BusinessSubscreenComponent} from "../lists/business-list-designed/business-subscreen/business-subscreen.component";
import {WineOneSubscreenComponent} from "../wines-designed/wine-one-subscreen/wine-one-subscreen.component";
import {RegistrationSubtableComponent} from "../login/registration-subtable/registration-subtable.component";
import {WineryContactsSubscreenComponent} from "../wineries-designed/winery-contacts-subscreen/winery-contacts-subscreen.component";
import {WinesSimplestoreSubscreenComponent} from "../wines-designed/wines-simplestore-subscreen/wines-simplestore-subscreen.component";
import {WineryAdditionalSubscreenComponent} from "../wineries-designed/winery-additional-subscreen/winery-additional-subscreen.component";
import {WinesStoreSubscreenComponent} from "../wines-designed/wines-store-subscreen/wines-store-subscreen.component";
import {SuperComponentWithTabsComponent} from "./super-component-with-tabs/super-component-with-tabs.component";
import {PlaceOfOriginComponent} from "./place-of-origin/place-of-origin.component";
import {MapGoogleDesignedComponent} from "./map-google-designed/map-google-designed.component";
import {SelectBonvinoComponent} from "./select-bonvino/select-bonvino.component";
import {InputTimeBonvinoComponent} from "./input-time-bonvino/input-time-bonvino.component";
import {SelectSearchBonvinoComponent} from "./select-search-bonvino/select-search-bonvino.component";
import {RadioBonvinoComponent} from "./radio-bonvino/radio-bonvino.component";
import {IconBonvinoComponent} from "./icon-bonvino/icon-bonvino.component";
import {CheckboxBonvinoComponent} from "./checkbox-bonvino/checkbox-bonvino.component";
import {ScrollBonvinoComponent} from "./scroll-bonvino/scroll-bonvino.component";
import {CheckboxGroupBonvinoComponent} from "./checkbox-group-bonvino/checkbox-group-bonvino.component";
import {SearcherBonvinoComponent} from "./searcher-bonvino/searcher-bonvino.component";
import {PopUpBonvinoComponent} from "./pop-up-bonvino/pop-up-bonvino.component";
import {TabsBarComponent} from "./tabs-bar/tabs-bar.component";
import {AdditionalSchemaComponent} from "./additional-schema/additional-schema.component";
import {MenuSchemaComponent} from "./menu-schema/menu-schema.component";
import {AdditionalViewSchemaComponent} from "./additional-view-schema/additional-view-schema.component";
import {TemperatureViewBonvinoComponent} from "./temperature-view-bonvino/temperature-view-bonvino.component";
import {ButtonRowComponent} from "./button-row/button-row.component";
import {TemperatureInputBonvinoComponent} from "./temperature-input-bonvino/temperature-input-bonvino.component";
import {OriginInputBonvinoComponent} from "./origin-input-bonvino/origin-input-bonvino.component";
import {SubblockInputBonvinoComponent} from "./subblock-input-bonvino/subblock-input-bonvino.component";
import {OriginViewBonvinoComponent} from "./origin-view-bonvino/origin-view-bonvino.component";
import {SubblockViewBonvinoComponent} from "./subblock-view-bonvino/subblock-view-bonvino.component";
import {PersonSearchComponent} from "./person-search/person-search.component";
import {PersonOneRowComponent} from "./person-one-row/person-one-row.component";
import {CompetitionSelectComponent} from "./competition-select/competition-select.component";
import {CompetitionOneRowComponent} from "./competition-one-row/competition-one-row.component";
import {AwardOneRowComponent} from "./award-one-row/award-one-row.component";
import {CompetitionWineSelectComponent} from "./competition-wine-select/competition-wine-select.component";
import {ExistedSchemaFormComponent} from "./existed-schema-form/existed-schema-form.component";
import {AdditionalSearchSchemaComponent} from "./additional-search-schema/additional-search-schema.component";
import {MapHiddenComponent} from "./map-hidden/map-hidden.component";
import {MapSubscreenComponent} from "./map-subscreen/map-subscreen.component";
import {FindWineComponent} from "./find-wine/find-wine.component";
import {BengatContactsComponent} from "./bengat-contacts/bengat-contacts.component";
import {CalendarViewBonvinoComponent} from "./calendar-view-bonvino/calendar-view-bonvino.component";
import {CalendarInputBonvinoComponent} from "./calendar-input-bonvino/calendar-input-bonvino.component";
import {DayOfWeekTimeBonvinoComponent} from "./day-of-week-time-bonvino/day-of-week-time-bonvino.component";
import {MapOpenLayersComponent} from "./map-open-layers/map-open-layers.component";
import {SupermapOpenLayersComponent} from "./supermap-open-layers/supermap-open-layers.component";
import {LocationiqBonvinoComponent} from "./locationiq-bonvino/locationiq-bonvino.component";
import {CenterMatmenuDirective} from "./glass-bonvino/center-matmenu.directive";
import {GlassBonvinoComponent} from "./glass-bonvino/glass-bonvino.component";
import {AddButtonBonvinoComponent} from "./add-button-bonvino/add-button-bonvino.component";
import {TextComponent} from "../language/text/text.component";
import {LanguageNavigateComponent} from "../language/language-navigate/language-navigate.component";
import {LanguageListComponent} from "../language/language-list/language-list.component";
import {TranscludeDirective} from "../language/text/transclude.directive";
import {TextComplicatedComponent} from "../language/text-complicated/text-complicated.component";
import {TitleComponent} from "../language/title/title.component";
import {LanguageNavigateMobileComponent} from "../language/language-navigate-mobile/language-navigate-mobile.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {NgxPaginationModule} from "ngx-pagination";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NgbDatepickerModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {SupermapGoogleComponent} from "../supermap-google/supermap-google.component";
import {SuperimageComponent} from "../superimage/superimage.component";
import {WineAutodecriptionComponent} from "../wines-designed/wine-autodecription/wine-autodecription.component";
import {WineDescriptionComponent} from "../wines-designed/wine-description/wine-description.component";
import {AutodescriptionDesignedComponent} from "../wines-designed/autodescription-designed/autodescription-designed.component";



@NgModule({
  declarations: [

    SuperComponentWithTabsComponent,
    PlaceOfOriginComponent,
    MapGoogleDesignedComponent,
    SelectBonvinoComponent,
    SelectSearchBonvinoComponent,
    CheckboxBonvinoComponent,
    IconBonvinoComponent,
    InputTimeBonvinoComponent,
    RadioBonvinoComponent,
    ScrollBonvinoComponent,
    CheckboxGroupBonvinoComponent,
    SearcherBonvinoComponent,
    PopUpBonvinoComponent,
    MenuSchemaComponent,
    AdditionalSchemaComponent,
    AdditionalViewSchemaComponent,
    TabsBarComponent,
    ButtonRowComponent,
    TemperatureInputBonvinoComponent,
    TemperatureViewBonvinoComponent,
    OriginInputBonvinoComponent,
    OriginViewBonvinoComponent,
    SubblockViewBonvinoComponent,
    SubblockInputBonvinoComponent,
    PersonSearchComponent,
    PersonOneRowComponent,
    CompetitionSelectComponent,
    CompetitionOneRowComponent,
    AwardOneRowComponent,
    CompetitionSelectComponent,
    CompetitionOneRowComponent,
    AwardOneRowComponent,
    CompetitionWineSelectComponent,
    ExistedSchemaFormComponent,
    AdditionalSearchSchemaComponent,
    MapHiddenComponent,
    MapSubscreenComponent,
    FindWineComponent,
    BengatContactsComponent,
    // SubrouterComponent,
    CalendarInputBonvinoComponent,
    DayOfWeekTimeBonvinoComponent,
    CalendarViewBonvinoComponent,
    MapOpenLayersComponent,
    SupermapOpenLayersComponent,
    GlassBonvinoComponent,
    CenterMatmenuDirective,
    LocationiqBonvinoComponent,
    AddButtonBonvinoComponent,


    TextComponent,
    LanguageNavigateComponent,
    LanguageListComponent,
    TextComplicatedComponent,
    TranscludeDirective,
    TitleComponent,
    LanguageNavigateMobileComponent,

    SupermapGoogleComponent,
    SuperimageComponent,

    WineAutodecriptionComponent,
    WineDescriptionComponent,
    AutodescriptionDesignedComponent,


  ],
  imports: [

    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatSnackBarModule,
    MatCheckboxModule,
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
  ],
  exports: [

    CommonModule,
    SuperComponentWithTabsComponent,
    PlaceOfOriginComponent,
    MapGoogleDesignedComponent,
    SelectBonvinoComponent,
    SelectSearchBonvinoComponent,
    CheckboxBonvinoComponent,
    IconBonvinoComponent,
    InputTimeBonvinoComponent,
    RadioBonvinoComponent,
    ScrollBonvinoComponent,
    CheckboxGroupBonvinoComponent,
    SearcherBonvinoComponent,
    PopUpBonvinoComponent,
    MenuSchemaComponent,
    AdditionalSchemaComponent,
    AdditionalViewSchemaComponent,
    TabsBarComponent,
    ButtonRowComponent,
    TemperatureInputBonvinoComponent,
    TemperatureViewBonvinoComponent,
    OriginInputBonvinoComponent,
    OriginViewBonvinoComponent,
    SubblockViewBonvinoComponent,
    SubblockInputBonvinoComponent,
    PersonSearchComponent,
    PersonOneRowComponent,
    CompetitionSelectComponent,
    CompetitionOneRowComponent,
    AwardOneRowComponent,
    CompetitionSelectComponent,
    CompetitionOneRowComponent,
    AwardOneRowComponent,
    CompetitionWineSelectComponent,
    ExistedSchemaFormComponent,
    AdditionalSearchSchemaComponent,
    MapHiddenComponent,
    MapSubscreenComponent,
    FindWineComponent,
    BengatContactsComponent,
    // SubrouterComponent,
    CalendarInputBonvinoComponent,
    DayOfWeekTimeBonvinoComponent,
    CalendarViewBonvinoComponent,
    MapOpenLayersComponent,
    SupermapOpenLayersComponent,
    GlassBonvinoComponent,
    CenterMatmenuDirective,
    LocationiqBonvinoComponent,
    AddButtonBonvinoComponent,

    TextComponent,
    LanguageNavigateComponent,
    LanguageListComponent,
    TextComplicatedComponent,
    TranscludeDirective,
    TitleComponent,
    LanguageNavigateMobileComponent,

    SupermapGoogleComponent,


    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatSnackBarModule,
    MatCheckboxModule,
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


    SuperimageComponent,

    WineAutodecriptionComponent,
    WineDescriptionComponent,
    AutodescriptionDesignedComponent,
  ],
  entryComponents: [

    PlaceOfOriginComponent,
    PopUpBonvinoComponent,
    MapSubscreenComponent,
    FindWineComponent,
    BengatContactsComponent,
  ],
})
export class SchemasModule { }
