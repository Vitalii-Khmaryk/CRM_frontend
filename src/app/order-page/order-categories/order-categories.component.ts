import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss']
})
export class OrderCategoriesComponent implements OnInit {
  categories$!:Observable<ICategory[]>
 constructor(private categoriesService:CategoriesService){}
 ngOnInit():void{
  this.categories$=this.categoriesService.fetch();
 }
}
