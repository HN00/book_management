import { Component, OnInit, Inject } from '@angular/core';
import { Book } from 'src/app/shared/models/book';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/shared/models/category';
import { Author } from 'src/app/shared/models/author';
import { BookService } from 'src/app/core/services/book.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';

interface DialogData {
  book: Book;
}

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  public bookForm: FormGroup;
  private book: Book;
  public editMode = false;

  public selectedCategories: Category[] = [];

  public selectedAuthor: Author;

  public imgSrc: string;
  private imgChanged = false;

  constructor(private dialogRef: MatDialogRef<BookEditComponent>, private snackBarService: SnackBarService,
              @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
              private bookService: BookService) { }

  ngOnInit() {
    this.book = this.dialogData.book;
    this.editMode = this.book !== null;

    if (this.book && this.book.cover) {
      this.imgSrc = this.book.cover;
    }

    this.initForm();
  }

  private initForm(): void {
    let name = '';
    let description = '';
    let price = 0;
    let year = 2020;
    let author = null;
    let publisher = '';

    if (this.editMode) {
      name = this.book.name;
      description = this.book.description || '';
      price = this.book.price;
      year = this.book.year;
      author = this.book.author;
      this.selectedAuthor = this.book.author as Author;
      publisher = this.book.publisher;

      if (this.book.categories) {
        for (const category of this.book.categories) {
          this.selectedCategories.push(category);
        }
      }
    }

    this.bookForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description),
      price: new FormControl(price, Validators.required),
      year: new FormControl(year, [Validators.required, Validators.pattern(/^\d{4}$/)] ),
      author: new FormControl( (author) ? author : null, Validators.required),
      publisher: new FormControl(publisher, Validators.required),
      cover: new FormControl(),
      categories: new FormControl(this.selectedCategories)
    });
  }

  public onCategoriesChanged(selected: Category[]): void {
    this.selectedCategories = selected;
  }

  public onAuthorChanged(selected: Author): void {
    this.selectedAuthor = selected;
  }

  public onSave(): void {
    const book: Book = Object.assign({}, this.bookForm.value);
    book.author = this.selectedAuthor;
    book.categories = this.selectedCategories;
    if (this.imgSrc && this.imgChanged) {
      book.cover = this.imgSrc.substring(this.imgSrc.indexOf(',') + 1);
    }

    if (!this.editMode) {
      this.bookService.addBook(book)
        .subscribe((result: Book) => {
            this.snackBarService.alert(`Book ${result.name} is successfully added`);
          });
    } else {
      this.bookService.updateBook(this.book.id, book)
        .subscribe((result: Book) => {
          this.snackBarService.alert(`Book ${result.name} is successfully updated`);
        });
    }

    this.dialogRef.close();
  }

  public onClear(): void {
    if (this.editMode) {
      this.bookForm.reset(this.book);
    } else {
      this.bookForm.reset();
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onFileChanged(event: any): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgSrc = reader.result as string;
      };
    }

    this.imgChanged = true;
  }

}
