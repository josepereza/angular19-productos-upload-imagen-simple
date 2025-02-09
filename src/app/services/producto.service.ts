import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/products'; 
  constructor() { }
  httpService=inject(HttpClient)

  getProductos(){
    return this.httpService.get(this.apiUrl)
  }

  
}
