import {Injectable} from '@angular/core';
import {RequestsService} from '@src/app/services/api/requests.service';
import {of, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DownloadDataServiceService {

  winelistData = null;

  countriesSubject = new ReplaySubject(10);

  countriesMap = new Map();
  countries = [];

  countriesLoading = false;


  regionesSubject = new ReplaySubject(10);
  regionesMap = new Map();
  regiones = [];
  regionesLoading = false;


  personsSubject = new ReplaySubject(10);
  personsMap = new Map();
  persons = [];
  personsLoading = false;

  competitionsSubject = new ReplaySubject(10);
  competitionsMap = new Map();
  competitions = [];
  competitionsLoading = false;

  awardssMap = new Map();

  loadingMap = new Map();

  constructor(
    public service: RequestsService
  ) {

    this.loadingMap.set('awards', new Map());
    this.loadingMap.set('competitions', new Map());
  }

  public setWinelistData(data) {
    this.winelistData = data;
  }
  public getWinelistData() {
    return this.winelistData;
  }


  public getCountriesMap() {
    if(!this.countriesLoading) {
      this.countriesLoading = true;
      this.service.getCountries().subscribe(data => {
// @ts-ignore
        this.countries = data;
        this.countriesSubject.next(data);
        this.countries.forEach(x => {
          this.countriesMap.set(x.id, x.name);
        });
      });
    }
    return this.countriesMap;
  }

  public getCountries() {
    this.getCountriesMap();

    return this.countriesSubject;
  }

  public getRegionesMap() {
    if(!this.regionesLoading) {
      this.regionesLoading = true;
      this.service.getRegiones().subscribe(dataR => {

        this.regionesSubject.next(dataR);
// @ts-ignore
        this.regiones = dataR;
        this.regiones.forEach(x => {
          this.regionesMap.set(x.id, x.name);
        });
      });
    }
    return this.regionesMap;
  }

  public getRegiones() {
    this.getRegionesMap();

    return this.regionesSubject;
  }

  public getPersonById(id) {
    // console.log(this.personsMap);
    if(this.personsMap.get(id * 1)){
      return of(this.personsMap.get(id * 1));
    } else {
      return this.service.getUserById({id}).pipe(map(res => {

        this.personsMap.set(id * 1, res);

        return res;
      }));
    }
  }


  public setPerson(person) {
    this.personsMap.set(person.id * 1, person);
  }




  public getAwardById(id) {
    // console.log(this.personsMap);
    // return of(this.awardssMap.get(id * 1));


    if(this.awardssMap.get(id * 1)){
      return of(this.awardssMap.get(id * 1));
    } else {
      if(!this.loadingMap.get('awards').get(id * 1)) {
        const awardReplaySubject = new ReplaySubject(10);

        this.service.getAwardById({id}).pipe(map(res => {


          this.awardssMap.set(id * 1, res);
          awardReplaySubject.next(res);
          return res;
        })).subscribe();
        this.loadingMap.get('awards').set(id * 1, awardReplaySubject);
        return awardReplaySubject;
      } else {
        return this.loadingMap.get('awards').get(id * 1);
      }
    }
  }

  public getCompetitionById(id) {
    // console.log(this.personsMap);
    if(this.competitionsMap.get(id * 1)){
      return of(this.competitionsMap.get(id * 1));
    } else {

      if(!this.loadingMap.get('competitions').get(id * 1)) {
        const competitionReplaySubject = new ReplaySubject(10);

        this.service.getCompetitionById({id}).pipe(map(res => {


          this.competitionsMap.set(id * 1, res);

          // @ts-ignore
          if(res.prizes) {

            // @ts-ignore
            res.prizes.forEach(p => {

              this.awardssMap.set(p.id * 1, p);
            });
          }
          return res;
          competitionReplaySubject.next(res);
          return res;
        })).subscribe();
        this.loadingMap.get('competitions').set(id * 1, competitionReplaySubject);
        return competitionReplaySubject;
      } else {
        return this.loadingMap.get('competitions').get(id * 1);
      }




      // return this.service.getCompetitionById({id}).pipe(map(res => {
      //
      //   this.competitionsMap.set(id * 1, res);
      //
      //   // @ts-ignore
      //   if(res.prizes) {
      //
      //   // @ts-ignore
      //     res.prizes.forEach(p => {
      //
      //       this.awardssMap.set(p.id * 1, p);
      //     });
      //   }
      //   return res;
      // }));
    }
  }
  public setCompetition(competition) {
    this.competitionsMap.set(competition.id * 1, competition);

    competition.prizes.forEach(p => {

      this.awardssMap.set(p.id * 1, p);
    });
  }
}
