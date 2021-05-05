import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

constructor(private snackbar: MatSnackBar) { }

public alert(msg: string): void {
  this.snackbar.open(msg, undefined, {
    duration: 3000,
    horizontalPosition: 'end',
    verticalPosition: 'bottom'
  });
}

}
