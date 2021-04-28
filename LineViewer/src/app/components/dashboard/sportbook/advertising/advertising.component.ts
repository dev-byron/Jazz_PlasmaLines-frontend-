import { AfterViewInit, OnDestroy, EventEmitter, Input, Output, Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { interval } from 'rxjs';
import { Advertising } from "../../../../models/advertising.model";

@Component({
  selector: 'ngx-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.scss']
})
export class AdvertisingComponent implements OnDestroy, AfterViewInit {

  @Input()
  advertisingImages: Advertising[];
  @Input()
  advertisingEvery: number;
  @Input()
  direction: string;

  @Output()
  notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('advertisingContainer') advertisingContainer: ElementRef;

  current: string;
  display: boolean;
  staySeconds: number;
  top: string;
  topNumber: number;
  interval: any;

  constructor()  {}

  ngAfterViewInit() {
    let currentIndex = 0;
    var fps = 33;
    setInterval(() => {
    this.topNumber = 0;
      if (!this.display) {
        this.display = true;
        this.current = this.advertisingImages[currentIndex].imageUrl;
        
        if (this.advertisingContainer) {
          this.advertisingContainer.nativeElement.setAttribute('style', 'top: ' + window.innerHeight + 'px');
          
          this.interval = setInterval(() => {
            this.topNumber = this.advertisingContainer.nativeElement.offsetTop - 5;
            this.top = this.topNumber + 'px;';
            this.advertisingContainer.nativeElement.setAttribute('style', 'top: ' + this.top);
            if (this.advertisingContainer.nativeElement.offsetTop + 100 + this.advertisingContainer.nativeElement.offsetHeight < 0) {
              this.advertisingContainer.nativeElement.setAttribute('style', 'top: ' + window.outerHeight + 'px');
              this.display = false;
              clearInterval(this.interval);
            }
          }, fps);
      }
      currentIndex = (currentIndex < (this.advertisingImages.length - 1)) ? currentIndex + 1 : 0;
      }
    }, (this.advertisingEvery * 1000));
  }


  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }

  }
}
