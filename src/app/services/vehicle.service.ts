import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  baseUrl: string = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  getMakes() {
    return this.http.get(this.baseUrl + 'makes')
      .pipe(map(res => res));
  }

  getFeatures() {
    return this.http.get(this.baseUrl + 'features')
      .pipe(map(res => res));
  }

}
