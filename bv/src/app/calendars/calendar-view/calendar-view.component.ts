import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {

  // @ts-ignore
  @Input() calendarData;

  constructor() { }

  ngOnInit(): void {
  }

}
