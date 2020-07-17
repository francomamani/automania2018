import {Component, OnInit} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ContratoService} from '../contrato.service';
import {Chofer} from '../../models/chofer';
import {ChoferService} from '../../chofer/chofer.service';

@Component({
  selector: 'app-contrato-create',
  templateUrl: './contrato-create.component.html',
  styleUrls: ['./contrato-create.component.css']
})
export class ContratoCreateComponent implements OnInit {
  contratoGroup: FormGroup;
  choferes: Chofer[];

  constructor(
    private router: Router,
    private contratoService: ContratoService,
    private choferService: ChoferService,
    private fb: FormBuilder,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.choferService.index()
      .subscribe((choferes: Chofer[]) => {
        this.choferes = choferes;
      });
    this.createForm();
  }

  createForm() {

    this.contratoGroup = this.fb.group({
      chofer_id: new FormControl('', Validators.required),
      numero_contrato: new FormControl('', Validators.required),
      fecha_inicio_contrato: new FormControl('', Validators.required),
      fecha_fin_contrato: new FormControl('', Validators.required),
      activo: new FormControl(1, Validators.required)
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
        this.router.navigate(['/contrato/listar']);
      }
    });
  }


  store() {
    this.contratoGroup.patchValue({
      fecha_inicio_contrato: new Date(this.contratoGroup.get('fecha_inicio_contrato').value).toISOString().split('T')[0],
      fecha_fin_contrato: new Date(this.contratoGroup.get('fecha_fin_contrato').value).toISOString().split('T')[0],
      activo: Number(this.contratoGroup.get('activo').value)
    });

    this.contratoService.store(this.contratoGroup.value).subscribe(res => {
      this.openDialog({
        mensaje: 'Contrato registrado exitosamente, Desea volver al listado de contratos?',
        has_action: true
      });
      this.contratoGroup.reset();
    }, (error) => {
      this.openDialog(error.error);
    });
  }
}
