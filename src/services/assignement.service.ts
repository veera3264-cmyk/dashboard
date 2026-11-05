import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from '../app/models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private http = inject(HttpClient);

  // Use your actual Spring Boot base URL
  private readonly apiUrl = 'http://localhost:8080/assignments';

  triggerAssignment(): Observable<Purchase[]> {
    return this.http.post<Purchase[]>(
      `${this.apiUrl}/auto-assign`,
      {}
    );
  }

  getMyAssignments(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(
      `${this.apiUrl}/my-purchases`
    );
  }
}