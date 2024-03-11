import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/dashboard/components/home/home.component';
import { CategoryComponent } from './modules/category/components/category.component';
import { ProductComponent } from './modules/product/product/product.component';
import { CarritoComponent } from './modules/carrito/carrito.component';

export const childRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'product', component: ProductComponent },
    { path: 'carrito', component: CarritoComponent },

]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class RouterChildModule { }
