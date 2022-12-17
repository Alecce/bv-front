import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-visitinghours',
  templateUrl: './visitinghours.component.html',
  styleUrls: ['./visitinghours.component.css']
})
export class VisitinghoursComponent implements OnInit {

  @Input() timeDataForParse;
  @Input() timeData;
  visitTime = [
    {text: '', day: 'Monday'},
    {text: '', day: 'Tuesday'},
    {text: '', day: 'Wednesday'},
    {text: '', day: 'Thursday'},
    {text: '', day: 'Friday'},
    {text: '', day: 'Saturday'},
    {text: '', day: 'Sunday'},
  ];
  constructor() { }

  ngOnInit(): void {
    let timeData;
    try {
       timeData = JSON.parse(this.timeDataForParse);
    } catch (e) {
      timeData = this.timeData || {};
    }
    console.log(timeData);
    // const timeData = this.timeData;
    Object.keys(timeData).forEach(key => {
      if (timeData[key] !== '') {
        const day = key[2];
        const type = key[0];
// @ts-ignore
        if (this.visitTime[day * 1].text != '' && type == 'f') {
// @ts-ignore
          this.visitTime[day * 1].text += ', ';
        }
        // this.times(day).push(new FormControl(timeData[key]));
        if (type == 't') {
// @ts-ignore
          this.visitTime[day * 1].text += ' - ';
        }

        const time = timeData[key].replace(/(\:)(?=\d$)/, ':0');

// @ts-ignore
        this.visitTime[day * 1].text += time;
      }
    });
    this.visitTime.unshift(this.visitTime.pop());
  }

}
