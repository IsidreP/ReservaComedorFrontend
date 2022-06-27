import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciosService } from 'src/app/servicios/servicios.service';

@Component({
  selector: 'app-modificar-plato',
  templateUrl: './modificar-plato.component.html',
  styleUrls: ['./modificar-plato.component.scss'],
})
export class ModificarPlatoComponent implements OnInit {
  id: any;

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
    private route: ActivatedRoute,
    private servicio: ServiciosService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    // recogemos id de la ruta plato/:id
    this.id = this.route.snapshot.paramMap.get('id');

    this.servicio.obtenerPlato(this.id).subscribe((next: any) => {
      this.form.patchValue({
        // guardamos nuevos valores
        titulo: next.nombrePlato,
        precio: next.precioPlato,
        descripcion: next.descripcionPlato,
        imagen: next.imagenPlato,
        categoria: this.categorias[next.categoria.idCategoria - 1],
      });
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

  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.form.patchValue({
      imagen: btoa(binaryString),
    });
  }

  modificarPlato() {
    const body = {
      nombrePlato: this.form.controls['titulo'].value,
      descripcionPlato: this.form.controls['descripcion'].value,
      precioPlato: this.form.controls['precio'].value,
      imagenPlato: this.form.controls['imagen'].value,
      categoria: this.form.controls['categoria'].value,
    };

    this.servicio.modificarPlato(body, this.id).subscribe((next) => {
      console.log('Respuesta al modificar plato: ', next);
      this.router.navigate([`/platos/`], { relativeTo: this.route });
      this.snackBar.open('¡Plato modificado con éxito!', 'Cerrar', {
        duration: 4000,
        verticalPosition: 'top',
      });
    });
  }
}
