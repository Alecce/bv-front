import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {MatDialog} from '@angular/material/dialog';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {ReplaySubject} from 'rxjs';
import {languagesInterface} from '@src/environments/languages';

@Component({
  selector: 'app-calendar-input-bonvino',
  templateUrl: './calendar-input-bonvino.component.html',
  styleUrls: ['./calendar-input-bonvino.component.css']
})
export class CalendarInputBonvinoComponent implements OnInit {


  innerTrigger = new ReplaySubject(1);
  // @ts-ignore
  @Input() trigger;
  // @ts-ignore
  @Input() type;
  // @ts-ignore
  @Input() schemaData;
  // @ts-ignore
  @Input() downloadedData: FormControl;


  languageArr = languagesInterface;

  calendarArr = [
    {name: 'grigorian'},
    {name: 'jewish'},
    // {name: 'jalali'},
    {name: 'islamic'},
    {name: 'islamic-umm-al-qura'},
    // {name: 'buddhist'},
  ];

  form = new FormGroup({


    dayOfWeekArr: new FormArray([]),
    dayOfYearArr: new FormArray([]),

  });

  constructor(
    public langService: LanguageServiceService,
    public dialog: MatDialog,
    public service: RequestsService,
    public downloadingService: DownloadDataServiceService,
    ) {

  }


  ngOnInit(): void {


    this.innerTrigger.subscribe(x => {
      if(x) {
        this.write();
      }
    });

    this.dayOfWeekArr.valueChanges.subscribe(value => {
      // console.log(this.form.value);
      this.write();
    });

    this.refresh();

    this.downloadedData.valueChanges.subscribe(change => {
      this.refresh();
    });
  }


  refresh() {

    // console.log(this.downloadedData.value)
    // console.log(JSON.parse(this.downloadedData.value))
    if(this.downloadedData.value) {

      try{
        const dd = JSON.parse(this.downloadedData.value);

        // console.log(dd);
// @ts-ignore
        if (dd.dayOfWeekArr) {

          dd.dayOfWeekArr.forEach(x => {
            this.addDayOfWeek(x);
          });
        }
// @ts-ignore
        if (dd.dayOfWeekArr) {

          dd.dayOfYearArr.forEach(x => {
            this.addDayOfYear(x);
          });
        }
      } catch (e) {}
    }

    this.dayOfWeekArr.controls.forEach((x: FormGroup) => {
      // console.log(x);
      x.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    })
  }

  write() {

    // console.log(this.form.value);

    setTimeout(() => {
      this.downloadedData.setValue(JSON.stringify(this.form.value), {emitEvent: false});

    }, 500);
  }

  get dayOfWeekArr(): FormArray {
    return this.form.get('dayOfWeekArr') as FormArray;
  }
  addDayOfWeek(point) {
    // console.log(this.form.value);

    if (this.langService.editable) {
      return;
    }
    if (point) {
      (this.dayOfWeekArr as FormArray).push(this.getFormDayOfWeek(point));
    } else {
      (this.dayOfWeekArr as FormArray).push(this.getBlancFormDayOfWeek());
    }
  }

  removeDayOfWeek(point) {
    if (this.langService.editable) {
      return;
    }
    (this.dayOfWeekArr as FormArray).removeAt(point);
    this.write();
  }

  getBlancFormDayOfWeek() {

    const res = new FormGroup({
      days: new FormControl('{}'),
      isOpen: new FormControl(false),
      language: new FormControl(''),
      appointment: new FormControl(''),
    });
    res.get('days').valueChanges.subscribe(value => {
      this.write();
    });
    res.get('isOpen').valueChanges.subscribe(value => {
      this.write();
    });
    res.valueChanges.subscribe(value => {
      this.write();
    });
    return res;
  }
  getFormDayOfWeek(point) {
    const res = new FormGroup({
      days: new FormControl(point.days),
      isOpen: new FormControl(point.isOpen),
      language: new FormControl(point.language),
      appointment: new FormControl(point.appointment),
    });
    res.get('days').valueChanges.subscribe(value => {
      this.write();
    });
    res.get('isOpen').valueChanges.subscribe(value => {
      this.write();
    });
    res.valueChanges.subscribe(value => {
      this.write();
    });
    return res;
  }












  get dayOfYearArr(): FormArray {
    return this.form.get('dayOfYearArr') as FormArray;
  }
  addDayOfYear(point) {

    if (this.langService.editable) {
      return;
    }
    if (point) {
      (this.dayOfYearArr as FormArray).push(this.getFormDayOfYear(point));
    } else {
      (this.dayOfYearArr as FormArray).push(this.getBlancFormDayOfYear());
    }
  }

  removeDayOfYear(point) {
    if (this.langService.editable) {
      return;
    }
    (this.dayOfYearArr as FormArray).removeAt(point);
    this.write();
  }

  getBlancFormDayOfYear() {

    const res = new FormGroup({
      dayFrom: new FormControl(''),
      monthFrom: new FormControl(''),
      yearFrom: new FormControl(''),
      dayTo: new FormControl(''),
      monthTo: new FormControl(''),
      yearTo: new FormControl(''),

      isOpen: new FormControl(false),
      everyYear: new FormControl(false),
      wholeDay: new FormControl(true),
      type: new FormControl('grigorian'),
      language: new FormControl(''),
      appointment: new FormControl(''),

      timeFrom: new FormControl(''),
      timeTo: new FormControl(''),
      trigger: new FormControl(1),
    });
    res.get('dayFrom').valueChanges.subscribe(value => {
      this.write();
    });
    res.get('monthFrom').valueChanges.subscribe(value => {
      this.write();
    });
    res.get('yearFrom').valueChanges.subscribe(value => {
      this.write();
    });
    res.get('dayTo').valueChanges.subscribe(value => {
      this.write();
    });
    res.get('monthTo').valueChanges.subscribe(value => {
      this.write();
    });
    res.get('yearTo').valueChanges.subscribe(value => {
      this.write();
    });
    res.valueChanges.subscribe(value => {
      this.write();
    });
    return res;
  }
  getFormDayOfYear(point) {
    const res = new FormGroup({
      dayFrom: new FormControl(point.dayFrom),
      monthFrom: new FormControl(point.monthFrom),
      yearFrom: new FormControl(point.yearFrom),
      dayTo: new FormControl(point.dayTo),
      monthTo: new FormControl(point.monthTo),
      yearTo: new FormControl(point.yearTo),

      isOpen: new FormControl(point.isOpen),
      everyYear: new FormControl(point.everyYear),
      wholeDay: new FormControl(point.wholeDay),
      type: new FormControl(point.type),
      language: new FormControl(point.language),
      appointment: new FormControl(point.appointment),

      timeFrom: new FormControl(point.timeFrom),
      timeTo: new FormControl(point.timeTo),
      trigger: new FormControl(1),
    });
    res.get('dayFrom').valueChanges.subscribe(value => {
      this.write();
    });
    res.get('monthFrom').valueChanges.subscribe(value => {
      this.write();
    });
    res.get('yearFrom').valueChanges.subscribe(value => {
      this.write();
    });
    res.get('dayTo').valueChanges.subscribe(value => {
      this.write();
    });
    res.get('monthTo').valueChanges.subscribe(value => {
      this.write();
    });
    res.get('yearTo').valueChanges.subscribe(value => {
      this.write();
    });
    res.valueChanges.subscribe(value => {
      this.write();
    });
    return res;
  }



  isBigScreen() {
    return window.innerWidth > 1080
  }
}
