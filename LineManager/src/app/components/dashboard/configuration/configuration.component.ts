import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationLine } from '../../../models/configuration-line.model';
import { ConfigurationLinesService } from '../../../services/configuration-lines.service';
import { TimeZones } from '../../../data/time-zones';

@Component({
  selector: 'ngx-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})

export class ConfigurationComponent implements OnInit {
  models: ConfigurationLine[];
  timeZones: TimeZones = new TimeZones();
  
  constructor(private service: ConfigurationLinesService,  
              private router: Router,
              private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.service.getAll().subscribe(res => {
      this.models = res.sort((val1, val2)=> {return new Date(val2.createdDate).getTime() - new 
        Date(val1.createdDate).getTime()})
    });
  }

  getViewType(type): string {
    return type === 'v' ? 'Vertical' : 'Horizontal';
  }

  getLineType(type): string {
    return type === 'a' ? 'American' : 'Decimal';
  }

  getTimeZone(timeZoneId) {
    return this.timeZones.getTimeZoneList().find(x => x.id == timeZoneId).text;
  }
 
  goToManager() {
    this.router.navigate(['../create'], {relativeTo: this.activatedRoute});
  }


}