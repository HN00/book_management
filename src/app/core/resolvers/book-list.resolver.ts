import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from 'src/app/shared/models/book';
import { BookService } from '../services/book.service';
import { SnackBarService } from '../services/snackbar.service';

@Injectable()
export class BookListResolver implements Resolve<Book[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private bookService: BookService, private snackBarService: SnackBarService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Book[]> {
        return this.bookService.getBooks(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.snackBarService.alert('Problem retrieving data');
                return []
            })
        );
    }
}
