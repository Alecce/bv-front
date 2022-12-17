import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {LanguageServiceService} from '@src/app/services/language-service.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleComponent implements OnInit, OnChanges {

  @Input() international;
  @Input() national;
  @Input() language;
  @Input() id;
  @Input() page;

  constructor(
    public langService: LanguageServiceService,
    private changeDetector: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {

    this.langService.editableSubject.subscribe(() => {
      this.changeDetector.detectChanges();
    });


    this.langService.download.subscribe(dl => {

      this.changeDetector.detectChanges();
    });
  }


  getTextValue() {
    return this.langService.getText(this.page, '', this.id) || this.getDefault();
  }
  getDefault() {

    if(this.langService.isSameLanguage(this.language) && this.national) {
      return this.national;
    } else {
      return this.international;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes.page && changes.page.currentValue != changes.page.previousValue ) {
      this.langService.shedulePagesForLanguages(changes.page.currentValue);
    }
    // console.log(changes);
  }
}
