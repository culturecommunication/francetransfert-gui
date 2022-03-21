import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'ft-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  constructor(private loginService: LoginService,
    private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    code: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  codeSent: boolean = false;
  visible: boolean = false;
  error = null;

  ngOnInit(): void {

  }



  cancel() {
    this.loginService.tokenInfo.next(null);
    this.loginForm.reset();
    this.codeSent = false;
    this.visible = false;
    this.error = null;
  }

  
  get email() { return this.loginForm.get('email') }
  get code() { return this.loginForm.get('code') }
  get f() { return this.loginForm.controls; }
  get form() { return this.loginForm; }
  

  sendCode() {
    this.codeSent = !this.codeSent;
    this.visible = !this.visible;
    this.loginService.generateCode(this.email.value).pipe(take(1)).subscribe();
  }

  validateCode() {
    if (this.loginForm.valid) {
      this.error = null;
      this.loginService.validateCode({
        code: this.code.value,
        senderMail: this.email.value
      }).pipe(take(1)).subscribe(x => {
        this.router.navigate(['/upload']);
      }, err => {
        this.error = err.error;
      });
    }
  }

}
