import { map, switchMap } from 'rxjs/operators';
import { IPosition } from './../../shared/interfaces';
import { Observable } from 'rxjs';
import { PositionsService } from './../../shared/services/positions.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../order.service';
import { MaterialService } from 'src/app/shared/material.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {
  positions$!: Observable<IPosition[]>;
  constructor(private route: ActivatedRoute,
    private positionService: PositionsService,
    private orderService: OrderService
  ) { }
  ngOnInit() {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.positionService.fetch(params['id']);
      }), map((positions: IPosition[]) => {
        return positions.map(position => {
          position.quantity = 1;
          return position;
        });
      })
    );
  }
  addToOrder(position: IPosition) {
    MaterialService.toast(`Додано х${position.quantity}`);
    this.orderService.add(position);
  }
}
