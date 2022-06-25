import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatStepper, StepperOrientation} from '@angular/material/stepper';
import {Observable, shareReplay} from 'rxjs';
import {map} from 'rxjs/operators';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

  editable: boolean = true;
  completed : boolean = false;
/* isEditable = false; */

  @ViewChild("stepper", { static: false }) stepper: MatStepper;

  precioTotal = 0;

  loading$ = this.loader.loading$;

  franjas$: Observable<any>

  todosPlatos$: Observable<any>;
  entrantes$: Observable<any>;
  primeros$: Observable<any>;
  segundos$: Observable<any>;
  postres$: Observable<any>;

  platosSeleccionados$: Observable<any>;

  reservasFiltradas$: Observable<any>;

  usuario: any;

  minDate = new Date



  // franjas = [
  //   {
  //     idFranja: 1,
  //     inicioFranja: "11:00:00",
  //     finFranja: "11:15:00",
  //     ocupacionMaxima: 15
  //   },
  //   {id: 2, value: '13:15 - 13:30'},
  //   {id: 3, value: '13:30 - 13:45'},
  //   {id: 4, value: '13:30 - 13:45'},
  //   {id: 5, value: '13:45 - 14:00'},
  //   {id: 6, value: '14:00 - 14:15'},
  //   {id: 7, value: '14:15 - 14:30'},
  //   {id: 8, value: '14:30 - 14:45'},
  //   {id: 9, value: '14:45 - 15:00'},
  // ];

  // ensaladas = [
  //   {id: 1, value: 'Ensalada de la huerta', categoria: 1},
  //   {id: 2, value: 'Ensalada mixta', categoria: 1},
  //   {id: 3, value: 'Ensalada mediterránea', categoria: 1},
  //   {id: 4, value: 'Ensalada Chucrut', categoria: 1},
  //   {id: 5, value: 'Ensalada de la casa', categoria: 1},
  // ]

  // primerPlato = [
  //   {id: 1, value: 'Potaje de garbanzos a la marinera', categoria: 2},
  //   {id: 2, value: 'Arroz a la cubana', categoria: 2},
  //   {id: 3, value: 'Crema de calabaza con virutas de ibérico', categoria: 2},
  //   {id: 4, value: 'Canelones de pollo gratinados', categoria: 2},
  //   {id: 5, value: 'Judías verdes con tomate y patatas', categoria: 2},
  // ];

  // segundoPlato = [
  //   {id: 1, value: 'Dorada a la sal', categoria: 3},
  //   {id: 2, value: 'Solomillo a la pimienta', categoria: 3},
  //   {id: 3, value: 'Pechugas de pollo a la carbonara', categoria: 3},
  //   {id: 4, value: 'Estofado de ternera a la cerveza', categoria: 3},
  //   {id: 5, value: 'Albóndigas de ternera y championes', categoria: 3},

  // ];

  // postres = [
  //   {id: 1, value: 'Tiramisú', categoria: 4},
  //   {id: 2, value: 'Panna Cotta', categoria: 4},
  //   {id: 3, value: 'Flan de huevo', categoria: 4},
  //   {id: 4, value: 'Brownie', categoria: 4},
  //   {id: 5, value: 'Crema de yogur con frutas', categoria: 4},
  // ];


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
    private route: ActivatedRoute,

    ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {

    this.platosSeleccionados$ = this.thirdFormGroup.valueChanges;

    this.thirdFormGroup.valueChanges.subscribe(
      (next)=> {
        this.calcularPrecioTotal(next);
      }
    );


    this.servicio.usuarioLogeado$.subscribe(
      (next) => {
        this.usuario = next[0];
      }
    )

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
    this.editable=!this.editable;
    this.completed=!this.completed;
    this.loader.show();
    console.log("QUE DEVUELVE THIRD-FORM-GROUP:", this.thirdFormGroup.controls);
    Object.keys(this.thirdFormGroup.controls).forEach(control => {
      this.crearPedirPlato(control);

    })
  }

  crearPedirPlato(key: string){

    let body = {
      usuario: {
        id: this.usuario.id
      },
      plato: {
        idPlato: this.thirdFormGroup.controls[key].value.idPlato,
        precioPlato: this.thirdFormGroup.controls[key].value.precioPlato
      },
      franja: {
       idFranja: this.secondFormGroup.controls['franjaReserva'].value.idFranja
      }
    }

    this.servicio.crearPedirPlato(body).subscribe(
      (next: any) => {
        const bodyReserva = {
          pedirPlato: {
            idPedirPlato: next.idPedirPlato,
          },
          fechaReservada: this.firstFormGroup.controls['fechaReserva'].value,
          precioTotal: this.thirdFormGroup.controls[key].value.precioPlato
        }
        this.servicio.crearReserva(bodyReserva).subscribe(
           (next) => {
            console.log('respuesta al hacer una reserva: ', next);
            this.loader.hide();

            this.stepper.next()

/*             this.reservasFiltradas$ = this.servicio.obtenerReservas().pipe(
              map((next: any) => {
                this.loader.hide();
                return next.filter((reserva) => reserva.pedirPlato?.usuario.id == this.usuario.id &&
                reserva.pedirPlato?.franja.idFranja == this.secondFormGroup.controls['franjaReserva'].value.idFranja);
              })
            ) */
           }
        )
      }
    )
  }

  calcularPrecioTotal(form?: number){
    this.precioTotal = 0;

    if(!form){
      return
    }

    Object.values(form).forEach(control => {
      this.precioTotal += control.precioPlato;
    })
  }

}



