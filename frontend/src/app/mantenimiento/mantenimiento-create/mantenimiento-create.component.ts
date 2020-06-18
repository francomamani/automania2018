import {Component, OnInit} from '@angular/core';
import {MantenimientoService} from '../mantenimiento.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {Router} from '@angular/router';
import {TallerMecanicoService} from '../../taller-mecanico/taller-mecanico.service';
import {AsignacionVehiculoService} from '../../asignacion-vehiculo/asignacion-vehiculo.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-mantenimiento-create',
  templateUrl: './mantenimiento-create.component.html',
  styleUrls: ['./mantenimiento-create.component.css']
})
export class MantenimientoCreateComponent implements OnInit {
  mantenimientoGroup: FormGroup;
  tipoMantenimiento = [
    {value: 'preventivo'},
    {value: 'correctivo'}
  ];
  tallerMecanicos: any = [];
  asignaciones: any = [];

  constructor(
    private router: Router,
    private mantenimientoService: MantenimientoService,
    private tallerMecanicoService: TallerMecanicoService,
    private asignacionVehiculoService: AsignacionVehiculoService,
    private fb: FormBuilder,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.createForm();
    this.tallerMecanicoService.index().subscribe(res => this.tallerMecanicos = res);
    this.asignacionVehiculoService.index().subscribe(res => this.asignaciones = res);
  }

  createForm() {
    this.mantenimientoGroup = this.fb.group({
      descripcion: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
      numero_factura: new FormControl(''),
      monto: new FormControl(''),
      fecha_inicio: new FormControl(''),
      fecha_fin: new FormControl(''),
      descripcion_servicio: new FormControl('')
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
        this.router.navigate(['/mantenimiento/listar']);
      }
    });
  }

  store() {
    this.mantenimientoService.store(this.mantenimientoGroup.value).subscribe(res => {
      this.openDialog(res);
      this.mantenimientoGroup.reset();
    }, (error) => {
      this.openDialog(error.error);
    });
  }
}
