import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category.component';
import {CategoryFormComponent} from "./view/category-form/category-form.component";

const routes: Routes = [{ path: '', component: CategoryComponent, children:[
    {path:'add', component:CategoryFormComponent},
    {path:'add/:id', component:CategoryFormComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
