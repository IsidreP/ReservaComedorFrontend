import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss'],
})
export class ReservaComponent implements OnInit {
  editable: boolean = true;
  completed: boolean = false;

  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  minDate = new Date();
  precioTotal = 0;
  usuario: any;

  loading$ = this.loader.loading$;

  franjas$: Observable<any>;

  todosPlatos$: Observable<any>;
  entrantes$: Observable<any>;
  primeros$: Observable<any>;
  segundos$: Observable<any>;
  postres$: Observable<any>;

  platosSeleccionados$: Observable<any>;
  reservasFiltradas$: Observable<any>;

  firstFormGroup = this.fb.group({
    fechaReserva: ['', Validators.required],
  });

  secondFormGroup = this.fb.group({
    franjaReserva: ['', Validators.required],
  });

  thirdFormGroup = this.fb.group({
    entrantes: ['', Validators.required],
    primeros: ['', Validators.required],
    segundos: ['', Validators.required],
    postres: ['', Validators.required],
  });

  forthFormGroup = this.fb.group({});
  fifthFormGroup = this.fb.group({});

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private fb: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private servicio: ServiciosService,
    private loader: SpinnerService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.platosSeleccionados$ = this.thirdFormGroup.valueChanges;

    this.thirdFormGroup.valueChanges.subscribe((next) => {
      this.calcularPrecioTotal(next);
    });

    this.servicio.usuarioLogeado$.subscribe((next) => {
      this.usuario = next[0];
    });

    this.franjas$ = this.servicio.obtenerFranjas();

    this.todosPlatos$ = this.servicio.obtenerPlatos().pipe(shareReplay());

    this.entrantes$ = this.todosPlatos$.pipe(
      map((next) => {
        return next.filter((plato) => plato.categoria?.idCategoria == 1);
      })
    );

    this.primeros$ = this.todosPlatos$.pipe(
      map((next) => {
        return next.filter((plato) => plato.categoria?.idCategoria == 2);
      })
    );

    this.segundos$ = this.todosPlatos$.pipe(
      map((next) => {
        return next.filter((plato) => plato.categoria?.idCategoria == 3);
      })
    );

    this.postres$ = this.todosPlatos$.pipe(
      map((next) => {
        this.loader.hide();
        return next.filter((plato) => plato.categoria?.idCategoria == 4);
      })
    );
  }

  hacerReserva() {
    this.editable = !this.editable;
    this.completed = !this.completed;
    this.loader.show();
    console.log('QUE DEVUELVE thirdFormGroup:', this.thirdFormGroup.controls);
    Object.keys(this.thirdFormGroup.controls).forEach((control) => {
      this.crearPedirPlato(control);
    });
  }

  crearPedirPlato(key: string) {
    let body = {
      usuario: {
        id: this.usuario.id,
      },
      plato: {
        idPlato: this.thirdFormGroup.controls[key].value.idPlato,
        precioPlato: this.thirdFormGroup.controls[key].value.precioPlato,
      },
      franja: {
        idFranja: this.secondFormGroup.controls['franjaReserva'].value.idFranja,
      },
    };

    this.servicio.crearPedirPlato(body).subscribe((next: any) => {
      const bodyReserva = {
        pedirPlato: {
          idPedirPlato: next.idPedirPlato,
        },
        fechaReservada: this.firstFormGroup.controls['fechaReserva'].value,
        precioTotal: this.thirdFormGroup.controls[key].value.precioPlato,
      };

      this.servicio.crearReserva(bodyReserva).subscribe((next) => {
        console.log('Respuesta al hacer una reserva: ', next);
        this.loader.hide();
        this.stepper.next();
      });
    });
  }

  calcularPrecioTotal(form?: number) {
    this.precioTotal = 0;
    if (!form) {
      return;
    }
    Object.values(form).forEach((control) => {
      this.precioTotal += control.precioPlato;
    });
  }
}
