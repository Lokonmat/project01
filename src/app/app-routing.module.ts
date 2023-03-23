import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { HomeComponent } from './home/home.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product-list/product/product.component';

const routes: Routes = [
  {path : '', component: HomeComponent},
  {path : 'products/create', component: ProductCreateComponent},
  {path : 'categories/create', component: CategoryCreateComponent},
  {path : 'products', component: ProductListComponent},
  {path : 'products/:productId', component: ProductComponent},
  {path : 'products/category/:categoryId', component: ProductListComponent},
  {path : 'auth', component: AuthComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
