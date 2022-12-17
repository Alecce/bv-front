import {Injectable} from '@angular/core';
// import {Subject} from 'angular2-yandex-maps/lib/rxjs';
import {ReplaySubject} from 'rxjs';
import {variables} from '@src/environments/variables';

@Injectable({
  providedIn: 'root'
})
export class ResolutionService {

  public innerWidth = 0;
  public innerWidthObservable = new ReplaySubject(1);

  constructor() { }

  setWidth(width) {
    this.innerWidth = width;
    this.innerWidthObservable.next(width);
  }

  isSmall() {
    return variables.mobile;
  }
}
