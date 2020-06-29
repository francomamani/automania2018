import {Component, OnInit} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ChoferService} from '../chofer.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-chofer-create',
  templateUrl: './chofer-create.component.html',
  styleUrls: ['./chofer-create.component.css']
})
export class ChoferCreateComponent implements OnInit {
  tipos: any = [
    {key: 'permanente', value: 'Permanente'},
    {key: 'eventual', value: 'Eventual'}
  ];
  choferGroup: FormGroup;

  constructor(
    private router: Router,
    private choferService: ChoferService,
    private fb: FormBuilder,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.choferGroup = this.fb.group({
      'nombres': new FormControl('', Validators.required),
      'apellidos': new FormControl('', Validators.required),
      'carnet': new FormControl('', Validators.required),
      'tipo': new FormControl('', Validators.required)
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
        this.router.navigate(['/chofer/listar']);
      }
    });
  }

  store() {
    this.choferService.store(this.choferGroup.value).subscribe(res => {
      this.openDialog(res);
      this.choferGroup.reset();
    }, (error) => {
      this.openDialog(error.error);
    });
  }
}
