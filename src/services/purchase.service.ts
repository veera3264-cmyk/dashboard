import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  getGroups() {
    throw new Error('Method not implemented.');
  }

  private purchaseUrl = 'http://localhost:8080/api/purchases';

  constructor(private http: HttpClient) {}

  getPurchases(): Observable<any> {
    return this.http.get<any>(this.purchaseUrl);
  }
  

  addPurchase(purchaseData: any): Observable<any> {
    return this.http.post<any>(
      this.purchaseUrl,
      purchaseData
    );
  }
}