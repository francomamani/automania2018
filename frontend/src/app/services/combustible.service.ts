import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CombustibleService {

  base = environment.base;

  constructor(private http: HttpClient) {
  }

  index() {
    return this.http.get(`${this.base}combustibles`);
  }

  lastCombustible(suministro_combustible_id: number) {
    return this.http.get(`${this.base}last-combustible/${suministro_combustible_id}`);
  }

}
