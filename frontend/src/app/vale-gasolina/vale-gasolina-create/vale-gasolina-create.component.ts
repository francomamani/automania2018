import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ChoferService} from '../../chofer/chofer.service';
import {VehiculoService} from '../../vehiculo/vehiculo.service';
import {AsignacionVehiculoService} from '../../asignacion-vehiculo/asignacion-vehiculo.service';
import {MatDialog} from '@angular/material/dialog';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {EstacionServicioService} from '../../estacion-servicio/estacion-servicio.service';
import {ValeGasolinaService} from '../vale-gasolina.service';

@Component({
  selector: 'app-vale-gasolina-create',
  templateUrl: './vale-gasolina-create.component.html',
  styleUrls: ['./vale-gasolina-create.component.css']
})
export class ValeGasolinaCreateComponent implements OnInit {

  choferes: any[] = [];
  vehiculos: any[] = [];

  estaciones: any[] = [];
  asignaciones: any[] = [];

  valeGasolinaGroup: FormGroup;

  constructor(
    private router: Router,
    private choferService: ChoferService,
    private vehiculoService: VehiculoService,
    private asignacionVehiculoService: AsignacionVehiculoService,
    private estacionServicioService: EstacionServicioService,
    private valeGasolinaService: ValeGasolinaService,
    private fb: FormBuilder,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.estacionServicioService.index()
      .subscribe((estaciones: any[]) => {
        this.estaciones = estaciones;
      });
    this.asignacionVehiculoService.index()
      .subscribe((asignaciones: any[]) => {
        this.asignaciones = asignaciones;
      });


    this.choferService.index()
      .subscribe((choferes: any[]) => {
        this.choferes = choferes;
      });
    this.vehiculoService.index()
      .subscribe((vehiculos: any[]) => {
        this.vehiculos = vehiculos;
      });

    this.valeGasolinaGroup = this.fb.group({
      user_id: new FormControl(parseInt(localStorage.getItem('user_id'), 10), Validators.required),
      asignacion_vehiculo_id: new FormControl(null, Validators.required),
      estacion_servicio_id: new FormControl(null, Validators.required),
      numero_vale: new FormControl(null, Validators.required),
      motivo_viaje: new FormControl(null, Validators.required),
      litros_aprox: new FormControl(0)
    });

  }

  openDialog(res) {
    const dialogRef = this.dialog.open(MensajeDialogComponent, {
      width: '500px',
      data: {
        info: res.mensaje,
        has_action: res.has_action
      }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response === true) {
        this.router.navigate(['/asignacion-vehiculo/listar']);
      }
    });
  }

  store() {
    console.log(this.valeGasolinaGroup.value);
    this.valeGasolinaService.store(this.valeGasolinaGroup.value).subscribe(res => {
      this.router.navigate(['/vale-gasolina/listar']);
    }, (error) => {
      this.router.navigate(['/vale-gasolina/listar']);
      /*      this.openDialog(error.error);*/
    });
  }

}
