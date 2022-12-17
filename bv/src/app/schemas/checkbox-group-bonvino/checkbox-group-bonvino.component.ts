import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-checkbox-group-bonvino',
  templateUrl: './checkbox-group-bonvino.component.html',
  styleUrls: ['./checkbox-group-bonvino.component.css']
})
export class CheckboxGroupBonvinoComponent implements OnInit {

  // @ViewChild(NgbDropdown, {static: false}) private dropdown: NgbDropdown;
  @Input() form: FormGroup;
  @Input() formControlName_: string;
  @Input() _: string;

  constructor() { }

  ngOnInit() {
  }

  check() {
    this.form.get(this.formControlName_).setValue(!this.form.get(this.formControlName_).value);
  }
  get hide() {
    return this.form.get(this.formControlName_).value;
  }
}
