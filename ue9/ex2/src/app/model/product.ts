export class Product {
  // ID and Name are required
  id: string;
  title: string;

  // Likes, Dislikes, and Tags are part of the product definition
  // Initialize them to 0 or empty arrays to avoid 'undefined' errors
  likes_count: number;
  dislikes_count: number;
  tags?: string[];
  
  constructor(id: string, title: string) {
      this.id = id;
      this.title = title;
      this.likes_count = 0;
      this.dislikes_count = 0;
      this.tags = [];
  }
}