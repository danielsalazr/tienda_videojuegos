import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  productoForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router:Router,
              private toastr: ToastrService,
              private _productoService:ProductoService) { 
    this.productoForm = this.fb.group({
        titulo:['', Validators.required],
        stock:['', Validators.required],
        empresa:['', Validators.required],
        estreno:['', Validators.required],
        plataforma:['', Validators.required],
        precio:['', Validators.required],
    });
  }
  ngOnInit(): void {
  }
  
  agregarProducto(){
    console.log(this.productoForm)

    const PRODUCTO: Producto = {
      titulo: this.productoForm.get('titulo')?.value,
      stock: this.productoForm.get('stock')?.value,
      empresa: this.productoForm.get('empresa')?.value,
      estreno: this.productoForm.get('estreno')?.value,
      plataforma: this.productoForm.get('plataforma')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    console.log(PRODUCTO);
    this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
      this.router.navigate(['/']) // ir al inicio
    });

    //this.toastr.success('Hello world!', 'Toastr fun!');
    //this.router.navigate(['/']) // ir al inicio
  }
}
