import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {WinesMenuDesignedComponent} from "@src/app/wines-designed/wines-menu-designed/wines-menu-designed.component";
import {IconBonvinoComponent} from "@src/app/schemas/icon-bonvino/icon-bonvino.component";

@Component({
  selector: 'app-add-button-bonvino',
  templateUrl: './add-button-bonvino.component.html',
  styleUrls: ['./add-button-bonvino.component.css']
})
export class AddButtonBonvinoComponent implements OnInit {

  // @ts-ignore
  @ViewChild(IconBonvinoComponent) icon: IconBonvinoComponent;

  @Input() colorRegular = '#000000';
  @Input() colorPointed = '#3683dc';
  @Input() colorActive = '#3683dc';

  constructor() { }

  ngOnInit(): void {
  }
  paintOceanColor() {
    this.icon.paint(this.colorActive);
  }
  paintBlackColor() {
    this.icon.paint(this.colorRegular);
  }
}
