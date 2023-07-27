import { Component, ElementRef, Input, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { IOrder } from 'src/app/shared/interfaces';
import { MaterialInstance, MaterialService } from 'src/app/shared/material.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {
  @Input() orders!: IOrder[];
  @ViewChild('modal') modalRef!: ElementRef;
  modal!: MaterialInstance | any;
  selectedOrder!: IOrder;
  computePrice(order: IOrder): number {
    return order.list.reduce((total, item) => {
      return total += item.quantity * item.cost;
    }, 0);
  }
  selectOrder(order: IOrder) {
    this.selectedOrder = order;
    this.modal.open();
  }
  closeModal() {
    this.modal.close();
  }
  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef);
  }
  ngOnDestroy(): void {
    this.modal.destroy();
  }


}
