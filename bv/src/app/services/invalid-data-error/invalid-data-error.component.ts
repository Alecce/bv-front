import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-invalid-data-error',
  templateUrl: './invalid-data-error.component.html',
  styleUrls: ['./invalid-data-error.component.css']
})
export class InvalidDataErrorComponent implements OnInit {

  constructor(
    public snackBarRef: MatSnackBarRef<InvalidDataErrorComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
  }

}
