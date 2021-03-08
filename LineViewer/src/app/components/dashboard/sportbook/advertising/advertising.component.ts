import { AfterViewInit, OnDestroy, EventEmitter, Input, Output, Component, OnInit } from "@angular/core";
import { interval, timer } from 'rxjs';

@Component({
  selector: 'ngx-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.scss']
})
export class AdvertisingComponent implements OnDestroy, AfterViewInit {
  
  @Input()
  advertisingImages: string[];
  @Input()
  everySeconds: number;
  @Input()
  staySeconds: number;
  
  @Output()
  notify: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  current: string;
  display: boolean;

  constructor() {}

  ngAfterViewInit() {
    if (this.advertisingImages && this.advertisingImages.length > 0) {
      let index = 0;
      let seconds = 0;
      interval(this.everySeconds + seconds).subscribe(() => {
        this.current = this.advertisingImages[index];
        index++;
        if (index >= this.advertisingImages.length) {
          index = 0;
        }
        this.display = true;
        setTimeout(() => {
          this.notify.emit(true);
          this.display = false;
          seconds = this.staySeconds;
        }, this.staySeconds);
        this.notify.emit(true);
      })
    }
  }
 
  ngOnDestroy(): void {
   
  }
  
}
