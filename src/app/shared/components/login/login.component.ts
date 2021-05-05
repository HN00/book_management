import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private snackBarService: SnackBarService, private router: Router) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/books']);
    }
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const user = Object.assign({}, this.loginForm.value);
    this.authService.login(user)
      .subscribe(next => {
        this.router.navigate(['/books']);
        this.snackBarService.alert('Logged in successfully');
      }, 
      error => {
        this.snackBarService.alert('Logged in failed');
      });
  }
  

}
