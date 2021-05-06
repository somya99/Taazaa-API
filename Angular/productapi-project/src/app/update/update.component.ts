import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  product : Product;
  min = 1;
  max = 1000;
  productForm : FormGroup;
  products$ : Observable<Product[]>;
  displayTable : boolean = false;
  usedid : number;
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
      id : new FormControl(this.product?.id, [Validators.required]),
      title : new FormControl(this.product?.title, [Validators.required]),
      price : new FormControl(this.product?.price, [priceRangeValidator(this.min, this.max)]),
      expiryDate : new FormControl(this.product?.expiryDate,[Validators.required]),
      color: new FormControl(this.product?.color,[Validators.required]),
      inStock : new FormControl(this.product?.inStock, [Validators.required]),
      quantity : new FormControl(this.product?.quantity, [Validators.required, Validators.min(0)])
    });  
  }

  findProduct(){
    this.displayTable = true;
    let prodToFind = {
      id: this.productForm.get("id")?.value,
      
    }
    
    this.appservice.getAProduct(prodToFind.id).subscribe(
    data=>{​​​​​​​​
      console.log(data);
      this.usedid = prodToFind.id;
      this.productForm.get("title")!.setValue(data.title);
      this.productForm.get('price')!.setValue(data.price);
      this.productForm.get('quantity')!.setValue(data.quantity);
      this.productForm.get('color')!.setValue(data.color);
      this.productForm.get('expiryDate')!.setValue(data.expiryDate);
      this.productForm.get('inStock')!.setValue(data.inStock);
    }​​​​​​​​);
  }
  updateProduct(){
    
    let prodToUpdate = {
      id : this.usedid,
      title: this.productForm.get("title")?.value,
      price: this.productForm.get("price")?.value,
      quantity: this.productForm.get("quantity")?.value,
      expiryDate: this.productForm.get("expiryDate")?.value,
      color: this.productForm.get("color")?.value,
      inStock: this.productForm.get("inStock")?.value,
    }

    
    this.appservice.putProducts(prodToUpdate).subscribe(
    data=>{​​​​​​​​
    console.log(data);
    }​​​​​​​​);
    alert("Product Updated Successfully !");
    // let product : Product = {...this.productForm.value};
    // product.id = 0;
    // this.appservice.addPostProducts(product).subscribe();
    this.router.navigate(['/product']);
    
  };

  cancel(){
    this.productForm.reset();
  }

}
