import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import {AuthGuard} from "./core/auth/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', loadChildren: () => import('./core/dashnoard/dashnoard.module').then(m => m.DashnoardModule),canActivate:[AuthGuard]},
  { path: 'admin-management', loadChildren: () => import('./modules/admin-management/admin-management.module').then(m => m.AdminManagementModule) },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
