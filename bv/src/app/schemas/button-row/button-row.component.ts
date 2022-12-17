import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-row',
  templateUrl: './button-row.component.html',
  styleUrls: ['./button-row.component.css']
})
export class ButtonRowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isBigScreen() {
    return window.innerWidth > 1080
  }
}
