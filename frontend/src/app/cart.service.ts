import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product';
import { isPlatformBrowser } from '@angular/common';

export interface CartItem {
    product: Product;
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
    public items$ = this.itemsSubject.asObservable();

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    private loadCart(): CartItem[] {
        if (isPlatformBrowser(this.platformId)) {
            const saved = localStorage.getItem('cart');
            if (saved) return JSON.parse(saved);
        }
        return [];
    }

    private saveCart(items: CartItem[]) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('cart', JSON.stringify(items));
        }
        this.itemsSubject.next(items);
    }

    addToCart(product: Product, quantity: number = 1) {
        const items = this.itemsSubject.getValue();
        const existing = items.find(i => i.product.id === product.id);

        if (existing) {
            existing.quantity += quantity;
        } else {
            items.push({ product, quantity });
        }
        this.saveCart(items);
    }

    removeFromCart(productId: number) {
        let items = this.itemsSubject.getValue();
        items = items.filter(i => i.product.id !== productId);
        this.saveCart(items);
    }

    clearCart() {
        this.saveCart([]);
    }

    getCartTotal(): number {
        return this.itemsSubject.getValue().reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }
}
