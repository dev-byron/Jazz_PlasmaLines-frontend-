import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmationModalComponent } from '../utils/modals/delete-confirmation/delete-confirmation-modal.component';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  avoidDelete = false;

  constructor(private service: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialogService: NbDialogService) { }
  models: User[];
  
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.service.getAll().subscribe(res => {
      this.models = res;
      if (this.models.length == 1) {
        this.avoidDelete = true;
      }
    });
  }

  add() {
    this.router.navigate(['create'], {relativeTo: this.activatedRoute});
  }

  delete(id) {
    const deleteModal = this.dialogService.open(DeleteConfirmationModalComponent);
    deleteModal.onClose.subscribe(res => {
      if (res) {
        this.service.delete(id).subscribe(() => {
          this.loadUsers();
        })
      }
    });
  }

  showPwd(id) {
    var user = this.models.find(x => x.id === id);
    if (user.password.includes('*****')){
      this.service.getPwd(id).subscribe(res => {
        if (res) {
          user.password = res.password;
        }
      });
    } else {
      user.password = user.password.replace(/./g, '*').slice(0,6);
    }
  }
}
