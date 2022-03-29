import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {OrderService} from '../../shared/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {
  orders = []
  productSubscription: Subscription
  removeSubscription: Subscription

  constructor(
    private orderServ: OrderService
  ) { }

  ngOnInit() {
    this.productSubscription = this.orderServ.getAll().subscribe(orders => {
      this.orders = orders
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
    this.removeSubscription = this.orderServ.remove(id).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== id)
    })
  }
}
