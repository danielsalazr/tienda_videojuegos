import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url ='http://localhost:3002/juegos';
  url2 = 'http://localhost:3002/crearJuego';

  constructor(private http:HttpClient) { }

    getProductos(): Observable<any>{
      return this.http.get(this.url);
    }

    guardarProducto(producto: Producto): Observable<any> {
      return this.http.post(this.url2, producto);
    }
  
}
