import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../shared/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  products = []
  productSubscription: Subscription
  removeSubscription: Subscription
  productName

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit() {
    this.productSubscription = this.productServ.getAll().subscribe(products => {
      this.products = products
    })
  }

  ngOnDestroy() {
    if(this.productSubscription) {
      this.productSubscription.unsubscribe()
    }

    if(this.removeSubscription) {
      this.removeSubscription.unsubscribe()
    }
  }

  remove(id) {
    this.removeSubscription = this.productServ.remove(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id)
    })
  }

}
