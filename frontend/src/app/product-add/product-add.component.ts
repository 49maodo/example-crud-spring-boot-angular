import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../notification.service';

@Component({
    selector: 'app-product-add',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './product-add.component.html',
    styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {
    product: Product = {
        name: '',
        price: 0,
        description: '',
        stock: 0,
        actif: true
    };
    isEditMode = false;

    constructor(
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.productService.getProduct(+id).subscribe({
                next: (product) => {
                    if (product) {
                        this.product = product;
                    } else {
                        this.handleNotFound();
                    }
                },
                error: () => this.handleNotFound()
            });
        }
    }

    handleNotFound() {
        this.notificationService.show('Product not found', 'danger');
        this.router.navigate(['/404']);
    }

    onSubmit(form: any): void {
        if (form.invalid) {
            return;
        }
        if (this.isEditMode && this.product.id) {
            this.productService.updateProduct(this.product.id, this.product).subscribe({
                next: () => {
                    this.notificationService.show('Product updated successfully', 'success');
                    this.router.navigate(['/products']);
                },
                error: (err) => {
                    if (err.status === 409 && err.error?.error) {
                        this.notificationService.show(err.error.error, 'danger');
                    } else {
                        this.notificationService.show('An error occurred while updating the product', 'danger');
                    }
                }
            });
        } else {
            this.productService.addProduct(this.product).subscribe({
                next: () => {
                    this.notificationService.show('Product created successfully', 'success');
                    this.router.navigate(['/products']);
                },
                error: (err) => {
                    if (err.status === 409 && err.error?.error) {
                        this.notificationService.show(err.error.error, 'danger');
                    } else {
                        this.notificationService.show('An error occurred while creating the product', 'danger');
                    }
                }
            });
        }
    }
}
