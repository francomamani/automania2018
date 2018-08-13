import { Component, OnInit } from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ChoferService} from '../../chofer/chofer.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-chofer-edit',
  templateUrl: './chofer-edit.component.html',
  styleUrls: ['./chofer-edit.component.css']
})
export class ChoferEditComponent implements OnInit {
    tipos = [
        { key: 'permanente', value: 'Permanente'},
        { key: 'eventual', value: 'Eventual'}
    ];
    choferGroup: FormGroup;
    chofer: any = null;
    constructor(
        private choferService: ChoferService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private dialog: MatDialog) {

        route.params.subscribe(res => {
            choferService.show(res.id).subscribe( chofer => {
                console.log(chofer);
                this.chofer = chofer;
                this.createForm(chofer);
            });
        });
    }

    ngOnInit() {
    }

    createForm(chofer) {
        this.choferGroup = this.fb.group({
            'id': new FormControl(chofer.id, Validators.required),
            'nombres': new FormControl(chofer.nombres, Validators.required),
            'apellidos': new FormControl(chofer.apellidos, Validators.required),
            'carnet': new FormControl(chofer.carnet, Validators.required),
            'tipo': new FormControl(chofer.tipo, Validators.required),
            'activo': new FormControl(chofer.activo, Validators.required),
            'fecha_inicio_contrato': new FormControl(new Date(chofer.fecha_inicio_contrato), Validators.required),
            'fecha_fin_contrato': new FormControl(new Date(chofer.fecha_fin_contrato), Validators.required)
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
                this.router.navigate(['/chofer/listar']);
            }
        });

    }

    update() {
        this.choferGroup.patchValue({
            'fecha_inicio_contrato': this.choferGroup.value.fecha_inicio_contrato.getTime(),
            'fecha_fin_contrato': this.choferGroup.value.fecha_fin_contrato.getTime()
        });
        this.choferService
            .update(this.choferGroup.value, this.choferGroup.value.id)
            .subscribe(res => {
                this.choferGroup.patchValue({
                    'fecha_inicio_contrato': new Date(this.choferGroup.value.fecha_inicio_contrato),
                    'fecha_fin_contrato': new Date(this.choferGroup.value.fecha_fin_contrato)
                });
                console.log(res);
                this.openDialog(res);
            }, (error) => {
                console.log(error.error);
                this.openDialog(error.error);
            });
    }
}
