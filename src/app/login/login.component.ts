import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup  = this.fb.group({
    email: ["", {validators: [Validators.required, Validators.email]}],
    password: ["", {validators: [Validators.required]}],
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  entrar(){
    console.log("Entrar clickado!");
  }


}
