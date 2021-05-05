import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SnackBarService } from '../services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private snackBarService: SnackBarService) { }
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.snackBarService.alert('You don\'t have access to this resource');
    this.router.navigate(['']);
    return false;
  }

}
