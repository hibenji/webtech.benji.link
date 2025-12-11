import { Component, Input } from '@angular/core';
import { Product } from '../model/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class ProductComponent {
  @Input() product!: Product; // 

  // Logic to handle button clicks 
  like() {
    this.product.likes_count++;
  }

  dislike() {
    this.product.dislikes_count++;
  }

  // Calculate number of stars 
  get starCount(): number {
    const L = this.product.likes_count;
    const D = this.product.dislikes_count;
    if (L + D === 0) return 0;
    
    // Formula: L / (L+D)
    const ratio = L / (L + D);
    
    // Interval of 0.2 means 5 stars (1 / 0.2 = 5)
    return Math.round(ratio / 0.2); 
  }
  
  // Create an array to iterate over in the template (e.g., [1, 2, 3])
  get starsArray(): number[] {
      return Array(this.starCount).fill(0);
  }
}