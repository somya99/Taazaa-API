import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { Product } from '../product';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscribeComponent implements OnChanges {

  @Input() products : Observable<Product[]>;
  prod : Product[] = [];
  productsubscription : Subscription;
  constructor(private cd : ChangeDetectorRef){
    this.productsubscription = new Subscription();
    this.products = new Observable<Product[]>();
  }

  ngOnChanges(){
    this.productsubscription = this.products.subscribe(
      data => {
        this.prod = data
        console.log(data);
        this.cd.markForCheck();
      },
      error => {
        console.log(error)
      },
      () => console.log('complete')
    )
  }
  
  // ngOnDestroy(){
  //   if(this.productsubscription){
  //     this.productsubscription.unsubscribe();
  //   }
  // }

}
