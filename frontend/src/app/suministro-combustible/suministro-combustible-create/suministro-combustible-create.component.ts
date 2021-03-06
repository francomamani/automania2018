import {Component, OnInit} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TipoVehiculo} from '../../models/tipo-vehiculo';
import {SuministroCombustibleService} from '../suministro-combustible.service';
import {VehiculoService} from '../../vehiculo/vehiculo.service';
import {CombustibleService} from '../../services/combustible.service';
import {Combustible} from '../../models/combustible';
import {User} from '../../models/user';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-suministro-combustible-create',
  templateUrl: './suministro-combustible-create.component.html',
  styleUrls: ['./suministro-combustible-create.component.css']
})
export class SuministroCombustibleCreateComponent implements OnInit {
  user: User;
  vehiculos: TipoVehiculo[];
  combustibles: Combustible[];
  suminsitroCombustibleGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private vehiculoService: VehiculoService,
    private suministroCombustibleService: SuministroCombustibleService,
    private combustibleService: CombustibleService,
    private fb: FormBuilder,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.authService.auth$
      .subscribe((user: User) => {
        this.user = user;
      });
    this.vehiculoService.index()
      .subscribe((vehiculos: TipoVehiculo[]) => {
        this.vehiculos = vehiculos;
      });
    this.combustibleService.index()
      .subscribe((combustibles: Combustible[]) => {
        this.combustibles = combustibles;
      });
    this.createForm();
  }

  createForm() {
    this.suminsitroCombustibleGroup = this.fb.group({
      vehiculo_id: new FormControl(null, Validators.required),
      combustible: new FormControl(null, Validators.required)
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
        const url = `/${this.user.tipo}/suministro-combustible/listar`;
        this.router.navigate([url]);
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
