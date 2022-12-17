import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YandexService {
  urls = {
    geoByCoordinates: 'https://geocode-maps.yandex.ru/1.x/?apikey=fb718445-eb8b-4e81-8eed-8e9afc51b160&format=json',
  };
  host = environment.host;
  constructor(private http: HttpClient, private cookieService: CookieService) {
    // for (const url in this.urls) {
    //   this.urls[url] = this.host + this.urls[url];
    // }
    // console.log(this.urls);
  }



  public geoByCoordinates(lat, lng) {


    const url = this.urls.geoByCoordinates + '&geocode=' + lat + ',' + lng;
    return this.http.get(url);
  }

  public coordinatesByAddress(address) {


    const url = this.urls.geoByCoordinates + '&geocode=' + address;
    return this.http.get(url);
  }
}
