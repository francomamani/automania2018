import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService {

  base = environment.base;

  constructor(private http: HttpClient) {
  }

  index() {
    return this.http.get(`${this.base}tipo-vehiculos`);
  }
}
