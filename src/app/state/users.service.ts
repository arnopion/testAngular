import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../shared/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
    constructor(private http: HttpClient) { }

    getUsers(): Observable<Array<User>> {
        return this.http
            .get<{ items: User[] }>(
                'http://localhost:8080/api/v1/users'
            )
            .pipe(map((users) => users.items || []));
    }
}