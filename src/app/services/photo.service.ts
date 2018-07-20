import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) { }

  upload(vehicleId, photo) {
    const formData = new FormData();
    // the key must be the same with the parameter name in backend action
    formData.append('file', photo);
    return this.http.post(`${this.baseUrl}vehicles/${vehicleId}/photos`, formData)
      .pipe(res => res);
  }

  getPhotos(vehicleId) {
    return this.http.get(`${this.baseUrl}vehicles/${vehicleId}/photos`)
      .pipe(res => res);
  }

}
