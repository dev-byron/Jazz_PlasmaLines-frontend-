import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from '../../services/component/configuration.service';

@Component({
  selector: 'ngx-verifier',
  templateUrl: './verifier.component.html',
  styleUrls: ['./verifier.component.scss']
})
export class VerifierComponent implements OnInit {

  validVerificationCode: boolean;
  verificationCode: string;
  isLoading: boolean;

  constructor(private router: Router,  
              private configurationService: ConfigurationService) {}

  ngOnInit() {
    this.validVerificationCode = true;
    this.isLoading = false;
  }

  verifyCode() {
    if (this.verificationCode && this.verificationCode.trim() !== '') {
      this.isLoading = true;
      this.validVerificationCode = true;
      this.configurationService.validConfigurationCode(this.verificationCode)
      .subscribe(isValid => {
        this.isLoading = false;
        this.validVerificationCode = isValid;
        if (isValid) {
          this.router.navigateByUrl('/live/'+this.verificationCode);
        } 
      })
    } else {
      this.validVerificationCode = false;
    }
    
  }

}
