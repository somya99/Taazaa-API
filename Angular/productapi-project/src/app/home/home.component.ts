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

  //products : Product[] = [];
  products$ : Observable<Product[]>;
  // productsubscription : Subscription;
  constructor(private appservice : AppService, private cd : ChangeDetectorRef){
    // this.productsubscription = new Subscription();
    this.products$ = new Observable<Product[]>();
  }

  ngOnInit(){
    // this.productsubscription = this.appservice.getProducts().subscribe(
    //   data => {
    //     this.cd.markForCheck();
    //   },
    //   error => {
    //     console.log(error)
    //   },
    //   () => console.log('complete')
    // )
    this.products$ = this.appservice.getProducts();
  }
  
  ngOnDestroy(){
    // if(this.productsubscription){
    //   this.productsubscription.unsubscribe();
    // }
  }

}
