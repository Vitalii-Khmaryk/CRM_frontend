import { CategoriesService } from './../shared/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { ICategory } from '../shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  categories$!: Observable<ICategory[]>;
  constructor(private categoriesService: CategoriesService) { }
  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch();
  }
}
