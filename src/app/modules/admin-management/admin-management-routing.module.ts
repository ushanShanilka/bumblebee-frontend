import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminManagementComponent } from './admin-management.component';
import {AdminFormComponent} from "./view/admin-form/admin-form.component";
import {AdminsComponent} from "./view/admins/admins.component";

const routes: Routes = [{ path: '', component: AdminManagementComponent , children:[
    {path:'add', component:AdminFormComponent},
    {path:'all', component:AdminsComponent},
    {path:'all/:id', component:AdminFormComponent},
  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManagementRoutingModule { }
