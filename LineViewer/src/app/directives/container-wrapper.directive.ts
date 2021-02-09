import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, Subscription } from 'rxjs';


@Directive({
  selector: '[ngxContainerWrapper]'
})
export class ContainerWrapperDirective implements AfterViewInit {

  @Output()
  pop: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  push: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private ref: ElementRef) { }

  ngAfterViewInit() {
    let size = 50;
    var pop = true;
    var saved = 0;
    var value = 0;
    //time is configurable

    interval(1000).subscribe(() => {
      var childHeightTotal = 0;
      var scrollHeight = this.ref.nativeElement.scrollHeight;
      var height = this.ref.nativeElement.offsetHeight;
      if (scrollHeight > height) {
        if (this.ref && this.ref.nativeElement && this.ref.nativeElement.children.length > 0) {
          for (var i = 0; i < this.ref.nativeElement.children.length; i++) {
            childHeightTotal += this.ref.nativeElement.children[i].offsetHeight;
          }

          value = this.ref.nativeElement.scrollTop + 75;

          this.ref.nativeElement.scroll({
            top: value,
            left: 0,
            behavior: 'smooth'
          });
          
          if (value + height + 100 > childHeightTotal) {
            this.push.emit(true);
          }
          // if (saved > childHeightTotal){
          //   console.log('1')
          //   this.ref.nativeElement.scrollTop = this.ref.nativeElement.offsetTop - this.ref.nativeElement.scrollTop;
          // } else if (saved < childHeightTotal) {
          //   console.log('2')
          //   saved = childHeightTotal;
          // }
         
        }

      }

    });


  }

}
