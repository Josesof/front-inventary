import { Component, Injectable, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../interfaces/product';
import { NewProductComponent } from '../product/product/new-product/new-product.component';
import { ConfirmComponent } from '../shared/components/confirm/confirm.component';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  listProducts: Product[] = [];

  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  constructor() { }

  ngOnInit(): void {
    this.getProducts();
  }



  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {

      this.processCategoriesResponse(data);
    }, (error: any) => {
      console.log("error in products: ", error);
    })
  }

  processCategoriesResponse(resp: any) {
    if (resp.metadata[0].code == "00") {
      let listCProduct = resp.product.products;

      listCProduct.forEach((element: ProductElement) => {
        //element.category = element.category.name;
        element.picture = element.picture ? 'data:image/jpeg;base64,' + element.picture : '';
        
      });

      this.listProducts = listCProduct;

    }
  }



  openProductDialog() {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result == 1) {

        this.openSnackBar("Producto add", "Exitosa");
        this.getProducts();

      } else if (result == 2) {

        this.openSnackBar("Se produjo un error al agregar la product", "Error");

      }

    });
  }


  buscar(termino: string) {

    console.log('this is termino', termino)

    if (termino.length === 0) {
      return this.getProducts();
    }
    this.productService.getProductsByName(termino).subscribe((data: any) =>{
      
      this.processCategoriesResponse(data);
      console.log('this is resp', data)
    })
  }
  


 


  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 3000
    })

  }




}



export interface ProductElement {
  id: number;
  name: string;
  price: number;
  account: number;
  category: any;
  picture: any;

}

