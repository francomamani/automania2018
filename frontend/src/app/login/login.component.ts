import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AuthService} from '../auth.service';
import {MensajeDialogComponent} from '../mensaje-dialog/mensaje-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginGroup: FormGroup;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) {

    if (this.authService.isAuthenticated()) {
      router.navigate(['usuario']);
    }

    this.createForm();
  }

  ngOnInit() {
  }

  openDialog(res) {
    const dialogRef = this.dialog.open(MensajeDialogComponent, {
      width: '400px',
      data: {
        info: res.mensaje,
        has_action: false
      }
    });

    dialogRef.afterClosed().subscribe(response => {
    });
  }

  createForm() {
    this.loginGroup = this.fb.group({
      'cuenta': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  login() {
    this.authService.authenticate(this.loginGroup.value)
      .subscribe((res: any) => {
        if (res.autenticado) {
          console.log(res.token);
          localStorage.setItem('token', res.token);
          localStorage.setItem('user_id', res.user_id);
          this.router.navigate(['usuario']);
        }
      }, (error: any) => {
        console.log(error);
        this.openDialog(error.error);
        this.loginGroup.reset();
      });
  }

}
