import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../../../../models/game.model';
import { Schedule } from '../../../../models/schedule.model';

@Component({
  selector: 'ngx-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  @Input()
  schedules: Schedule[];



  ngOnInit(): void {
    
  }
  

}
