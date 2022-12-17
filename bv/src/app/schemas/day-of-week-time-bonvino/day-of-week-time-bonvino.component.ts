import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {DownloadDataServiceService} from '@src/app/services/download-data-service.service';
import {RequestsService} from '@src/app/services/api/requests.service';
import {MatDialog} from '@angular/material/dialog';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-day-of-week-time-bonvino',
  templateUrl: './day-of-week-time-bonvino.component.html',
  styleUrls: ['./day-of-week-time-bonvino.component.css']
})
export class DayOfWeekTimeBonvinoComponent implements OnInit {


  // @ts-ignore
  @Input() type;
  // @ts-ignore
  @Input() trigger: Subject;
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

  formVisitTime = new FormGroup({
    0: new FormArray([]),
    1: new FormArray([]),
    2: new FormArray([]),
    3: new FormArray([]),
    4: new FormArray([]),
    5: new FormArray([]),
    6: new FormArray([])
  });



  form = new FormGroup({

    // country: new FormControl(0),
    // regionsForm: new FormArray([
    //   new FormControl(0),
    //   new FormControl(0),
    //   new FormControl(0),
    //   new FormControl(0),
    //   new FormControl(0),
    //   new FormControl(0),
    // ]),

  });
  constructor(
    public langService: LanguageServiceService,
    public dialog: MatDialog,
    public service: RequestsService,
    public downloadingService: DownloadDataServiceService,
    ) { }

  ngOnInit(): void {


    this.refresh();

    this.downloadedData.valueChanges.subscribe(change => {
      console.log('refresh');
      this.refresh();
    });


    this.formVisitTime.valueChanges.subscribe(value => {
      console.log(this.formVisitTime.value);
      this.write();
    });

  }


  write() {

    // console.log('!!!');
    this.downloadedData.setValue(JSON.stringify(this.formVisitTime.value), {emitEvent: false});
    this.trigger.next(false);
    this.trigger.next(true);
  }

  refresh() {
    console.log(this.downloadedData.value);

     if(this.downloadedData.value) {

      try{
        const dd = JSON.parse(this.downloadedData.value);

// @ts-ignore
        if (dd) {
// @ts-ignore
//           const timeData = JSON.parse(dd);
          const timeData = dd;
          // console.log(timeData);
          Object.keys(timeData).forEach(key => {

            // console.log(key);
            // console.log(timeData[key]);
            if (timeData[key] !== '' && timeData[key]) {

              timeData[key].forEach(x => {

                const time = new FormControl(x);

                time.valueChanges.subscribe(value => {
                  this.write();
                });
                const day = key;
                // this.removeTimeRange(day, 0);
                this.times(day).push(time);
              })

            }
          });
        }
      } catch (e) {}
      // this.is_fahrenheit.setValue(dd.is_fahrenheit, {emitEvent: false});
      // this.temperature_f.setValue(dd.temperature_f, {emitEvent: false});
      // this.temperature.setValue(dd.temperature, {emitEvent: false});
    } else {

      // this.is_fahrenheit.setValue('0', {emitEvent: false});
      // this.temperature_f.setValue('', {emitEvent: false});
      // this.temperature.setValue('', {emitEvent: false});
    }
  }


  get days() {
    return this.formVisitTime.controls;
  }

  get daysKeys() {
    return Object.keys(this.days);
  }

  times(day): FormArray {
    return (this.formVisitTime.get(day) as FormArray);
  }

  addTimeRange(day) {
    if (this.langService.editable) {
      return;
    }
    const firstRange = new FormControl('', Validators.required);
    const secongRange = new FormControl('', Validators.required);

    firstRange.valueChanges.subscribe(value => {
      this.write();
    });
    secongRange.valueChanges.subscribe(value => {
      this.write();
    });
    this.times(day).push(firstRange);
    this.times(day).push(secongRange);
    this.write();
  }

  removeTimeRange(day, time) {
    if (this.langService.editable) {
      return;
    }
    this.times(day).removeAt(time);
    this.times(day).removeAt(time);
    this.write();
  }
}
