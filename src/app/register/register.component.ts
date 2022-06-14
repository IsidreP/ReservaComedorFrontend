import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ServiciosService } from '../servicios/servicios.service';
import { ActivatedRoute, Router } from '@angular/router';

// para validar si la contraseña y contraseña repetida coinciden
export const equivalentValidator = (
  firstControlName: string,
  secondControlName: string
) => {
  return (formGroup: FormGroup) => {
    const firstControl = formGroup.get(firstControlName);
    const secondControl = formGroup.get(secondControlName);

    if (firstControl.value !== secondControl.value) {
      return secondControl.setErrors({ notEqual: true });
    }
  };
};
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
/*   [x: string]: any; */
  registro$: Observable<any>;
  rol: Object;

  form: FormGroup = this.fb.group(
    {
      nombre: ['', { validators: [Validators.required] }],
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', { validators: [Validators.required] }],
      passwordRepetido: ['', { validators: [Validators.required] }],
    },
    {
      // objeto con validador de contraseña
      validator: equivalentValidator('password', 'passwordRepetido'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private servicio: ServiciosService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  entrar() {
    console.log('REGISTRARSE CLICKADO!');
    this.registro$ = this.servicio.registro(
      this.form.controls['nombre'].value,
      this.form.controls['email'].value,
      this.form.controls['password'].value,
      (this.rol = {
        idRol: 2,
        nombreRol: 'autorizado',
      })
    );

    this.registro$.subscribe(
      (respuesta) => {
        console.log('La respuesta es: ', respuesta);
        // redireccionamos a la página del login
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('El error es: ', error);
      }
    );

  }
}
