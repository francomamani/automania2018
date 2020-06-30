import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  headers: any = null;
  constructor(private http: HttpClient) {
      this.headers = {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + localStorage.getItem('token')
      };
  }

  index() {
      return this.http.get( environment.base + 'contratos', {
          headers: this.headers
      });
  }

  show(id) {
      return this.http.get(environment.base + 'contratos/' + id, { headers: this.headers });
  }

  store(form) {
      return this.http.post(environment.base + 'contratos', form, { headers: this.headers });
  }

  update(form, id) {
      return this.http.put( environment.base + 'contratos/' + id, form, { headers: this.headers });
  }
  destroy(id) {
      return this.http.delete( environment.base + 'contratos/' + id, { headers: this.headers });
  }
}
