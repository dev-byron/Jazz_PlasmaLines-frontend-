
import { Component, ViewChild, ElementRef} from '@angular/core';
import { Observable } from 'rxjs';
import { SocketioService } from 'src/app/services/websocket/socket.service';

export class Message {
    constructor(
        public sender: string,
        public content: string,
        public isBroadcast = false,
    ) { }
}

@Component({
    selector: 'socket',
    templateUrl: './socket.component.html',
    styleUrls: ['./socket.component.scss']
})
export class SocketComponent {
    @ViewChild('viewer') private viewer: ElementRef;

    public serverMessages = new Array<Message>();

    public clientMessage = '';
    public isBroadcast = false;
    public sender = '';


    constructor(private socketService: SocketioService) {}


    public send(): void {
        // this.socket.emit('new-message', this.clientMessage);
        this.socketService.sendMessage(this.clientMessage)
        this.clientMessage = '';
    }

    public getMessages = () => {
        // return Observable.create((observer) => {
        //         this.socket.on('new-message', (message) => {
        //             observer.next(message);
        //         });
        // });
    }

}
