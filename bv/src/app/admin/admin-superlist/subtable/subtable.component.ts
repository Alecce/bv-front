import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-subtable',
  templateUrl: './subtable.component.html',
  styleUrls: ['./subtable.component.css']
})
export class SubtableComponent implements OnInit {

  tableInterface;
  tableContent;
  form = new FormGroup({
    formArray: new FormArray([]),
  });

  constructor(
    public dialogRef: MatDialogRef<SubtableComponent>,
    @Inject(MAT_DIALOG_DATA) public data,

  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.tableInterface = this.data.table;
    if (this.data.content) {
      this.tableContent = JSON.parse(this.data.content);
      this.tableContent.forEach(row => {
        console.log(row);
        this.addRow(row);
      });
      console.log(this.data);
    }
  }

  get formArray(): FormArray {
    return this.form.get('formArray') as FormArray;
  }

  getBlankRow() {
    const f = new FormGroup({});
    this.tableInterface.subtable.forEach(col => {
      f.addControl(col.control, new FormControl(col.default));
    });
    return f;
  }
  getFulfilledRow(row) {
    const f = new FormGroup({});
    this.tableInterface.subtable.forEach(col => {
      if (row[col.control]) {
        f.addControl(col.control, new FormControl(row[col.control]));
      } else {
        f.addControl(col.control, new FormControl(col.default));
      }
    });
    return f;
  }

  addRow(row) {
    if (row) {
      (this.formArray as FormArray).push(this.getFulfilledRow(row));
    } else {
      (this.formArray as FormArray).push(this.getBlankRow());
    }
  }
  removeRow(row) {
    (this.formArray as FormArray).removeAt(row);
  }

  close(): void {
    this.dialogRef.close();
  }
}
