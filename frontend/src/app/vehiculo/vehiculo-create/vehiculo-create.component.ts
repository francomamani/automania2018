import {Component, OnInit} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {VehiculoService} from '../vehiculo.service';

@Component({
  selector: 'app-vehiculo-create',
  templateUrl: './vehiculo-create.component.html',
  styleUrls: ['./vehiculo-create.component.css']
})
export class VehiculoCreateComponent implements OnInit {
  vehiculoGroup: FormGroup;

  constructor(
    private router: Router,
    private vehiculoService: VehiculoService,
    private fb: FormBuilder,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.vehiculoGroup = this.fb.group({
      'placa': new FormControl('', Validators.required),
      'marca': new FormControl('', Validators.required),
      'modelo': new FormControl('', Validators.required),
      'color': new FormControl('', Validators.required),
      'cilindrada': new FormControl(3000, Validators.required),
      'gestion': new FormControl(2000, Validators.required),
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
        this.router.navigate(['/vehiculo/listar']);
      }
    });
  }

  store() {
    this.vehiculoService.store(this.vehiculoGroup.value).subscribe(res => {
      this.openDialog(res);
      this.vehiculoGroup.reset();
    }, (error) => {
      this.openDialog(error.error);
    });
  }
}
