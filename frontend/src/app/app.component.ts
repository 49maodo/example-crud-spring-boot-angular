import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterModule, CommonModule, NotificationComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'Product Management';
    cartCount$!: Observable<number>;

    constructor(public authService: AuthService, private cartService: CartService) {
        this.cartCount$ = this.cartService.items$.pipe(map(items => items.reduce((count, item) => count + item.quantity, 0)));
    }

    logout() {
        this.authService.logout();
    }
}
