import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LanguageServiceService} from '../../services/language-service.service';
import {TranscludeDirective} from '@src/app/language/text/transclude.directive';
import {Subject} from 'rxjs';
import {debounceTime, delay, map} from 'rxjs/operators';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent implements OnInit, OnDestroy, OnChanges {

  @ContentChild(TranscludeDirective, { read: TemplateRef }) transcludeTemplate;
  @Input() page;
  @Input() place;
  @Input() segment;
  @Input() language;
  @Input() languageFormControl;
  @Input() default;
  @Input() textarea;
  @Input() parent: Subject<any>;


  type = 'simple';
  translatedValue = '';
  paintedClass = '';

  constructor(
    private changeDetector: ChangeDetectorRef,
    public langService: LanguageServiceService
  ) { }

  ngOnInit() {

    // this.langService.editableSubject.subscribe(() => {
    //   this.changeDetector.detectChanges();
    // });


    this.translatedValue = this.default;

    this.langService.downloadNewText.subscribe(() => {
      this.translatedValue = this.getText();
    });
    if (!this.place) {
      this.place = this.langService.morphStr(this.default);
    }
    if (!this.segment) {
      this.segment = '';
    } else {
      // console.log(this.segment);
    }

    // this.form.get('input').valueChanges
    //
    //   .pipe ( debounceTime(1000) )
    //   .pipe (
    //   map(data => {
    //     this.currentRows = this.minRows;
    //   }) ).pipe ( delay( 100 ) ).subscribe((value) => {
    //     if(this.ta) {
    //
    //       if(this.currentRows < this.maxRows && this.ta.nativeElement.scrollHeight > this.ta.nativeElement.offsetHeight) {
    //         this.currentRows = Math.min(Math.ceil((this.ta.nativeElement.scrollHeight - 23) / 24), this.maxRows)
    //       }
    //     }
    //   });


    // this.form.get('inputUniversal').valueChanges
    //
    //   .pipe ( debounceTime(1000) )
    //   .pipe (
    //     map(data => {
    //       this.currentRows = this.minRows;
    //     }) ).pipe ( delay( 100 ) ).subscribe((value) => {
    //     if(this.tau) {
    //
    //       if(this.currentRows < this.maxRows && this.tau.nativeElement.scrollHeight > this.tau.nativeElement.offsetHeight) {
    //         this.currentRows = Math.min(Math.ceil((this.tau.nativeElement.scrollHeight - 23) / 24), this.maxRows)
    //       }
    //     }
    //   });

    this.langService.download.subscribe(dl => {
      if (dl) {
    //     // console.log(this.langService.getTextLanguage(this.getLang(), this.page, this.segment, this.place));
    //     this.form.get('input').setValue(this.langService.getTextLanguage(this.getLang(), this.page, this.segment, this.place) || '', {emitEvent:false});
    //     this.form.get('input').valueChanges.subscribe((value) => {
    //       this.langService.setTextLanguage(this.getLang(), this.page, this.segment, this.place, value);
    //       // console.log(this.langService.getText(this.page, this.segment, this.place));
    //     });
    //
    //     this.form.get('inputUniversal').setValue(this.langService.getTextLanguage(this.getLang(), '', '', this.default) || '', {emitEvent:false});
    //     this.form.get('inputUniversal').valueChanges.subscribe((value) => {
    //       this.langService.setTextLanguage(this.getLang(), '', '', this.default, value);
    //       // console.log(this.langService.getText(this.page, this.segment, this.place));
    //     });
    //
        this.changeDetector.detectChanges();
      }
    });
    this.langService.languageChanged.subscribe(dl => {
      if (dl) {

        // console.log(this.langService.getTextLanguage(this.getLang(), this.page, this.segment, this.place));
        const isChanged = this.langService.isChanged;
        // this.form.get('input').setValue(this.langService.getTextLanguage(this.getLang(), this.page, this.segment, this.place) || '', {emitEvent:false});
        // this.form.get('inputUniversal').setValue(this.langService.getTextLanguage(this.getLang(), '', '', this.default) || '', {emitEvent:false});
        this.langService.isChanged = isChanged;
      }
    });

    this.langService.addToCurrentPageMap(this.page, this.segment, this.place, this.default, this.type, null);
    // console.log('');
    // this.langService.addToTranslationListMap(this.page, this.segment, this.place, this.default);


    // if(this.page == 'country_names') {
    //   console.log(this.place);
    //   console.log(this.default);
    // }
    if (this.parent) {

      this.parent.subscribe(x => {

        this.langService.addToCurrentComplicatedListsMap(this.page, this.segment, this.place, this.default, this.type, x);
      })
    }
  }


  getLang() {

    // if(this.language == 'english2')
    // console.log(this.language);
    if(this.languageFormControl) {
      return this.languageFormControl.value || this.langService.language;
    }
    return this.language || this.langService.language;
  }

  get text() {

    // console.log('test');


    return this.langService.getTextLanguage(this.getLang(), this.page, this.segment, this.place);
  }
  get universalText() {
    return this.langService.getTextLanguage(this.getLang(), '', '', this.default);
  }
  get textEng() {
    return this.langService.getTextInEnglish(this.page, this.segment, this.place);
  }
  get universalTextEng() {
    return this.langService.getTextInEnglish('', '', this.default);
  }
  get placeHolder() {
    // return this.langService.getTextInEnglish(this.page, this.segment, this.place) || this.default;
    return this.getText();
  }

  // get inputValue() {
  //   return this.form.get('input');
  // }


  // get rows() {
  //   if(this.ta) {
  //     if(this.currentRows < this.maxRows && this.ta.nativeElement.scrollHeight > this.ta.nativeElement.offsetHeight) {
  //       this.currentRows = Math.min(Math.ceil((this.ta.nativeElement.scrollHeight - 23) / 24), this.maxRows)
  //     }
  //     return this.currentRows;
  //   }
  //   return this.currentRows;
  // }
  // get rowsu() {
  //   if(this.tau) {
  //     if(this.currentRows < this.maxRows && this.tau.nativeElement.scrollHeight > this.tau.nativeElement.offsetHeight) {
  //       this.currentRows = Math.min(Math.ceil((this.tau.nativeElement.scrollHeight - 23) / 24), this.maxRows)
  //     }
  //     return this.currentRows;
  //   }
  //   return this.currentRows;
  // }

  ngOnDestroy(): void {
    this.langService.removeFromCurrentPageMap(this.page, this.segment, this.place);
  }

  isPainted() {
    return this.langService.isPainted(this.page, this.segment, this.place);
  }

  // getHeightOfTextarea() {
  //   if(this.ta) {
  //     return {'height': (this.ta.nativeElement.scrollHeight + 5) + 'px'}
  //   }
  // }

  getLanguageArray() {
    return this.langService.getArrayText(this.page, this.segment, this.place);
  }

  getLanguageArrayUniversal() {
    return this.langService.getArrayText('', '', this.default);
  }

  getTooltipText() {
    return 'Page: ' + this.page + ' \nSegment: ' + this.segment + ' \nPlace: ' + this.place + ' \nEnglish: ' + this.getTextInEnglish() + '';
  }

  getTooltipTextUniversal() {
    return 'Text: ' + this.default + ' \nEnglish: ' + this.getTextInEnglish() + '';
  }

  getText() {

    // console.log('text_selected');
    let res = '';

    if(this.language) {
      return this.langService.getTextLanguage(this.language, this.page, this.segment, this.place)
        || this.langService.getTextLanguage(this.language, '', '', this.default)
        || this.default;
    }

    const chain = this.langService.getChainLanguage();

    chain.forEach(language => {

      if(!res) {
        res = this.langService.getTextLanguage(language, this.page, this.segment, this.place)
          || this.langService.getTextLanguage(language, '', '', this.default);
      }
    });
    return res || this.default;
  }


  getTextInEnglish() {
    return this.langService.getTextLanguage(this.langService.english, this.page, this.segment, this.place)
      || this.langService.getTextLanguage(this.langService.english, '', '', this.default)
      || this.default;
  }

  // getPlaceholder() {
  //   let res = '';
  //
  //   if(this.language) {
  //     return this.default;
  //   }
  //   const chain = this.langService.getChainLanguage();
  //
  //   chain.forEach((language, i) => {
  //
  //     if(i == 0) {
  //       res = this.langService.getTextLanguage(language, '', '', this.default);
  //
  //     } else {
  //
  //       if(!res) {
  //         res = this.langService.getTextLanguage(language, this.page, this.segment, this.place) || this.langService.getTextLanguage(language, '', '', this.default);
  //       }
  //     }
  //
  //   });
  //   return res || this.default;
  // }

  // getPlaceholderUniversal() {
  //   let res = '';
  //
  //   if(this.language) {
  //     return this.default;
  //   }
  //   const chain = this.langService.getChainLanguage();
  //
  //   chain.forEach((language, i) => {
  //
  //     if(i == 0) {
  //       // res = this.langService.getTextLanguage(language, '', '', this.default);
  //
  //     } else {
  //
  //       if(!res) {
  //         res = this.langService.getTextLanguage(language, this.page, this.segment, this.place) || this.langService.getTextLanguage(language, '', '', this.default);
  //       }
  //     }
  //
  //   });
  //   return res || this.default;
  // }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes.page && changes.page.currentValue != changes.page.previousValue ) {
      this.langService.shedulePagesForLanguages(changes.page.currentValue);
    }
    // console.log(changes);
  }

  reload() {
    // console.log('reload');
    this.changeDetector.detectChanges();
  }
}
