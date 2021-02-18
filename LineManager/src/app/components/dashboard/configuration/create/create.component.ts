import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  selectedOption = 'v';
  selectedOP = 'a';
  
  constructor() { }

  ngOnInit(): void {
  }

}
