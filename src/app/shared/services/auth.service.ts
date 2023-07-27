import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private token:string | null=null;
  constructor(private http: HttpClient) { }

  register(user: IUser):Observable<IUser> {
    return this.http.post<IUser>('/api/auth/register', user)
  }

  login(user: IUser):Observable<{token:string}> {
    return this.http.post<{token:string}>('/api/auth/login', user)
      .pipe(
        tap(
          ({token})=>{
            localStorage.setItem('auth-token',token)
            this.setToken(token)
          }
        )
      )
  }
  setToken(token:string | null){
    this.token=token;
  }
  getToken():any{
      return this.token;
  }
  isAuthenticated():boolean{
    return !!this.token;
  }
  logout(){
    this.setToken(null);
    localStorage.clear()
  }
  
}
