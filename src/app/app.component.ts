import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiciosService } from './servicios/servicios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reserva-comedor-front-end';

  usuarioLogeado$: Observable<any>;

  constructor(private servicio: ServiciosService){
    this.usuarioLogeado$ = this.servicio.usuarioLogeado$
  }
}
