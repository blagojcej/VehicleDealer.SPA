import { SaveVehicle } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getVehicle(id) {
    return this.http.get(this.baseUrl + 'vehicles/' + id)
      .pipe(res => res);
  }

  update(vehicle: SaveVehicle) {
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.put(this.baseUrl + 'vehicles/' + vehicle.id, vehicle, { headers: headers })
      .pipe(res => res);
  }

  delete(id) {
    return this.http.delete(this.baseUrl + 'vehicles/' + id)
      .pipe(res => res);
  }

  getVehicles(filter) {
    return this.http.get(this.baseUrl + 'vehicles' + '?' + this.toQueryString(filter))
      .pipe(res => res);
  }

  toQueryString(obj) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined) {
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
    }

    // console.log(obj);

    return parts.join('&');
  }
}
