import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WinesDesignedComponent} from "./wines-designed.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgbDatepickerModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SchemasModule} from "../schemas/schemas.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {NgxPaginationModule} from "ngx-pagination";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatDialogModule} from "@angular/material/dialog";
import {WinesServingDesignedComponent} from "./wines-serving-designed/wines-serving-designed.component";
import {WinesAdvancedDesignedComponent} from "./wines-advanced-designed/wines-advanced-designed.component";
import {WinesBasicDesignedComponent} from "./wines-basic-designed/wines-basic-designed.component";
import {WinesGrapesDesignedComponent} from "./wines-grapes-designed/wines-grapes-designed.component";
import {WinesMenuDesignedComponent} from "./wines-menu-designed/wines-menu-designed.component";
import {DescriptionGradesViewComponent} from "./description-grades-view/description-grades-view.component";
import {DescriptionGradesAddComponent} from "./description-grades-add/description-grades-add.component";
import {WinesRoutingModule} from "./wines-routing.module";


@NgModule({
  declarations: [
    WinesDesignedComponent,
    WinesBasicDesignedComponent,
    WinesAdvancedDesignedComponent,
    WinesGrapesDesignedComponent,
    WinesServingDesignedComponent,
    WinesMenuDesignedComponent,
    DescriptionGradesAddComponent,
    // DescriptionGradesViewComponent,
  ],
  imports: [
    CommonModule,

    WinesRoutingModule,


    SchemasModule
  ]
})
export class WinesDesignedModule { }
