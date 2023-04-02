import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './brand.component';
import {BrandFormComponent} from "./view/brand-form/brand-form.component";

const routes: Routes = [{ path: '', component: BrandComponent, children:[
    {path:'add', component:BrandFormComponent},
    {path:'add/:id', component:BrandFormComponent},
  ]  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
