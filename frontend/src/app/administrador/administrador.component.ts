import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {User} from '../models/user';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  user: User = null;

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
      .subscribe((response) => {
        this.router.navigate(['/']);
      });
  }
}
