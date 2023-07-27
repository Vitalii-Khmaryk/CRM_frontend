import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { IFilter } from 'src/app/shared/interfaces';
import { MaterialDatepicker, MaterialService } from 'src/app/shared/material.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnDestroy, AfterViewInit {
  @Output() onFilter = new EventEmitter<IFilter>();
  @ViewChild('start') startRef!: ElementRef;
  @ViewChild('end') endRef!: ElementRef;
  order!: number;
  start!: MaterialDatepicker | any;
  end!: MaterialDatepicker | any;
  isValid = true;
  submitFilter() {
    const filter: IFilter = {};
    if (this.order) {
      filter.order = this.order;
    }
    else if (this.start.date) {
      filter.start=this.start.date
    }
    else if (this.end.date) {
      filter.end=this.end.date
    }
    this.onFilter.emit(filter);
  }
  ngAfterViewInit(): void {
    this.start = MaterialService.initDatepicker(this.startRef, this.validate.bind(this));
    this.end = MaterialService.initDatepicker(this.endRef, this.validate.bind(this));
  }
  validate() {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return;
    }
    this.isValid = this.start.date < this.end.date;
  }
  ngOnDestroy(): void {
    this.start.destroy();
    this.end.destroy();
  }

}
