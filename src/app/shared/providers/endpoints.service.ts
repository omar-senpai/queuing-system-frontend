import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment";
import { CreateUserModel } from "../models/create-user.model";
import { UserLoginModel } from "../models/user-login.model";


@Injectable({ providedIn: 'root' })
export class EndpointsService {
    constructor(
        private http: HttpClient,
    ) { }

    baseUrl = environment.apiEndpoint;

    login(user: UserLoginModel) {
        return this.http.post<any>(`${this.baseUrl}/auth`, user)
            .pipe(map(user => {
                return user;
            }));
    }

    register(user: CreateUserModel) {
        return this.http.post<any>(`${this.baseUrl}/users`, user)
            .pipe(map(user => {
                return user;
            }));
    }

}