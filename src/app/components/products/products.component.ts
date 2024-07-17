import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  categoryId!: string | null
  products: Product[] = [];

  constructor(
    @Inject(ActivatedRoute) private _route: ActivatedRoute,
    @Inject(ProductService) private _productService: ProductService,
    @Inject(Router) private _router: Router) { }

  ngOnInit(): void {
    this._route.queryParamMap.subscribe((params) => {
      this.categoryId = params.get('categoryId')
    })

    if (this.categoryId) {
      this._productService.getProductsByCategory(this.categoryId).subscribe((data) => {
        this.products = data
        console.log(this.products)
      })
    }
  }

  getProduct(productId: number | undefined): void {
    this._router.navigate(['/product'], { queryParams: { productId: productId } })
  }


}
