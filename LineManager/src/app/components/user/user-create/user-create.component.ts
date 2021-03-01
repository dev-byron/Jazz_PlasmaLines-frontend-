import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  isSubmitting: boolean;
  emailTaken: boolean;
  userNameModel: string;
  emailModel: string;

  constructor(private service: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {

  }

  submit() {
   this.emailTaken = false;
   this.service.getByEmail(this.emailModel).subscribe(res => {
    if (res) {
      this.emailTaken = true;
    } else {
      const user = {
        username: this.userNameModel,
        email: this.emailModel
      } as User;
      this.service.save(user).subscribe(data => {
        this.back();
      });
    }
   });
  }

  cancel() {
    this.back();
  }

  private back() { 
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }


  emailChange() {
    if (this.emailTaken) {
      this.emailTaken = false;
    }
  }

}
