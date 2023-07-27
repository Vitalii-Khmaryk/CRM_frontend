import { OrdersService } from './../shared/services/orders.service';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialInstance, MaterialService } from '../shared/material.service';
import { Subscription } from 'rxjs';
import { IFilter, IOrder } from '../shared/interfaces';

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tooltip') tooltipRef!: ElementRef;
  tooltip!: MaterialInstance | any;
  isFilterVisible: boolean = false;
  offset = 0;
  limit = STEP;
  oSub!: Subscription;
  orders: IOrder[] = [];
  loading = false;
  reloading = false;
  noMoreOrders = false;
  filter: IFilter = {};
  constructor(
    private ordersService: OrdersService
  ) { }
  ngOnInit() {
    this.reloading = true;
    this.fetch();
  }
  private fetch() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    });
    this.oSub = this.ordersService.fetch(params).subscribe((orders) => {
      this.orders = this.orders.concat(orders);
      this.noMoreOrders = orders.length < STEP;
      this.loading = false;
      this.reloading = false;
    });
  }
  loadMore() {
    this.offset += STEP;
    this.loading = true;
    this.fetch();
  }
  ngOnDestroy(): void {
    this.tooltip.destroy();
    this.oSub.unsubscribe();
  }
  applyFilter(filter: IFilter) {
    this.orders = [];
    this.offset = 0;
    this.filter = filter;
    this.reloading = true;
    this.fetch();
  }
  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }
  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0;
  }
}
