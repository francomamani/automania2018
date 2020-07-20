import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MensajeDialogComponent} from '../../mensaje-dialog/mensaje-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../models/user';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userAuth: User;
  userGroup: FormGroup;
  user: any = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog) {

    route.params.subscribe(res => {
      userService.show(res.id).subscribe(user => {
        this.user = user;
        this.createForm(user);
      });
    });
  }

  ngOnInit() {
    this.authService.auth$
      .subscribe((user: User) => {
        this.user = user;
      })
  }

  createForm(user) {
    this.userGroup = this.fb.group({
      id: new FormControl(user.id, Validators.required),
      nombres: new FormControl(user.nombres, Validators.required),
      apellidos: new FormControl(user.apellidos, Validators.required),
      cuenta: new FormControl(user.cuenta, Validators.required),
      carnet: new FormControl(user.carnet, Validators.required)
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
        const url = `/${this.userAuth.tipo}/usuario/listar`;
        this.router.navigate([url]);
      }
    });

  }

  update() {
    this.userService
      .update(this.userGroup.value, this.userGroup.value.id)
      .subscribe(res => {
        this.openDialog(res);
      }, (error) => {
        this.openDialog(error.error);
      });
  }
}
