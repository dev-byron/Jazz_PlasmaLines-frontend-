import { Component,  Input,  OnInit } from '@angular/core';
import { TimeZones } from '../../../../../data/time-zones';
import { Game } from '../../../../../models/game.model';
import { Participant } from '../../../../../models/participant.model';
import { Schedule } from '../../../../../models/schedule.model';
import { Total } from '../../../../../models/total.model';
import { ViewConfig } from '../../../../../models/view-config.model';
import { CustomDateFormatter } from '../../../../../utils/custom-date-formatter';

@Component({
  selector: 'ngx-team-totals',
  templateUrl: './team-totals.component.html',
  styleUrls: ['./team-totals.component.scss']
})
export class TeamTotalsComponent implements OnInit {
  
  @Input()
  schedule: Schedule;

  @Input()
  viewConfig: ViewConfig;

  timeZones: TimeZones = new TimeZones();
  hourToadd: string;

  constructor() { }
  ngOnInit(): void {
    this.hourToadd = this.timeZones.getTimeZoneList().find(x => x.id == this.viewConfig.timeZoneId).value;
  }

  getIcon(game: Game) {
    return "https://jazz-lines.s3.amazonaws.com/icons/BOX.png";
  }

  getTime(game: Game) {
    if (game.time) {
      return CustomDateFormatter.formatTime(game.time, this.hourToadd);
     }
  }

  getGoals(total: Total, index: number) {
    if (index == 0) {
      return this.format(total.value) + this.format(total.overOdds);
    } else if (index == 1) {
      return this.format(total.value) + this.format(total.underOdds);
    }
    else {
      return '-';
    }
  }

  isNotDraw(participant: Participant) {
    return participant.name.toLowerCase() != 'draw';
  }

  private format(spread) {
    const spreatInt = parseInt(spread);
     if (spreatInt > 0) {
      spread = '+' + spread;
     }
     return spread;
  }


}
