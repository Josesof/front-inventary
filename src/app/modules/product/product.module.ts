import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { ProductComponent } from './product/product.component';
import { NewProductComponent } from './product/new-product/new-product.component';
import { CarritoComponent } from '../carrito/carrito.component';



@NgModule({
  declarations: [
    ProductComponent,
    CarritoComponent,
    NewProductComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
