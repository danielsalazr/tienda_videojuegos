import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ListarJuegosComponent} from './components/listar-juegos/listar-juegos.component';
import {CrearProductoComponent} from './components/crear-producto/crear-producto.component';

const routes: Routes = [
  {path:'', component:ListarJuegosComponent,},
  {path:'crear-producto', component :CrearProductoComponent, },
  {path: 'editar-producto/:id', component: CrearProductoComponent},
  {path:'**', redirectTo:'',pathMatch:'full'}, // con esta linea redireccionamos a la raiz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
