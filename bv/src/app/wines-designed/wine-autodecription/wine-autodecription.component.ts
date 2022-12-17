import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {AutodescriptionDesignedComponent} from '@src/app/wines-designed/autodescription-designed/autodescription-designed.component';

@Component({
  selector: 'app-wine-autodecription',
  templateUrl: './wine-autodecription.component.html',
  styleUrls: ['./wine-autodecription.component.css']
})
export class WineAutodecriptionComponent implements OnInit {

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() isWineryOwnerSubject: Subject;
  // @ts-ignore
  @Input() generatedDescriptionSubject: Subject;
  // @ts-ignore
  @Input() descriptionsSubject: Subject;

  // @ts-ignore
  @ViewChild(AutodescriptionDesignedComponent) autodescriptionTab: AutodescriptionDesignedComponent;

  constructor() { }

  ngOnInit(): void {
  }



  public getFormValue() {
    return this.autodescriptionTab.getFormValue();
  }
  public getSimpleFormValue() {
    return this.autodescriptionTab.form.value;
  }
}
