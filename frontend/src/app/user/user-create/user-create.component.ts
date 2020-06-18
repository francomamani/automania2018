import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  hide = true;
  userGroup: FormGroup;
  tipoUsuario = [
    {key: 'administrador', value: 'Administrador'},
    {key: 'servicio_general', value: 'Servicio General'}
  ];

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.userGroup = this.fb.group({
      tipo_usuario: new FormControl('', Validators.required),
      nombres: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      cuenta: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      carnet: new FormControl('', Validators.required)
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
        this.router.navigate(['/usuario/listar']);
      }
    });
  }

  store() {
    this.userService.store(this.userGroup.value).subscribe(res => {
      this.openDialog(res);
    });
  }
}
