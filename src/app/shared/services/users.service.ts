import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Rapport } from '../model/report.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
    constructor(private http: HttpClient) { }

    getUsers(): Observable<Array<Rapport>> {
        return this.http.get<Rapport[]>('http://localhost:8080/api/v1/users');
    }
}