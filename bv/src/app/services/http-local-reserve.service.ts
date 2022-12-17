import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReplaySubject} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpLocalReserveService {

  lastChanges = null;
  lastChangesSubj = new ReplaySubject(10);

  host = environment.host;
  url = environment.host + 'data/get_last_changes';

  constructor(private http: HttpClient) {
    // this.http.get(this.url).subscribe(res => {
    //
    //   // @ts-ignore
    //   if(res.language == localStorage.getItem('language')) {
    //
    //     console.log(localStorage.getItem('language'));
    //   } else {
    //     localStorage.removeItem('languageCache');
    //   }
    //
    //   this.lastChanges = res;
    //   this.lastChangesSubj.next(res);
    //
    // })
  }


  //
  // getHash(data) {
  //   return
  // }
  //
  // post(url, req, key) {
  //
  //
  //
  //   console.log(localStorage.getItem(key));
  //
  //   const subj = new ReplaySubject(1);
  //
  //   const hash = JSON.stringify(
  //     {
  //       url, req
  //     }
  //   );
  //
  //   this.lastChangesSubj.subscribe(lc => {
  //
  //     if(lc[key] == localStorage.getItem(key)) {
  //
  //     }
  //
  //     this.http.post
  //
  //
  //   })
  //
  //   return subj;
  //
  //
  //   const keyObj = {
  //     url, req
  //   };
  //   const key = JSON.stringify(keyObj);
  //   // console.log(key);
  //
  //   if(!this.loadingMap.get(key)) {
  //     const subj = new ReplaySubject(10);
  //
  //     this.http.post(url, req).subscribe(res => {
  //
  //
  //       subj.next(res);
  //       subj.complete();
  //     });
  //     this.loadingMap.set(key, subj);
  //     return subj;
  //   } else {
  //     return this.loadingMap.get(key).pipe(map(ddata => {
  //       return JSON.parse(JSON.stringify(ddata));
  //     }));
  //   }
  // }
}
