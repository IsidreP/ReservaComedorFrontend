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
    imagen: ["", {validators: [Validators.required]}],

  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  entrar(){
    alert("CREAR-PLATO CLICKADO")
  }

  /* function() {
    var app = angular.module('myApp', ['ngMaterial']);
    app.controller('AppCtrl', function($scope) {})
    app.directive('chooseFile', function() {
      return {
        link: function (scope, elem, attrs) {
          var button = elem.find('button');
          var input = angular.element(elem[0].querySelector('input#fileInput'));
          button.bind('click', function() {
            input[0].click();
          });
          input.bind('change', function(e) {
            scope.$apply(function() {
              var files = e.target.files;
              if (files[0]) {
                scope.fileName = files[0].name;
              } else {
                scope.fileName = null;
              }
            });
          });
        }
      };
    });
  }; */

}
