import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  index() {
    return this.http.get(environment.base + 'users');
  }

  show(id) {
    return this.http.get(environment.base + 'users/' + id);
  }

  store(form) {
    return this.http.post(environment.base + 'create-user', form);
  }

  update(form, id) {
    return this.http.put(environment.base + 'users/' + id, form);
  }

  destroy(id) {
    return this.http.delete(environment.base + 'users/' + id);
  }
}
