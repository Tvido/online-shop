import { Component, OnInit } from '@angular/core';
import {ProductService} from "../shared/product.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  products$

  constructor(
    public productServ: ProductService
  ) { }

  ngOnInit() {
    this.products$ = this.productServ.getAll()
  }
}
