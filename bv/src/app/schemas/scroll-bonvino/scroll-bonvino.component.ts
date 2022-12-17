import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IconBonvinoComponent} from '../icon-bonvino/icon-bonvino.component';
import {LanguageServiceService} from '../../services/language-service.service';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-scroll-bonvino',
  templateUrl: './scroll-bonvino.component.html',
  styleUrls: ['./scroll-bonvino.component.css'],
})
export class ScrollBonvinoComponent implements OnInit {

  @Input() trigger = new ReplaySubject();
  isOpen = false;
  @Input() scrollGroup;
  @Input() scrollName;

  @Input() iconPosition = 'end';


  @Input() noList;

// @ts-ignore
  @ViewChild('icon1') public icon1: IconBonvinoComponent;
// @ts-ignore
  @ViewChild('icon2') public icon2: IconBonvinoComponent;

  constructor(
    public langService: LanguageServiceService
  ) { }

  ngOnInit() {
    if (this.scrollGroup && this.scrollName) {
      this.isOpen = this.scrollGroup[this.scrollName];
    }
    // this.trigger.next(this.isOpen);
  }

  scrollToggle() {
    if (this.langService.editable) {
      return;
    }
    this.isOpen = !this.isOpen;

    if (this.scrollGroup && this.scrollName) {
      this.scrollGroup[this.scrollName] = this.isOpen;
    }
    this.trigger.next(this.isOpen);
  }

  paintMouseOver(color) {
    this.icon1.paintSpecial( color);
    this.icon2.paintSpecial( color);
  }
}
