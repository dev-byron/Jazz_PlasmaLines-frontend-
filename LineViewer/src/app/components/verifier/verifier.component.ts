import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-verifier',
  templateUrl: './verifier.component.html',
  styleUrls: ['./verifier.component.scss']
})
export class VerifierComponent implements OnInit {

  constructor(private router: Router) {

  }

  verificationCode: string;

  ngOnInit() {
  }

  verifyCode() {
    this.router.navigateByUrl('/dashboard');
  }

}
