import { IOrderPosition, IPosition } from 'src/app/shared/interfaces';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class OrderService {
    public list: IOrderPosition[] = [];
    public price = 0;
    add(position: IPosition) {
        const orderPosition: IOrderPosition = Object.assign({}, {
            name: position.name,
            cost: position.cost,
            quantity: position.quantity,
            _id: position._id
        });
        const candidate = this.list.find(p => p._id === orderPosition._id);
        if (candidate && candidate.quantity && orderPosition.quantity) {
            candidate.quantity += orderPosition.quantity;
        } else {
            this.list.push(orderPosition);
        }
        this.computePrice();
    }
    private computePrice() {
        this.price = this.list.reduce((total, item) => {
            return total += item.quantity * item.cost;
        }, 0);
    }
    remove(orderPosition: IOrderPosition) {
        const idx = this.list.findIndex(p => p._id === orderPosition._id);
        this.list.splice(idx, 1);
        this.computePrice();
    }
    clear() {
        this.list = [];
        this.price = 0;
    }
}