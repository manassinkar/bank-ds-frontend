import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(email: string, password:string)
  {
    return this.http.post<any>(`${environment.server}/login`,{ email,password}).pipe(map(user =>
      {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }));
  }

  register(name: string, password:string, contact:string, email:string,balance:Number)
  {
    return this.http.post<any>(`${environment.server}/register`,{ name,password,contact,email,balance }).pipe(map(user =>
      {
        return user;
      }));
  }

  viewProfile()
  {
    const user = localStorage.getItem('currentUser');
    const userJ = JSON.parse(user);
    const email = userJ.email;
    return this.http.get<any>(`${environment.server}/getUser?email=`+email).pipe(map(user =>
      {
        return user;
      }));
  }

  deposit(amount)
  {
    const user = localStorage.getItem('currentUser');
    const userJ = JSON.parse(user);
    const email = userJ.email;
    return this.http.post<any>(`${environment.server}/deposit`,{email,amount}).pipe(map(res =>
      {
        return res;
      }));
  }

  withdraw(amount)
  {
    const user = localStorage.getItem('currentUser');
    const userJ = JSON.parse(user);
    const email = userJ.email;
    return this.http.post<any>(`${environment.server}/withdraw`,{email,amount}).pipe(map(res =>
      {
        return res;
      }));
  }
  
  logout()
  {
    localStorage.removeItem('currentUser');
  }

}
