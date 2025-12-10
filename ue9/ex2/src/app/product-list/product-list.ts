import { Component, computed, signal } from '@angular/core';
import { Product } from '../model/product'; // Adjust path as needed
import { FormsModule } from '@angular/forms'; // <--- Import this for ngModel
import { ProductComponent } from '../product/product'; // <--- Import the child component
import { CommonModule } from '@angular/common';
import globalProductList from '../../../assets/products.json'; // Import JSON data

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ ProductComponent, FormsModule, CommonModule], 
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})

export class ProductListComponent {
  // 1. MAKE THIS A SIGNAL
  productList = signal<Product[]>(globalProductList);

  newId: string = '';
  newTitle: string = '';
  filterQuery = signal('');

  filteredProducts = computed(() => {
    const query = this.filterQuery().toLowerCase();
    // 2. READ THE SIGNAL
    const list = this.productList(); 

    return list.filter(product => 
      product.title.toLowerCase().includes(query)
    );
  });

  updateFilter(e: Event) {
    this.filterQuery.set((e.target as HTMLInputElement).value);
  }
  
  initiallyLiked: boolean = false;
  initiallyDisliked: boolean = false;
  errorMessage: string = ''; 

  addProduct() {
    // 3. READ SIGNAL FOR VALIDATION
    if (this.productList().some(p => p.id === this.newId)) {
      this.errorMessage = 'ID must be unique!';
      return;
    }

    const productToAdd = new Product(this.newId, this.newTitle);

    if (this.initiallyLiked) productToAdd.likes_count = 1;
    if (this.initiallyDisliked) productToAdd.dislikes_count = 1;

    // 4. UPDATE THE SIGNAL IMMUTABLY
    this.productList.update(currentList => [...currentList, productToAdd]);
    
    // Reset form state
    this.newId = '';
    this.newTitle = '';
    this.initiallyLiked = false;
    this.initiallyDisliked = false;
    this.errorMessage = '';
  }
}