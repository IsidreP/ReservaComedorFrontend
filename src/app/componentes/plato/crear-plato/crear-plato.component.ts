import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-crear-plato',
  templateUrl: './crear-plato.component.html',
  styleUrls: ['./crear-plato.component.scss']
})
export class CrearPlatoComponent implements OnInit {
  form: FormGroup  = this.fb.group({
    titulo: ["", {validators: [Validators.required]}],
    precio: ["", {validators: [Validators.required]}],
    descripcion: ["", {validators: [Validators.required]}],
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
