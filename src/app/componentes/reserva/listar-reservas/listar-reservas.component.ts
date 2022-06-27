import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';

@Component({
  selector: 'app-listar-reservas',
  templateUrl: './listar-reservas.component.html',
  styleUrls: ['./listar-reservas.component.scss'],
})
export class ListarReservasComponent implements OnInit {
  loading$ = this.loader.loading$;
  todasReservas = [];

  constructor(
    private service: ServiciosService,
    private loader: SpinnerService
  ) {}

  ngOnInit(): void {
    this.loader.show();
    this.service.obtenerReservas().subscribe((next) => {
      this.filtrarReservas(next);
    });
  }

  filtrarReservas(respuesta: any) {
    let reservas = [];

    let usuarios = [];
    let franjas = [];

    respuesta.forEach((reserva) => {
      let nuestraReserva = {
        usuario: {},
        platos: [],
        franja: {},
        precioTotalReserva: null,
        fechaReservada: null,
      };

      if (
        (usuarios.findIndex(
          (usuario) => usuario.id == reserva.pedirPlato.usuario.id
        ) == -1) || (franjas.findIndex(
          (franja) => franja.idFranja == reserva.pedirPlato.franja.idFranja
        ) == -1)
      ) {
        nuestraReserva.usuario = reserva.pedirPlato.usuario;

        nuestraReserva.fechaReservada = reserva.fechaReservada;

        nuestraReserva.franja = reserva.pedirPlato.franja;

        franjas.push(reserva.pedirPlato.franja);

        usuarios.push(reserva.pedirPlato.usuario);
      }

      // if (
      //   franjas.findIndex(
      //     (franja) => franja.idFranja == reserva.pedirPlato.franja.idFranja
      //   ) == -1
      // ) {
      //   nuestraReserva.franja = reserva.pedirPlato.franja;

      //   franjas.push(reserva.pedirPlato.franja);
      // }

      if (nuestraReserva.usuario['id'] != undefined) {
        reservas.push(nuestraReserva);
      }
    });

    // cuando idUsuario == reserva.usuario.idUsuario && idFranja == reserva.franja.idFranja
    respuesta.forEach((reserva) => {
      reservas.forEach((nuestraReserva) => {
        let importeTotalReserva = 0;
        if (
          nuestraReserva.usuario.id == reserva.pedirPlato.usuario.id &&
          nuestraReserva.franja.idFranja == reserva.pedirPlato.franja.idFranja
        ) {
          importeTotalReserva += reserva.pedirPlato.plato.precioPlato;
          nuestraReserva.platos.push(reserva.pedirPlato.plato);
        }
        nuestraReserva.precioTotalReserva += importeTotalReserva;
      });
    });

    console.log(reservas);

    this.todasReservas.push(reservas);
    this.loader.hide();
  }
}
