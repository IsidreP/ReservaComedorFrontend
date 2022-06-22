import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.scss'],
})
export class PlatoComponent implements OnInit {
  todosPlatos$: Observable<any>;
  entrantes$: Observable<any>;
  primeros$: Observable<any>;
  segundos$: Observable<any>;
  postres$: Observable<any>;

  loading$ = this.loader.loading$;

  usuarioLogeado$: Observable<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicio: ServiciosService,
    private loader: SpinnerService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
  }

  filterPlato = '';

  ngOnInit(): void {

    this.usuarioLogeado$ = this.servicio.usuarioLogeado$;

    this.loader.show();

    this.todosPlatos$ = this.servicio.obtenerPlatos().pipe(shareReplay());

    this.entrantes$ = this.todosPlatos$.pipe(
      map((next) => {
        return next.filter((plato) => plato.categoria?.idCategoria == 1);
      })
    );

    this.primeros$ = this.todosPlatos$.pipe(
      map((next) => {
        return next.filter((plato) => plato.categoria?.idCategoria == 2);
      })
    );

    this.segundos$ = this.todosPlatos$.pipe(
      map((next) => {
        return next.filter((plato) => plato.categoria?.idCategoria == 3);
      })
    );

    this.postres$ = this.todosPlatos$.pipe(
      map((next) => {
        this.loader.hide();
        return next.filter((plato) => plato.categoria?.idCategoria == 4);
      })
    );

  }

  modificarPlato(id: number) {
    this.router.navigate([`/plato/${id}`], { relativeTo: this.route });
  }

  eliminarPlato(id: number) {
    this.loader.show();
    this.servicio.eliminarPlato(id).subscribe((next) => {
      this.todosPlatos$ = this.servicio.obtenerPlatos();

      this.entrantes$ = this.todosPlatos$.pipe(
        map((next) => {
          return next.filter((plato) => plato.categoria?.idCategoria == 1);
        })
      );

      this.primeros$ = this.todosPlatos$.pipe(
        map((next) => {
          return next.filter((plato) => plato.categoria?.idCategoria == 2);
        })
      );

      this.segundos$ = this.todosPlatos$.pipe(
        map((next) => {
          return next.filter((plato) => plato.categoria?.idCategoria == 3);
        })
      );

      this.postres$ = this.todosPlatos$.pipe(
        map((next) => {
          return next.filter((plato) => plato.categoria?.idCategoria == 4);
        })
      );

      this.loader.hide();

      console.log('Respuesta al eliminar el plato: ', next);
      this.router.navigate([`/platos/`], { relativeTo: this.route });

      this.snackBar.open('¡Plato eliminado con éxito!', 'Cerrar', {
        duration: 5000,
        verticalPosition: 'top',
      });
    });
  }

  openDialog(idPlato: any): void {
   const dialogRef = this.dialog.open(MatDialogComponent, {
      width: '400px',
      data: {idPlato: idPlato},
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result != undefined){
        this.eliminarPlato(result.idPlato);
      }
    });
  }


}
