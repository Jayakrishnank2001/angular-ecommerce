import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  getAllCategories():Observable<string[]> {
    return this._http.get<string[]>('https://fakestoreapi.com/products/categories')
  }

  getProductsByCategory(categoryId:string):Observable<Product[]> {
    return this._http.get<Product[]>(`https://fakestoreapi.com/products/category/${categoryId}`)
  }

  getProductById(productId: string): Observable<Product>{
    return this._http.get<Product>(`https://fakestoreapi.com/products/${productId}`)
  }

}
