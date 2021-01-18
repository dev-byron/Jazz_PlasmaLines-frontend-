
import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

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

    private socket$: WebSocketSubject<Message>;

    constructor() {
        this.socket$ = new WebSocketSubject('ws://localhost:3000');

        this.socket$
            .subscribe(
                (message) => this.serverMessages.push(message),
                (err) => console.error(err),
                () => console.warn('Completed!')
            );
    }


    public send(): void {
        const message = new Message('byron', this.clientMessage, this.isBroadcast);
        this.serverMessages.push(message);
        this.socket$.next(message);
        this.clientMessage = '';
    }

}
