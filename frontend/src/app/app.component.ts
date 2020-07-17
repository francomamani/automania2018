import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: any;

  constructor(
    public authService: AuthService,
    public router: Router) {
  }

  ngOnInit() {
    this.authService.details()
      .subscribe((user: any) => {
        this.user = user;
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
