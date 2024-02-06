import { Component, Injectable, OnInit, ViewChild, inject } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { createInjectableType } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from './new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  private categoryService = inject(CategoryService);  
  private utilService = inject(UtilService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  isAdmin: any;



  ngOnInit(): void {
    this.getCategories();
    this.isAdmin = this.utilService.isAdmin()
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getCategories() {
    this.categoryService.getCategoris().subscribe((data: any) => {
      console.log("request categories : ", data);
      this.processCategoriesResponse(data);
    }, (error: any) => {
      console.log("error: ", error);
    })
  }

  processCategoriesResponse(resp: any) {
    const dataCategory: CategoryElement[] = [];
    if (resp.metadata[0].code == "00") {
      let listCategory = resp.categoryResponse.category;
      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
      this.dataSource.paginator = this.paginator;
    }
  }


  openCategoryDialog() {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result == 1) {

        this.openSnackBar("Categoria Agregada", "Exitosa");
        this.getCategories();

      } else if (result == 2) {

        this.openSnackBar("Se produjo un error al agregar la categoria", "Error");

      }

    });
  }

  edit(id: number, name: string, description: string) {

    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px',
      data: { id: id, name: name, description: description }
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result == 1) {
        this.openSnackBar("Categoria Actualizada", "Exitosa");
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al actualizar la categoria", "Error");
      }

    });
  }

  delete(id: number) {

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: { id: id, module: "category" }
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result == 1) {
        this.openSnackBar("Categoria Eliminada", "Exitosa");
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar la categoria", "Error");
      }

    });
  }

  buscar(termino: string) {

    console.log('this is termino', termino)

    if (termino.length === 0) {
      return this.getCategories();
    }
    this.categoryService.getCateorieByName(termino).subscribe((data: any) =>{      
      this.processCategoriesResponse(data);
    })
  }

  exportExcel() {

    this.categoryService.exportCategories().subscribe((data:any) => {
      let file = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreasheetml.sheet'});
      let fileUrl = URL.createObjectURL(file);
      var anchor = document.createElement("a");
      anchor.download = "categories.xlsx";
      anchor.href = fileUrl;
      anchor.click();

      this.openSnackBar("Archivo exportado correctamente", "Exitosa");

    }, (error: any) => {
      this.openSnackBar("No se  exporto el archivo correctamente", "Error");
    })
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 3000
    })

  }

}


export interface CategoryElement {
  description: string;
  id: number;
  name: string;
}
