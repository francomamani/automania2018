import {Component, OnInit} from '@angular/core';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../models/user';
import {AuthService} from '../../auth.service';
import {ChoferService} from '../chofer.service';

@Component({
  selector: 'app-chofer-edit',
  templateUrl: './chofer-edit.component.html',
  styleUrls: ['./chofer-edit.component.css']
})
export class ChoferEditComponent implements OnInit {

  user: User;
  tipos = [
    {key: 'permanente', value: 'Permanente'},
    {key: 'eventual', value: 'Eventual'}
  ];
  choferGroup: FormGroup;
  chofer: any = null;

  constructor(
    private authService: AuthService,
    private choferService: ChoferService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog) {

    route.params.subscribe(res => {
      choferService.show(res.id).subscribe(chofer => {
        this.chofer = chofer;
        this.createForm(chofer);
      });
    });
  }

  ngOnInit() {
    this.authService.auth$
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  createForm(chofer) {
    this.choferGroup = this.fb.group({
      id: new FormControl(chofer.id, Validators.required),
      nombres: new FormControl(chofer.nombres, Validators.required),
      apellidos: new FormControl(chofer.apellidos, Validators.required),
      carnet: new FormControl(chofer.carnet, Validators.required),
      tipo: new FormControl(chofer.tipo, Validators.required)
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
        const url = `/${this.user.tipo}/chofer/listar`;
        this.router.navigate([url]);
      }
    });

  }

  update() {
    this.choferService
      .update(this.choferGroup.value, this.choferGroup.value.id).subscribe(res => {
      this.openDialog(res);
    }, (error) => {
      this.openDialog(error.error);
    });
  }
}
