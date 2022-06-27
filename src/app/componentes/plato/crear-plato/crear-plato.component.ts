import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';

@Component({
  selector: 'app-crear-plato',
  templateUrl: './crear-plato.component.html',
  styleUrls: ['./crear-plato.component.scss'],
})
export class CrearPlatoComponent implements OnInit, AfterViewInit {
  loading$ = this.loader.loading$;

  form: FormGroup = this.fb.group({
    titulo: ['', { validators: [Validators.required] }],
    precio: ['', { validators: [Validators.required] }],
    descripcion: ['', { validators: [Validators.required] }],
    imagen: ['', { validators: [Validators.required] }],
    categoria: ['', { validators: [Validators.required] }],
  });

  categorias = [
    {
      idCategoria: 1,
      nombreCategoria: 'entrante',
    },
    {
      idCategoria: 2,
      nombreCategoria: 'primero',
    },
    {
      idCategoria: 3,
      nombreCategoria: 'segundo',
    },
    {
      idCategoria: 4,
      nombreCategoria: 'postre',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private servicio: ServiciosService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public loader: SpinnerService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe((next) => {
      console.log(this.form);
    });
  }

  // pasamos la imagen a la base64
  onFileSelected(event) {
    var files = event.target.files;
    var file = files[0];

    if (files && file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  // función invocada desde onFileSelected()
  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.form.patchValue({
      imagen: btoa(binaryString),
    });
  }

  crearPlato() {
    this.loader.show();
    const body = {
      nombrePlato: this.form.controls['titulo'].value,
      descripcionPlato: this.form.controls['descripcion'].value,
      precioPlato: this.form.controls['precio'].value,
      imagenPlato: this.form.controls['imagen'].value,
      categoria: this.form.controls['categoria'].value,
    };

    this.servicio.crearPlato(body).subscribe((next) => {
      this.loader.hide();
      console.log('Respuesta guardar plato: ', next);
      this.router.navigate([`/platos/`], { relativeTo: this.route });
      this.snackBar.open('¡Nuevo plato creado con éxito!', 'Cerrar', {
        duration: 4000,
        verticalPosition: 'top',
      });
    });
  }
}
