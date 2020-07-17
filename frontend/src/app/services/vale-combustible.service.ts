import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValeCombustibleService {

  constructor(private http: HttpClient) {
  }

  index() {
    return this.http.get(`${environment.base}vale-combustibles`);
  }

  show(id) {
    return this.http.get(`${environment.base}vale-combustibles/${id}`);
  }

  store(form) {
    return this.http.post(`${environment.base}vale-combustibles`, form);
  }

  search(data) {
    return this.http.post(environment.base + 'vale-combustibles-search', data);
  }

  update(form, id) {
    return this.http.put(environment.base + 'vale-combustibles/' + id, form);
  }

  destroy(id) {
    return this.http.delete(environment.base + 'vale-combustibles/' + id);
  }
}
