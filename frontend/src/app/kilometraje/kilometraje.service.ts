import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class KilometrajeService {
  headers: any = null;

  constructor(private http: HttpClient) {
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    };
  }

  index() {
    return this.http.get(environment.base + 'kilometraje', {
      headers: this.headers
    });
  }

  show(id) {
    return this.http.get(environment.base + 'kilometraje/' + id, {headers: this.headers});
  }

  store(form) {
    return this.http.post(environment.base + 'kilometraje', form, {headers: this.headers});
  }

  update(form, id) {
    return this.http.put(environment.base + 'kilometraje/' + id, form, {headers: this.headers});
  }

  destroy(id) {
    return this.http.delete(environment.base + 'kilometraje/' + id, {headers: this.headers});
  }

  getKilometraje(suministro_combustible_id: number) {
    return this.http.get(environment.base + 'get-kilometraje/' + suministro_combustible_id, {headers: this.headers});
  }
}
