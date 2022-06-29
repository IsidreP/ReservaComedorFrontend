import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, tap } from 'rxjs';
import { ServiciosService } from './servicios/servicios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'reserva-comedor-front-end';

  usuarioLogeado$: Observable<any>;

  sidebarState: boolean;


  constructor(private servicio: ServiciosService){
    this.usuarioLogeado$ = this.servicio.usuarioLogeado$

    this.servicio.sidebarState$.subscribe(
      (next) => {
        this.sidebarState = next;
      }
    )
  }


}
