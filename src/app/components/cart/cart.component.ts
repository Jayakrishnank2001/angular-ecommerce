import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cartItems:Product[]=[]

  constructor(
    @Inject(CartService) private _cartService: CartService,
    @Inject(MatSnackBar) private _snackBar: MatSnackBar,
    @Inject(Router) private _router: Router) { }
  
  ngOnInit(): void {
    this._cartService.getCartItems().subscribe((items) => {
      this.cartItems=items
    })
  }

  removeFromCart(item: Product) {
    this._cartService.removeFromCart(item);
    this._snackBar.open('Product removed from cart', 'close', {
      duration: 5000,
      verticalPosition:'top'
    })
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  placeOrder():void {
    this._cartService.clearCart()
    void Swal.fire({
      title: 'Order Placed Successfully',
      icon: 'success',
      confirmButtonText: 'Continue Shopping',
      allowOutsideClick: false
    }).then(result => {
      if (result.isConfirmed) {
        this._router.navigate(['/'])
      }
    })
  }
}
