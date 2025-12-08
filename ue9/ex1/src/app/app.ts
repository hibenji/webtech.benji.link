import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// We do not import RouterOutlet because you are not using it in the HTML anymore
import { Product } from './product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  // 1. Define the title
  applicationName = 'My Product Store'; 
  
  // 2. Define the products array property
  products: Product[]; 

  // 3. Initialize the data in the constructor
  constructor() {
    this.products = [
      new Product('Smartphone', ['electronic', 'mobile'], 120),
      new Product('Coffee Mug', undefined, 0),
      new Product('Notebook'),
      new Product('Smartphone2', ['Diesel', 'desktop'], 500),
    ];
  }
}