import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationLine } from '../../../models/configuration-line.model';
import { ConfigurationLinesService } from '../../../services/configuration-lines.service';

@Component({
  selector: 'ngx-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})

export class ConfigurationComponent implements OnInit {
  models: ConfigurationLine[];

  constructor(private service: ConfigurationLinesService,  
              private router: Router,
              private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.service.getAll().subscribe(res => {
      this.models = res;
    });
  }

  getViewType(type): string {
    return type === 'v' ? 'Vertical' : 'Horizontal';
  }

  getLineType(type): string {
    return type === 'a' ? 'American' : 'Decimal';
  }

  goToManager() {
    this.router.navigate(['../create'], {relativeTo: this.activatedRoute});
  }

}