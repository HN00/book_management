import { Injectable } from '@angular/core';
import { Author } from 'src/app/shared/models/author';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private baseUrl = `${environment.apiUrl}/authors`;

  constructor(private http: HttpClient) { }

  public getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl);
  }

  public searchAuthors(name?: string): Observable<Author[]> {
    let params = new HttpParams();

    if (name && name.trim()) {
      params = params.append('authorName', name);
    }

    return this.http.get<Author[]>(`${this.baseUrl}/search`, {params});
  }

  public getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.baseUrl}/${id}`);
  }

  public getImageUrl(fileName: string): string {
    return `${environment.apiUrl}/images/${fileName}`;
  }

}
