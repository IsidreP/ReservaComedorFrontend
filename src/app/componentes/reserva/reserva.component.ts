import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

  /* AÑADIDO SELECT FRANJA */
  selectedValue: string;

  franjas = [
    {id: 1, value: '13:00 - 13:15'},
    {id: 2, value: '13:15 - 13:30'},
    {id: 3, value: '13:30 - 13:45'},
    {id: 4, value: '13:30 - 13:45'},
    {id: 5, value: '13:45 - 14:00'},
    {id: 6, value: '14:00 - 14:15'},
    {id: 7, value: '14:15 - 14:30'},
    {id: 8, value: '14:30 - 14:45'},
    {id: 9, value: '14:45 - 15:00'},
  ];

/*   platos = [
    {id: 1, value: 'Lentejas', categoria: 2},
    {id: 2, value: 'Arroz a la cubana', categoria: 2},
    {id: 3, value: 'Paella', categoria: 3},
    {id: 4, value: 'Gazpacho',categoria: 3},
    {id: 5, value: 'Tiramisú',categoria: 4},
    {id: 6, value: 'Tarta de manzana',categoria: 4},
    {id: 7, value: 'Ensalada romana',categoria: 1},
    {id: 8, value: 'Ensalada de la casa',categoria: 1},
  ] */

  ensaladas = [
    {id: 1, value: 'Ensalada de la huerta', categoria: 1},
    {id: 2, value: 'Ensalada mixta', categoria: 1},
    {id: 3, value: 'Ensalada mediterránea', categoria: 1},
    {id: 4, value: 'Ensalada Chucrut', categoria: 1},
    {id: 5, value: 'Ensalada de la casa', categoria: 1},
  ]

  primerPlato = [
    {id: 1, value: 'Potaje de garbanzos a la marinera', categoria: 2},
    {id: 2, value: 'Arroz a la cubana', categoria: 2},
    {id: 3, value: 'Crema de calabaza con virutas de ibérico', categoria: 2},
    {id: 4, value: 'Canelones de pollo gratinados', categoria: 2},
    {id: 5, value: 'Judías verdes con tomate y patatas', categoria: 2},
  ];

  segundoPlato = [
    {id: 1, value: 'Dorada a la sal', categoria: 3},
    {id: 2, value: 'Solomillo a la pimienta', categoria: 3},
    {id: 3, value: 'Pechugas de pollo a la carbonara', categoria: 3},
    {id: 4, value: 'Estofado de ternera a la cerveza', categoria: 3},
    {id: 5, value: 'Albóndigas de ternera y championes', categoria: 3},

  ];

  postres = [
    {id: 1, value: 'Tiramisú', categoria: 4},
    {id: 2, value: 'Panna Cotta', categoria: 4},
    {id: 3, value: 'Flan de huevo', categoria: 4},
    {id: 4, value: 'Brownie', categoria: 4},
    {id: 5, value: 'Crema de yogur con frutas', categoria: 4},
  ];


  firstFormGroup = this.fb.group({
    fechaReserva: ['', Validators.required],
  });
  secondFormGroup = this.fb.group({
    franjaReserva: ['', Validators.required],
  });
  thirdFormGroup = this.fb.group({
    ensaladaPlato: ['', Validators.required],
    primerPlato: ['', Validators.required],
    segundoPlato: ['', Validators.required],
    postrePlato: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;


  constructor(
    private fb: FormBuilder,
    breakpointObserver: BreakpointObserver
    ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    console.log(this.firstFormGroup);
  }

}



