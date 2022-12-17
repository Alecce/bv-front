import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from "./admin.component";
import {AdminSuperlistComponent} from "./admin-superlist/admin-superlist.component";
import {AdminUserlistComponent} from "./admin-userlist/admin-userlist.component";
import {AdminWineComponent} from "./admin-wine/admin-wine.component";
import {AdminWineryComponent} from "./admin-winery/admin-winery.component";
import {AdminEventComponent} from "./admin-event/admin-event.component";
import {AdminVineyardComponent} from "./admin-vineyard/admin-vineyard.component";
import {AdminSpecialistComponent} from "./admin-specialist/admin-specialist.component";
import {AdminQualityComponent} from "./admin-quality/admin-quality.component";
import {AdminKashrutComponent} from "./admin-kashrut/admin-kashrut.component";
import {AdminGrapesComponent} from "./admin-grapes/admin-grapes.component";
import {AdminBiodynamicComponent} from "./admin-biodynamic/admin-biodynamic.component";
import {AdminOrganicComponent} from "./admin-organic/admin-organic.component";
import {AdminVeganComponent} from "./admin-vegan/admin-vegan.component";
import {AdminAutodescriptionComponent} from "./admin-autodescription/admin-autodescription.component";
import {AdminAutodescriptionCategoriesComponent} from "./admin-autodescription-categories/admin-autodescription-categories.component";
import {AdminAutodescriptionOptionsComponent} from "./admin-autodescription-options/admin-autodescription-options.component";
import {AdminWineMergingComponent} from "./admin-wine-merging/admin-wine-merging.component";
import {AdminSupermergeComponent} from "./admin-supermerge/admin-supermerge.component";
import {AdminWineryMergingComponent} from "./admin-winery-merging/admin-winery-merging.component";
import {AdminLanguageComponent} from "./admin-language/admin-language.component";
import {AdminWinetypeComponent} from "./admin-winetype/admin-winetype.component";
import {AdminWinesubtypeComponent} from "./admin-winesubtype/admin-winesubtype.component";
import {AdminBarrelComponent} from "./admin-barrel/admin-barrel.component";
import {AdminSparklingComponent} from "./admin-sparkling/admin-sparkling.component";
import {AdminCorkComponent} from "./admin-cork/admin-cork.component";
import {AdminNongrapeComponent} from "./admin-nongrape/admin-nongrape.component";
import {AdminHomeComponent} from "./admin-home/admin-home.component";
import {AdminPageConstructorPagelistComponent} from "./admin-page-constructor-pagelist/admin-page-constructor-pagelist.component";
import {AdminPageConstructorBlocklistComponent} from "./admin-page-constructor-blocklist/admin-page-constructor-blocklist.component";
import {AdminPageConstructorBlockoptionlistComponent} from "./admin-page-constructor-blockoptionlist/admin-page-constructor-blockoptionlist.component";
import {AdminPageConstructorBlocksComponent} from "./admin-page-constructor-blocks/admin-page-constructor-blocks.component";
import {AdminBarrelsizeComponent} from "./admin-barrelsize/admin-barrelsize.component";
import {AdminRegionComponent} from "./admin-region/admin-region.component";
import {AdminGrapeClonesComponent} from "./admin-grape-clones/admin-grape-clones.component";
import {AdminWineimagesComponent} from "./admin-wineimages/admin-wineimages.component";
import {AdminBottleComponent} from "./admin-bottle/admin-bottle.component";
import {AdminVisitorsComponent} from "./admin-visitors/admin-visitors.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
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
import {SuperlistComponent} from "../lists/superlist/superlist.component";
import {MultiselectSubtableComponent} from "./multiselect-subtable/multiselect-subtable.component";
import {SchemasModule} from "../schemas/schemas.module";
import {BlocksConstructorComponent} from "./blocks-constructor/blocks-constructor.component";
import {VisittimeSubtableComponent} from "./admin-superlist/visittime-subtable/visittime-subtable.component";
import {GrapesWinerySubtableComponent} from "./admin-winery/grapes-winery-subtable/grapes-winery-subtable.component";
import {VineyardWinerySubtableComponent} from "./admin-winery/vineyard-winery-subtable/vineyard-winery-subtable.component";
import {QualityWinerySubtableComponent} from "./admin-winery/quality-winery-subtable/quality-winery-subtable.component";
import {BiodynamicWinerySubtableComponent} from "./admin-winery/biodynamic-winery-subtable/biodynamic-winery-subtable.component";
import {OrganicWinerySubtableComponent} from "./admin-winery/organic-winery-subtable/organic-winery-subtable.component";
import {VeganWinerySubtableComponent} from "./admin-winery/vegan-winery-subtable/vegan-winery-subtable.component";
import {KashrutWinerySubtableComponent} from "./admin-winery/kashrut-winery-subtable/kashrut-winery-subtable.component";
import {MapSubtableComponent} from "./admin-superlist/map-subtable/map-subtable.component";
import {SubtableComponent} from "./admin-superlist/subtable/subtable.component";
import {KashrutSubtableComponent} from "./admin-wine/kashrut-subtable/kashrut-subtable.component";
import {QualitySubtableComponent} from "./admin-wine/quality-subtable/quality-subtable.component";
import {BiodynamicSubtableComponent} from "./admin-wine/biodynamic-subtable/biodynamic-subtable.component";
import {OrganicSubtableComponent} from "./admin-wine/organic-subtable/organic-subtable.component";
import {VeganSubtableComponent} from "./admin-wine/vegan-subtable/vegan-subtable.component";
import {GrapesSubtableComponent} from "./admin-wine/grapes-subtable/grapes-subtable.component";
import {ImageSubtableComponent} from "./admin-superlist/image-subtable/image-subtable.component";
import {WinesSubtableComponent} from "./admin-event/wines-subtable/wines-subtable.component";
import {RegionsSubtableComponent} from "./admin-quality/regions-subtable/regions-subtable.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {BusinessListComponent} from "../lists/business-list/business-list.component";
import {UserListComponent} from "../lists/user-list/user-list.component";
import {SpecialistListComponent} from "../lists/specialist-list/specialist-list.component";
import {VineyardListComponent} from "../lists/vineyard-list/vineyard-list.component";
import {RegionListComponent} from "../lists/region-list/region-list.component";
import {KashrutListComponent} from "../lists/kashrut-list/kashrut-list.component";
import {GrapeListComponent} from "../lists/grape-list/grape-list.component";
import {AwardListComponent} from "../lists/award-list/award-list.component";
import {CompetitionListComponent} from "../lists/competition-list/competition-list.component";
import {QualityListComponent} from "../lists/quality-list/quality-list.component";
import {QualityComponent} from "../quality/quality.component";
import {VeganListComponent} from "../lists/vegan-list/vegan-list.component";
import {VeganComponent} from "../vegan/vegan.component";
import {OrganicListComponent} from "../lists/organic-list/organic-list.component";
import {OrganicComponent} from "../organic/organic.component";
import {BiodinamicListComponent} from "../lists/biodinamic-list/biodinamic-list.component";
import {BiodinamicComponent} from "../biodinamic/biodinamic.component";
import {KashrutComponent} from "../kashrut/kashrut.component";



