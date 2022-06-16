import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from 'src/app/servicios/servicios.service';
@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.scss'],
})
export class PlatoComponent implements OnInit {
  platos: any = [];

  constructor(
      private http: HttpClient,
      private route: ActivatedRoute,
      private servicio: ServiciosService
    ) {}

  ngOnInit(): void {

  }
}
