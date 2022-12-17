import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BusinessListComponent} from "../lists/business-list/business-list.component";
import {UserListComponent} from "../lists/user-list/user-list.component";
import {SpecialistListComponent} from "../lists/specialist-list/specialist-list.component";
import {VineyardListComponent} from "../lists/vineyard-list/vineyard-list.component";
import {QualityComponent} from "../quality/quality.component";
import {RegionListComponent} from "../lists/region-list/region-list.component";
import {GrapeListComponent} from "../lists/grape-list/grape-list.component";
import {KashrutListComponent} from "../lists/kashrut-list/kashrut-list.component";
import {AwardListComponent} from "../lists/award-list/award-list.component";
import {CompetitionListComponent} from "../lists/competition-list/competition-list.component";
import {QualityListComponent} from "../lists/quality-list/quality-list.component";
import {VeganListComponent} from "../lists/vegan-list/vegan-list.component";
import {VeganComponent} from "../vegan/vegan.component";
import {OrganicListComponent} from "../lists/organic-list/organic-list.component";
import {OrganicComponent} from "../organic/organic.component";
import {BiodinamicListComponent} from "../lists/biodinamic-list/biodinamic-list.component";
import {BiodinamicComponent} from "../biodinamic/biodinamic.component";
import {KashrutComponent} from "../kashrut/kashrut.component";
import {WinesDesignedComponent} from "./wines-designed.component";

const routes: Routes = [
  { path: '', component: WinesDesignedComponent }

];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [RouterModule]
})

export class WinesRoutingModule { }
