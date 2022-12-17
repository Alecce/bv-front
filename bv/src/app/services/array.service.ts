import {Injectable} from '@angular/core';
import {RequestsService} from './api/requests.service';
import {ListsService} from './api/lists.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArrayService {


  countries = new BehaviorSubject(null);

  constructor(private service: RequestsService,
              public listService: ListsService
  ) { }

  getCountryList() {
    if (!this.countries.value) {
      this.service.getCountries().subscribe(data => {
        this.countries.next(data);
      });
    }

  }
}
