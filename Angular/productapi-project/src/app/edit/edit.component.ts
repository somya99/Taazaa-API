import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  productForm : FormGroup;
  id : number;
  displaytable:boolean=false;
  product:Product;
  min = 1;
  max = 1000;
 
 constructor(private appservice : AppService,private activatedRoute:ActivatedRoute) {
   this.productForm=new FormGroup({
    title : new FormControl(this.product?.title, [Validators.required]),
    price : new FormControl(this.product?.price, [priceRangeValidator(this.min, this.max)]),
    expiryDate : new FormControl(this.product?.expiryDate,[Validators.required]),
    color: new FormControl(this.product?.color,[Validators.required]),
    inStock : new FormControl(this.product?.inStock, [Validators.required]),
    quantity : new FormControl(this.product?.quantity, [Validators.required, Validators.min(0)])
 
   });
    
  }
 
 ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe(params => { 
    console.log(params);
     this.id = Number(params.get('id')); 
     this.appservice.getAProduct(this.id).subscribe(
       data=>{
         this.product = data;
         this.setProduct(this.product);
       }
     );
    
     console.log(this.id);
  } 
  )
  
 }
 
 setProduct(data:Product){
    this.productForm.get("title")!.setValue(data.title);
    this.productForm.get('price')!.setValue(data.price);
    this.productForm.get('quantity')!.setValue(data.quantity);
    this.productForm.get('color')!.setValue(data.color);
    this.productForm.get('expiryDate')!.setValue(data.expiryDate);
    this.productForm.get('inStock')!.setValue(data.inStock); 
 }
 
 updateProduct(){
   let task : Product= {
     id : this.id,
     title : this.productForm.get("title")?.value,
     price : this.productForm.get("price")?.value,
     quantity : this.productForm.get("quantity")?.value,
     color : this.productForm.get("color")?.value,
     expiryDate : this.productForm.get("expiryDate")?.value,
     inStock : this.productForm.get("inStock")?.value,
   }
     this.appservice.putProducts(task).subscribe(
      data=>{
        console.log(data);
      });
    alert("Product Updated Successfully !");
 }
 cancel(){
   this.productForm.reset();
 }

}
