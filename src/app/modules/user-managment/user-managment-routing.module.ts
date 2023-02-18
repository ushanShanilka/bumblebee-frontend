import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagmentComponent } from './user-managment.component';
import { UsersComponent } from './view/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: UserManagmentComponent,
    children: [{ path: 'add', component: UsersComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagmentRoutingModule {}
