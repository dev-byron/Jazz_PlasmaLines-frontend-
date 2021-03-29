import { Component,  Input,  OnInit } from '@angular/core';
import { ViewConfig } from '../../../../../models/view-config.model';

@Component({
  selector: 'ngx-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent implements OnInit {

  @Input()
  viewConfig: ViewConfig;

  constructor() { }
  
  ngOnInit(): void {
   
  }
}
