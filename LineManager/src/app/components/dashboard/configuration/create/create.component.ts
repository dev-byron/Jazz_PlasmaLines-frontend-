import { Component, OnInit } from '@angular/core';
import { Sport } from '../../../../models/sport.model';
import { ConfigurationLinesService } from '../../../../services/configuration-lines.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  selectedOption = 'v';
  selectedOP = 'a';
  
  sportsAsTree: Sport[];

  constructor(private configService: ConfigurationLinesService) { }

  ngOnInit(): void {
    this.configService.getSportsAsTree().subscribe(res => {
      this.sportsAsTree = res;
      console.log(res);
    });
  }

}
