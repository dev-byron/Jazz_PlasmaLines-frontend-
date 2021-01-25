import { Component } from '@angular/core';
import { SocketioService } from './services/websocket/socket.service';

@Component({
  selector: 'mean-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  note = 'Client app is running!';

  constructor(private socketService: SocketioService) {}
  
  ngOnInit() {
    this.socketService.setupSocketConnection();
  }
}
