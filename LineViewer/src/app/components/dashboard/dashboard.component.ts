import { Component, OnInit, OnDestroy } from '@angular/core';
import { Room } from '../../models/rooms.model';
import { SocketService } from '../../services/sockets/socket.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private rooms = [
    {
      name: 'MU:MU'
    }
  ] as Room[];

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.setupSocketRooms(this.rooms);
  }

  ngOnDestroy(): void {
    this.socketService.closeSocketConnection(this.rooms);
  }

}
