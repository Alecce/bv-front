import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {LanguageServiceService} from '../../services/language-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {RequestsService} from '../../services/api/requests.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-multiselect-subtable',
  templateUrl: './multiselect-subtable.component.html',
  styleUrls: ['./multiselect-subtable.component.css']
})
export class MultiselectSubtableComponent implements OnInit, AfterViewInit {


  list = [];
  form = new FormGroup({
    boxes: new FormGroup({}),
  });

  constructor(private activatedroute: ActivatedRoute,
              private service: RequestsService,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public dialogRef: MatDialogRef<MultiselectSubtableComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {

  }

  get boxes(): FormGroup {
    return this.form.get('boxes') as FormGroup;
  }

  ngAfterViewInit(): void {
    console.log(this.data);
    this.list = this.data.list;
    this.data.list.forEach(x => {
      this.boxes.addControl(x.id + '', new FormControl(false));
    });
    const data = this.data.data;
    if (data && JSON.parse(data)) {
      JSON.parse(data).forEach(x => {
        console.log(x);
        console.log(this.boxes.get(x));
        if (this.boxes.get(x)) {
          this.boxes.get(x + '').setValue(true);
        }
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  getResults() {
    console.log(this.boxes.value);
    const result = [];

    // const resList = this.boxes.value;

    this.list.forEach(x => {
      if (this.boxes.get(x.id + '').value) {
        result.push(x.id + '');
      }
    });

    console.log(JSON.stringify(result));
    return JSON.stringify(result);
  }
}
