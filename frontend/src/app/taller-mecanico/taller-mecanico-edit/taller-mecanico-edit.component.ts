import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {EstacionServicioService} from '../../estacion-servicio/estacion-servicio.service';
import {TallerMecanicoService} from '../taller-mecanico.service';

@Component({
  selector: 'app-taller-mecanico-edit',
  templateUrl: './taller-mecanico-edit.component.html',
  styleUrls: ['./taller-mecanico-edit.component.css']
})
export class TallerMecanicoEditComponent implements OnInit {

    tallerMecanicoGroup: FormGroup;
    taller_mecanico: any = null;
    constructor(
        private tallerMecanicoService: TallerMecanicoService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private dialog: MatDialog) {

        route.params.subscribe(res => {
            tallerMecanicoService.show(res.id).subscribe( taller_mecanico => {
                this.taller_mecanico = taller_mecanico;
                this.createForm(taller_mecanico);
            });
        });
    }

    ngOnInit() {
    }

    createForm(taller_mecanico) {
        this.tallerMecanicoGroup = this.fb.group({
            'id': new FormControl(taller_mecanico.id, Validators.required),
            'identificacion': new FormControl(taller_mecanico.identificacion, Validators.required),
            'nombre': new FormControl(taller_mecanico.nombre, Validators.required),
            'direccion': new FormControl(taller_mecanico.direccion, Validators.required),
            'telefono': new FormControl(taller_mecanico.telefono, Validators.required),
            'nit': new FormControl(taller_mecanico.nit, Validators.required),
            'nombre_propietario': new FormControl(taller_mecanico.nombre_propietario, Validators.required)
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
                this.router.navigate(['/taller-mecanico/listar']);
            }
        });

    }

    update() {
        this.tallerMecanicoService
            .update(this.tallerMecanicoGroup.value, this.tallerMecanicoGroup.value.id)
            .subscribe(res => {
                this.openDialog(res);
            }, (error) => {
                console.log(error.error);
                this.openDialog(error.error);
            });

    }
}
