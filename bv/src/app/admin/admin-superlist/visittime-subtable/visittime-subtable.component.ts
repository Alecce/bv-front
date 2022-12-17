import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../../../services/language-service.service';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-visittime-subtable',
  templateUrl: './visittime-subtable.component.html',
  styleUrls: ['./visittime-subtable.component.css']
})
export class VisittimeSubtableComponent implements OnInit {
  public tab = 'visitTime';
  routeData = {editable: false};
  editable = false;

  DAYS_OF_WEEK = {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday'
  };

  form = new FormGroup({
    0: new FormArray([]),
    1: new FormArray([]),
    2: new FormArray([]),
    3: new FormArray([]),
    4: new FormArray([]),
    5: new FormArray([]),
    6: new FormArray([])
  });

  constructor(private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public dialogRef: MatDialogRef<VisittimeSubtableComponent>,
              @Inject(MAT_DIALOG_DATA) public downloadedData) { }

  ngOnInit() {

    this.downloadedData.subscribe(downloadData => {
// @ts-ignore
      if (downloadData !== '') {
        console.log(downloadData);
        const timeData = JSON.parse(downloadData);
        Object.keys(timeData).forEach(key => {
          if (timeData[key] !== '') {
            const day = key[2];
            this.times(day).push(new FormControl(timeData[key]));
          }
        });
      }

    });
  }

  get days() {
    return this.form.controls;
  }
  get daysKeys() {
    return Object.keys(this.days);
  }
  times(day): FormArray {
    return (this.form.get(day) as FormArray);
  }

  addTimeRange(day) {
    if (this.langService.editable) {
      return;
    }
    this.times(day).push(new FormControl('', Validators.required));
    this.times(day).push(new FormControl('', Validators.required));
  }
  removeTimeRange(day, time) {
    if (this.langService.editable) {
      return;
    }
    this.times(day).removeAt(time);
    this.times(day).removeAt(time);
  }

  close(): void {
    this.dialogRef.close();
  }

  getResults() {
    const visittime = this.form.value;
    const visittimeDB = {};
    for (const day in visittime) {
      const nRows = Math.max(visittime[day].length / 2, 2);
      for (let i = 0; i < nRows; i++) {
        const timeNameFrom = `f_${day}_${1 + i}`;
        visittimeDB[timeNameFrom] = 2 * i >= visittime[day].length ? '' : visittime[day][2 * i];
        const timeNameTo = `t_${day}_${1 + i % 2}`;
        visittimeDB[timeNameTo] = 2 * i >= visittime[day].length ? '' : visittime[day][2 * i + 1];
      }
    }
    return JSON.stringify(visittimeDB);
  }
}
