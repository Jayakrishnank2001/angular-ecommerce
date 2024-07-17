import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  categoryId!: string | null
  products: Product[] = [];
  searchQuery: string = '';

  constructor(
    @Inject(ActivatedRoute) private _route: ActivatedRoute,
    @Inject(ProductService) private _productService: ProductService,
    @Inject(Router) private _router: Router,
    @Inject(CartService) private _cartService: CartService,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._route.queryParamMap.subscribe((params) => {
      this.categoryId = params.get('categoryId')
      this.searchQuery = params.get('search') || '';
      if (this.searchQuery.length > 0) {
        this.searchProducts(this.searchQuery);
      } else {
        this.getProducts()
      }
    })
  }

  getProducts() {
    if (this.categoryId) {
      this._productService.getProductsByCategory(this.categoryId).subscribe((products) => {
        this.products = products
      })
    }
  }

  getProduct(productId: number | undefined): void {
    this._router.navigate(['/product'], { queryParams: { productId: productId } })
  }

  addToCart(product: Product) {
    this._cartService.addToCart(product).subscribe((data) => {
      if (data === true) {
        this._snackBar.open('Product added to cart', 'Close', {
          duration: 5000,
          verticalPosition: 'top'
        })
      } else {
        this._snackBar.open('Product already in cart', 'Close', {
          duration: 5000,
          verticalPosition: 'top'
        })
      }
    })

  }

  searchProducts(query: string): void {
    this._productService.searchProducts(query).subscribe(products => {
      this.products = products;
    });
  }


}
