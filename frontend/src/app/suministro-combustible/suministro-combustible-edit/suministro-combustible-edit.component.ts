import {Component, OnInit} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {SuministroCombustibleService} from '../suministro-combustible.service';
import {VehiculoService} from '../../vehiculo/vehiculo.service';
import {CombustibleService} from '../../services/combustible.service';
import {Combustible} from '../../models/combustible';
import {Vehiculo} from '../../models/vehiculo';
import {User} from '../../models/user';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-suministro-combustible-edit',
  templateUrl: './suministro-combustible-edit.component.html',
  styleUrls: ['./suministro-combustible-edit.component.css']
})
export class SuministroCombustibleEditComponent implements OnInit {
  user: User;
  vehiculos: Vehiculo[];
  combustibles: Combustible[];
  suministroCombustibleGroup: FormGroup;
  suministro: any = null;

  constructor(
    private authService: AuthService,
    private suministroCombustibleService: SuministroCombustibleService,
    private vehiculoService: VehiculoService,
    private combustibleService: CombustibleService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog) {

    route.params.subscribe(res => {
      suministroCombustibleService.show(res.id).subscribe(suministro => {
        console.log(suministro);
        this.suministro = suministro;
        this.createForm(suministro);
      });
    });
  }

  ngOnInit() {
    this.authService.auth$
      .subscribe((user: User) => {
        this.user = user;
      });
    this.vehiculoService.index()
      .subscribe((vehiculos: Vehiculo[]) => {
        this.vehiculos = vehiculos;
      });
    this.combustibleService.index()
      .subscribe((combustibles: Combustible[]) => {
        this.combustibles = combustibles;
      });
  }

  createForm(suministro) {
    this.suministroCombustibleGroup = this.fb.group({
      id: new FormControl(suministro.id, Validators.required),
      vehiculo_id: new FormControl(suministro.vehiculo_id, Validators.required),
      combustible: new FormControl(suministro.combustible, Validators.required)
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
        const url = `/${this.user.tipo}/suministro-combustible/listar`;
        this.router.navigate([url]);
      }
    });

  }

  update() {
    this.suministroCombustibleService.update(this.suministroCombustibleGroup.value, this.suministroCombustibleGroup.value.id)
      .subscribe(res => {
        this.openDialog(res);
      }, (error) => {
        this.openDialog(error.error);
      });

  }
}
