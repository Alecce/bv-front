import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {TranscludeDirective} from '@src/app/language/text/transclude.directive';
import {FormControl, FormGroup} from '@angular/forms';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-text-complicated',
  templateUrl: './text-complicated.component.html',
  styleUrls: ['./text-complicated.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComplicatedComponent implements OnInit, OnDestroy, AfterViewInit {

  @ContentChild(TranscludeDirective, { read: TemplateRef }) transcludeTemplate;
  @Input() page;
  @Input() place;
  @Input() segment;
  @Input() default;
  @Input() textarea;
  @Input() content;

  arrInner = [];
  name = new ReplaySubject(10);
  currentName;

// @ts-ignore
  @ViewChild('copyElement') public copyElement;
// @ts-ignore
  @ViewChild('pasteElement') public pasteElement;

  type = 'complicated';
  form = new FormGroup({
    input: new FormControl('')
  });
  constructor(
    private changeDetector: ChangeDetectorRef,
    public langService: LanguageServiceService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {


    this.langService.editableSubject.subscribe(() => {
      this.changeDetector.detectChanges();
    });


    if (!this.place) {
      this.place = this.langService.morphStr(this.default);
    }
    if (!this.segment) {
      this.segment = '';
    } else {
      // console.log(this.segment);
    }
    this.langService.download.subscribe(dl => {
      if (dl) {
        this.form.get('input').setValue(this.langService.getText(this.page, this.segment, this.place), {emitEvent:false});
        this.form.get('input').valueChanges.subscribe((value) => {
          this.langService.setText(this.page, this.segment, this.place, value);
          console.log(this.langService.getText(this.page, this.segment, this.place));
        });
        this.changeDetector.detectChanges();
      }
    });
    this.langService.languageChanged.subscribe(dl => {
      if (dl) {

        const isChanged = this.langService.isChanged;
        this.form.get('input').setValue(this.langService.getText(this.page, this.segment, this.place), {emitEvent:false});
        this.langService.isChanged = isChanged;
      }
    });
    this.currentName = this.langService.getKey(this.page, this.segment, this.place);
    this.name.next(this.currentName);



    // console.log('');
    this.langService.addToTranslationListMap(this.page, this.segment, this.place, this.default);
    // console.log('test');
    this.langService.addToCurrentPageMap(this.page, this.segment, this.place, this.default, this.type, null);


    // this.changeDetector.detectChanges();
  }
  get text() {
    return this.langService.getText(this.page, this.segment, this.place);
  }
  get textEng() {
    return this.langService.getTextInEnglish(this.page, this.segment, this.place);
  }
  get placeHolder() {
    return this.langService.getTextInEnglish(this.page, this.segment, this.place) || this.default;
  }

  get splittedText() {
    const text = this.text || this.textEng || this.default;

    const res = text.split('***');
    // console.log(res);
    return res;
  }

  ngOnDestroy(): void {
    this.langService.removeFromCurrentPageMap(this.page, this.segment, this.place);
  }

  isPainted() {
    return this.langService.isPainted(this.page, this.segment, this.place);
  }

  ngAfterViewInit(): void {
    // console.log(this.copyElement);
    // console.log(this.copyElement.nativeElement);
    // const button = this.renderer.createElement('button');
    // const buttonText = this.renderer.createText('This is a button');
    // this.renderer.appendChild(button, buttonText);
    // console.log(button)
    // // this.renderer.appendChild(this.pasteElement.nativeElement, this.copyElement);
    // this.renderer.appendChild(this.pasteElement.nativeElement, this.copyElement.nativeElement);
    // this.langService.addToCurrentPageMap(this.page, this.segment, this.place, this.default, this.type, this.copyElement);
    // if(this.content) {
    //   this.renderer.appendChild(this.pasteElement, this.content);
    // }

    this.changeDetector.detectChanges();
  }


  get getArrInner() {
    const arrInner = [];
    const map = this.langService.getCurrentComplicatedListsMap().get(this.currentName);

    console.log(map);
    console.log(this.langService.getCurrentComplicatedListsMap());
    console.log(this.currentName);
    if(map) {

      map.forEach((value, key) => {
        // console.log(key);
        // console.log(value);
        if(value.counter > 0) {
          arrInner.push({page: value.page, segment: value.segment, place: value.place, default: value.default, type: value.type});
        }
      });
    }
    // this.langService.getCurrentComplicatedListsMap().
    return arrInner;
  }

  click() {

    console.log('click');
    this.changeDetector.detectChanges();
  }
}
