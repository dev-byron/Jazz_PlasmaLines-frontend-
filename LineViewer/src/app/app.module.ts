/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbDialogService,
  NbLayoutModule,
  NbMenuModule,
  NbSelectModule,
  NbSidebarModule,
  NbThemeModule,
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
import { DefaultComponent } from './components/dashboard/sportbook/section/default/default.component';
import { DrawParticipantComponent } from './components/dashboard/sportbook/section/draw-participant/draw-participant.component';
import { FutureOddsToWinComponent } from './components/dashboard/sportbook/section/futures-odds-to-win/futures-odds-to-win.component';
import { TeamTotalsComponent } from './components/dashboard/sportbook/section/team-totals/team-totals.component';
import { NoDataComponent } from './components/dashboard/sportbook/section/no-data/no-data.component';

import { LineComponent } from './components/dashboard/sportbook/section/line/line.component';
import {ConfigurationService } from "./services/component/configuration.service";
import { ConfigurationRestService } from "./services/rest/configuration.rest.service";
import { ContainerWrapperDirective } from './directives/container-wrapper.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvertisingComponent } from "./components/dashboard/sportbook/advertising/advertising.component";
import { AppConfig } from './app.config';
import { ImageService } from "./services/utils/image.service";

@NgModule({
  declarations: [
    AppComponent, 
    VerifierComponent, 
    DashboardComponent, 
    NavbarComponent,  
    SportBookComponent, 
    SectionComponent, 
    LineComponent, 
    ContainerWrapperDirective, 
    DefaultComponent,
    DrawParticipantComponent,
    FutureOddsToWinComponent,
    TeamTotalsComponent,
    NoDataComponent,
    AdvertisingComponent
  ],
  imports: [
    NbSelectModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NbLayoutModule,
    NbThemeModule.forRoot(),
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
    NgbModule,
  ],
  providers: [
      SocketService, 
      EventAggregator,
      ConfigurationService,
      ConfigurationRestService,
      NbDialogService,
      AppConfig,
      ImageService,
      { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true }
    ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
