import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiciosService } from '../servicios/servicios.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login$: Observable<any>;

  form: FormGroup = this.fb.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', { validators: [Validators.required] }],
  });

  constructor(
    private fb: FormBuilder,
    private servicio: ServiciosService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  entrarClicked() {
    this.login$ = this.servicio.login(
      this.form.controls['email'].value,
      this.form.controls['password'].value
    );

    this.login$.subscribe(
      (respuesta) => {
        console.log('respuesta exitosa: ', respuesta);

        this.servicio.setearSesion(respuesta);

        this.snackBar.open(
          '¡Usted se ha logueado con éxito!',
          'Cerrar',
          {
            duration: 4000,
            verticalPosition: 'top',
          }
        );

        // redireccionamos a la página del plato
        this.router.navigate(['/plato']);
      },
      (error) => {
        console.log('El error es: ', error);
        // mostramos snackBar en el caso de credenciales invalidas
        this.snackBar.open(
          'Usuario no encontrado, o contraseña inválida!',
          'Cerrar',
          {
            duration: 4000,
            verticalPosition: 'top',
          }
        );
      }
    );
  }

}
