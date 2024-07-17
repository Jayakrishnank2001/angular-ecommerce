import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchQuery: string = '';
  cartCount: number = 0;

  constructor(
    @Inject(Router) private _router: Router,
    @Inject(CartService) private _cartService: CartService) { }

  ngOnInit(): void {
    this._cartService.getCartItems().subscribe((items) => {
      this.cartCount = items.length
    })
  }

  onSearch(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim().length > 0) {
      this._router.navigate(['/products'], { queryParams: { search: this.searchQuery } });
    }
  }
}
