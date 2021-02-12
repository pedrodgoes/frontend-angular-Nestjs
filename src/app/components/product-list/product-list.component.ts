import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service'
import {Product} from '../../interfaces/Product'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService) { }

  products: Product[] = []

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.productService.getProducts()
    .subscribe(
      res => {this.products = res, console.log(res)},
      err => console.log(err)
          )
  }

  deleteProduct(id: string){
    this.productService.deleteProduct(id)
    .subscribe(
      res=>{
        this.getProducts()
      },
      err => console.log(err) 
    )
  }

}
