import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgbDatepickerModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SchemasModule} from "../../schemas/schemas.module";
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
import {WineryAddRoutingModule} from "./winery-add-routing.module";
import {WineryAddComponent} from "./winery-add.component";
import {WineryAdditionalComponent} from "../winery-additional/winery-additional.component";
import {WineryBasicComponent} from "../winery-basic/winery-basic.component";
import {WineriesSecondComponent} from "../wineries-second/wineries-second.component";
import {WineriesMenuComponent} from "../wineries-menu/wineries-menu.component";



@NgModule({
  declarations: [
    WineryAddComponent,

    WineryAdditionalComponent,
    WineryBasicComponent,
    WineriesSecondComponent,
    WineriesMenuComponent,
  ],
  imports: [
    CommonModule,

    WineryAddRoutingModule,


    SchemasModule
  ]
})
export class WineryAddModule { }
