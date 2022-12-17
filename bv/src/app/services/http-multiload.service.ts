import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpMemoryService} from './http-memory.service';
import {ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {urls} from '@src/app/services/api/requests.service';

@Injectable({
  providedIn: 'root'
})
export class HttpMultiloadService {

  loadingMap = new Map();
  loadedMap = new Map();
  public urls = urls;


  constructor(private http: HttpClient,
              private httpMemory: HttpMemoryService) {
    // this.urls = this.requestService.urls;
  }


  get(url) {

    // console.log(url);

    if(!this.loadingMap.get(url)) {
      const currsubj = new ReplaySubject(10);
      this.loadingMap.set(url, currsubj);

      this.httpMemory.get(this.urls.multiload).subscribe(res => {

        // console.log(res);
        Object.keys(res).forEach(key => {

          // console.log(res[key]);

          if(this.urls[key] != url) {

            const subj = new ReplaySubject(10);
            subj.next(res[key]);
            subj.complete();
            this.loadingMap.set(this.urls[key], subj);
          } else {

            currsubj.next(res[key]);
            currsubj.complete();
            // this.loadingMap.set(this.urls[key], currsubj);
          }


        });

      });

      // console.log(subj);
      // this.loadingMap.set(key, subj);
      return currsubj;
    } else {
      return this.loadingMap.get(url).pipe(map(ddata => {
        return JSON.parse(JSON.stringify(ddata));
      }));
    }


  }
}
