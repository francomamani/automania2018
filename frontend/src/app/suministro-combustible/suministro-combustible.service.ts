import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SuministroCombustibleService {
  headers: any = null;

  constructor(private http: HttpClient) {
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    };
  }

  index() {
    return this.http.get(environment.base + 'suministro-combustible', {
      headers: this.headers
    });
  }

  show(id) {
    return this.http.get(environment.base + 'suministro-combustible/' + id, {headers: this.headers});
  }

  store(form) {
    return this.http.post(environment.base + 'suministro-combustible', form, {headers: this.headers});
  }

  update(form, id) {
    return this.http.put(environment.base + 'suministro-combustible/' + id, form, {headers: this.headers});
  }

  destroy(id) {
    return this.http.delete(environment.base + 'suministro-combustible/' + id, {headers: this.headers});
  }
}
