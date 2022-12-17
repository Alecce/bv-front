import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpMemoryService {

  loadingMap = new Map();


  constructor(
    private http: HttpClient
  ) { }

  post(url, req) {
    const keyObj = {
      url, req
    };
    const key = JSON.stringify(keyObj);
    // console.log(key);

    if(!this.loadingMap.get(key)) {
      const subj = new ReplaySubject(10);

      this.http.post(url, req).subscribe(res => {


        subj.next(res);
        subj.complete();
      });
      this.loadingMap.set(key, subj);
      return subj;
    } else {
      return this.loadingMap.get(key).pipe(map(ddata => {
        return JSON.parse(JSON.stringify(ddata));
      }));
    }
  }
  get(url) {
    const keyObj = {
      url
    };
    const key = JSON.stringify(keyObj);

    // console.log(key);

    if(!this.loadingMap.get(key)) {
      const subj = new ReplaySubject(10);

      this.http.get(url).subscribe(res => {


        subj.next(res);
        subj.complete();
      });

      // console.log(subj);
      this.loadingMap.set(key, subj);
      return subj;
    } else {
      return this.loadingMap.get(key).pipe(map(ddata => {
        return JSON.parse(JSON.stringify(ddata));
      }));
    }
  }
}
