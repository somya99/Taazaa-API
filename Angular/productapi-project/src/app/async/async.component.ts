import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { Product } from '../product';
@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsyncComponent implements OnInit {
  @Input() products : Observable<Product[]>;
  
  constructor() {
    this.products = new Observable<Product[]>();
   }

  ngOnInit(): void {
  }

}
