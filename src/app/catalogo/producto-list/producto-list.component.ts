import { Component, OnDestroy, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/catalogo.service';
import { Catalogo } from 'src/app/catalogo';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {

  catalogoList?: Catalogo[];
  producto: Catalogo = new Catalogo();
  //dtTrigger: Subject<any> = new Subject();
  //dtOptions: DataTables.Settings = {};

  constructor(private catalogoService:CatalogoService, private tostr:ToastrService) {}

  ngOnInit(): void {
    this.catalogoService.getProductos().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.catalogoList = data;
    });
    this.catalogoService.selectProducto.key=null;

    // this.catalogoService.getProductos().snapshotChanges().subscribe(item => {
    //   this.catalogoList = [];
    //   item.forEach(element => {
    //     let x = element.payload.toJSON();
    //     //x["$key"] = element.key;
    //     this.catalogoList.push(x as Catalogo);
    //     console.log(x);
    //   });
    // });
  }

  onDelete(key:any){
    if(confirm("Estas seguro que vas a eliminar este producto?")){
      this.catalogoService.deleteProducto(key);
      this.tostr.warning("El producto se ha eliminado", "Producto Eliminado");
    }
  }

  onEdit(producto:Catalogo){
    this.catalogoService.selectProducto=Object.assign({},producto);
  }

  onAdd(){
    this.catalogoService.selectProducto=new Catalogo();
    this.catalogoService.selectProducto.key=null;
  }
}
