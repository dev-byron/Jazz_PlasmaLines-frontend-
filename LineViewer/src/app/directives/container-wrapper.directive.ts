import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Directive({
  selector: '[ngxContainerWrapper]'
})
export class ContainerWrapperDirective implements AfterViewInit {
  @Output()
  pop: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  push: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  @Input()
  stopAutoScroll: boolean;

  constructor(private ref: ElementRef) { }

  ngAfterViewInit() {
    this.stopAutoScroll = false;
    //time must be configurable
    interval(2000).subscribe(() => {
      if (!this.stopAutoScroll) {
        var childHeightTotal = 0;
        var firstChildHeight = 0
        var scrollPosition = 0;
        if (this.ref.nativeElement.scrollHeight > this.ref.nativeElement.offsetHeight) {
          if (this.ref && this.ref.nativeElement && this.ref.nativeElement.children.length > 0) {
            for (var i = 0; i < this.ref.nativeElement.children.length; i++) {
              childHeightTotal += this.ref.nativeElement.children[i].offsetHeight;
            }
            firstChildHeight = this.ref.nativeElement.children[0].offsetHeight;
  
            if (firstChildHeight < this.ref.nativeElement.scrollTop) {
              this.pop.emit(true);
              this.ref.nativeElement.removeChild(this.ref.nativeElement.children[0]);
            } 
            else {
              scrollPosition = this.ref.nativeElement.scrollTop + 75;
              this.ref.nativeElement.scroll({
                top: scrollPosition,
                left: 10,
                behavior: 'smooth'
              });
            }
            
            if (scrollPosition + this.ref.nativeElement.offsetHeight + 100 > childHeightTotal) {
              this.push.emit(true);
            }
          }
        }
      }
    });
  }
}
