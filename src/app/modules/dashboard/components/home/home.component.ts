import { Component, OnInit ,  inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js';
import { NewProductComponent } from 'src/app/modules/product/product/new-product/new-product.component';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { ProductService } from 'src/app/modules/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  chartBar: any;
  charDoughnut: any;
  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);


  ngOnInit(): void {   
    this.  getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {

      this.processCategoriesResponse(data);
    }, (error: any) => {
      console.log("error in products: ", error);
    })
  }

  processCategoriesResponse(resp: any) {
   const nameProduct: String [] = [];
   const account: number [] = [];

    if (resp.metadata[0].code == "00") {
      let listCProduct = resp.product.products;

      listCProduct.forEach((element: ProductElement) => {
         nameProduct.push(element.name);
         account.push(element.account);
      });

      //Grafico barras
      this.chartBar = new Chart('canvas-bar', {
        type: 'bar',
        data:{
          labels:nameProduct,
          datasets: [
            {label: 'Productos', data:account}
          ]
        }
      });

      //Grafico doughnut
      this.charDoughnut = new Chart('canvas-doughnut', {
        type: 'doughnut',
        data:{
          labels:nameProduct,
          datasets: [
            {label: 'Productos', data:account}
          ]
        }
      });

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
