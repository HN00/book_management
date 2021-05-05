import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookService } from 'src/app/core/services/book.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';

interface DialogData {
  bookId: number;
}

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.scss']
})
export class BookDeleteComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<BookDeleteComponent>, @Inject(MAT_DIALOG_DATA) private dialogData: DialogData,
              private bookService: BookService, private snackBarService: SnackBarService) { }

  ngOnInit() {
  }

  public onDelete(): void {
    this.bookService.deleteBook(this.dialogData.bookId)
    .subscribe(() => {
        this.snackBarService.alert('Book is successfully deleted');
      });
    this.dialogRef.close();
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

}
