import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {RequestsService} from './requests.service';
import {HttpMemoryService} from '@src/app/services/http-memory.service';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  urls = {
    getWineListForWinery: 'event/allfor/',
    getKashrutList: 'kashrut/all',
    getQualityList: 'quality/all',
    getBiodinamicList: 'biodinamic/all',
    getOrganicList: 'organic/all',
    getVeganList: 'vegan/all',

    getKashrutListForWinery: 'data/kashrutlist_winery',
    getQualityListForWinery: 'data/qualitylist_winery',
    getBiodinamicListForWinery: 'data/biodinamiclist_winery',
    getOrganicListForWinery: 'data/organiclist_winery',
    getVeganListForWinery: 'data/veganlist_winery',

    getLanguageList: 'data/languagelist',
    getWineList: 'wine/all',
    getWineCountsList: 'wine/counts',


    getAwardList: 'data/awardlist',
    getCompetitionList: 'data/competitionlist',
    getRegionList: 'data/regionlist',
    getSpecialistList: 'data/specialistlist',
    getFreeSpecialistList: 'data/freespecialists',
    getParentBusiness: 'business/parents',
    getVineyardList: 'data/vineyardlist',
    getVineyardListForWinery: 'data/vineyardlist_winery',
    getUserListBySearch: 'user/all',
    getCompetitionListBySearch: 'competition/all',
    getUserList: 'data/userlist',
    getUserListSecure: 'data/userlistSecure',
    getBusinessList: 'data/businesslist',
    // getWineryList: 'data/winerylist',
    getWineries: 'data/winerylistSimple',
    getWines: 'data/winelistSimple',
    getGrapeList: 'data/grapelist',
    getAutodescriptionsList: 'data/autodescriptionlist',
    getAutodescriptionCategoryList: 'data/autodescription_categories',
    getAutodescriptionsOptionList: 'data/autodescription_options',
    getGrapeListForWinery: 'data/grapelist_winery',
    getGrapeListForAdmin: 'data/grapelist_admin',

    getEventParticipants: 'event/userlist/',
    getEventList: 'event/all',
    getWineryList: 'winery/all',

    getAdminUserList: 'admin/userlist',
    setUserFromAdmin: 'admin/user',
    deleteUserFromAdmin: 'admin/delete_user',


    getBusinessesForBlock: 'data/all_for_block',


  };
  host = environment.host;
  constructor(
    private service: RequestsService,
    private http: HttpClient,
    private cookieService: CookieService,
    private httpMemory: HttpMemoryService
    ) {
    for (const url in this.urls) {
      this.urls[url] = this.host + this.urls[url];
    }
  }


  public getKashrutListForWinery(option) {

    const url = this.urls.getKashrutListForWinery;
    return this.httpMemory.post(url, option);
  }
  public getQualityListForWinery(option) {

    const url = this.urls.getQualityListForWinery;
    return this.httpMemory.post(url, option);
  }
  public getBiodinamicListForWinery(option) {

    const url = this.urls.getBiodinamicListForWinery;
    return this.httpMemory.post(url, option);
  }
  public getOrganicListForWinery(option) {

    const url = this.urls.getOrganicListForWinery;
    return this.httpMemory.post(url, option);
  }
  public getVeganListForWinery(option) {

    const url = this.urls.getVeganListForWinery;
    return this.httpMemory.post(url, option);
  }

  public getWineListForWinery(option, id) {

    const url = this.urls.getWineListForWinery + id;
    return this.http.post(url, option);
  }

  public getLanguageList() {

    const url = this.urls.getLanguageList;
    return this.httpMemory.get(url);
  }
  public getVeganList(option) {

    const url = this.urls.getVeganList;
    return this.httpMemory.post(url, option);
  }

  public getOrganicList(option) {

    const url = this.urls.getOrganicList;
    return this.httpMemory.post(url, option);
  }
  public getKashrutList(option) {

    const url = this.urls.getKashrutList;
    return this.httpMemory.post(url, option);
  }

  public getQualityList(option) {

    const url = this.urls.getQualityList;
    return this.httpMemory.post(url, option);
  }

  public getBiodinamicList(option) {

    const url = this.urls.getBiodinamicList;
    return this.httpMemory.post(url, option);
  }

  public getEventParticipants(option, id) {


    const url = this.urls.getEventParticipants + id;
    return this.httpMemory.post(url, option);
  }
  public getEventList(option) {

    const url = this.urls.getEventList;
    return this.http.post(url, option);
  }

  public getBusinessesForBlock(option) {

    const url = this.urls.getBusinessesForBlock;
    return this.httpMemory.post(url, option);
  }

  public getWineList(option) {

    const url = this.urls.getWineList;
    return this.http.post(url, option);
  }

  public getWineCountsList(option) {

    const url = this.urls.getWineCountsList;
    return this.http.post(url, option);
  }
  public getWines(option) {

    const url = this.urls.getWines;
    return this.http.post(url, option);
  }

  public getAwardList(option) {

    const url = this.urls.getAwardList;
    return this.httpMemory.post(url, option);
  }

  public getCompetitionList(option) {

    const url = this.urls.getCompetitionList;
    return this.httpMemory.post(url, option);
  }


  public getRegionList(option) {

    const url = this.urls.getRegionList;
    return this.httpMemory.post(url, option);
  }

  public getSpecialistList(option) {

    const url = this.urls.getSpecialistList;
    return this.httpMemory.post(url, option);
  }

  public getFreeSpecialistList(option) {

    const url = this.urls.getFreeSpecialistList;
    return this.httpMemory.post(url, option);
  }

  public getVineyardList(option) {

    const url = this.urls.getVineyardList;
    return this.http.post(url, option);
  }
  public getVineyardListForWinery(option) {

    const url = this.urls.getVineyardListForWinery;
    return this.http.post(url, option);
  }

  public getUserListBySearch(option) {

    const url = this.urls.getUserListBySearch;
    return this.http.post(url, option);
  }

  public getCompetitionListBySearch(option) {

    const url = this.urls.getCompetitionListBySearch;
    return this.http.post(url, option);
  }

  public getUserList(option) {

    const url = this.urls.getUserList;
    return this.http.post(url, option);
  }

  public getUserListSecure(option) {

    const url = this.urls.getUserListSecure;
    return this.http.post(url, option);
  }

  public getBusinessList(option) {

    const url = this.urls.getBusinessList;
    return this.http.post(url, option);
  }

  public getWineryList(option) {

    const url = this.urls.getWineryList;
    return this.http.post(url, option);
  }
  public getWineries(option) {

    const url = this.urls.getWineries;
    return this.http.post(url, option);
  }
  // getWineries: 'data/winerylistSimple',

  public getGrapeList(option) {

    const url = this.urls.getGrapeList;
    return this.http.post(url, option);
  }

  public getGrapeListForAdmin(option) {

    const url = this.urls.getGrapeListForAdmin;
    return this.http.post(url, option).pipe(
      map(data => {
// @ts-ignore
        data.rows.forEach(g => {

          this.service.getClonesFromAvaliableGrapes(g);

        });
        return data;
      })
    );
  }

  public getAutodescriptionsList() {

    const url = this.urls.getAutodescriptionsList;
    return this.httpMemory.get(url);
  }
  public getAutodescriptionCategoryList() {

    const url = this.urls.getAutodescriptionCategoryList;
    return this.httpMemory.get(url);
  }
  public getAutodescriptionsOptionList() {

    const url = this.urls.getAutodescriptionsOptionList;
    return this.httpMemory.get(url);
  }
  public getGrapeListForWinery(option) {

    const url = this.urls.getGrapeListForWinery;
    return this.http.post(url, option)
      .pipe(
        map(data => {
          const rows = [];
          // @ts-ignore
          data.rows.forEach(g => {
            let cloneNames;
            if (g.cloneNames) {
              cloneNames = JSON.parse(g.cloneNames);

            } else {
              cloneNames = [];
            }

            let cloneId;
            if (g.cloneId) {
              cloneId = JSON.parse(g.cloneId);

            } else {
              cloneId = [];
            }

            let clones = [];

            cloneId.forEach((x, i) => {
              if (x) {
                clones.push({
                  id: cloneId[i],
                  name: cloneNames[i]
                });
              }
            });

            const list = [];
            // console.log(clones);
            clones = clones.sort((a, b) => {
              return a.id - b.id;
            });
            clones.forEach((x, i) => {
              if (i == 0 || clones[i].id != clones[i - 1].id) {
                list.push(x);
              }
            });
            g.clones = list;





            if (g.name.toLowerCase().includes(option.search.toLowerCase())) {
              const row = JSON.parse(JSON.stringify(g));

              row.row = row.name;
              rows.push(row);
            }
            if (g.synonyms && g.synonyms.toLowerCase().includes(option.search.toLowerCase())) {
              const synArr = g.synonyms.split(', ');
              const syns = synArr.filter(x => {
                return x.toLowerCase().includes(option.search.toLowerCase());
              });
              syns.forEach(syn => {
                const row = JSON.parse(JSON.stringify(g));
                row.row = syn + ' (' + g.name + ')';
                row.synonim = syn;
                rows.push(row);
              });
            }
            if (g.translate && g.translate.toLowerCase().includes(option.search.toLowerCase())) {

              const row = JSON.parse(JSON.stringify(g));
              row.row = g.translate + ' (' + g.name + ')';
              rows.push(row);
            }

          });
// @ts-ignore
          data.rows = rows;
          console.log(data);
          return data;
        })
      );
  }


  public getAdminUserList(option) {

    const url = this.urls.getAdminUserList;
    return this.http.post(url, option);
  }
  public setUserFromAdmin(option) {

    const url = this.urls.setUserFromAdmin;
    return this.http.post(url, option);
  }
  public deleteUserFromAdmin(option) {

    const url = this.urls.deleteUserFromAdmin;
    return this.http.post(url, option);
  }


  public getParentBusiness(option) {

    const url = this.urls.getParentBusiness;
    return this.http.post(url, option);
  }

}
