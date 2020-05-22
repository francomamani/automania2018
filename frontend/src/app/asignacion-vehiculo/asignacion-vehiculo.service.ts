import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AsignacionVehiculoService {
  headers: any = null;

  constructor(private http: HttpClient) {
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    };
  }

  index() {
    return this.http.get(environment.base + 'asignacion_vehiculos', {
      headers: this.headers
    });
  }

  show(id) {
    return this.http.get(environment.base + 'asignacion_vehiculos/' + id, {headers: this.headers});
  }

  store(form) {
    return this.http.post(environment.base + 'asignacion_vehiculos', form, {headers: this.headers});
  }

  update(form, id) {
    return this.http.put(environment.base + 'asignacion_vehiculos/' + id, form, {headers: this.headers});
  }

  destroy(id) {
    return this.http.delete(environment.base + 'asignacion_vehiculos/' + id, {headers: this.headers});
  }
}
