import {Component, Input, OnInit} from '@angular/core';
import {glassesData} from '@src/app/wines-designed/wines-serving-designed/wines-serving-designed.component';

@Component({
  selector: 'app-glass-bonvino',
  templateUrl: './glass-bonvino.component.html',
  styleUrls: ['./glass-bonvino.component.css']
})
export class GlassBonvinoComponent implements OnInit {

  glasses = glassesData;
  // @ts-ignore
  @Input() glassData;

  constructor() { }

  ngOnInit(): void {
  }

}
