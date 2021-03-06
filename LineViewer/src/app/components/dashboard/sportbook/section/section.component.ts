import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Schedule } from '../../../../models/schedule.model';

@Component({
  selector: 'ngx-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  @Input()
  schedules: Schedule[];

  @Input()
  imageUrl: string;

  ngOnInit(): void {
  }

  getScheduleType(section: Schedule) {
    if (section.title.toLowerCase().includes("futures") || section.title.toLowerCase().includes("odds to win")) {
      return 1;
    }
    else if (section.title.toLowerCase().includes("team totals")) {
      return 2;
    }
    else if(section.sport.toLowerCase().includes("soc")) {
      return 3;
    }
    else {
      return 4;
    }
  }
  

}
