import {Component, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManagmentComponent } from './product-managment.component';
import {ProductFormComponent} from "./view/product-form/product-form.component";
import {ProductsComponent} from "./view/products/products.component";
import {ProductManagementModule} from "./product-management.module";

const routes: Routes = [{ path: '', component: ProductManagmentComponent, children:[
    {path:'add', component:ProductFormComponent},
    {path:'all', component:ProductsComponent},
    {path:'all/:id', component:ProductFormComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagmentRoutingModule { }
