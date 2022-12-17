import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoadingServiceService {
  public loading = false;

  public counter = 0;
  counterSubject = new ReplaySubject(10);
  loadingInProcess;
  loaded;

  constructor(
    private snackBar: MatSnackBar,) {

    this.counterSubject.subscribe(c => {
      // console.log(c);
      if(c > 0) {
        this.showLoadingBar();
      } else {
        this.showLoadedBar();
      }
    })
  }

  startLoading(rule) {
    if(rule) {

      this.counter++;
      this.counter++;
      this.counterSubject.next(this.counter);
    }
  }

  endLoading(rule) {
    if(rule) {

      this.counter--;
      if(this.counter < 0) {
        // this.counter = 0;
      }
      this.counterSubject.next(this.counter);
    }
  }

  showLoadingBar() {
    if(this.loaded) {
      this.loaded.dismiss();
      this.loaded = null;
    }
    if(!this.loadingInProcess) {
      this.loadingInProcess = this.snackBar.open('Loading', 'close', {
        duration: 100000,
      });
    }
  }

  showLoadedBar() {
    if(this.loadingInProcess) {
      this.loadingInProcess.dismiss();
      this.loadingInProcess = null;
    }
    if(!this.loaded) {
      this.loaded = this.snackBar.open('Loading ended', 'close', {
        duration: 1000,
      });
    }
  }
}
