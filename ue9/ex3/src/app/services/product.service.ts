import { Injectable } from '@angular/core';
import globalProductList from '../../../assets/products.json'; // Import JSON data
import { Product } from '../model/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = globalProductList as Product[];

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  // Optional: expose all products
  getAll(): Product[] {
    return this.products;
  }
}
