import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { debounceTime, distinctUntilChanged, switchMap, map, startWith, first } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/category.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss']
})
export class CategorySearchComponent implements OnInit {

  public visible = true;
  public selectable = true;
  public removable = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];

  public selectedCategories: Category[];

  private allCategories$: Observable<Category[]> = this.categoryService.getCategories();
  private listCategories: Category[]

  @ViewChild('categoryInput')
  categoryInput!: ElementRef<HTMLInputElement>;

  @Input()
  fGroup!: FormGroup;
  @Input()
  existedCategories!: Category[];

  @Output() categoriesChanged: EventEmitter<Category[]> = new EventEmitter<Category[]>();

  public searchResults$!: Observable<Category[]>;

  constructor(private categoryService: CategoryService, private dialog: MatDialog) { }

  ngOnInit() {
    if (this.existedCategories) {
      this.selectedCategories = this.existedCategories;
    }
    this.categoryService.getCategories().pipe(
      first(),
      map(rs => {
        this.listCategories = rs
      })
    ).subscribe()

    this.searchResults$ = this.fGroup.get('categories').valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(query => {
        return this.listCategories.filter(value => value.name.includes(query)
        && !this.selectedCategories.map(slectedItem => slectedItem.id).includes(value.id))
      })
    )
  }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (value && value.trim()) {
      this.selectCategoryByName(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.fGroup.get('categories')!.setValue(null);

    this.categoriesChanged.emit(this.selectedCategories);
  }

  public remove(category: Category): void {
    const index = this.selectedCategories.indexOf(category);

    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
    }

    this.categoriesChanged.emit(this.selectedCategories);
  }

  public selectCategory(event: MatAutocompleteSelectedEvent): void {
    this.selectCategoryByName(event.option.value);
    this.categoryInput.nativeElement.value = '';
    this.fGroup.get('categories')!.setValue(null);
  }

  private selectCategoryByName(cName: string): void {
    const foundCategory = this.listCategories.filter(c => c.name === cName)[0];
    if (!!foundCategory) {
      this.selectedCategories.push(foundCategory);
    }
  }

}
