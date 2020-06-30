import {Component, OnInit} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TipoVehiculo} from '../../models/tipo-vehiculo';
import {TipoVehiculoService} from '../../services/tipo-vehiculo.service';
import {SuministroCombustibleService} from '../suministro-combustible.service';
import {VehiculoService} from '../../vehiculo/vehiculo.service';

@Component({
  selector: 'app-suministro-combustible-create',
  templateUrl: './suministro-combustible-create.component.html',
  styleUrls: ['./suministro-combustible-create.component.css']
})
export class SuministroCombustibleCreateComponent implements OnInit {
  vehiculos: TipoVehiculo[];
  suminsitroCombustibleGroup: FormGroup;

  constructor(
    private router: Router,
    private vehiculoService: VehiculoService,
    private suministroCombustibleService: SuministroCombustibleService,
    private fb: FormBuilder,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.vehiculoService.index()
      .subscribe((vehiculos: TipoVehiculo[]) => {
        this.vehiculos = vehiculos;
      });
    this.createForm();
  }

  createForm() {
    this.suminsitroCombustibleGroup = this.fb.group({
      vehiculo_id: new FormControl('', Validators.required),
      combustible: new FormControl('', Validators.required)
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
        this.router.navigate(['/suministro-combustible/listar']);
      }
    });
  }

  store() {
    this.suministroCombustibleService.store(this.suminsitroCombustibleGroup.value).subscribe(res => {
      this.openDialog(res);
      this.suminsitroCombustibleGroup.reset();
    }, (error) => {
      this.openDialog(error.error);
    });
  }
}
