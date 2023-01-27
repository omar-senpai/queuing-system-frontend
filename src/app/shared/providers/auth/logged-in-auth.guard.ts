import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuard implements CanActivate {

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('inside canActivate in logged-in-auth.guard.ts');

    return this.auth.isLoggedIn().pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          return true;
        } else {
          this.router.navigate(['/dashboard']);
          return false;
        }
      }
      ));

  }

}
