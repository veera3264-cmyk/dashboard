import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../app/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
 

  private locationUrl = 'http://localhost:8080/api/location';


  constructor(private http: HttpClient) { }

  getLocation(): Observable<Location[]> {
    return this.http.get<Location[]>(this.locationUrl);
  }
}
