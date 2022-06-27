import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiciosService } from '../servicios/servicios.service';
import { SpinnerService } from '../servicios/spinner.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login$: Observable<any>;
  loading$ = this.loader.loading$;
  /* color: ThemePalette = 'accent'; */

  form: FormGroup = this.fb.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', { validators: [Validators.required] }],
  });

  constructor(
    private fb: FormBuilder,
    private servicio: ServiciosService,
    private snackBar: MatSnackBar,
    private router: Router,
    public loader: SpinnerService
  ) {}

  ngOnInit(): void {}

  entrarClicked() {
    // mostramos el spinner mientras se procesa la petición
    this.loader.show();
    this.login$ = this.servicio.login(
      this.form.controls['email'].value,
      this.form.controls['password'].value
    );

    this.login$.subscribe(
      (respuesta) => {
        // ocultamos el spinner
        this.loader.hide();
        console.log('Respuesta exitosa: ', respuesta);
        // guardamos el token en el localStorage
        this.servicio.setearSesion(respuesta);
        this.snackBar.open('¡Usted se ha logueado con éxito!', 'Cerrar', {
          duration: 4000,
          verticalPosition: 'top',
        });
        // redireccionamos a la página de los platos
        this.router.navigate(['/platos']);
      },
      (error) => {
        this.loader.hide();
        console.log('El error es: ', error);
        // mostramos el snackBar en el caso de las credenciales inválidas
        this.snackBar.open(
          '¡Usuario no encontrado, o contraseña inválida!',
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
