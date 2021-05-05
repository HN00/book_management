import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from 'src/app/core/services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { BookEditComponent } from '../book-edit/book-edit.component';
import { Pagination, PaginatedResult } from 'src/app/shared/models/pagination';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { BookDeleteComponent } from '../book-delete/book-delete.component';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import {Sort} from '@angular/material/sort';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements OnInit {
  public searchForm: FormGroup;

  public bookParams: any = {};
  public selectedCategories: Category[] = [];
  public dataSource: MatTableDataSource<Book> = {data: []} as any;
  public displayedColumns: string[] = ['id', 'name', 'price', 'publisher', 'author'];

  public pagination: Pagination;

  public sortBy: string;
  private descending = '';


  private books: Book[];

  public currentUser: User;
  @ViewChild(BookTableComponent) tableCmp: BookTableComponent;

  constructor(private bookService: BookService, private authService: AuthService,
              private dialog: MatDialog, private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.initForm();
    this.currentUser = this.authService.currentUser;
    if (this.currentUser.role !== 'USER') {
      this.displayedColumns.push('actions');
    }

    this.searchForm.get('name')!.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(() => this.onSearch());
  
    this.route.data.subscribe(data => {
      this.books = data.books?.result;
      this.dataSource = new MatTableDataSource(this.books);
      this.pagination = data.books?.pagination || 0;
    });
    this.loadBooks()
  }

  public onCategoriesChanged(selected: Category[]): void {
    this.selectedCategories = selected;
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page || 0;
    this.loadBooks();
  }

  public loadBooks(): void {
    this.bookService.getBooks(this.pagination?.currentPage || 1, this.pagination?.itemsPerPage || 5, this.sortBy, this.descending,
      this.bookParams.bookName, this.bookParams.authorId, this.bookParams.categoryIds)
      .subscribe((result: any) => {
          this.books = result?.data;
          this.pagination = result?.pagination;
          this.dataSource = new MatTableDataSource(this.books);
        });
  }

  public onNew(): void {
    const dialogRef = this.dialog.open(BookEditComponent, {
      data: {book: null},
      height: '500px'
    });
    dialogRef.afterClosed().subscribe(() => this.loadBooks());
  }
  
  public onSearch(): void {
    if (this.searchForm.get('name').valid) {
      this.bookParams.bookName = this.searchForm.get('name').value;

      this.bookParams.categoryIds = this.selectedCategories.map(c => c.id).join(',');

      this.tableCmp.pagination.currentPage = 1;
      this.tableCmp.loadBooks();
    }
  }

  public onEdit(id: number): void {
    let book: Book;

    this.bookService.getBook(id)
      .subscribe((result: Book) => {
          book = result;

          if (this.currentUser.role === 'USER') {

            this.dialog.open(BookDetailComponent, {
              data: {book},
              height: '500px'
            });
          } else {
            const dialogRef = this.dialog.open(BookEditComponent, {
              data: {book},
              height: '500px'
            });

            dialogRef.afterClosed().subscribe(() => this.loadBooks());
          }
        });

  }

  public onDelete(id: number): void {
    const dialogRef = this.dialog.open(BookDeleteComponent, {
      data: {bookId: id},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(() => this.loadBooks());
  }

  public sortData(sort: Sort): void {
    this.sortBy = sort.active;
    this.descending = sort.direction;
    this.loadBooks();
  }

  private initForm(): void {
    this.searchForm = new FormGroup({
      name: new FormControl(null, Validators.maxLength(100)),
      categories: new FormControl(),
      author: new FormControl()
    });
  }

}
