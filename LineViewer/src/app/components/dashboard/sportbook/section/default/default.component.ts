import { Component,  Input,  OnInit } from '@angular/core';
import { Game } from '../../../../../models/game.model';
import { Participant } from '../../../../../models/participant.model';
import { Schedule } from '../../../../../models/schedule.model';


@Component({
  selector: 'ngx-line-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  @Input()
  schedule: Schedule;
  

  constructor() { }

  ngOnInit(): void {

  }


  getIcon(game: Game) {
    return "https://jazz-lines.s3.amazonaws.com/icons/BOX.png";
  }

  getTime(game: Game) {
    return game.time;
  }

  getSpread (participant: Participant) {
    if (participant.line.spread && participant.line.spreadOdds) {
      return this.format(participant.line.spread) + this.format(participant.line.spreadOdds);
    }
    return '-';
  }

  private format(spread) {
    const spreatInt = parseInt(spread);
     if (spreatInt > 0) {
      spread = '+' + spread;
     }
     return spread;
  }


  getTotal(total) {
    if (total.value) {
      return this.format(total.value) +''+  this.format(total.overOdds);
    }
   return '-';
  }

  getMline(participant: Participant) {
    if (participant.line.moneyLine) {
      return this.format(participant.line.moneyLine); 
    }
    return '-';
  }
  
}
