import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../user/user.service';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {AsignacionVehiculoService} from '../asignacion-vehiculo.service';
import {ChoferService} from '../../chofer/chofer.service';
import {VehiculoService} from '../../vehiculo/vehiculo.service';

@Component({
  selector: 'app-asignacion-vehiculo-create',
  templateUrl: './asignacion-vehiculo-create.component.html',
  styleUrls: ['./asignacion-vehiculo-create.component.css']
})
export class AsignacionVehiculoCreateComponent implements OnInit {
    choferes: any = null;
    vehiculos: any = null;
    asignacionVehiculoGroup: FormGroup;
    constructor(
        private router: Router,
        private choferService: ChoferService,
        private vehiculoService: VehiculoService,
        private asignacionVehiculoService: AsignacionVehiculoService,
        private fb: FormBuilder,
        private dialog: MatDialog) {
        this.choferService.index()
            .subscribe(res => {
                this.choferes = res;
            });
        this.vehiculoService.index()
            .subscribe(res => {
                this.vehiculos = res;
            });
    }

    ngOnInit() {
        this.createForm();
    }
    createForm() {
        this.asignacionVehiculoGroup = this.fb.group({
            'user_id': new FormControl(localStorage.getItem('user_id'), Validators.required),
            'chofer_id': new FormControl('', Validators.required),
            'vehiculo_id': new FormControl('', Validators.required)
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
            if(response === true) {
                this.router.navigate(['/asignacion-vehiculo/listar']);
            }
        });
    }

    store() {
        this.asignacionVehiculoService.store(this.asignacionVehiculoGroup.value).subscribe(res => {
            this.openDialog(res);
        }, (error) => {
            this.openDialog(error.error);
        });
    }
}
