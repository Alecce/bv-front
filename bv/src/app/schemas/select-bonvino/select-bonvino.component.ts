import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {LanguageServiceService} from '../../services/language-service.service';

@Component({
  selector: 'app-select-bonvino',
  templateUrl: './select-bonvino.component.html',
  styleUrls: ['./select-bonvino.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectBonvinoComponent implements OnInit {

  @ViewChild('container') private container: ElementRef;
  @Output() menuOpened = new EventEmitter<boolean>();
  @Input() form: FormGroup;
  @Input() formArray: FormArray;
  @Input() formControlName_;
  @Input() invalid = false;
  @Input() disabled = false;
  @Input() scallable = false;
// // @ts-ignore
//   @ViewChild('icon1') public icon1: IconBonvinoComponent;
// // @ts-ignore
//   @ViewChild('icon2') public icon2: IconBonvinoComponent;


  isMenuOpened = false;

  constructor(
    public langService: LanguageServiceService
  ) { }

  ngOnInit() {
  }

  choose(value) {
    if (this.langService.editable) {
      return;
    }
    if (this.form) {
      // console.log(this.form.controls)
      this.form.get(this.formControlName_).setValue(value);
      // this.dropdown.close();
    }
    if (this.formArray) {
      this.formArray.at(this.formControlName_ * 1).setValue(value);
      // this.dropdown.close();
    }
  }
  get value() {
    if (this.form) {
      return this.form.get(this.formControlName_).value;
    }
    if (this.formArray) {
      return this.formArray.at(this.formControlName_ * 1).value;
    }
  }
  // paintMouseOver(color) {
  //   this.icon1.paintSpecial( color);
  //   this.icon2.paintSpecial( color);
  // }
  isBigScreen() {
    return window.innerWidth > 1080
  }
  isMobileScreen() {
    return window.innerWidth < 768
  }
  isTinyScreen() {
    return window.innerWidth < 540
  }
  public getWidth() {

    // console.log(this.container);
    if(this.container && this.container.nativeElement && this.container.nativeElement.offsetWidth) {

      // console.log(this.container.nativeElement.offsetWidth);
      return this.container.nativeElement.offsetWidth - ((this.isBigScreen() || this.isTinyScreen()) ? 18 : 40);
    }
  }
  onMenuOpened() {
    // console.log($event);
// @ts-ignore
    this.menuOpened.emit(true);

    this.isMenuOpened = true;
  }
  onMenuClosed() {

    this.isMenuOpened = false;
  }

  clickOnMenu($event) {
    if(this.langService.editable) {
      $event.stopPropagation();
    }
  }
  isOcean() {
    return !this.disabled && !this.invalid;
  }
  isWine() {
    return !this.disabled && !this.invalid && !this.isMenuOpened;
  }
  isDisabled() {

    return this.disabled;
  }
  isInvalid() {
    return this.invalid;

  }
}
