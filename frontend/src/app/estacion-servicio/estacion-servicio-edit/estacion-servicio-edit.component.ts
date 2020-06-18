import {Component, OnInit} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EstacionServicioService} from '../estacion-servicio.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-estacion-servicio-edit',
  templateUrl: './estacion-servicio-edit.component.html',
  styleUrls: ['./estacion-servicio-edit.component.css']
})
export class EstacionServicioEditComponent implements OnInit {

  estacionServicioGroup: FormGroup;
  estacion_servicio: any = null;

  constructor(
    private estacionServicioService: EstacionServicioService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog) {

    route.params.subscribe(res => {
      estacionServicioService.show(res.id).subscribe(estacion_servicio => {
        console.log(estacion_servicio);
        this.estacion_servicio = estacion_servicio;
        this.createForm(estacion_servicio);
      });
    });
  }

  ngOnInit() {
  }

  createForm(estacion_servicio) {
    this.estacionServicioGroup = this.fb.group({
      'id': new FormControl(estacion_servicio.id, Validators.required),
      'razon_social': new FormControl(estacion_servicio.razon_social, Validators.required),
      'nit': new FormControl(estacion_servicio.nit, Validators.required),
      'propietario': new FormControl(estacion_servicio.propietario, Validators.required),
      'activo': new FormControl(estacion_servicio.activo, Validators.required)
    });
  }

  openDialog(res) {
    const dialogRef = this.dialog.open(MensajeDialogComponent, {
      width: '450px',
      data: {
        info: res.mensaje,
        has_action: res.has_action

      }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response === true) {
        this.router.navigate(['/estacion-servicio/listar']);
      }
    });

  }

  update() {
    this.estacionServicioService
      .update(this.estacionServicioGroup.value, this.estacionServicioGroup.value.id)
      .subscribe(res => {
        this.openDialog(res);
      }, (error) => {
        console.log(error.error);
        this.openDialog(error.error);
      });

  }
}
