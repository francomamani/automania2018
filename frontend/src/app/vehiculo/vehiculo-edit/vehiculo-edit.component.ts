import {Component, OnInit} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VehiculoService} from '../vehiculo.service';
import {MatDialog} from '@angular/material/dialog';
import {TipoVehiculo} from '../../models/tipo-vehiculo';
import {TipoVehiculoService} from '../../services/tipo-vehiculo.service';

@Component({
  selector: 'app-vehiculo-edit',
  templateUrl: './vehiculo-edit.component.html',
  styleUrls: ['./vehiculo-edit.component.css']
})
export class VehiculoEditComponent implements OnInit {
  vehiculoGroup: FormGroup;
  tipo_vehiculos: TipoVehiculo[];
  vehiculo: any = null;

  constructor(
    private tipoVehiculoService: TipoVehiculoService,
    private vehiculoService: VehiculoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog) {

    route.params.subscribe(res => {
      vehiculoService.show(res.id).subscribe(vehiculo => {
        console.log(vehiculo);
        this.vehiculo = vehiculo;
        this.createForm(vehiculo);
      });
    });
  }

  ngOnInit() {
    this.tipoVehiculoService.index()
    .subscribe((tipo_vehiculos: TipoVehiculo[]) => {
      this.tipo_vehiculos = tipo_vehiculos;
    });
  }

  createForm(vehiculo) {
    this.vehiculoGroup = this.fb.group({
      'id': new FormControl(vehiculo.id, Validators.required),
      'tipo_vehiculo': new FormControl(vehiculo.tipo_vehiculo, Validators.required),
      'placa': new FormControl(vehiculo.placa, Validators.required),
      'marca': new FormControl(vehiculo.marca, Validators.required),
      'modelo': new FormControl(vehiculo.modelo, Validators.required),
      'color': new FormControl(vehiculo.color, Validators.required),
      'cilindrada': new FormControl(vehiculo.cilindrada, Validators.required),
      'gestion': new FormControl(vehiculo.gestion, Validators.required),
      'estado_vehiculo': new FormControl(vehiculo.estado_vehiculo, Validators.required),
      'disponibilidad': new FormControl(vehiculo.disponibilidad, Validators.required),
      'observaciones': new FormControl(vehiculo.observaciones)
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
        this.router.navigate(['/vehiculo/listar']);
      }
    });

  }

  update() {
    this.vehiculoService
      .update(this.vehiculoGroup.value, this.vehiculoGroup.value.id)
      .subscribe(res => {
        this.openDialog(res);
      }, (error) => {
        console.log(error.error);
        this.openDialog(error.error);
      });

  }
}
