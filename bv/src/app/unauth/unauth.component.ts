import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-unauth',
  templateUrl: './unauth.component.html',
  styleUrls: ['./unauth.component.css']
})
export class UnauthComponent implements OnInit {
  LOGIN = 'login';
  REGISTRATION = 'registration';
  option = this.LOGIN;
  constructor() { }

  ngOnInit() {
  }
  chose(str) {
    this.option = str;
  }
  getButtonColor(str) {
    return str === this.option ? 'btn-primary' : '';
  }
}
