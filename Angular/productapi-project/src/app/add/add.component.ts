import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppService } from '../app.service';
import { Product } from '../product';

function priceRangeValidator(min : number, max : number) : ValidatorFn
{
  return (control : AbstractControl) : {[key : string] : boolean} | null =>
  {
    if(control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max) ){
      return {'priceRange' : true};
    }
    return null;
  };
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  product : Product;
  min = 1;
  max = 1000;
  productForm : FormGroup;
  products$ : Observable<Product[]>;
  
  constructor(private router : Router, private appservice : AppService) {
    // this.productForm = this.fb.group({
    //   title : ['', Validators.required],
    //   price : [[Validators.required, Validators.min(0)]],
    //   quantity : [[Validators.required, Validators.min(0)]],
    //   color : ['', Validators.required],
    //   expiryDate : ['', Validators.required],
    //   inStock : [true, Validators.required]
    // });
   }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      // Id : new FormControl(this.product?.id, [Validators.required]),
      title : new FormControl(this.product?.title, [Validators.required]),
      price : new FormControl(this.product?.price, [priceRangeValidator(this.min, this.max)]),
      expiryDate : new FormControl(this.product?.expiryDate,[Validators.required]),
      color: new FormControl(this.product?.color,[Validators.required]),
      inStock : new FormControl(this.product?.inStock, [Validators.required]),
      quantity : new FormControl(this.product?.quantity, [Validators.required, Validators.min(0)])
    });  
  }
  addProduct(){
    let prodToAdd = {
      id: 7,
      title: this.productForm.get("title")?.value,
      price: this.productForm.get("price")?.value,
      quantity: this.productForm.get("quantity")?.value,
      expiryDate: this.productForm.get("expiryDate")?.value,
      color: this.productForm.get("color")?.value,
      inStock: this.productForm.get("inStock")?.value,
    }

    
    this.appservice.postProducts(prodToAdd).subscribe(
    data=>{​​​​​​​​
    console.log(data);
    }​​​​​​​​);
    alert("Product Added Successfully !");
    // let product : Product = {...this.productForm.value};
    // product.id = 0;
    // this.appservice.addPostProducts(product).subscribe();
    this.router.navigate(['/product']);
  };

  cancel(){
    this.productForm.reset();
  }
}
