import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RequestOptions, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  baseUrl = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  private requestOptions() {
    const headers = new Headers({ 'Content-type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }

  getMakes() {
    return this.http.get(this.baseUrl + 'makes')
      .pipe(res => res);
  }

  getFeatures() {
    return this.http.get(this.baseUrl + 'features')
      .pipe(res => res);
  }

  create(vehicle) {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post(this.baseUrl + 'vehicles', vehicle, { headers: headers })
      .pipe(res => res);
  }

}
