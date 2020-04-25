import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MantenimientoService {
    headers: any = null;
    constructor(private http: HttpClient) {
        this.headers = {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        };
    }

    index() {
        return this.http.get( environment.base + 'mantenimientos', {
            headers: this.headers
        });
    }

    show(id) {
        return this.http.get(environment.base + 'mantenimientos/' + id, { headers: this.headers });
    }

    store(form) {
        return this.http.post(environment.base + 'mantenimientos', form, { headers: this.headers });
    }

    update(form, id) {
        return this.http.put( environment.base + 'mantenimientos/' + id, form, { headers: this.headers });
    }
    destroy(id) {
        return this.http.delete( environment.base + 'mantenimientos/' + id, { headers: this.headers });
    }
}
