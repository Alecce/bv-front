import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WineryAddComponent} from "./winery-add.component";

const routes: Routes = [
  { path: '', component: WineryAddComponent }

];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [RouterModule]
})


export class WineryAddRoutingModule { }
