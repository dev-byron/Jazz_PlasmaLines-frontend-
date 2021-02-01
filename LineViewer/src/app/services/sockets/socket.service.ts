import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Room } from '../../models/rooms.model';
import { FeaturedSchedules } from '../../models/featured-schedules.model';
import { EventAggregator } from '../utils/event-aggregator';
import { PlasmaSection } from '../../models/plasma-section.model';


export const environment = {
  production: false,
  SOCKET_ENDPOINT: 'http://localhost:3000'
};

@Injectable()
export class SocketService {
  private socket: Socket;

  constructor(private eventAggregator: EventAggregator) {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  setupSocketRooms(rooms: Room[]) {
    if (rooms && rooms.length > 0) {
      rooms.forEach((room: Room) => {
        this.socket.emit('subscribe', room.name);
      });
      this.onListen();
    }
  }

  closeSocketConnection(rooms: Room[]) {
    rooms.forEach((room: Room) => {
      this.socket.emit('unsubscribe', room.name);
    });
  }

  private onListen() {
    try {
      this.socket.on('onListen', (data: string) => {
        if (data) {
           const featuredSchedules = {
            schedules: JSON.parse(data)
           } as FeaturedSchedules; 
           this.eventAggregator.featuredSchedules.next(featuredSchedules);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

}
