import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../../../../models/game.model';

@Component({
  selector: '[ngx-line]',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  @Input()
  game: Game;

  constructor() { }

  ngOnInit(): void {

  }

  getTeamsName() : string {
    let names = "";
    this.game.participants.forEach(participant => {
      names = names + participant.name + " ";
    });
    return names;
  }


}
