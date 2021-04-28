import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnChanges, OnInit } from '@angular/core';
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

  elem: any;
  fullScreen: boolean;

  constructor(private router: Router, @Inject(DOCUMENT) private document: any) {}

  ngOnInit(): void {
    this.elem = document.documentElement;
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
  

  exit() {
    this.router.navigateByUrl('/verifier');
  }
  
  switchFullScreen() {
   if (!this.fullScreen) {
     this.openFullscreen();
   } else {
     this.closeFullscreen();
   }
   this.fullScreen = !this.fullScreen;
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

/* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

 

}
