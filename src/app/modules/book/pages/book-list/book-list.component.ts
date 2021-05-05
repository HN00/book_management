import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { Author } from 'src/app/shared/models/author';
import { BookTableComponent } from '../../components/book-table/book-table.component';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  public searchForm: FormGroup;

  public bookParams: any = {};

  public selectedCategories: Category[] = [];

  public selectedAuthor: Author;

  @ViewChild(BookTableComponent) tableCmp: BookTableComponent;

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  public onCategoriesChanged(selected: Category[]): void {
    this.selectedCategories = selected;
  }

  public onAuthorChanged(selected: Author): void {
    this.selectedAuthor = selected;
  }

  private initForm(): void {
    this.searchForm = new FormGroup({
      name: new FormControl(null, Validators.maxLength(100)),
      categories: new FormControl(),
      author: new FormControl()
    });
  }

}
