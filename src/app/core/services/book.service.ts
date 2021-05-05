import { Injectable } from '@angular/core';
import { Book } from 'src/app/shared/models/book';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) { }

  public getBooks(page?: any, itemsPerPage?: any, sortBy?: string, descending?: any,
                  bookName?: string, authorId?: number, categoryIds?: string): Observable<Book[]> {
    let params = new HttpParams();
    if (!!page && !!itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (sortBy) {
      params = params.append('sortBy', sortBy === 'author' ? 'author' : 'book');
    }

    if (descending) {
      params = params.append('descending', (descending === 'desc').toString());
    }

    if (bookName && bookName !== '') {
      params = params.append('bookName', bookName);
    }
    if (authorId) {
      params = params.append('authorId', authorId.toString());
    }
    if (categoryIds) {
      params = params.append('categoryIds', categoryIds);
    }

    return this.http.get<Book[]>(this.baseUrl, { observe: 'response', params })
      .pipe(
        map(response => {

          return response.body as Book[];
        })
      );
  }

  public getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  public getImageUrl(fileName: string): string {
    return `${environment.apiUrl}/images/${fileName}`;
  }

  public addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book);
  }

  public updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${id}`, book);
  }

  public deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
