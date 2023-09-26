import { Component, Injectable, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { createInjectableType } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from './new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {


  private categoryService = inject(CategoryService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);



  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>

  getCategories(): void {
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
        console.log("This is data :", element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
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

  edit(id:number, name:string, description:string){
  
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      data:{id: id, name: name, description: description}
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
  clickEvent() {
    console.log("djshjdjjdjdjdjddj");
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
