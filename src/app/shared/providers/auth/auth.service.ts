import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserLoginModel } from '../../models/user-login.model';
import { EndpointsService } from '../endpoints.service';
import { UserModel } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserModel>;
    public currentUser: Observable<UserModel>;

    constructor(
        private http: HttpClient,
        private endpoints: EndpointsService,
    ) {
        this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserModel {
        return this.currentUserSubject.value;
    }

    login(userCredentials: UserLoginModel) {
        console.log(userCredentials);
        return this.endpoints.login(userCredentials).subscribe(res => {
            console.log(res);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.currentUserSubject.next(res);

            // redirect to home page
        },(error)=>{
            document.getElementById('modal-click').click();
        });
    }

    isLoggedIn() {
        console.log('inside login');
        const token = localStorage.getItem('currentUser');
        console.log('token',token);
        
        console.log('zzzzzzzzz');
        
        if (token)
            return of(this.parseJwt(token));
        return of(false);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    hasRole(role: string[]) {
        const token = localStorage.getItem('currentUser');
        if (token) {
            const userRole = this.parseJwt(token).roles;
            // check if the user has the role
            if (role.includes(userRole)) {
                return of(true);
            }
        }
        return of(false);
    }

    getUserInfo() {
        const token = localStorage.getItem('currentUser');
        if (token) {
            return this.parseJwt(token);
        }
        return null;
    }

    parseJwt(token) {
        // decode token
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };
}