import { Component, OnInit } from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EstacionServicioService} from '../estacion-servicio.service';

@Component({
  selector: 'app-estacion-servicio-create',
  templateUrl: './estacion-servicio-create.component.html',
  styleUrls: ['./estacion-servicio-create.component.css']
})
export class EstacionServicioCreateComponent implements OnInit {
    estacionServicioGroup: FormGroup;
    constructor(
        private router: Router,
        private estacionServicioService: EstacionServicioService,
        private fb: FormBuilder,
        private dialog: MatDialog) { }

    ngOnInit() {
        this.createForm();
    }
    createForm() {
        this.estacionServicioGroup = this.fb.group({
            'razon_social': new FormControl('', Validators.required),
            'nit': new FormControl('', Validators.required),
            'propietario': new FormControl('', Validators.required)
        });
    }

    openDialog(res) {
        const dialogRef = this.dialog.open(MensajeDialogComponent, {
            width: '500px',
            data: {
                info: res.mensaje ,
                has_action: res.has_action
            }
        });

        dialogRef.afterClosed().subscribe(response => {
            if (response === true) {
                this.router.navigate(['/estacion-servicio/listar']);
            }
        });
    }

    store() {
        this.estacionServicioService.store(this.estacionServicioGroup.value).subscribe(res => {
            this.openDialog(res);
            this.estacionServicioGroup.reset();
        }, (error) => {
            this.openDialog(error.error);
        });
    }
}
