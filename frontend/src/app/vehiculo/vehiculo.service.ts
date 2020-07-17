import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class VehiculoService {
  headers: any = null;

  constructor(private http: HttpClient) {
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    };
  }

  index() {
    return this.http.get(environment.base + 'vehiculos', {
      headers: this.headers
    });
  }

  suministroCombustibles(vehiculo_id: number) {
    return this.http.get(`${environment.base}suministro-combustibles/${vehiculo_id}`);
  }

  show(id) {
    return this.http.get(environment.base + 'vehiculos/' + id, {headers: this.headers});
  }

  store(form) {
    return this.http.post(environment.base + 'vehiculos', form, {headers: this.headers});
  }

  update(form, id) {
    return this.http.put(environment.base + 'vehiculos/' + id, form, {headers: this.headers});
  }

  destroy(id) {
    return this.http.delete(environment.base + 'vehiculos/' + id, {headers: this.headers});
  }
}
