import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashnoardComponent } from './dashnoard.component';

const routes: Routes = [
  {
    path: '',
    component: DashnoardComponent,
    children: [
      {
        path: 'user-management',
        loadChildren: () =>
          import('../../modules/user-managment/user-managment.module').then(
            (m) => m.UserManagmentModule
          ),
      },
      {
        path: 'product-management',
        loadChildren: () =>
          import('../../modules/product-managment/product-managment.module').then(
            (m) => m.ProductManagmentModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashnoardRoutingModule {}
