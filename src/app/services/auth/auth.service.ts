import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN'
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false)
  private routerService = inject(Router)
  apiUrl = "http://localhost:60805"
  private http = inject(HttpClient);
  constructor() { }

  login(user: { mail: string, password: string }): Observable<any> {
    return this.http.post(this.apiUrl + '/api/Auth/Login', user)
      .pipe(
        tap((response: any) => this.doLoginUser(user.mail, response.accessToken.token))
      );
  }
  private doLoginUser(mail: string, token: any) {
    this.loggedUser = mail;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.routerService.navigate(['/login']);
  }

  isLoggedIn(){
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  getUserIdFromToken(): string | null {
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
    }
    return null;
  }

  getUserFromId(userId:any){
    return this.http.get(this.apiUrl+`/api/Users/${userId}`)
  }

  register(user: { mail: string, password: string }): Observable<any>{
    return this.http.post<any>(this.apiUrl+ `/api/Auth/Register`, user)
  }
}
