import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

/* AÑADIDO SELECT FRANJA */
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

  /* AÑADIDO SELECT FRANJA */
  selectedValue: string;

  foods: Food[] = [
    {value: 'steak-0', viewValue: '13:00 - 13:15'},
    {value: 'pizza-1', viewValue: '13:15 - 13:30'},
    {value: 'tacos-2', viewValue: '13:30 - 13:45'},
    {value: 'tacos-2', viewValue: '13:30 - 13:45'},
    {value: 'tacos-2', viewValue: '13:45 - 14:00'},
    {value: 'tacos-2', viewValue: '14:00 - 14:15'},
    {value: 'tacos-2', viewValue: '14:15 - 14:30'},
    {value: 'tacos-2', viewValue: '14:30 - 14:45'},
    {value: 'tacos-2', viewValue: '14:45 - 15:00'},
  ];

  foodControl = new FormControl(this.foods[2].value);

  form = new FormGroup({
    food: this.foodControl,

  });

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;


  constructor(
    private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
  }

}



