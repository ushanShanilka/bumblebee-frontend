import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/login/login.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiLoadingDialogComponent } from './core/dialogs/api-loading-dialog/api-loading-dialog.component';
import { ApprovalDialogComponent } from './core/dialogs/approval-dialog/approval-dialog.component';
import { DateSelectorDialogComponent } from './core/dialogs/date-selector-dialog/date-selector-dialog.component';
import { ShowListDialogComponent } from './core/dialogs/show-list-dialog/show-list-dialog.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ToastrModule } from 'ngx-toastr';
import {AlertAndErrorInterceptor} from "./core/interceptors/alert-and-error.interceptor";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {ApiLoadingInterceptor} from "./core/interceptors/api-loading.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    ApiLoadingDialogComponent,
    ApprovalDialogComponent,
    DateSelectorDialogComponent,
    ShowListDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    MatButtonModule,
    MatProgressBarModule,
    MatFormFieldModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({ timeOut: 3000 }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AlertAndErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiLoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
