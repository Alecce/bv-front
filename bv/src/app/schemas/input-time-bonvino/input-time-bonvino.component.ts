import {Component, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-input-time-bonvino',
  templateUrl: './input-time-bonvino.component.html',
  styleUrls: ['./input-time-bonvino.component.css']
})
export class InputTimeBonvinoComponent implements OnInit {

  @ViewChild('minute') private minute: HTMLElement;
  @Input() formControl_: FormControl;

  hourEntered = false;


  innerForm = new FormGroup({
    hour: new FormControl(''),
    minute: new FormControl(''),
  });

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.innerForm.get('hour').setValue(this.getHour(this.formControl_.value), {emitEvent: false});
    this.innerForm.get('minute').setValue(this.getMinute(this.formControl_.value), {emitEvent: false});

    this.formControl_.valueChanges.subscribe(x => {

      console.log(x)
      this.innerForm.get('hour').setValue(this.getHour(x), {emitEvent: false});
      this.innerForm.get('minute').setValue(this.getMinute(x), {emitEvent: false});
    });
    this.innerForm.get('hour').valueChanges.subscribe(x => {
      if (x > 23 ) {
        this.innerForm.get('hour').setValue(23);
      }
      if (x < 0 ) {
        this.innerForm.get('hour').setValue(0);
      }
      // console.log(this.minute);
      if (!this.hourEntered && x >= 10) {
        this.hourEntered = true;
        // console.log(this.minute);
// @ts-ignore
        this.minute.nativeElement.focus();
        // const icon = element['_elementRef'].nativeElement.getElementsByClassName('iconWineClass')[0];
        // this.renderer.setAttribute(icon, 'stroke', 'red');
        // this.searchElement.nativeElement.focus();
        // this.minute.
      }

      // console.log(this.formControl_.value);
      // console.log(this.time);
      // this.formControl_.setValue(this.time, {emitEvent: false});
      this.formControl_.setValue(this.time);
    });
    this.innerForm.get('minute').valueChanges.subscribe(x => {
      // console.log(x);
      // console.log(x !== null);
      // console.log(x !== 0);
      // console.log(x !== '0');
      // console.log((!x || x < 0));
      // console.log(x !== '');
      if (x > 59 ) {
        this.innerForm.get('minute').setValue(59, {emitEvent: false});
      }
      if ((x !== null && x !== 0  && x !== '0' && (!x || x < 0) && x !== '') ) {
        this.innerForm.get('minute').setValue('00', {emitEvent: false});
      }
      // if (!x) {
      //   this.innerForm.get('minute').setValue('00', {emitEvent: false});
      // }
      // console.log(this.formControl_.value);
      // console.log(this.time);
      // this.formControl_.setValue(this.time, {emitEvent: false});
      this.formControl_.setValue(this.time);
    });

    // this.innerForm.get('minute').statusChanges.subscribe(x => {
    // })
  }

  // choose(value) {
  //   this.form.get(this.formControlName_).setValue(value);
  //   this.dropdown.close();
  // }
  get time() {
    if(this.innerForm.get('hour').value === null && this.innerForm.get('minute').value === null) {
      return '';
    }
    return this.innerForm.get('hour').value + ':' + this.innerForm.get('minute').value;
  }
  getHour(str) {
    // console.log(str);
    // const d = Date.parse(str);
    // console.log(d.getHours());
    // return d.getHours();

    try {

      const hours = str.match(/[\d]{1,2}(?=:)/);
      return hours;

    } catch (e) {

      return '';
    }

    // console.log(hours);
  }
  getMinute(str) {
    // console.log(str);
    let minutes = str.match(/\:[\d]{1,2}/);
    // console.log(minutes);
    if (minutes) {
      minutes = minutes[0].substr(1);
    }
    if (minutes === '0') {
      minutes = '00';
    }
    return minutes;
    // const d = Date.parse(str);
    // console.log(d.getMinutes());
    // return d.getMinutes();
  }
  renderMinutes() {
    if(!this.innerForm.get('minute').value && this.innerForm.get('minute').value !== '' && this.innerForm.get('minute').value !== null) {
      this.innerForm.get('minute').setValue('00');

    }
// @ts-ignore
    if((this.innerForm.get('minute').value + '').length == 1) {

      this.innerForm.get('minute').setValue('0' + (this.innerForm.get('minute').value + ''));
    }
  }
}