@NgModule({
  declarations: [

    SuperlistComponent,
    AdminComponent,
    AdminSuperlistComponent,
    AdminUserlistComponent,
    AdminWineComponent,
    AdminWineryComponent,
    AdminEventComponent,
    AdminVineyardComponent,
    AdminSpecialistComponent,
    AdminQualityComponent,
    AdminKashrutComponent,
    AdminGrapesComponent,
    AdminBiodynamicComponent,
    AdminOrganicComponent,
    AdminVeganComponent,
    AdminAutodescriptionComponent,
    AdminAutodescriptionCategoriesComponent,
    AdminAutodescriptionOptionsComponent,
    AdminWineMergingComponent,
    AdminSupermergeComponent,
    AdminWineryMergingComponent,
    AdminLanguageComponent,
    AdminWinetypeComponent,
    AdminWinesubtypeComponent,
    AdminBarrelComponent,
    AdminSparklingComponent,
    AdminCorkComponent,
    AdminNongrapeComponent,
    AdminHomeComponent,
    AdminPageConstructorPagelistComponent,
    AdminPageConstructorBlocklistComponent,
    AdminPageConstructorBlockoptionlistComponent,
    AdminPageConstructorBlocksComponent,
    AdminBarrelsizeComponent,
    AdminRegionComponent,
    AdminGrapeClonesComponent,
    AdminWineimagesComponent,
    AdminBottleComponent,
    AdminVisitorsComponent,
    BlocksConstructorComponent,


    VisittimeSubtableComponent,
    GrapesWinerySubtableComponent,
    VineyardWinerySubtableComponent,
    QualityWinerySubtableComponent,
    BiodynamicWinerySubtableComponent,
    OrganicWinerySubtableComponent,
    VeganWinerySubtableComponent,
    KashrutWinerySubtableComponent,
    MapSubtableComponent,

    SubtableComponent,
    KashrutSubtableComponent,
    QualitySubtableComponent,
    BiodynamicSubtableComponent,
    OrganicSubtableComponent,
    VeganSubtableComponent,
    GrapesSubtableComponent,
    ImageSubtableComponent,

    WinesSubtableComponent,

    RegionsSubtableComponent,

    MultiselectSubtableComponent,

    BusinessListComponent,
    UserListComponent,
    SpecialistListComponent,
    VineyardListComponent,
    QualityListComponent,
    QualityComponent,
    RegionListComponent,
    KashrutListComponent,
    KashrutComponent,
    GrapeListComponent,
    AwardListComponent,
    CompetitionListComponent,
    VeganListComponent,
    VeganComponent,
    OrganicListComponent,
    OrganicComponent,
    BiodinamicListComponent,
    BiodinamicComponent


  ],
  imports: [

    CommonModule,
    AdminRoutingModule,

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


    SchemasModule
  ]
})
export class AdminModule { }
