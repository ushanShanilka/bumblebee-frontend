import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashnoardRoutingModule } from './dashnoard-routing.module';
import { DashnoardComponent } from './dashnoard.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LeftSideNavBarComponent } from './left-side-nav-bar/left-side-nav-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuContainerComponent } from './left-side-nav-bar/inner-components/menu-container/menu-container.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ClientComponent } from './top-bar/inner-components/client/client.component';
import {SharedModule} from "../../modules/shared/shared.module";

@NgModule({
  declarations: [
    DashnoardComponent,
    TopBarComponent,
    LeftSideNavBarComponent,
    MenuContainerComponent,
    ClientComponent,
  ],
    imports: [
        CommonModule,
        DashnoardRoutingModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatExpansionModule,
        MatListModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatProgressBarModule,
        SharedModule
    ],
})
export class DashnoardModule {}
