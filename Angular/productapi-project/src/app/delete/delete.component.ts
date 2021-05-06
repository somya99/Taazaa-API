import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { Product } from '../product';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  product : Product;
  
  productForm : FormGroup;
   
  constructor(private router : Router, private appservice : AppService) {
    
   }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      id : new FormControl(this.product?.id, [Validators.required])
      
    });  
  }
  deleteProduct(){
    let prodToDelete = {
      id: this.productForm.get("id")?.value,

    }
    
    this.appservice.deleteProducts(prodToDelete.id).subscribe(
    data=>{​​​​​​​​
    console.log(data);
    }​​​​​​​​);
    alert("Product Deleted Successfully !");
    // let product : Product = {...this.productForm.value};
    // product.id = 0;
    // this.appservice.addPostProducts(product).subscribe();
    this.router.navigate(['/product']);
  };

  cancel(){
    this.productForm.reset();
  }

}
