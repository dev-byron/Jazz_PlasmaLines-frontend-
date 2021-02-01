import { Component, OnInit } from '@angular/core';
import { EventAggregator } from '../../../services/utils/event-aggregator';

@Component({
  selector: 'ngx-sportbook',
  templateUrl: './sportbook.component.html',
  styleUrls: ['./sportbook.component.scss']
})
export class SportBookComponent implements OnInit {
  sections = [];
  constructor(private eventAggregator: EventAggregator) { }

  ngOnInit(): void {
    this.eventAggregator.featuredSchedules.subscribe(x => {
      this.sections.push(1);
    });

  }

}
