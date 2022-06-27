import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PlatoComponent } from './componentes/plato/plato.component';
import { ReservaComponent } from './componentes/reserva/reserva.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { InicioComponent } from './inicio/inicio.component';
import { CrearPlatoComponent } from './componentes/plato/crear-plato/crear-plato.component';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ServiciosService } from './servicios/servicios.service';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModificarPlatoComponent } from './componentes/plato/modificar-plato/modificar-plato.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDialogComponent } from './componentes/mat-dialog/mat-dialog.component';

import { FilterPipe } from './pipes/filter.pipe';
import { ListarReservasComponent } from './componentes/reserva/listar-reservas/listar-reservas.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    PlatoComponent,
    ReservaComponent,
    InicioComponent,
    CrearPlatoComponent,
    ModificarPlatoComponent,
    MatDialogComponent,

    FilterPipe,
      ListarReservasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    MatTooltipModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  providers: [
    ServiciosService,
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
