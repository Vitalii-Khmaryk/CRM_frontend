import { IOrder } from './../shared/interfaces';
import { MaterialInstance } from './../shared/material.service';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MaterialService } from '../shared/material.service';
import { OrderService } from './order.service';
import { IOrderPosition } from '../shared/interfaces';
import { OrdersService } from '../shared/services/orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers:[OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('modal') modalRef!: ElementRef;
  isRoot!: boolean;
  pending=false;
  oSub!:Subscription;
  modal!: MaterialInstance | any;
  constructor(private router: Router,public orderService:OrderService,private ordersService:OrdersService) { }
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }
  open(): void {
    this.modal.open();
  }
  cancel():void{
    this.modal.close();
  }
  submit():void{
    this.pending=true;
    const order:IOrder={
      list:this.orderService.list.map(item=>{
        delete item._id
        return item
      })
    }
   this.oSub=this.ordersService.create(order).subscribe(newOrder=>{
     MaterialService.toast(`Замовлення №${newOrder.order} додано.`);

     this.orderService.clear();
    },error=>{
     MaterialService.toast(error.error.message)
    },()=>{
      this.modal.close();
      this.pending=false;
    })
  }
  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }
  removePosition(orderPosition:IOrderPosition):void{
   this.orderService.remove(orderPosition);
  }
  ngOnDestroy(): void {
    this.modal.destroy();
    if (this.oSub) {
      this.oSub.unsubscribe();
    }
  }
}
