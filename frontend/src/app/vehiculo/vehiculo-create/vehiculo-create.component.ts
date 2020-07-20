import {Component, OnInit} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {VehiculoService} from '../vehiculo.service';
import {MatDialog} from '@angular/material/dialog';
import {TipoVehiculo} from '../../models/tipo-vehiculo';
import {TipoVehiculoService} from '../../services/tipo-vehiculo.service';
import {User} from '../../models/user';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-vehiculo-create',
  templateUrl: './vehiculo-create.component.html',
  styleUrls: ['./vehiculo-create.component.css']
})
export class VehiculoCreateComponent implements OnInit {
  user: User;
  tipo_vehiculos: TipoVehiculo[];
  vehiculoGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tipoVehiculoService: TipoVehiculoService,
    private vehiculoService: VehiculoService,
    private fb: FormBuilder,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.authService.auth$
      .subscribe((user: User) => {
        this.user = user;
      });
    this.tipoVehiculoService.index()
      .subscribe((tipo_vehiculos: TipoVehiculo[]) => {
        this.tipo_vehiculos = tipo_vehiculos;
      });
    this.createForm();
  }

  createForm() {
    this.vehiculoGroup = this.fb.group({
      tipo_vehiculo: new FormControl('', Validators.required),
      placa: new FormControl('', Validators.required),
      marca: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      cilindrada: new FormControl(3000, Validators.required),
      gestion: new FormControl(2000, Validators.required),
      estado_vehiculo: new FormControl('REGULAR', Validators.required),
      disponibilidad: new FormControl('ACTIVO ASIGNADO', Validators.required),
      observaciones: new FormControl(''),
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
        const url = `/${this.user.tipo}/vehiculo/listar`;
        this.router.navigate([url]);
      }
    });
  }

  store() {
    this.vehiculoService.store(this.vehiculoGroup.value).subscribe(res => {
      this.openDialog(res);
      this.vehiculoGroup.reset();
    }, (error) => {
      this.openDialog(error.error);
    });
  }
}
