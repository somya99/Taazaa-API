import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id:number;
  product:Product;

 constructor(private appservice : AppService,private activatedRoute:ActivatedRoute) {
 }

 ngOnInit(): void {
   // this.task$=this.appservice.getProduct(this.prod.id)
   this.activatedRoute.paramMap.subscribe(params => { 
     console.log(params);
      this.id = Number(params.get('id')); 
      this.appservice.getAProduct(this.id).subscribe(
        data=>{
          this.product=data;
        }
      );     
      console.log(this.id);
   })   
 }
 
 deleteAProduct()
 {
     this.appservice.deleteProducts(this.id).subscribe();
     alert("Product Deleted Successfully !");
 }
  
}
