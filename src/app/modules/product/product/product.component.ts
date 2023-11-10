import { Component, Injectable, OnInit, ViewChild, inject } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewProductComponent } from './new-product/new-product.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  constructor() { }

  ngOnInit(): void {
    this.getProducts();
  }

  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions'];
  dataSource = new MatTableDataSource<ProductElement>

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
    const dataProduct: ProductElement[] = [];
    if (resp.metadata[0].code == "00") {
      let listCProduct = resp.product.products;

      listCProduct.forEach((element: ProductElement) => {
        //element.category = element.category.name;
        element.picture = element.picture ? 'data:image/jpeg;base64,' + element.picture : '';
        dataProduct.push(element);
      });

      //set the datasource
      this.dataSource = new MatTableDataSource<ProductElement>(dataProduct);
      this.dataSource.paginator = this.paginator;
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


  edit(id: number, name: string, price: number, account: number, category: any) {

    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px',
      data: { id: id, name: name, price: price, account: account, category: category }
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result == 1) {
        this.openSnackBar("Producto Actualizada", "Exitosa");
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al actualizar la producto", "Error");
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
  
 delete(id: number) {
 
   const dialogRef = this.dialog.open(ConfirmComponent, {
     width: '450px',
     data: { id: id, module: "product" }
   });
 
   dialogRef.afterClosed().subscribe((result: any) => {
 
     if (result == 1) {
       this.openSnackBar("Product Eliminado", "Exitoso");
       this.getProducts();
     } else if (result == 2) {
       this.openSnackBar("Se produjo un error al eliminar la Product", "Error");
     }
 
   });
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

