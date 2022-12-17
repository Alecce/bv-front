import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LanguageServiceService} from '../services/language-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form = new FormGroup({
    type: new FormControl()
  });

  constructor(public langService: LanguageServiceService) { }

  ngOnInit() {
  }

  get type() {
    return this.form.get('type');
  }

}
