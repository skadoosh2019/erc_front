import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class GuestGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   if (this.auth.isLoggedIn()) {
    console.log('BLOCKED BY GUEST GUARd');
      this.router.navigate(['/admin/contract']);
      return false;
    } else {
      console.log('GUEST GUARd GO');
      // this.router.navigate(['/login']);
      return true;
    }
  }
}
