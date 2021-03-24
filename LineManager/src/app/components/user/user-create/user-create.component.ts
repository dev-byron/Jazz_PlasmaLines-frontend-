import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from '../../../models/rol.model';
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
  roleModel: string;

  constructor(private service: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {

  }

  submit() {
   this.emailTaken = false;
   this.isSubmitting = true;
   this.roleModel = 'client';
   this.service.getByEmail(this.emailModel).subscribe(res => {
    if (res) {
      this.emailTaken = true;
      this.isSubmitting = false;
    } else {
      const user = {
        username: this.userNameModel,
        email: this.emailModel,
        roles: [
          {
            name: this.roleModel
          } as Rol
        ]
      } as User;
      this.isSubmitting = false;
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
