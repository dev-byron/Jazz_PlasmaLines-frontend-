import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../../../models/game.model';
import { Schedule } from '../../../../models/schedule.model';
import { ViewConfig } from '../../../../models/view-config.model';

@Component({
  selector: 'ngx-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  @Input()
  schedulesOnDisplay: Schedule[];

  @Input()
  imageUrl: string;

  @Input()
  viewConfig: ViewConfig;

  @Input()
  displayNoSectionError: boolean;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.schedulesOnDisplay);
  }

  exit() {
    this.router.navigateByUrl('/verifier');
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
