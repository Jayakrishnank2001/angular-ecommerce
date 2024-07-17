import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private _http: HttpClient) { }

  getAllCategories(): Observable<string[]> {
    return this._http.get<string[]>(`${this.apiUrl}/categories`)
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.apiUrl}/category/${categoryId}`)
  }

  getProductById(productId: string): Observable<Product> {
    return this._http.get<Product>(`${this.apiUrl}/${productId}`)
  }

  searchProducts(query: string): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.apiUrl}`).pipe(
      map(products => {
        return products.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
  }

}
