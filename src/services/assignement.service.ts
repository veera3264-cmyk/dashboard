import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from '../app/models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private http = inject(HttpClient);

  private readonly apiUrl = '/api/assignments';

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