import { HttpClient,HttpHeaders } from "@angular/common/http";
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
     headers = new HttpHeaders({
        'Host': 'api'
      })

    login(user: UserLoginModel) {
        return this.http.post<any>(`${this.baseUrl}/auth`, user,{headers:this.headers})
            .pipe(map(user => {
                return user;
            }));
    }

    register(user: CreateUserModel) {
        return this.http.post<any>(`${this.baseUrl}/users`, user,{headers:this.headers})
            .pipe(map(user => {
                return user;
            }));
    }

    addUserToQueue(body:any){
        return this.http.post<any>(`${this.baseUrl}/queue`, body,{headers:this.headers})
        .pipe(map(result => {
            return result;
        }));
        

    }
    getNumberDetails(id:any) {
        return this.http.get<any>(`${this.baseUrl}/queue/${id}`,{headers:this.headers})
            .pipe(map(result => {
                return result.filter(res => res.isActive == true);
            }));
    }

    deactivateNumber(id:any){
        return this.http.post<any>(`${this.baseUrl}/queue/${id}`,'',{headers:this.headers})
        .pipe(map(result => {
            return result;
        }));

    }

}