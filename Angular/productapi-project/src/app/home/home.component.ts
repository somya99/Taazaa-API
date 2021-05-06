import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { Product } from '../product';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit, OnDestroy {

  products$ : Observable<Product[]>;
  showsubscribe : boolean = false;
  showasync : boolean = false;
  showmaterial : boolean = false;
  constructor(private appservice : AppService, private cd : ChangeDetectorRef){
    
    this.products$ = new Observable<Product[]>();
  }

  ngOnInit(){
    
    this.products$ = this.appservice.getProducts();
  }
  ShowSubscribe(){
    this.showsubscribe = true;
    this.showasync = false;
    this.showmaterial = false;
  }
  ShowAsync(){
    this.showsubscribe = false;
    this.showasync = true;
    this.showmaterial = false;
  }
  ShowMaterial(){
    this.showsubscribe = false;
    this.showasync = false;
    this.showmaterial = true;
  }
  ngOnDestroy(){
    // if(this.productsubscription){
    //   this.productsubscription.unsubscribe();
    // }
  }

}
