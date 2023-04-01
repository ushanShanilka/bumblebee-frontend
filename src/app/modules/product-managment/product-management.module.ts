import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagmentRoutingModule } from './product-managment-routing.module';
import { ProductManagmentComponent } from './product-managment.component';
import { ProductFormComponent } from './view/product-form/product-form.component';
import { ProductsComponent } from './view/products/products.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ProductManagmentComponent,
    ProductFormComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductManagmentRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatTableModule,
    MatTooltipModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule
  ]
})
export class ProductManagementModule { }
