import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1";
//const base_url = "https://springboot-app-405905.rj.r.appspot.com/api/v1";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
 
  /**
   * get the categories
   */
  getCategoris(){
      const endpoint = `${base_url}/categories`;
      return this.http.get(endpoint);
  }

   /**
   * save the categories
   */
  saveCategorie(body: any){
    const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint, body);
  }

  /**
   * update  categories
   */
  updateCateorie(body: any, id:any){
    const endpoint = `${base_url}/categories/ ${id}`;
    return this.http.put(endpoint, body);
  }

  
  /**
   * delete  categories
   */
  deleteCateorie(id:any){
    const endpoint = `${base_url}/categories/ ${id}`;
    return this.http.delete(endpoint);
  }

   /**
   * get by id  categories
   */
   getCateorieById(id:any){
    const endpoint = `${base_url}/categories/ ${id}`;
    return this.http.delete(endpoint);
  }

   /**
   * get by name  categories
   */
   getCateorieByName(name:any){
        const endpoint = `${base_url}/categories/for/${name}`;
    return this.http.get(endpoint);
  }

     /**
   * export excel
   */
     exportCategories(){
      const endpoint = `${base_url}/categories/export/excel`;
      return this.http.get(endpoint, {
        responseType: 'blob'
      });
    }


}
