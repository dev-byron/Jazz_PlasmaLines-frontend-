/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { VerifierComponent } from './components/verifier/verifier.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SocketService } from './services/sockets/socket.service';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { EventAggregator } from './services/utils/event-aggregator';
import { SportBookComponent } from './components/dashboard/sportbook/sportbook.component';
import { SectionComponent } from './components/dashboard/sportbook/section/section.component';
import { LineComponent } from './components/dashboard/sportbook/section/line/line.component';
import { PlasmaLineConfigurationService } from "./services/component/plasma-line-configuration.service";
import { PlasmaLineConfigurationRestService } from "./services/rest/plasma-line-configuration.rest.service";


@NgModule({
  declarations: [AppComponent, VerifierComponent, DashboardComponent, NavbarComponent,  SportBookComponent, SectionComponent, LineComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
  ],
  providers: [
      SocketService, 
      EventAggregator,
      PlasmaLineConfigurationService,
      PlasmaLineConfigurationRestService
    ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
