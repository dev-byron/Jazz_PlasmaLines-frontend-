import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private service: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }
  models: User[];
  
  ngOnInit(): void {
    this.service.getAll().subscribe(res => {
      console.log(res);
      this.models = res;
    });
  }

  add() {
    this.router.navigate(['./create'], {relativeTo: this.activatedRoute});
  }



}
