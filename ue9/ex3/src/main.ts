import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import globalProductList from '../assets/products.json';
import {Product} from "./app/model/product";
// now globalProductList contains the data from the json file
export class AppComponent {
 productList: Product[] = [];
 constructor() {
this.productList = globalProductList;
 }
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
