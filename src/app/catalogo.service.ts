import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Catalogo } from './catalogo';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  productList: AngularFireList<Catalogo>;
  selectProducto: Catalogo = new Catalogo();

  constructor(private firebase:AngularFireDatabase) {
    this.productList = firebase.list('/catalogo');
    //this.getProductos();
  }

  getProductos(){
    //this.productList = this.firebase.list('catalogo');
    //return this.firebase.list('catalogo');
    return this.productList;

  }

  insertProducto(producto:Catalogo){
    return this.productList.push(producto);
  }

  deleteProducto(key: string){
    return this.productList.remove(key)
  }

  updateProducto(key:string, producto: Catalogo){
    // let precio = producto.precio;
    // let cantidad = producto.cantidad;
    return this.productList.update(key,{
      nombre:producto.nombre,
      categoria:producto.categoria,
      precio: producto.precio,
      cantidad: producto.cantidad,
      // total: this.precio*this.cantidad
    });
  }
}
