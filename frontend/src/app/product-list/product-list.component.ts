import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../notification.service';

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

    constructor(private productService: ProductService, private notificationService: NotificationService) { }

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
                this.notificationService.show('Product deleted successfully', 'success');
                this.closeDeleteModal();
            });
        }
    }
}
