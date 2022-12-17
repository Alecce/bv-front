import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import {IconBonvinoComponent} from '../icon-bonvino/icon-bonvino.component';

@Component({
  selector: 'app-select-search-bonvino',
  templateUrl: './select-search-bonvino.component.html',
  styleUrls: ['./select-search-bonvino.component.css']
})
export class SelectSearchBonvinoComponent implements OnInit, OnChanges {

  @ViewChild('container') private container: ElementRef;
  @ViewChild(NgbDropdown) private dropdown: NgbDropdown;
  @Input() form: FormGroup;
  @Input() formControlName_: string;
  @Input() disabled = false;
  @Input() scallable = false;
  isFocus = false;

// @ts-ignore
  @ViewChild(IconBonvinoComponent) public icon: IconBonvinoComponent;

  innerForm = new FormGroup({
    search: new FormControl(''),
  });

  constructor() { }

  ngOnInit() {
    this.innerForm.get('search').valueChanges.subscribe(value => {
      this.form.get(this.formControlName_).setValue(value);

      // this.dropdown.open();
    });
  }

  choose(value) {
    this.form.get(this.formControlName_).setValue(value);
    // this.dropdown.close();
  }
  get value() {
    return this.form.get(this.formControlName_).value;
  }
  close() {
    // this.dropdown.close();
  }
  paintMouseOver(color) {
    if(this.disabled) {
      return;
    }
    if (!this.isFocus) {
      this.icon.paintSpecial( color);
    }
  }
  paintFocusOn(color) {
    if(this.disabled) {
      return;
    }
    this.isFocus = true;
    this.icon.paintSpecial( color);
  }
  paintFocusOff(color) {
    if(this.disabled) {
      return;
    }
    this.isFocus = false;
    this.icon.paintSpecial( color);
  }
  get focusClass() {
    if (this.disabled) {
      return 'field-input-pre';
    }
    if (this.isFocus) {
      return 'field-input-pre-focus';
    } else {
      return 'field-input-pre';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.disabled) {
      this.innerForm.get('search').disable();
    } else {
      this.innerForm.get('search').enable();
    }
  }
  public getWidth() {

    // console.log(this.container);
    if(this.container && this.container.nativeElement && this.container.nativeElement.offsetWidth) {

      // console.log(this.container.nativeElement.offsetWidth);
      return this.container.nativeElement.offsetWidth - ((this.isBigScreen() || this.isTinyScreen()) ? 18 : 40);
    }
  }
  isBigScreen() {
    return window.innerWidth > 1080
  }

  isMobileScreen() {
    return window.innerWidth < 768
  }
  isTinyScreen() {
    return window.innerWidth < 540
  }
}
