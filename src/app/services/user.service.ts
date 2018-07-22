import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'https://blagojcej.eu.auth0.com/';

  constructor(private http: HttpClient) { }

  getProfile() {
    if (localStorage.getItem('access_token')) {
      const headers = new HttpHeaders();
      const accessToken = localStorage.getItem('access_token');
      headers.set('Authorization', 'Bearer ' + accessToken);
      return this.http.get(`${this.baseUrl}userinfo`, { headers: headers })
        .pipe(map(res => res));
    }
  }

}
