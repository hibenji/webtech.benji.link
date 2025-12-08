export class Product {
  name: string;
  tags?: string[]; // Optional list of strings
  likes?: number;  // Optional number

  // We add a constructor to make creating new Products easier
  constructor(name: string, tags?: string[], likes?: number) {
    this.name = name;
    this.tags = tags;
    this.likes = likes;
  }
}