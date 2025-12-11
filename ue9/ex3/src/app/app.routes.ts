import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list';
import { About } from './about/about';
import { ProductDetailComponent } from './product-detail/product-detail';
import { Index } from './index/index';

export const routes: Routes = [
  {'path': '', component: Index},
  {'path': 'about', component: About},
  {'path': 'product/:id', component: ProductDetailComponent},
  {'path': 'product-list', component: ProductListComponent},
];
