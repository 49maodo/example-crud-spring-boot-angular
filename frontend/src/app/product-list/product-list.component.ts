import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../notification.service';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];
    showDeleteModal = false;
    productIdToDelete: number | null = null;

    constructor(
        private productService: ProductService,
        private notificationService: NotificationService,
        public authService: AuthService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts(): void {
        this.productService.getProducts().subscribe(products => this.products = products);
    }

    openDeleteModal(id: number | undefined): void {
        if (id) {
            this.productIdToDelete = id;
            this.showDeleteModal = true;
        }
    }

    closeDeleteModal(): void {
        this.showDeleteModal = false;
        this.productIdToDelete = null;
    }

    confirmDelete(): void {
        if (this.productIdToDelete) {
            this.productService.deleteProduct(this.productIdToDelete).subscribe(() => {
                this.products = this.products.filter(p => p.id !== this.productIdToDelete);
                this.notificationService.show('Produit supprimé avec succès', 'success');
                this.closeDeleteModal();
            });
        }
    }

    addToCart(product: Product): void {
        const stock = product.stock || 0;
        if (stock > 0 && product.actif) {
            this.cartService.addToCart(product, 1);
            this.notificationService.show(`${product.name} ajouté au panier !`, 'success');
        } else {
            this.notificationService.show('Ce produit est en rupture de stock ou inactif.', 'warning');
        }
    }
}
