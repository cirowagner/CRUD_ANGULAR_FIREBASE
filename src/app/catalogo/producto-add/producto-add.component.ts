import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/catalogo.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { Catalogo } from 'src/app/catalogo';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrls: ['./producto-add.component.css']
})
export class ProductoAddComponent implements OnInit {

  loading = false;

  constructor(public catalogoService:CatalogoService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.catalogoService.getProductos();
    this.resetForm();
  }

  onSubmit(productosForm: NgForm){
    this.loading = true;
    if(productosForm.value.key == null){
      this.catalogoService.insertProducto(productosForm.value);
      this.toastr.success('El producto se inserto con exito', 'Producto Insertado');
      console.log(productosForm.value);
      this.loading = false;
    }else{
      this.catalogoService.updateProducto(productosForm.value.key, productosForm.value);
      this.toastr.success('El producto se actualizó con exito', 'Producto Actualizado');
      this.loading = false;
    }
    this.resetForm(productosForm);
  }

  resetForm(productosForm?: NgForm){
    if(productosForm != null){
      productosForm.reset();
      this.catalogoService.selectProducto = new Catalogo();
    }
  }
}
