import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
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

const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'business-list',
    component: BusinessListComponent
  },
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'specialist-list',
    component: SpecialistListComponent
  },
  {
    path: 'vineyard-list',
    component: VineyardListComponent
  },
  {
    path: 'quality-list',
    component: QualityListComponent
  },
  {
    path: 'quality/:id',
    component: QualityComponent,
    data: {editable: false, download: true},
  },
  {
    path: 'quality-edit/:id',
    component: QualityComponent,
    data: {editable: true, download: true},
  },
  {
    path: 'quality-add',
    component: QualityComponent,
    data: {editable: true, download: false},
  },
  {
    path: 'region-list',
    component: RegionListComponent
  },
  {
    path: 'kashrut-list',
    component: KashrutListComponent
  },
  {
    path: 'kashrut/:id',
    component: KashrutComponent,
    data: {editable: false, download: true},
  },
  {
    path: 'kashrut-edit/:id',
    component: KashrutComponent,
    data: {editable: true, download: true},
  },
  {
    path: 'kashrut-add',
    component: KashrutComponent,
    data: {editable: true, download: false},
  },
  {
    path: 'grape-list',
    component: GrapeListComponent
  },
  {
    path: 'award-list',
    component: AwardListComponent
  },
  {
    path: 'competition-list',
    component: CompetitionListComponent
  },
  {
    path: 'vegan-list',
    component: VeganListComponent
  },
  {
    path: 'vegan/:id',
    component: VeganComponent,
    data: {editable: false, download: true},
  },
  {
    path: 'vegan-edit/:id',
    component: VeganComponent,
    data: {editable: true, download: true},
  },
  {
    path: 'vegan-add',
    component: VeganComponent,
    data: {editable: true, download: false},
  },
  {
    path: 'organic-list',
    component: OrganicListComponent
  },
  {
    path: 'organic/:id',
    component: OrganicComponent,
    data: {editable: false, download: true},
  },
  {
    path: 'organic-edit/:id',
    component: OrganicComponent,
    data: {editable: true, download: true},
  },
  {
    path: 'organic-add',
    component: OrganicComponent,
    data: {editable: true, download: false},
  },
  {
    path: 'biodinamic-list',
    component: BiodinamicListComponent
  },
  {
    path: 'biodinamic/:id',
    component: BiodinamicComponent,
    data: {editable: false, download: true},
  },
  {
    path: 'biodinamic-edit/:id',
    component: BiodinamicComponent,
    data: {editable: true, download: true},
  },
  {
    path: 'biodinamic-add',
    component: BiodinamicComponent,
    data: {editable: true, download: false},
  },

];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
