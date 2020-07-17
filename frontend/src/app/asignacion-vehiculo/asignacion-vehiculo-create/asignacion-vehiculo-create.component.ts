import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {Router} from '@angular/router';
import {AsignacionVehiculoService} from '../asignacion-vehiculo.service';
import {ChoferService} from '../../chofer/chofer.service';
import {VehiculoService} from '../../vehiculo/vehiculo.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-asignacion-vehiculo-create',
  templateUrl: './asignacion-vehiculo-create.component.html',
  styleUrls: ['./asignacion-vehiculo-create.component.css']
})
export class AsignacionVehiculoCreateComponent implements OnInit {
  choferes: any[] = [];
  vehiculos: any[] = [];
  asignacionVehiculoGroup: FormGroup;

  constructor(
    private router: Router,
    private choferService: ChoferService,
    private vehiculoService: VehiculoService,
    private asignacionVehiculoService: AsignacionVehiculoService,
    private fb: FormBuilder,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.choferService.index()
      .subscribe((choferes: any[]) => {
        this.choferes = choferes;
      });
    this.vehiculoService.index()
      .subscribe((vehiculos: any[]) => {
        this.vehiculos = vehiculos;
      });

    this.asignacionVehiculoGroup = this.fb.group({
      user_id: new FormControl(parseInt(localStorage.getItem('user_id'), 10), Validators.required),
      chofer_id: new FormControl('', Validators.required),
      vehiculo_id: new FormControl('', Validators.required)
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
    console.log(this.asignacionVehiculoGroup.value);
    this.asignacionVehiculoService.store(this.asignacionVehiculoGroup.value).subscribe(res => {
      this.openDialog(res);
    }, (error) => {
      this.openDialog(error.error);
    });
  }
}
