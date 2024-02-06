import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//const base_url = "http://localhost:8080/api/v1";
const base_url = "https://springboot-app-405905.rj.r.appspot.com/api/v1";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * get the products
   */
  getProducts(){
    const endpoint = `${base_url}/products`;
    return this.http.get(endpoint);
}

 /**
 * save the products
 */
saveProducts(body: any){
  const endpoint = `${base_url}/products`;
  return this.http.post(endpoint, body);
}

/**
 * update  products
 */
updateProduct(body: any, id:any){
  const endpoint = `${base_url}/products/ ${id}`;
  return this.http.put(endpoint, body);
}


/**
 * delete  products
 */
deleteProduct(id:any){
  const endpoint = `${base_url}/products/${id}`;
  return this.http.delete(endpoint);
}

 /**
 * get by id  products
 */
 getProductsById(id:any){
  const endpoint = `${base_url}/products/ ${id}`;
  return this.http.delete(endpoint);
}

 /**
 * get by name  products
 */
 getProductsByName(name:any){
  const endpoint = `${base_url}/products/for/${name}`;
  return this.http.get(endpoint);
}


}
