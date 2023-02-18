import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ApiLoadingComponent} from "./api-loading/api-loading.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatProgressBarModule} from "@angular/material/progress-bar";



@NgModule({
  declarations: [
    ApiLoadingComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers:[
    DatePipe
  ],
  exports: [
    ApiLoadingComponent
  ],
})
export class SharedModule { }
