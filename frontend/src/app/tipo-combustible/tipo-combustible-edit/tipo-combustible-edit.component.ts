import {Component, OnInit} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TipoCombustibleService} from '../tipo-combustible.service';

@Component({
  selector: 'app-tipo-combustible-edit',
  templateUrl: './tipo-combustible-edit.component.html',
  styleUrls: ['./tipo-combustible-edit.component.css']
})
export class TipoCombustibleEditComponent implements OnInit {
  tipoCombustibleGroup: FormGroup;
  tipoCombustible: any = null;

  constructor(
    private tipoCombustibleService: TipoCombustibleService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog) {

    route.params.subscribe(res => {
      tipoCombustibleService.show(res.id).subscribe(tipoCombustible => {
        this.tipoCombustible = tipoCombustible;
        this.createForm(tipoCombustible);
      });
    });
  }

  ngOnInit() {
  }

  createForm(tipoCombustible) {
    this.tipoCombustibleGroup = this.fb.group({
      'id': new FormControl(tipoCombustible.id, Validators.required),
      'nombre': new FormControl(tipoCombustible.nombre, Validators.required),
      'importe': new FormControl(tipoCombustible.importe, Validators.required)
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
        this.router.navigate(['tipo-combustible/listar']);
      }
    });

  }

  update() {
    this.tipoCombustibleService
      .update(this.tipoCombustibleGroup.value, this.tipoCombustibleGroup.value.id).subscribe(res => {
      console.log(res);
      this.openDialog(res);
    }, (error) => {
      this.openDialog(error.error);
    });
  }
}
