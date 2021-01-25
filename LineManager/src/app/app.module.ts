import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketComponent } from './components/sockets/socket.component';
import { FormsModule } from '@angular/forms';
import { SocketioService } from './services/websocket/socket.service';

@NgModule({
  declarations: [
    AppComponent,
    SocketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [SocketioService],
  bootstrap: [
    AppComponent,
    SocketComponent
  ]
})
export class AppModule { }
