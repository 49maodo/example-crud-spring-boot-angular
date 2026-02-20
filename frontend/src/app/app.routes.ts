import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { authGuard } from './auth.guard';
import { MyOrders } from './my-orders/my-orders';
import { AllOrders } from './all-orders/all-orders';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'cart', component: CartComponent },
    { path: 'my-orders', component: MyOrders, canActivate: [authGuard], data: { roles: ['ROLE_CLIENT', 'ROLE_ADMIN'] } },
    { path: 'all-orders', component: AllOrders, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN'] } },
    { path: 'products', component: ProductListComponent },
    { path: 'add', component: ProductAddComponent, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN'] } },
    { path: 'edit/:id', component: ProductAddComponent, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN'] } },
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
