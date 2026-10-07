import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private locationUrl = 'http://localhost:8080/api/locations';

  constructor(private http: HttpClient) { }

  getLocation(): Observable<any[]> {
    return this.http.get<any[]>(this.locationUrl);
  }
  getGroups(): Observable<any> {
    return this.http.get<any>(this.locationUrl)
  }
}
