import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'ngx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  @Input()
  viewTheme: string;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  exit() {
    this.router.navigateByUrl('/verifier');
  }
}
