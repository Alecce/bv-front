import {Component, Input, OnInit} from '@angular/core';
import {NgbCalendar, NgbCalendarHebrew, NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-grigorian',
  templateUrl: './grigorian.component.html',
  styleUrls: ['./grigorian.component.css'],
  providers: [
    {provide: NgbCalendarHebrew, useClass: NgbCalendarHebrew},
    // {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nHebrew}
  ]
})
export class GrigorianComponent implements OnInit {


  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;


  @Input() formGroup_: FormControl;
  // @Input() toFormControl: FormControl;


  model: NgbDateStruct;
  date: {year: number, month: number};

  constructor(
    private calendar: NgbCalendar,
    private calendarJewish: NgbCalendarHebrew,
  ) {
    // this.dayTemplateData = this.dayTemplateData.bind(this);
  }

  ngOnInit(): void {

    if(this.formGroup_.get('dayFrom').value &&
      this.formGroup_.get('monthFrom').value &&
      this.formGroup_.get('yearFrom').value) {

      this.fromDate = new NgbDate(
        this.formGroup_.get('yearFrom').value,
        this.formGroup_.get('monthFrom').value,
        this.formGroup_.get('dayFrom').value
      );
    }


    if(this.formGroup_.get('dayTo').value &&
      this.formGroup_.get('monthTo').value &&
      this.formGroup_.get('yearTo').value) {

      this.toDate = new NgbDate(
        this.formGroup_.get('yearTo').value,
        this.formGroup_.get('monthTo').value,
        this.formGroup_.get('dayTo').value
      );
    }
  }


  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    if(this.toDate) {

      this.formGroup_.get('dayTo').setValue(this.toDate.day);
      this.formGroup_.get('monthTo').setValue(this.toDate.month);
      this.formGroup_.get('yearTo').setValue(this.toDate.year);

    } else {

      this.formGroup_.get('dayTo').setValue('');
      this.formGroup_.get('monthTo').setValue('');
      this.formGroup_.get('yearTo').setValue('');

    }

    if(this.fromDate) {

      this.formGroup_.get('dayFrom').setValue(this.fromDate.day);
      this.formGroup_.get('monthFrom').setValue(this.fromDate.month);
      this.formGroup_.get('yearFrom').setValue(this.fromDate.year);

    } else {

      this.formGroup_.get('dayFrom').setValue('');
      this.formGroup_.get('monthFrom').setValue('');
      this.formGroup_.get('yearFrom').setValue('');

    }

  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }
}
