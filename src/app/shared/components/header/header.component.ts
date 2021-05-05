import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../models/user';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser!: User;

  constructor(public authService: AuthService, private snackBarService: SnackBarService,
              private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
  }

  public onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.snackBarService.alert('Logged out');
  }

}
