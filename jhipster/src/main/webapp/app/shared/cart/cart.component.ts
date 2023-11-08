import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() product: any;
  showCartSidebar: any;


  constructor() { }

  ngOnInit(): void {
  }


}
