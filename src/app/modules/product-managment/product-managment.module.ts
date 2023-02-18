import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagmentRoutingModule } from './product-managment-routing.module';
import { ProductManagmentComponent } from './product-managment.component';


@NgModule({
  declarations: [
    ProductManagmentComponent
  ],
  imports: [
    CommonModule,
    ProductManagmentRoutingModule
  ]
})
export class ProductManagmentModule { }
