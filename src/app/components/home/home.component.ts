import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categories: { name: string, imageUrl: string }[] = [];

  categoryImageMap: { [key: string]: string } = {
    "electronics": '../../../assets/2106.q703.016.S.m004.c10.household appliance realistic.jpg',
    "jewelery": "../../../assets/selective-focus-closeup-diamond-rings.jpg",
    "men's clothing": "../../../assets/portrait-handsome-stylish-hipster-lambersexual-model.jpg",
    "women's clothing": "../../../assets/smiling-stylish-redhead-woman-sunglasses-standing.jpg"
  };


  constructor(@Inject(ProductService) private _productService: ProductService,
    @Inject(Router) private _router: Router) { }

  ngOnInit(): void {
    this._productService.getAllCategories().subscribe(data => {
      this.categories = data.map(category => ({
        name: category,
        imageUrl: this.categoryImageMap[category] || 'assets/default.jpg'
      }));
    });
  }

  onCategoryClick(category: string): void {
    this._router.navigate(['/products'], { queryParams: { categoryId: category } })
  }
}
