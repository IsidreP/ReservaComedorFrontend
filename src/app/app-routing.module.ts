import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPlatoComponent } from './componentes/plato/crear-plato/crear-plato.component';
import { PlatoComponent } from './componentes/plato/plato.component';
import { ReservaComponent } from './componentes/reserva/reserva.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'inicio', component: InicioComponent },
  {path: 'plato', component: PlatoComponent },
  {path: 'crear-plato', component: CrearPlatoComponent },
  {path: 'reserva', component: ReservaComponent },
  {path: 'login', component: LoginComponent },
  {path: 'registro', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
