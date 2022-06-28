import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPlatoComponent } from './componentes/plato/crear-plato/crear-plato.component';
import { ModificarPlatoComponent } from './componentes/plato/modificar-plato/modificar-plato.component';
import { PlatoComponent } from './componentes/plato/plato.component';
import { ListarReservasComponent } from './componentes/reserva/listar-reservas/listar-reservas.component';
import { ReservaComponent } from './componentes/reserva/reserva.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'platos', component: PlatoComponent },
  {path: 'plato/:id', component: ModificarPlatoComponent},
  {path: 'crear-plato', component: CrearPlatoComponent },
  {path: 'reserva', component: ReservaComponent },
  {path: 'login', component: LoginComponent },
  {path: 'registro', component: RegisterComponent},
  {path: 'listar-reservas', component: ListarReservasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
