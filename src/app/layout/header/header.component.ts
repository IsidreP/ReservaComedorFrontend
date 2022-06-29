import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { ServiciosService } from 'src/app/servicios/servicios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // configuramos la posición del tooltip
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  usuarioLogeado$: Observable<any>;

  constructor(private servicio: ServiciosService, private router: Router) {}

  ngOnInit(): void {
    this.usuarioLogeado$ = this.servicio.usuarioLogeado$;
  }

  logoutClicked() {
    this.servicio.logout();
    // redireccionamos a la página del login
    this.router.navigate(['/login']);
  }

  toggleSidebar(){
    this.servicio.sidebarState$.pipe(
      take(1)
      ).subscribe(
      (next) => {
        if(next == true){
          this.servicio.toggleSidebarState(false);
        }else {
          this.servicio.toggleSidebarState(true);
        }
      }
    )
  }
}
