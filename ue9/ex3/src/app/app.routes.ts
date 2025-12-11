import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list';
import { About } from './about/about';
import { Index } from './index/index';

export const routes: Routes = [
  {'path': '', component: Index},
  {'path': 'about', component: About},
  {'path': 'product-list', component: ProductListComponent},
];
