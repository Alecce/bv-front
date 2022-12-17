import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RequestsService} from '@src/app/services/api/requests.service';
import {MatDialog} from '@angular/material/dialog';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {
  NgbCalendar,
  NgbCalendarHebrew,
  NgbCalendarIslamicCivil,
  NgbCalendarIslamicUmalqura,
  NgbDate
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar-search',
  templateUrl: './calendar-search.component.html',
  styleUrls: ['./calendar-search.component.css']
})
export class CalendarSearchComponent implements OnInit {


  // @ts-ignore
  @Input() formGroup_: FormGroup;

  constructor(
    public langService: LanguageServiceService,
    public dialog: MatDialog,
    public service: RequestsService,
    public downloadingService: DownloadDataServiceService,
    private calendar: NgbCalendar,
    private calendarJewish: NgbCalendarHebrew,
    private calendarIslamic: NgbCalendarIslamicCivil,
    private calendarIslamicUmalqura: NgbCalendarIslamicUmalqura,
    // private calendarPersian: NgbCalendarPersian,
    // private calendarBuddhist: NgbCalendarBuddhist,
    ) { }

  ngOnInit(): void {


    this.formGroup_.addControl('date', new FormControl(''));
    this.formGroup_.addControl('time', new FormControl(''));

    this.formGroup_.addControl('dayOfWeek', new FormControl(''));
    this.formGroup_.addControl('day', new FormControl(''));
    this.formGroup_.addControl('month', new FormControl(''));
    this.formGroup_.addControl('year', new FormControl(''));

    this.formGroup_.addControl('dayJ', new FormControl(''));
    this.formGroup_.addControl('monthJ', new FormControl(''));
    this.formGroup_.addControl('yearJ', new FormControl(''));

    // this.formGroup_.addControl('dayJl', new FormControl(''));
    // this.formGroup_.addControl('monthJl', new FormControl(''));
    // this.formGroup_.addControl('yearJl', new FormControl(''));

    this.formGroup_.addControl('dayI', new FormControl(''));
    this.formGroup_.addControl('monthI', new FormControl(''));
    this.formGroup_.addControl('yearI', new FormControl(''));

    this.formGroup_.addControl('dayIuaq', new FormControl(''));
    this.formGroup_.addControl('monthIuaq', new FormControl(''));
    this.formGroup_.addControl('yearIuaq', new FormControl(''));

    // this.formGroup_.addControl('dayB', new FormControl(''));
    // this.formGroup_.addControl('monthB', new FormControl(''));
    // this.formGroup_.addControl('yearB', new FormControl(''));

    this.formGroup_.get('date').valueChanges.subscribe(x => {
      if(x) {
        const arr = x.split('-');
        console.log(arr);
        const data = new NgbDate(arr[0] * 1, arr[1] * 1, arr[2] * 1);
        const jsDate = new Date(data.year, data.month - 1, data.day);
        const dataJ = this.calendarJewish.fromGregorian(data);
        // const dataJl = this.calendarPersian.fromGregorian(data);
        const dataI = this.calendarIslamic.fromGregorian(jsDate);
        const dataIuaq = this.calendarIslamicUmalqura.fromGregorian(jsDate);
        // const dataB = this.calendarBuddhist.fromGregorian(data);
        // const data = this.calendarJewish.toGregorian(dataJ);

        this.formGroup_.get('day').setValue(data.day);
        this.formGroup_.get('month').setValue(data.month);
        this.formGroup_.get('year').setValue(data.year);
        this.formGroup_.get('dayOfWeek').setValue(this.calendar.getWeekday(data));

        this.formGroup_.get('dayJ').setValue(dataJ.day);
        this.formGroup_.get('monthJ').setValue(dataJ.month);
        this.formGroup_.get('yearJ').setValue(dataJ.year);

        this.formGroup_.get('dayI').setValue(dataI.day);
        this.formGroup_.get('monthI').setValue(dataI.month);
        this.formGroup_.get('yearI').setValue(dataI.year);

        this.formGroup_.get('dayIuaq').setValue(dataIuaq.day);
        this.formGroup_.get('monthIuaq').setValue(dataIuaq.month);
        this.formGroup_.get('yearIuaq').setValue(dataIuaq.year);


        console.log(data);
        console.log(dataJ);
      } else {

        this.formGroup_.get('day').setValue('');
        this.formGroup_.get('month').setValue('');
        this.formGroup_.get('year').setValue('');
        this.formGroup_.get('dayOfWeek').setValue('');

        this.formGroup_.get('dayJ').setValue('');
        this.formGroup_.get('monthJ').setValue('');
        this.formGroup_.get('yearJ').setValue('');

        this.formGroup_.get('dayI').setValue('');
        this.formGroup_.get('monthI').setValue('');
        this.formGroup_.get('yearI').setValue('');

        this.formGroup_.get('dayIuaq').setValue('');
        this.formGroup_.get('monthIuaq').setValue('');
        this.formGroup_.get('yearIuaq').setValue('');
      }
    });




    console.log(this.formGroup_.value);

  }

}
