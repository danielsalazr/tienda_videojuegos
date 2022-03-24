
export class Producto{
    titulo:string;
    stock:number;
    empresa:string;
    estreno:string;
    plataforma:string;
    precio:number;


    constructor(titulo: string, stock: number, empresa: string, estreno: string, plataforma: string, precio:number ) {
        this.titulo = titulo;
        this.stock = stock;
        this.empresa = empresa;
        this.estreno = estreno;
        this.plataforma = plataforma;
        this.precio = precio;
    }
}