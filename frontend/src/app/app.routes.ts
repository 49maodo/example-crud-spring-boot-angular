import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'products', component: ProductListComponent },
    { path: 'add', component: ProductAddComponent },
    { path: 'edit/:id', component: ProductAddComponent },
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
