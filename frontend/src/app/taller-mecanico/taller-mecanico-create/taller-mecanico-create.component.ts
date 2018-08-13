import { Component, OnInit } from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {TallerMecanicoService} from '../taller-mecanico.service';

@Component({
  selector: 'app-taller-mecanico-create',
  templateUrl: './taller-mecanico-create.component.html',
  styleUrls: ['./taller-mecanico-create.component.css']
})
export class TallerMecanicoCreateComponent implements OnInit {
    tallerMecanicoGroup: FormGroup;
    constructor(
        private router: Router,
        private tallerMecanicoService: TallerMecanicoService,
        private fb: FormBuilder,
        private dialog: MatDialog) { }

    ngOnInit() {
        this.createForm();
    }
    createForm() {
        this.tallerMecanicoGroup = this.fb.group({
            'identificacion': new FormControl('', Validators.required),
            'nombre': new FormControl('', Validators.required),
            'direccion': new FormControl('', Validators.required),
            'telefono': new FormControl('', Validators.required),
            'nit': new FormControl('', Validators.required),
            'nombre_propietario': new FormControl('', Validators.required)
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
                this.router.navigate(['/taller-mecanico/listar']);
            }
        });
    }

    store() {
        this.tallerMecanicoService.store(this.tallerMecanicoGroup.value).subscribe(res => {
            this.openDialog(res);
            this.tallerMecanicoGroup.reset();
        }, (error) => {
            this.openDialog(error.error);
        });
    }
}
