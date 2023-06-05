import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router : Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot) : boolean {

      const pantallaLogin = route.data.pantallaLogin;
      let token : string | null = localStorage.getItem('token_almacen');
      
      //Si es la pantalla de login debera funcionara la inversa
      if (pantallaLogin) {
        if (!token) {
          return true;
        } else {
          this.router.navigate(['/pedidos']);
          return false;
        }
      }

      if (!token) {
        this.router.navigate(['/login']);
        return false;
      }
      
      return true;
  }

}
