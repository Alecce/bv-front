import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-checkbox-bonvino',
  templateUrl: './checkbox-bonvino.component.html',
  styleUrls: ['./checkbox-bonvino.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxBonvinoComponent implements OnInit {

  // @ViewChild(NgbDropdown, {static: false}) private dropdown: NgbDropdown;
  @Input() form: FormGroup;
  @Input() arr: FormArray;
  @Input() reactOnlyToNegative = false;
  @Input() reactOnlyToPositive = false;
  @Input() isDisabledCheckbox = false;
  @Input() formControlName_;


// // @ts-ignore
//   @ViewChild('icon1') public icon1: IconBonvinoComponent;

  constructor(
    private changeDetector: ChangeDetectorRef,
    ) { }

  ngOnInit() {


    this.place.valueChanges.subscribe(() => {
      this.changeDetector.detectChanges();
    });

  }

  check() {
    // if (this.form) {
    //   this.form.get(this.formControlName_).setValue(!this.form.get(this.formControlName_).value);
    // }
    // if (this.arr) {
    //   this.arr.at(this.formControlName_).setValue(!this.arr.at(this.formControlName_).value);
    // }
    console.log('check')
    if(this.isDisabledCheckbox) {
       return;
    }
    if(this.reactOnlyToPositive && this.value) {
      return;
    }
    if(this.reactOnlyToNegative && !this.value) {
      return;
    }
    this.place.setValue(!this.value);
  }
  hide() {
    // console.log('hide')
    if (this.form) {

      return this.form.controls[this.formControlName_].value;
    }
    if (this.arr) {
      return this.arr.at(this.formControlName_).value;
    }
  }
  get place() : AbstractControl {
    if (this.form) {
      return this.form.controls[this.formControlName_];
    }
    if (this.arr) {
      return this.arr.at(this.formControlName_);
    }
  }
  get value() {
    if (this.form) {
      return this.form.controls[this.formControlName_].value;
    }
    if (this.arr) {
      return this.arr.at(this.formControlName_).value;
    }
  }
  paintMouseOver(color) {
    // this.icon1.paintSpecial( color);
  }
}
