import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlasmaLine } from '../../models/plasma-line.model';
import { Room } from '../../models/rooms.model';
import { PlasmaLineConfigurationService } from '../../services/component/plasma-line-configuration.service';
import { SocketService } from '../../services/sockets/socket.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
 
  constructor() { }

  ngOnInit(): void {
   
  }

 

}
