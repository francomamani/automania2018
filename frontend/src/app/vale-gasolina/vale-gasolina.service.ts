import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class ValeGasolinaService {
  headers: any = null;

  constructor(private http: HttpClient) {
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    };
  }

  index() {
    return this.http.get(environment.base + 'vale-gasolinas', {
      headers: this.headers
    });
  }

  show(id) {
    return this.http.get(environment.base + 'vale-gasolinas/' + id, {headers: this.headers});
  }

  store(form) {
    return this.http.post(environment.base + 'vale-gasolinas', form, {headers: this.headers});
  }

  search(data) {
    return this.http.post(environment.base + 'asignaciones-search', data, {headers: this.headers});
  }

  update(form, id) {
    return this.http.put(environment.base + 'vale-gasolinas/' + id, form, {headers: this.headers});
  }

  destroy(id) {
    return this.http.delete(environment.base + 'vale-gasolinas/' + id, {headers: this.headers});
  }

}
