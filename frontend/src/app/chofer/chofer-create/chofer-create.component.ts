import {Component, OnInit} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ChoferService} from '../chofer.service';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../models/user';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-chofer-create',
  templateUrl: './chofer-create.component.html',
  styleUrls: ['./chofer-create.component.css']
})
export class ChoferCreateComponent implements OnInit {
  user: User;
  tipos: any = [
    {key: 'permanente', value: 'Permanente'},
    {key: 'eventual', value: 'Eventual'}
  ];
  choferGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private choferService: ChoferService,
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
    this.choferGroup = this.fb.group({
      nombres: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      carnet: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required)
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
        const url = `/${this.user.tipo}/chofer/listar`;
        this.router.navigate([url]);
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
