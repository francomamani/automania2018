import { Component, OnInit } from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VehiculoService} from '../vehiculo.service';

@Component({
  selector: 'app-vehiculo-edit',
  templateUrl: './vehiculo-edit.component.html',
  styleUrls: ['./vehiculo-edit.component.css']
})
export class VehiculoEditComponent implements OnInit {
    vehiculoGroup: FormGroup;
    vehiculo: any = null;
    constructor(
        private vehiculoService: VehiculoService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private dialog: MatDialog) {

        route.params.subscribe(res => {
            vehiculoService.show(res.id).subscribe( vehiculo => {
                console.log(vehiculo);
                this.vehiculo = vehiculo;
                this.createForm(vehiculo);
            });
        });
    }

    ngOnInit() {
    }

    createForm(vehiculo) {
        this.vehiculoGroup = this.fb.group({
            'id': new FormControl(vehiculo.id, Validators.required),
            'placa': new FormControl(vehiculo.placa, Validators.required),
            'marca': new FormControl(vehiculo.marca, Validators.required),
            'modelo': new FormControl(vehiculo.modelo, Validators.required),
            'color': new FormControl(vehiculo.color, Validators.required),
            'cilindrada': new FormControl(vehiculo.cilindrada, Validators.required),
            'gestion': new FormControl(vehiculo.gestion, Validators.required)
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
                this.router.navigate(['/vehiculo/listar']);
            }
        });

    }

    update() {
        this.vehiculoService
            .update(this.vehiculoGroup.value, this.vehiculoGroup.value.id)
            .subscribe(res => {
                this.openDialog(res);
            }, (error) => {
                console.log(error.error);
                this.openDialog(error.error);
            });

    }
}
