import { Component, OnInit, Inject } from '@angular/core';
import { Book } from 'src/app/shared/models/book';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from 'src/app/core/services/book.service';

interface DialogData {
  book: Book;
}

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  public book!: Book;
  public imgSrc!: string;

  constructor(private dialogRef: MatDialogRef<BookDetailComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
              private bookService: BookService) { }

  ngOnInit() {
    this.book = this.dialogData.book;

    if (this.book && this.book.cover) {
      this.imgSrc = this.book.cover;
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }

}
