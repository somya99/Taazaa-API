import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { Product } from '../product';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FindComponent implements OnInit {
  product : Product;
  @Input() products : Observable<Product[]>;
  
  
  productForm : FormGroup;
  prod : Product;
  displayProduct : boolean = false;
  constructor(private router : Router, private appservice : AppService) {
    
    this.products = new Observable<Product[]>();
   }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      id : new FormControl(this.product?.id, [Validators.required])
      
    });  
  }
  findProduct(){
    this.displayProduct = true;
    let prodToFind = {
      id: this.productForm.get("id")?.value,

    }
    this.displayProduct = true;
    this.appservice.getAProduct(prodToFind.id).subscribe(
    data=>{​​​​​​​​
      
      this.prod = data;
      console.log(this.prod);
    }​​​​​​​​);

    // let product : Product = {...this.productForm.value};
    // product.id = 0;
    // this.appservice.addPostProducts(product).subscribe();
    // this.router.navigate(['/home']);
  };

  cancel(){
    this.productForm.reset();
  }

}
