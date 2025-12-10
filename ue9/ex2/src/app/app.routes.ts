import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list';
import { ProductComponent } from './product/product';
import { Index } from './index/index';

export const routes: Routes = [
  {'path': '', component: Index},
  {'path': 'product-list', component: ProductListComponent},
];
