import { ICategory } from './../../shared/interfaces';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialService } from 'src/app/shared/material.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  @ViewChild('input') inputRef!: ElementRef;
  form!: FormGroup;
  image!: File;
  imagePreview!: any;
  isNew = true;
  category!: ICategory;
  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
    this.form.disable();
    this.route.params.pipe(
      switchMap(
        (params: Params) => {
          if (params['id']) {
            this.isNew = false;
            return this.categoriesService.getById(params['id']);
          }
          return of(null);
        }
      )
    ).subscribe((category) => {
      if (category) {
        this.category = category;
        this.form.patchValue({
          name: category.name
        });
        this.imagePreview = category.imageSrc;
        MaterialService.updateTextInputes();
      }
      this.form.enable();
    }, error => MaterialService.toast(error.error.message));
  }
  triggerClick(): void {
    this.inputRef.nativeElement.click();
  }
  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  onSubmit(): void {
    let obs$;
    this.form.disable();
    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image);
    } else {
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image);
    }
    obs$.subscribe((category) => {
      this.category = category;
      this.form.enable();
      MaterialService.toast('Зміни збережені');
    }, error => {
      MaterialService.toast(error.error.message);
      this.form.enable();
    });
  }
  deleteCategory(): void {
    const decision = window.confirm(`Ви впевнені що хочете видалити категорію ${this.category.name} ?`);
    if (decision) {
      this.categoriesService.delete(this.category._id).subscribe(
        response => {
          MaterialService.toast(response.message);
        }, error => {
          MaterialService.toast(error.error.message);
        }, () => {
          this.router.navigate(['/categories']);
        });
    }
  }
}
