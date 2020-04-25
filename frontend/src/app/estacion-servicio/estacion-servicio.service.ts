import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class EstacionServicioService {
    headers: any = null;
    constructor(private http: HttpClient) {
        this.headers = {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        };
    }

    index() {
        return this.http.get( environment.base + 'estacion-servicios', {
            headers: this.headers
        });
    }

    show(id) {
        return this.http.get(environment.base + 'estacion-servicios/' + id, { headers: this.headers });
    }

    store(form) {
        return this.http.post(environment.base + 'estacion-servicios', form, { headers: this.headers });
    }

    update(form, id) {
        return this.http.put( environment.base + 'estacion-servicios/' + id, form, { headers: this.headers });
    }
    destroy(id) {
        return this.http.delete( environment.base + 'estacion-servicios/' + id, { headers: this.headers });
    }
}
