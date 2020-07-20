import {Component, OnInit} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {TipoCombustibleService} from '../tipo-combustible.service';
import {User} from '../../models/user';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-tipo-combustible-create',
  templateUrl: './tipo-combustible-create.component.html',
  styleUrls: ['./tipo-combustible-create.component.css']
})
export class TipoCombustibleCreateComponent implements OnInit {
  user: User;
  tipoCombustibleGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tipoCombustibleService: TipoCombustibleService,
    private fb: FormBuilder,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.authService.auth$
      .subscribe((user: User) => {
        this.user = user;
      });
    this.createForm();
  }

  createForm() {
    this.tipoCombustibleGroup = this.fb.group({
      nombre: new FormControl('', Validators.required),
      importe: new FormControl(0, Validators.required)
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
        const url = `/${this.user.tipo}/tipo-combustible/listar`;
        this.router.navigate([url]);
      }
    });
  }

  store() {
    this.tipoCombustibleService.store(this.tipoCombustibleGroup.value).subscribe(res => {
      this.openDialog(res);
      this.tipoCombustibleGroup.reset();
    }, (error) => {
      this.openDialog(error.error);
    });
  }
}
