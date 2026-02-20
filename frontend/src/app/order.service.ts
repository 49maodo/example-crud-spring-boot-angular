import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderLineRequest {
    productId: number;
    quantity: number;
}

export interface OrderRequest {
    lines: OrderLineRequest[];
}

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = 'http://localhost:8080/api/orders';

    constructor(private http: HttpClient) { }

    createOrder(request: OrderRequest): Observable<any> {
        return this.http.post(this.apiUrl, request);
    }

    getMyOrders(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/my-orders`);
    }

    getAllOrders(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
}
