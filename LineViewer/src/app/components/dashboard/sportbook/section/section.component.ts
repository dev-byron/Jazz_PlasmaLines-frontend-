import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getRandomColor();
  }


  letters = '0123456789ABCDEF';
  color = '#';
  getRandomColor() {
    this.color = "#";
    for (var i = 0; i < 6; i++) {
      this.color += this.letters[Math.floor(Math.random() * 16)];
    }
  }

}
