import { Component,  Input,  OnInit } from '@angular/core';
import { Game } from '../../../../../models/game.model';
import { Participant } from '../../../../../models/participant.model';
import { Schedule } from '../../../../../models/schedule.model';
import { ViewConfig } from '../../../../../models/view-config.model';
import { TimeZones } from '../../../../../data/time-zones'
import { CustomDateFormatter } from '../../../../../utils/custom-date-formatter'
import { ImageService } from '../../../../../services/utils/image.service';
import { Total } from '../../../../../models/total.model';
import { LineTypeEnum } from '../../../../../models/lineType.enum';
import { CustomOddFormatter } from '../../../../../utils/odds-formatter';

@Component({
  selector: 'ngx-line-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

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

  getTotal(total: Total) {
    return CustomOddFormatter.format(total.value, total.overOdds, this.viewConfig.lineType);
  }

  getMline(participant: Participant) {
    return CustomOddFormatter.format(participant.line.moneyLine, null, this.viewConfig.lineType);
  }

  getArrow(i) { 
    const route = '/assets/arrows/'
    return  route + (i == 0 ? 'up.png' : 'down.png');
  }


  
}
