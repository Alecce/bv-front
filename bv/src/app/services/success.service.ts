import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SuccessService {

  constructor(private snackBar: MatSnackBar) { }

  public showSuccess() {
    this.snackBar.open('success!', 'close', {
      duration: 3000,
    });
  }

  public showError() {
    this.snackBar.open('You have no permission to edit, so you was transported to view', 'close', {
      duration: 10000,
    });
  }
}
