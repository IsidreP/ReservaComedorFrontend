import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup  = this.fb.group({
    nombre: ["", {validators: [Validators.required]}],
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
