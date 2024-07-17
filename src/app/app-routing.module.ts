import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent
  },
  {
    path: 'products',
    title: 'Products',
    component: ProductsComponent
  },
  {
    path: 'product',
    title: 'Product',
    component: ProductComponent
  },
  {
    path: 'cart',
    title: 'Cart',
    component: CartComponent
  },
  {
    path: 'profile',
    title: 'Profile',
    component: ProfileComponent
  },
  {
    path: '**',
    title: 'Page Not Found',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
