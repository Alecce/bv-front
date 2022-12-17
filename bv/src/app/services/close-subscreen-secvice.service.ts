import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloseSubscreenSecviceService {

  isClosing = true;
  listerner = new ReplaySubject(1);

  constructor() { }

  public getListerner() {
    return this.listerner;
  }

  public close() {
    // if(this.isClosing) {
      this.listerner.next(Math.random());
    // }
  }

  stopClosing() {

    this.isClosing = false;
  }

  startClosing() {

    this.isClosing = true;
  }
}
