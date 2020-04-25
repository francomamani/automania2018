import { Component } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(
        protected authService: AuthService,
        private router: Router) {  }

    logout() {
        this.authService.logout();
        this.router.navigate(['']);
/*        this.authService.logout()
            .subscribe((res: any) => {
                if (res.deslogueo) {
                    localStorage.removeItem('token');
                    this.router.navigate(['']);
                }
            }, (error: any) => {
                console.log(error.error.mensaje);
            });*/
    }
}
