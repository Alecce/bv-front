import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-radio-bonvino',
  templateUrl: './radio-bonvino.component.html',
  styleUrls: ['./radio-bonvino.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioBonvinoComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() formControlName_: string;
  @Input() value_: string;
  @Input() resetValue;
  @Input() resetable;
  @Input() nomargin = false;


  constructor(
    private changeDetector: ChangeDetectorRef,
    ) { }

  ngOnInit() {

    this.form.get(this.formControlName_).valueChanges.subscribe(() => {
      this.changeDetector.detectChanges();
    });

  }

  check() {
    if(!this.form.get(this.formControlName_).disabled) {
      if(!this.resetable || this.form.get(this.formControlName_).value !== this.value_) {
        this.form.get(this.formControlName_).setValue(this.value_);
      } else {
        this.form.get(this.formControlName_).setValue(this.resetValue);
      }
    }
  }
  get hide() {
    return this.form.get(this.formControlName_).value == this.value_;
  }
  getInner() {
    if (this.form.get(this.formControlName_).value != this.value_) {
      return 'radio-bonvino-inner-unchecked';
    } else {
      return 'radio-bonvino-inner-checked';
    }
  }

  isDisabled() {
    if (this.form.get(this.formControlName_).disabled) {
      return 'radio-bonvino-disabled';
    } else {
      return '';
    }
  }
}
