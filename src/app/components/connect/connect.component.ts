import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ft-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
  })

  codeSent: boolean = false;
  visible: boolean = false;
  @ViewChild('email') inputCourriel;

  get email(){return this.loginForm.get('email')}


  ngOnInit() : void{

  }

  get f() { return this.loginForm.controls; }

  sendCode(){
    this.codeSent = !this.codeSent;
    this.visible = !this.visible;
    this.loginForm.get('email').setValue('');
  }

  initForm() {
  }

}
