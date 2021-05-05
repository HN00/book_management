import { Injectable } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  public searchCategories(name?: string, selectedCategories?: Category[]): Observable<Category[]> {

    let params = new HttpParams();

    if (name && name.trim()) {
      params = params.append('categoryName', name);
    }

    if (selectedCategories && selectedCategories.length) {
      params = params.append('selectedCategories', selectedCategories.map(c => c.id).join(','));
    }

    return this.http.get<Category[]>(`${this.baseUrl}/search`, {params});
  }

  public getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

}
