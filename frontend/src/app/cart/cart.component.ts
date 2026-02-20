import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService, CartItem } from '../cart.service';
import { OrderService, OrderRequest } from '../order.service';
import { NotificationService } from '../notification.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
    cartItems: CartItem[] = [];
    total: number = 0;

    constructor(
        public cartService: CartService,
        private orderService: OrderService,
        private notificationService: NotificationService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.cartService.items$.subscribe(items => {
            this.cartItems = items;
            this.total = this.cartService.getCartTotal();
        });
    }

    removeFromCart(productId: number | undefined) {
        if (productId !== undefined) {
            this.cartService.removeFromCart(productId);
            this.notificationService.show('Article retiré du panier', 'info');
        }
    }

    checkout() {
        if (!this.authService.isAuthenticated()) {
            this.notificationService.show('Veuillez vous connecter pour valider la commande', 'warning');
            this.router.navigate(['/login']);
            return;
        }

        const request: OrderRequest = {
            lines: this.cartItems.map(item => ({
                productId: item.product.id!,
                quantity: item.quantity
            }))
        };

        this.orderService.createOrder(request).subscribe({
            next: () => {
                this.notificationService.show('Commande passée avec succès !', 'success');
                this.cartService.clearCart();
                this.router.navigate(['/products']);
            },
            error: (err) => {
                this.notificationService.show(err.error?.error || 'Échec de la validation de la commande', 'danger');
            }
        });
    }
}
