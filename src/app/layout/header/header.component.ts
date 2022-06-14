import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciosService } from 'src/app/servicios/servicios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor(
    private servicio: ServiciosService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  logoutClicked(){
    this.servicio.logout();
    // redireccionamos a la página del login
    this.router.navigate(['/login']);
  }

/*   loginClicked(){
    this.servicio.logout();
    // redireccionamos a la página del login
    this.router.navigate(['/login']);
  } */


}
