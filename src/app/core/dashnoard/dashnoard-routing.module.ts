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
          import('../../modules/product-managment/product-management.module').then(
            (m) => m.ProductManagementModule
          ),
      },
      { path: 'category', loadChildren: () => import('../../modules/category/category.module').then(m => m.CategoryModule) },
      { path: 'brand', loadChildren: () => import('../../modules/brand/brand.module').then(m => m.BrandModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashnoardRoutingModule {}
