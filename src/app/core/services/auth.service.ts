import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiUrl}/auths`;
  public currentUser!: User;

  constructor(private http: HttpClient) { }

  login(model: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/login`, model)
      .pipe(
        share(),
        map(
          (response: any) => {
            const userToken = response;
            if (userToken) {
              localStorage.setItem('token', userToken.token);
              localStorage.setItem('user', JSON.stringify(userToken.user));
              this.currentUser = userToken.user;
            }
          }
        )
      );
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

}
