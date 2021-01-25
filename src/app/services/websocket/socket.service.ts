import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

export const environment = {  
	production: false,  
	SOCKET_ENDPOINT: 'http://localhost:3000'
};

@Injectable({
  providedIn: 'root'
})

export class SocketioService {
  private socket: Socket;

  constructor() {   }


  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this. socket.emit('subscribe', 'MU:MU');

    this.socket.on('onListen', (data: string) => {
      console.log(data);
    });
    
  }

  sendMessage(message: string) {

  }
  
  
}
