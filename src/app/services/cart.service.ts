import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);

  constructor() { }

  getCartItems(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product): Observable<boolean> {
    const currentCartItems = this.cartSubject.getValue();
    const existingItem = currentCartItems.find(item => item.id === product.id);

    if (!existingItem) {
      product.quantity = 1;
      const updatedCartItems = [...currentCartItems, product];
      this.cartItems = updatedCartItems;
      this.cartSubject.next(updatedCartItems);
      return new Observable<boolean>(observer => {
        observer.next(true);
        observer.complete();
      });
    } else {
      return new Observable<boolean>(observer => {
        observer.next(false);
        observer.complete();
      });
    }
  }

  removeFromCart(product: Product): void {
    const updatedCartItems = this.cartItems.filter(item => item.id !== product.id);
    this.cartItems = updatedCartItems;
    this.cartSubject.next(updatedCartItems);
  }

  increaseQuantity(product: Product): void {
    const selectedItem = this.cartItems.find(item => item.id === product.id);
    if (selectedItem) {
      selectedItem.quantity++;
      this.updateCart();
    }
  }

  decreaseQuantity(product: Product): void {
    const selectedItem = this.cartItems.find(item => item.id === product.id);
    if (selectedItem && selectedItem.quantity > 1) {
      selectedItem.quantity--;
      this.updateCart();
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next([]);
  }

  private updateCart(): void {
    this.cartSubject.next([...this.cartItems]);
  }
}
