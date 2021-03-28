import { Component,  Input,  OnInit } from '@angular/core';
import { TimeZones } from '../../../../../data/time-zones';
import { Game } from '../../../../../models/game.model';
import { Participant } from '../../../../../models/participant.model';
import { Schedule } from '../../../../../models/schedule.model';
import { Total } from '../../../../../models/total.model';
import { ViewConfig } from '../../../../../models/view-config.model';
import { ImageService } from '../../../../../services/utils/image.service';
import { CustomDateFormatter } from '../../../../../utils/custom-date-formatter';
import { CustomOddFormatter } from '../../../../../utils/odds-formatter';


@Component({
  selector: 'ngx-draw-participant',
  templateUrl: './draw-participant.component.html',
  styleUrls: ['./draw-participant.component.scss']
})
export class DrawParticipantComponent implements OnInit {

  @Input()
  schedule: Schedule;
  
  @Input()
  viewConfig: ViewConfig;
  
  timeZones: TimeZones = new TimeZones();
  hourToadd: string;

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.hourToadd = this.timeZones.getTimeZoneList().find(x => x.id == this.viewConfig.timeZoneId).value;
  }
  
  getIcon() {
    return this.imageService.getIcon(this.schedule.sport, this.schedule.bannerUrl);;
  }

  getTime(game: Game) {
    if (game.time) {
      return CustomDateFormatter.formatTime(game.time, this.hourToadd);
     }
  }

  getSpread (participant: Participant) {
    return CustomOddFormatter.format(participant.line.spread, participant.line.spreadOdds, this.viewConfig.lineType);
  }

  getMline(participant: Participant) {
    return CustomOddFormatter.format(participant.line.moneyLine, null, this.viewConfig.lineType);
  }

  getGoals(total: Total, index: number) {
    if (index == 0) {
      CustomOddFormatter.format(total.value, total.overOdds, this.viewConfig.lineType);
      //return this.format(total.value) + this.format(total.overOdds);
    } else if (index == 1) {
      CustomOddFormatter.format(total.value, total.underOdds, this.viewConfig.lineType);
      //return this.format(total.value) + this.format(total.underOdds);
    }
    else {
      return '-';
    }
  }

}
