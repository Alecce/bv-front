import {Component, Input, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pop-up-bonvino',
  templateUrl: './pop-up-bonvino.component.html',
  styleUrls: ['./pop-up-bonvino.component.css']
})
export class PopUpBonvinoComponent implements OnInit {

  @Input() placement = 'bottom-right';
  constructor(
    private config: NgbDropdownConfig
  ) {

    this.config.autoClose = 'outside';

    this.config.placement = 'right-bottom';
  }

  ngOnInit(): void {
    if(this.placement) {
      this.config.placement = this.placement;
    }
  }

}
