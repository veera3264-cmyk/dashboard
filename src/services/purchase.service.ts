import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from '../app/models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {


  private purchaseUrl = 'http://localhost:8080/api/purchases';

  constructor(private http: HttpClient) { }



  addPurchase(purchaseData: Partial<Purchase>): Observable<Purchase> {
    return this.http.post<Purchase>(
      this.purchaseUrl,
      purchaseData 
    );
  }
  getPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.purchaseUrl);
  }
}