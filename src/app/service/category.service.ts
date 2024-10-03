import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryModel } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl: string = 'http://localhost:8080/api/categories';

  constructor(private httpClient: HttpClient) {}

  public getAllCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(this.baseUrl);
  }

  public getCategoryById(id: string): Observable<CategoryModel> {
    return this.httpClient.get<CategoryModel>(`${this.baseUrl}/${id}`);
  }

  public createCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.httpClient.post<CategoryModel>(this.baseUrl, category);
  }

  public updateCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.httpClient.put<CategoryModel>(this.baseUrl, category);
  }

  public deleteCategory(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
