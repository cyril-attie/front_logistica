import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router : Router) {}
  canActivate() : boolean {
    let token : string | null = localStorage.getItem('token_almacen');
    console.log(token);
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
