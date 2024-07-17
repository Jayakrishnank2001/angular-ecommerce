import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productId!: string | null
  product!: Product

  constructor(
    @Inject(ActivatedRoute) private _route: ActivatedRoute,
    @Inject(ProductService) private _productService: ProductService,
    @Inject(CartService) private _cartService: CartService,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._route.queryParamMap.subscribe((params) => {
      this.productId = params.get('productId')
    })

    if (this.productId) {
      this._productService.getProductById(this.productId).subscribe((data) => {
        this.product = data
        console.log(this.product)
      })
    }
  }

  addToCart(product: Product) {
    this._cartService.addToCart(product);
    this._snackBar.open('Product added to cart', 'Close', {
      duration: 5000,
      verticalPosition: 'top'
    })
  }



}
