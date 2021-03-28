import { Component,  Input,  OnInit } from '@angular/core';
import { Schedule } from '../../../../../models/schedule.model';
import { Participant } from '../../../../../models/participant.model';
import { ViewConfig } from '../../../../../models/view-config.model';
import { CustomOddFormatter } from '../../../../../utils/odds-formatter';

@Component({
  selector: 'ngx-futures-odds-to-win',
  templateUrl: './futures-odds-to-win.component.html',
  styleUrls: ['./futures-odds-to-win.component.scss']
})
export class FutureOddsToWinComponent implements OnInit {

  @Input()
  schedule: Schedule;
  
  @Input()
  viewConfig: ViewConfig;

  
  constructor() { }

  ngOnInit(): void {
  }


  getDate() {
    return this.schedule.date;
  }

  getOdds(participant: Participant) {
    return  CustomOddFormatter.format(participant.line.moneyLine, null, this.viewConfig.lineType);
  }

}
