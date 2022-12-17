import {Component, Injectable, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {RequestsService} from '@src/app/services/api/requests.service';
import {MatDialog} from '@angular/material/dialog';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {ReplaySubject} from 'rxjs';
import {NgbDatepickerI18n, NgbDatepickerI18nHebrew, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {languagesInterface} from '@src/environments/languages';
// import {NgbDatepickerI18nIslamic} from '@src/app/calendars/islamic-calendar/islamic-calendar.component';
// import {NgbDatepickerI18nIslamicUmalqura} from '@src/app/calendars/islamic-umm-al-qura-calendar/islamic-umm-al-qura-calendar.component';
import {TranslationWidth} from '@angular/common';


const WEEKDAYS = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];
const MONTHS = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال',
  'ذو القعدة', 'ذو الحجة'];

@Injectable()
export class NgbDatepickerI18nIslamicUmalqura extends NgbDatepickerI18n {
  getMonthShortName(month: number) {
    return MONTHS[month - 1];
  }

  getMonthFullName(month: number) {
    return MONTHS[month - 1];
  }

  getWeekdayLabel(weekday: number, width?: TranslationWidth) {
    return WEEKDAYS[weekday - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}



// const WEEKDAYS = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];
// const MONTHS = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال',
//   'ذو القعدة', 'ذو الحجة'];

@Injectable()
export class NgbDatepickerI18nIslamic extends NgbDatepickerI18n {
  getMonthShortName(month: number) {
    return MONTHS[month - 1];
  }

  getMonthFullName(month: number) {
    return MONTHS[month - 1];
  }

  getWeekdayLabel(weekday: number, width?: TranslationWidth) {
    return WEEKDAYS[weekday - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  selector: 'app-calendar-view-bonvino',
  templateUrl: './calendar-view-bonvino.component.html',
  styleUrls: ['./calendar-view-bonvino.component.css'],
  providers: [
    {provide: NgbDatepickerI18nIslamic, useClass: NgbDatepickerI18nIslamic},
    {provide: NgbDatepickerI18nIslamicUmalqura, useClass: NgbDatepickerI18nIslamicUmalqura}
  ]
})
export class CalendarViewBonvinoComponent implements OnInit {


  innerTrigger = new ReplaySubject(1);
  // @ts-ignore
  @Input() trigger;
  // @ts-ignore
  @Input() type;
  // @ts-ignore
  @Input() schemaData;
  // @ts-ignore
  @Input() downloadedData: FormControl;

  DAYS_OF_WEEK = {
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday'
  };

  dayOfWeekArrView = [];
  dayOfYearArrView = [];

  calendarArr = [
    {name: 'grigorian'},
    {name: 'jewish'},
  ];

  form = new FormGroup({


    dayOfWeekArr: new FormArray([]),
    dayOfYearArr: new FormArray([]),

  });

  languageArr = languagesInterface;

  constructor(
    public langService: LanguageServiceService,
    public dialog: MatDialog,
    public service: RequestsService,
    public downloadingService: DownloadDataServiceService,
    public i18n: NgbDatepickerI18n,
    public i18nHebrew: NgbDatepickerI18nHebrew,
    public i18nIslamic: NgbDatepickerI18nIslamic,
    public i18nIslamicUmalqura: NgbDatepickerI18nIslamicUmalqura

  ) {

  }


  ngOnInit(): void {


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

// @ts-ignore
        if (dd.dayOfWeekArr) {

          dd.dayOfWeekArr.forEach(x => {
            this.addDayOfWeek(x);
          });
        }
// @ts-ignore
        if (dd.dayOfWeekArr) {

          // this.dayOfYearArrView = dd.dayOfYearArr;
          dd.dayOfYearArr.forEach(x => {
            let i18n;
            if(x.type == 'jewish') {
              i18n = this.i18nHebrew;
            } else if(x.type == 'islamic') {
              i18n = this.i18nIslamic;
            } else if(x.type == 'islamic-umm-al-qura') {
              i18n = this.i18nIslamicUmalqura;
            } else {
              i18n = this.i18n;
            }

            const dayOfYear = {

              isOpen: x.isOpen,
              everyYear: x.everyYear,
              wholeDay: x.wholeDay,
              type: x.type,
              oneDay: false,
              language: x.language,
              appointment: x.appointment,


              timeFrom: null,
              timeTo: null,

              dayFrom: x.dayFrom,
              dayTo: x.dayTo,

              monthFrom: i18n.getMonthFullName(x.monthFrom),
              monthTo: i18n.getMonthFullName(x.monthTo),

              yearFrom: i18n.getYearNumerals(x.yearFrom),
              yearTo: i18n.getYearNumerals(x.yearTo),


            };




            if(this.isLastOneCorrect(x.timeFrom) && this.isLastOneCorrect(x.timeTo) && !x.wholeDay){
              dayOfYear.timeFrom = x.timeFrom;
              dayOfYear.timeTo = x.timeTo;
            } else {
              dayOfYear.wholeDay = true;
            }
            if(x.dayFrom == x.dayTo && x.monthFrom == x.monthTo && x.yearFrom == x.yearTo) {
              dayOfYear.oneDay = true;
            }
            if(!x.dayTo && !x.monthTo && !x.yearTo) {
              dayOfYear.oneDay = true;
            }


            this.dayOfYearArrView.push(dayOfYear);

            //   dayFrom: 12
            // dayTo: 23
            // everyYear: true
            // isOpen: false
            // monthFrom: 9
            // monthTo: 10
            // timeFrom: ""
            // timeTo: ""
            // trigger: 1
            // type: "grigorian"
            // wholeDay: true
            // yearFrom: 2021

            // const asdfgh = {
            //
            //
            //
            // };
            //
            // this.addDayOfYear(x);
          });
        }

        // this.i18nHebrew.getMonthFullName(4);

        console.log(this.dayOfYearArrView);
        // console.log(this.i18nHebrew.getMonthFullName(4));
        // console.log(this.i18n.getMonthFullName(4));
      } catch (e) {console.log(e)}
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

    // if (this.langService.editable) {
    //   return;
    // }
    // if (point) {
    //   (this.dayOfWeekArr as FormArray).push(this.getFormDayOfWeek(point));
    // } else {
    //   (this.dayOfWeekArr as FormArray).push(this.getBlancFormDayOfWeek());
    // }

    this.dayOfWeekArrView.push(this.getFormDayOfWeek(point));


  }

  isLastOneCorrect(time) {
    try {
      const regex = /\d{1,2}:\d{2}/;
      if(time.match(regex)) {
        return true;
      }
    } catch (e) {
    }
    return false
  }

  getFormDayOfWeek(point) {


    const daysObj = JSON.parse(point.days);

    const days = [];
    Object.keys(daysObj).forEach((d, i) => {

      // console.log(d);
      // console.log(daysObj[d]);

      const lastDay = {
        day: this.DAYS_OF_WEEK[d],
        time: []
      };
      days.push(lastDay);
      let lastOne = null;

      daysObj[d].forEach((t, i) => {
        if(i % 2 == 0) {
          lastOne = {
            from: t,
            to: null
          }
        } else {
          lastOne.to = t;

          if(this.isLastOneCorrect(lastOne.to) && this.isLastOneCorrect(lastOne.from)) {
            lastDay.time.push(lastOne);
          }
        }
      })
      // if(d.length) {
      //
      // }

    })



    const res = {
      days,
      isOpen: point.isOpen,
      language: point.language,
      appointment: point.appointment,
    };

    // const res = new FormGroup({
    //   days: new FormControl(point.days),
    //   isOpen: new FormControl(point.isOpen),
    // });
    // res.get('days').valueChanges.subscribe(value => {
    //   this.write();
    // });
    // res.get('isOpen').valueChanges.subscribe(value => {
    //   this.write();
    // });
    // res.valueChanges.subscribe(value => {
    //   this.write();
    // });
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
