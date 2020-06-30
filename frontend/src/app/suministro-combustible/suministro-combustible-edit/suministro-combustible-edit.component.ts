import {Component, OnInit} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {TipoVehiculo} from '../../models/tipo-vehiculo';
import {SuministroCombustibleService} from '../suministro-combustible.service';
import {VehiculoService} from '../../vehiculo/vehiculo.service';

@Component({
  selector: 'app-suministro-combustible-edit',
  templateUrl: './suministro-combustible-edit.component.html',
  styleUrls: ['./suministro-combustible-edit.component.css']
})
export class SuministroCombustibleEditComponent implements OnInit {
  vehiculos: TipoVehiculo[];
  suministroCombustibleGroup: FormGroup;
  suministro: any = null;

  constructor(
    private suministroCombustibleService: SuministroCombustibleService,
    private vehiculoService: VehiculoService,
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
    this.vehiculoService.index()
      .subscribe((vehiculos: TipoVehiculo[]) => {
        this.vehiculos = vehiculos;
      });
  }

  createForm(suministro) {
    this.suministroCombustibleGroup = this.fb.group({
      'id': new FormControl(suministro.id, Validators.required),
      'vehiculo_id': new FormControl(suministro.vehiculo_id, Validators.required),
      'combustible': new FormControl(suministro.combustible, Validators.required)
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
        this.router.navigate(['/suministro-combustible/listar']);
      }
    });

  }

  update() {
    this.suministroCombustibleService.update(this.suministroCombustibleGroup.value, this.suministroCombustibleGroup.value.id)
      .subscribe(res => {
        this.openDialog(res);
      }, (error) => {
        console.log(error.error);
        this.openDialog(error.error);
      });

  }
}
