import {Component, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-icon-bonvino',
  templateUrl: './icon-bonvino.component.html',
  styleUrls: ['./icon-bonvino.component.css']
})
export class IconBonvinoComponent implements OnInit {

  @Input() svgIcon;
  @Input() link;
  @Input() style1;
  @Input() style2;
  @Input() noAutoColors;
  @Input() colorRegular = '#000000';
  @Input() colorPointed = '#a2312d';
  @Input() colorActive = '#3683dc';


// @ts-ignore
  @ViewChild('icon') public icon: HTMLElement;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
  }

  paintWineColor(element: HTMLElement) {



    const icon = element['_elementRef'].nativeElement.getElementsByClassName('changeFillHere')[0];
    // console.log(icon);
    if (this.link == 'fill' || this.link == 'both') {
      this.renderer.setAttribute(icon, 'fill', this.colorActive);
    }
    if (this.link == 'stroke' || this.link == 'both') {
      this.renderer.setAttribute(icon, 'stroke', this.colorActive);
    }
    // console.log(this.icon);
  }
  paintOceanColor(element: HTMLElement) {
    // console.log(element);

    const icon = element['_elementRef'].nativeElement.getElementsByClassName('changeFillHere')[0];
    // console.log(icon);
    // console.log(this.icon['_elementRef'].nativeElement.getElementsByClassName('changeFillHere')[0]);
    if (this.link == 'fill' || this.link == 'both') {
      this.renderer.setAttribute(icon, 'fill', this.colorActive);
    }
    if (this.link == 'stroke' || this.link == 'both') {
      this.renderer.setAttribute(icon, 'stroke', this.colorActive);
    }
    // console.log(this.icon);
  }
  paintBlackColor(element: HTMLElement) {
    // console.log(element);

    const icon = element['_elementRef'].nativeElement.getElementsByClassName('changeFillHere')[0];
    // console.log(icon);
    if (this.link == 'fill' || this.link == 'both') {
      this.renderer.setAttribute(icon, 'fill', this.colorRegular);
    }
    if (this.link == 'stroke' || this.link == 'both') {
      this.renderer.setAttribute(icon, 'stroke', this.colorRegular);
    }
    // console.log(this.icon);
  }

  paint(color) {
    const icon = this.icon['_elementRef'].nativeElement.getElementsByClassName('changeFillHere')[0];
    // console.log(icon);
    if (this.link == 'fill' || this.link == 'both') {
      this.renderer.setAttribute(icon, 'fill', color);
    }
    if (this.link == 'stroke' || this.link == 'both') {
      this.renderer.setAttribute(icon, 'stroke', color);
    }
  }
  paintSpecial(color) {
    const iconsStroke = this.icon['_elementRef'].nativeElement.getElementsByClassName('changeStrokeHere');
    const iconsFill = this.icon['_elementRef'].nativeElement.getElementsByClassName('changeFillHere');


    for (let i = 0; i < iconsStroke.length; i++) {
      this.renderer.setAttribute(iconsStroke[i], 'stroke', color);
    }
    for (let i = 0; i < iconsFill.length; i++) {
      this.renderer.setAttribute(iconsFill[i], 'fill', color);
    }
  }
}
