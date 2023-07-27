import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory, IMessage } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }
  fetch(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('/api/category');
  }
  getById(id: string): Observable<ICategory> {
    return this.http.get<ICategory>(`/api/category/${id}`);
  }
  create(name: string, image?: File):Observable<ICategory> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);
    return this.http.post<ICategory>('/api/category', fd);
  }
  update(id:string,name: string, image?: File):Observable<ICategory> {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);
    return this.http.patch<ICategory>(`/api/category/${id}`, fd);
  }
  delete(id:string):Observable<IMessage>{
   return this.http.delete<IMessage>(`/api/category/${id}`);
  }
}
