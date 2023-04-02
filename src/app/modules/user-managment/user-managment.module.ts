import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagmentRoutingModule } from './user-managment-routing.module';
import { UserManagmentComponent } from './user-managment.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UsersComponent } from './view/users/users.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [UserManagmentComponent, UsersComponent],
    imports: [
        CommonModule,
        UserManagmentRoutingModule,
        MatTabsModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressBarModule,
        MatTableModule,
        MatTooltipModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
    ],
})
export class UserManagmentModule {}
