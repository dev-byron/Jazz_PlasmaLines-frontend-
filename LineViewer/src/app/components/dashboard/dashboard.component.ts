import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { _ } from 'lodash';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  
  code: string;
  constructor(private router: Router, 
              private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => { 
       this.code = params.get('code'); 
       if (this.code == null) {
        this.router.navigateByUrl('/verifier');
       }
   });
  }

 

}
