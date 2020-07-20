import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ChoferService} from '../../chofer/chofer.service';
import {VehiculoService} from '../../vehiculo/vehiculo.service';
import {AsignacionVehiculoService} from '../../asignacion-vehiculo/asignacion-vehiculo.service';
import {MatDialog} from '@angular/material/dialog';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {EstacionServicioService} from '../../estacion-servicio/estacion-servicio.service';
import {AsignacionVehiculo} from '../../models/asignacion-vehiculo';
import {KilometrajeService} from '../../kilometraje/kilometraje.service';
import {Kilometraje} from '../../models/kilometraje';
import {Combustible} from '../../models/combustible';
import {CombustibleService} from '../../services/combustible.service';
import {ValeCombustibleService} from '../../services/vale-combustible.service';
import {User} from '../../models/user';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-vale-combustible-create',
  templateUrl: './vale-combustible-create.component.html',
  styleUrls: ['./vale-combustible-create.component.css']
})
export class ValeCombustibleCreateComponent implements OnInit {

  user: User;
  choferes: any[] = [];
  vehiculos: any[] = [];

  estaciones: any[] = [];
  asignaciones: any[] = [];

  valeCombustibleGroup: FormGroup;

  suministroCombustibles: any[];

  kilometrajeAnterior: Kilometraje = null;

  combustible: Combustible = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private choferService: ChoferService,
    private vehiculoService: VehiculoService,
    private asignacionVehiculoService: AsignacionVehiculoService,
    private estacionServicioService: EstacionServicioService,
    private valeCombustibleService: ValeCombustibleService,
    private kilometrajeService: KilometrajeService,
    private combustibleService: CombustibleService,
    private fb: FormBuilder,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.authService.auth$
      .subscribe((user: User) => {
        this.user = user;
      });
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

    this.valeCombustibleGroup = this.fb.group({
      kilometraje_anterior_id: new FormControl(null, Validators.required),
      kilometraje_anterior: new FormControl(null),
      kilometraje: new FormControl(null, Validators.required),
      suministro_combustible_id: new FormControl(null, Validators.required),
      asignacion_vehiculo_id: new FormControl(null, Validators.required),
      estacion_servicio_id: new FormControl(null, Validators.required),
      motivo_viaje: new FormControl(null, Validators.required),
      litros: new FormControl(0, Validators.required),
      importe: new FormControl(0, [Validators.required])
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
        this.router.navigate(['/vale-combustible/listar']);
      }
    });
  }

  getSuministroCombustible(event: AsignacionVehiculo) {
    this.vehiculoService.suministroCombustibles(event.vehiculo.id)
      .subscribe((response: any[]) => {
        this.suministroCombustibles = response;
      });
  }

  getKilometraje(event: any) {
    this.kilometrajeService.getKilometraje(event.value)
      .subscribe((kilometrajeAnterior: Kilometraje) => {
        this.kilometrajeAnterior = kilometrajeAnterior;
        this.valeCombustibleGroup.patchValue({
          kilometraje_anterior_id: kilometrajeAnterior.id,
          kilometraje_anterior: kilometrajeAnterior.actual
        });
      });
    this.combustibleService.lastCombustible(event.value)
      .subscribe((combustible: Combustible) => {
        this.combustible = combustible;
        this.getImporte();
      });
  }

  getImporte() {
    this.valeCombustibleGroup.patchValue({
      importe: this.combustible.importe * this.valeCombustibleGroup.get('litros').value
    });
  }

  store() {
    const url = `/${this.user.tipo}/vale-combustible/listar`;
    if (this.valeCombustibleGroup.get('kilometraje').value > this.valeCombustibleGroup.get('kilometraje_anterior').value) {
      this.valeCombustibleService.store(this.valeCombustibleGroup.value).subscribe((res: any) => {
        this.openDialog(res);
        this.router.navigate([url]);
      }, (error) => {
        this.router.navigate([url]);
        this.openDialog(error.error);
      });
    } else {
      alert('El kilometraje actual no puede ser menos o igual al kilometraje anterior');
    }
  }
}
