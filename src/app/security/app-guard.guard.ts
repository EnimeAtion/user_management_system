import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
import { LoginHomeComponent } from '../login/login-home/login-home.component';

@Injectable({
  providedIn: 'root'
})
export class AppGuardGuard implements CanActivate {
  constructor(private user: UsersService, private router: Router, private isLogged: LoginHomeComponent) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.user.isLoggedIn()){

        return true;
      }else {

        this.router.navigate(['sign-in']);
        return false; 
      }

  }

}
