import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { ProductService } from 'src/app/modules/shared/services/product.service';

export interface Category {
  description: string;
  id: number;
  name: string;
}

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  categories: Category[] = [];
  selectedFile: any;
  nameImg: string = "";
  public productForm!: FormGroup;
  estadoFormulario: string = "";
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.estadoFormulario = "Agregar";
    this.getCategories();
    this.getForm();


    if (this.data != null) {
      this.updateForm(this.data);
      this.estadoFormulario = "Actualizar";
    }

  }

  getCategories() {
    this.categoryService.getCategoris().subscribe((data: any) => {
      this.categories = data.categoryResponse.category;
    }, (error: any) => {
      console.log("error in tha checking of categoryes", error);
    })
  }


  onCancel() {
    this.dialogRef.close(3);
  }

  getForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      account: ['', Validators.required],
      category: ['', Validators.required],
      picture: ['', Validators.required]
    });
  }

  onSave() {
    let data = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      account: this.productForm.get('account')?.value,
      category: this.productForm.get('category')?.value,
      picture: this.selectedFile
    }

    const uploadProductaData = new FormData();
    uploadProductaData.append('picture', data.picture, data.picture.name);
    uploadProductaData.append('name', data.name);
    uploadProductaData.append('price', data.price);
    uploadProductaData.append('account', data.account);
    uploadProductaData.append('categoryId', data.category);

    if (this.data != null) {
      //updata the product
      this.productService.updateProduct(uploadProductaData, this.data.id)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        }, (error: any) => {
          this.dialogRef.close(2);
        })
    } else {
      //call the service to save a product
      this.productService.saveProducts(uploadProductaData)
        .subscribe((data: any) => {
          this.dialogRef.close(1);
        }, (error: any) => {
          this.dialogRef.close(2);
        })
    }




  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    this.nameImg = this.selectedFile.name;
  }

  updateForm(data: any) {
    this.productForm = this.fb.group({
      name: [data.name, Validators.required],
      price: [data.price, Validators.required],
      account: [data.account, Validators.required],
      category: [data.category.id, Validators.required],
      picture: ["", Validators.required]
    });
  }


}
