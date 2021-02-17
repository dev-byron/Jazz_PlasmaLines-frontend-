import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private service: UserService) { }
  models: User[];
  
  ngOnInit(): void {
    this.service.getAll().subscribe(res => {
      console.log(res);
      this.models = res;
    });
  }



}
