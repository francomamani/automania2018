import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {User} from '../models/user';

@Component({
  selector: 'app-servicio-general',
  templateUrl: './servicio-general.component.html',
  styleUrls: ['./servicio-general.component.css']
})
export class ServicioGeneralComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.details()
      .subscribe((user: User) => {
        this.authService.auth.next(user);
        this.user = user;
      });
  }

  logout() {
    this.authService.logout()
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

}
