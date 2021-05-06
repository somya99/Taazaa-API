import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../product';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialComponent implements OnChanges {
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
 
  displayedColumns : string[] = ['Id', 'Title', 'Price', 'Quantity', 'Color', 'ExpiryDate', 'InStock'];
}
