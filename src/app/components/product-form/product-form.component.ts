import { Component, OnInit } from '@angular/core';
import {Product} from '../../interfaces/Product'
import {ProductService} from '../../services/product.service'
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: Product ={
    name: '',
    description: '',
    price: 0,
    imageURL: ''
  }

  edit: boolean = false

  constructor(
    private productSerice: ProductService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activateRoute.snapshot.params

    if(params.id){
      this.productSerice.getProduct(params.id)
      .subscribe(
        res => {
          console.log(res)
          this.product = res
          this.edit = true
        },
        err => console.log(err)
      )
    }
  }

  submitProduct(){
    this.productSerice.createProduct(this.product)
    .subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/'])
      },
      err => console.log(err)
    )
  }

  updateProduct(){
    delete this.product.createAt
    this.productSerice.updateProduct(this.product.name, this.product)
    .subscribe(
      res =>{
        console.log(res)
        this.router.navigate(['/product'])
      },
      err => console.log(err)
    )
  }


}
