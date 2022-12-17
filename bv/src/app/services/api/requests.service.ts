import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {map} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';
import {ReplaySubject} from 'rxjs';
import {HttpMemoryService} from '@src/app/services/http-memory.service';
import {HttpMultiloadService} from '@src/app/services/http-multiload.service';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  public urls = urls;
  host = environment.host;

  usersMap = new Map();
  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private httpMemory: HttpMemoryService,
              private httpMultiload: HttpMultiloadService,

              public overlay: Overlay,
              public dialog: MatDialog,
              ) {
    for (const url in this.urls) {
      this.urls[url] = this.host + this.urls[url];
    }
    // console.log(this.urls);
  }

  public geoByCoordinates(ReqData) {


    const url = this.urls.geoByCoordinates;
    return this.http.post(url, ReqData);
  }

  public geoByCoordinatesGoogle(ReqData) {


    const url = this.urls.geoByCoordinatesGoogle;
    return this.http.post(url, ReqData);
  }
  public coordinatesByAddress(ReqData) {


    const url = this.urls.coordinatesByAddressLocationiq;
    return this.http.post(url, ReqData);
  }
  public addressByCoordinatesLocationiq(ReqData) {


    const url = this.urls.addressByCoordinatesLocationiq;
    return this.httpMemory.post(url, ReqData);
  }

  public addressByCoordinates(geolacationData) {
    const res = new ReplaySubject(1);

    this.addressByCoordinatesLocationiq(geolacationData).subscribe(x => {

      try {
// @ts-ignore
        const parsed = JSON.parse(x.res);
        res.next(this.buildAddress(parsed));

      } catch (e) {

        res.next(this.buildAddress(null));
      }
    });

    return res;
  }


  buildAddress(data) {
    const arr = [];

    if(data.country) {
      arr.push(data.country);
    }
    if(data.city) {
      arr.push(data.city);
    }
    if(data.road) {
      arr.push(data.road);
    }
    if(data.house_number) {
      arr.push(data.house_number);
    }
    if(data.name) {
      arr.push(data.name);
    }

    let strRes = '';

    arr.forEach((x, i) => {
      if(i) {
        strRes += ', ';
      }
      strRes += x;
    });

    console.log(strRes);

    return strRes;

  }

  public setImage(storage, id, image) {
    const data = new FormData();
    data.append('image', image);
    data.append('id', id);
    data.append('db', '1');
    data.append('storage', storage);
    const url = this.urls.setImage;
    return this.http.post(url, data);
  }
  public setImageNoDB(storage, id, image) {
    const data = new FormData();
    data.append('image', image);
    data.append('id', id);
    data.append('db', '0');
    data.append('storage', storage);
    const url = this.urls.setImage;
    return this.http.post(url, data);
  }

  public getQuality(id) {

    const url = this.urls.getQuality + id;
    return this.httpMemory.get(url);
  }
  public addQuality(formData) {

    const url = this.urls.addQuality;
    return this.http.post(url, formData);
  }
  public editQuality(formData, id) {

    const url = this.urls.editQuality + id;
    return this.http.post(url, formData);
  }
  public deleteQuality(id) {

    const url = this.urls.deleteQuality + id;
    return this.http.get(url);
  }

  public getKashrut(id) {

    const url = this.urls.getKashrut + id;
    return this.httpMemory.get(url);
  }
  public addKashrut(formData) {

    const url = this.urls.addKashrut;
    return this.http.post(url, formData);
  }
  public editKashrut(formData, id) {

    const url = this.urls.editKashrut + id;
    return this.http.post(url, formData);
  }
  public deleteKashrut(id) {

    const url = this.urls.deleteKashrut + id;
    return this.http.get(url);
  }

  public getBiodinamic(id) {

    const url = this.urls.getBiodinamic + id;
    return this.httpMemory.get(url);
  }
  public addBiodinamic(formData) {

    const url = this.urls.addBiodinamic;
    return this.http.post(url, formData);
  }
  public editBiodinamic(formData, id) {

    const url = this.urls.editBiodinamic + id;
    return this.http.post(url, formData);
  }
  public deleteBiodinamic(id) {

    const url = this.urls.deleteBiodinamic + id;
    return this.http.get(url);
  }

  public getOrganic(id) {

    const url = this.urls.getOrganic + id;
    return this.httpMemory.get(url);
  }
  public addOrganic(formData) {

    const url = this.urls.addOrganic;
    return this.http.post(url, formData);
  }
  public editOrganic(formData, id) {

    const url = this.urls.editOrganic + id;
    return this.http.post(url, formData);
  }
  public deleteOrganic(id) {

    const url = this.urls.deleteOrganic + id;
    return this.http.get(url);
  }

  public getVegan(id) {

    const url = this.urls.getVegan + id;
    return this.httpMemory.get(url);
  }
  public addVegan(formData) {

    const url = this.urls.addVegan;
    return this.http.post(url, formData);
  }
  public editVegan(formData, id) {

    const url = this.urls.editVegan + id;
    return this.http.post(url, formData);
  }
  public deleteVegan(id) {

    const url = this.urls.deleteVegan + id;
    return this.http.get(url);
  }

  public registration(formData) {

    const url = this.urls.registrateUser;
    return this.http.post(url, formData);
  }

  public getProfile(profile, request) {

    const url = this.urls.getProfile + profile;
    // return this.http.post(url, request);

    if(!this.usersMap.get(profile * 1)) {
      const userReplaySubject = new ReplaySubject(10);

      this.http.post(url, request).pipe(map(res => {


        userReplaySubject.next(res);
        return res;
      })).subscribe();
      this.usersMap.set(profile * 1, userReplaySubject);
      return userReplaySubject;
    } else {
      return this.usersMap.get(profile * 1);
    }
  }

  public editProfile(profile, request) {
    const body = request;

    body.id = this.cookieService.get('myId');
    body.hash = this.cookieService.get('hash');
    const url = this.urls.editProfile + profile;
    return this.http.post(url, body);
  }
  public deleteUser(data) {

    const url = this.urls.deleteUser;
    return this.http.post(url, data);
  }

  public login(formData) {

    const url = this.urls.login;
    return this.http.post(url, formData);
  }
  public setLanguage(request) {
    const body = request;

    const url = this.urls.setLanguage;
    return this.http.post(url, body);
  }





  public addShop(formData) {

    const url = this.urls.addShop;
    return this.http.post(url, formData);
  }
  public getShop(id) {

    const url = this.urls.getShop + id;
    return this.http.get(url);
  }
  public editShop(formData) {

    const url = this.urls.editShop;
    return this.http.post(url, formData);
  }


  public addCompetition(formData) {

    const url = this.urls.addCompetition;
    return this.http.post(url, formData);
  }
  public getCompetition(id) {

    const url = this.urls.getCompetition + id;
    return this.httpMemory.get(url);
  }
  public editCompetition(formData) {

    const url = this.urls.editCompetition;
    return this.http.post(url, formData);
  }
  public setAwardForEvent(formData) {

    const url = this.urls.setAwardForEvent;
    return this.http.post(url, formData);
  }
  public setAwardForWine(formData) {

    const url = this.urls.setAwardForWine;
    return this.http.post(url, formData);
  }

  public getCompetitionById(data) {

    const url = this.urls.getCompetitionById;
    return this.httpMemory.post(url, data);

  }

  public getAwardById(data) {

    const url = this.urls.getAwardById;
    return this.httpMemory.post(url, data);
  }


  public addWinery(formData) {

    const url = this.urls.addWinery;
    return this.http.post(url, formData);
  }
  public getWinery(id) {

    // const languageCode = lang ? ('/' + lang) : '';

    const url = this.urls.getWinery + id;
    return this.httpMemory.get(url);
  }
  public editWinery(id) {

    const url = this.urls.editWinery;
    return this.http.post(url, id);
  }

  public cloneEvent(formData) {

    const url = this.urls.cloneEvent;
    return this.http.post(url, formData);
  }
  public addEvent(formData) {

    const url = this.urls.addEvent;
    return this.http.post(url, formData);
  }
  public getEvent(id) {


    const url = this.urls.getEvent + id;
    return this.httpMemory.get(url);
  }
  public editEvent(id, formData) {

    const url = this.urls.editEvent + id;
    return this.http.post(url, formData);
  }
  public enterEvent(id) {


    const url = this.urls.enterEvent + id;
    return this.http.get(url);
  }
  public leaveEvent(id) {


    const url = this.urls.leaveEvent + id;
    return this.http.get(url);
  }
  public voteInEvent(id, formData) {


    const url = this.urls.voteInEvent + id;
    return this.http.post(url, formData);
  }
  public addWineToEvent(formData) {


    const url = this.urls.addWineToEvent;
    return this.http.post(url, formData);
  }
  public removeFromEvent(formData) {


    const url = this.urls.removeFromEvent;
    return this.http.post(url, formData);
  }
  public addWineToShop(formData) {


    const url = this.urls.addWineToShop;
    return this.http.post(url, formData);
  }
  public removeFromShop(formData) {


    const url = this.urls.removeFromShop;
    return this.http.post(url, formData);
  }


  public getWineryList() {

    const url = this.urls.getWineryList;
    return this.http.get(url);
  }

  public addWine(formData) {

    const url = this.urls.addWine;
    return this.http.post(url, formData);
  }
  public getWine(id, formData) {

    const url = this.urls.getWine + id;
    return this.httpMemory.post(url, formData);
  }
  public editWine(id) {

    const url = this.urls.editWine;
    return this.http.post(url, id);
  }
  public voteForWine(id) {

    const url = this.urls.voteForWine;
    return this.http.post(url, id);
  }
  public descriptionForWine(id) {

    const url = this.urls.descriptionForWine;
    return this.http.post(url, id);
  }
  public getWineStorage(formData, type) {
    let url;
    if (type == 'collector') {
      url = this.urls.getWineCollection;
    } else {
      url = this.urls.getWineStorage;
    }

    return this.http.post(url, formData);
  }
  public setWineStorage(formData, type) {

    let url;
    if (type == 'collector') {
      url = this.urls.setWineCollection;
    } else {
      url = this.urls.setWineStorage;
    }
    return this.http.post(url, formData);
  }
  public getStorage(formData) {

    const url = this.urls.getStorage;
    return this.http.post(url, formData);
  }
  public getWineShopData(formData) {
    const url = this.urls.getWineShopData;

    return this.http.post(url, formData);
  }
  public setWineShopData(formData) {

    const url = this.urls.setWineShopData;
    return this.http.post(url, formData);
  }
  public findWine(formData) {

    const url = this.urls.findWine;
    return this.http.post(url, formData);
  }
  public getToPersonStorage(formData) {

    const url = this.urls.getToPersonStorage;
    return this.http.post(url, formData);
  }
  public removeFromPersonStorage(formData) {

    const url = this.urls.removeFromPersonStorage;
    return this.http.post(url, formData);
  }
  public getMyVote(formData) {

    const url = this.urls.getMyVote;
    return this.http.post(url, formData);
  }
  public getMyDescription(formData) {

    const url = this.urls.getMyDescription;
    return this.http.post(url, formData);
  }

  public deleteWine(data) {



    const url = this.urls.deleteWine;
    return this.http.post(url, data);
  }
  public restoreWine(data) {



    const url = this.urls.restoreWine;
    return this.http.post(url, data);
  }
  public cloneWine(id) {


    const url = this.urls.cloneWine + id;
    return this.http.get(url);
  }
  public wishToBuy(formData) {

    const url = this.urls.wishToBuy;
    return this.http.post(url, formData);
  }
  public wishToTaste(formData) {

    const url = this.urls.wishToTaste;
    return this.http.post(url, formData);
  }
  public unwish(formData) {

    const url = this.urls.unwish;
    return this.http.post(url, formData);
  }


  public setWineImage(image, wine) {
    const data = new FormData();
    data.append('image', image);
    data.append('id', this.cookieService.get('myId'));
    data.append('hash', this.cookieService.get('hash'));
    data.append('wine', wine);
    const url = this.urls.setWineImage;
    return this.http.post(url, data);
  }

  public getClonesFromAvaliableGrapes(g) {

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
    // const cloneId = JSON.parse(g.cloneId);

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
    console.log(clones);
    clones = clones.sort((a, b) => {
      return a.id - b.id;
    });
    clones.forEach((x, i) => {
      if (i == 0 || clones[i].id != clones[i - 1].id) {
        list.push(x);
      }
    });
    g.clones = list;
  }


  public getWineryData(id: any) {

    const url = this.urls.getWineryData + id;
    return this.httpMemory.get(url)
      .pipe(
        map(data => {
          // @ts-ignore
          if (data.grapeSynonims) {
            // // @ts-ignore
            // const synonims = JSON.parse(data.grapeSynonims);
            // // @ts-ignore
            // for (let i = 0; i < synonims.length; i++) {
            //   // @ts-ignore
            //   if (data.additionalGrapes[i] && synonims[i]) {
            //     // @ts-ignore
            //     data.additionalGrapes[i].synonim = synonims[i];
            //   }
            // }

// @ts-ignore
            data.additionalGrapes.forEach(g => {

              this.getClonesFromAvaliableGrapes(g);

            });




            const wineryGrapeList = [];
// @ts-ignore
            const synonims = JSON.parse(data.grapeSynonims);
// @ts-ignore
            const grapelist = JSON.parse(data.grapelistDB);


            for (let i = 0; i < synonims.length; i++) {
// @ts-ignore
              data.additionalGrapes.forEach(x => {
                if (grapelist[i] && synonims[i]) {
                  if (x.id == grapelist[i]) {
                    const grape = {id: x.id, name: x.name, synonim: synonims[i], clones: x.clones};
                    // x.synonim = synonims[i];
                    wineryGrapeList.push(grape);
                  }
                } else if (grapelist[i]) {

                  if (x.id == grapelist[i]) {
                    const grape = {id: x.id, name: x.name, clones: x.clones};
                    // x.synonim = synonims[i];
                    wineryGrapeList.push(grape);
                  }
                }
              });
            }


// @ts-ignore
            data.additionalGrapes = wineryGrapeList;
          }
          return data;
        })
      );
  }

  public addBusiness(formData) {

    const url = this.urls.addBusiness;
    return this.http.post(url, formData);
  }
  public myBusiness(id) {

    const url = this.urls.myBusiness + id;
    return this.httpMemory.get(url);
  }

  public getRelationsForBusiness(formData) {

    const url = this.urls.getRelationsForBusiness;
    return this.httpMemory.post(url, formData);
  }
  public getBusiness(id, request) {

    const url = this.urls.getBusiness + id;
    return this.httpMemory.post(url, request);
  }
  public editBusiness(id, formData) {

    const url = this.urls.editBusiness;
    return this.http.post(url, id);
  }

  public setRelation(request) {

    const url = this.urls.setRelation;
    return this.http.post(url, request);
  }
  public deleteRelation(request) {

    const url = this.urls.deleteRelation;
    return this.http.post(url, request);
  }
  public setBusiness(request) {

    const url = this.urls.setBusiness;
    return this.http.post(url, request);
  }
  public deleteBusiness(request) {

    const url = this.urls.deleteBusiness;
    return this.http.post(url, request);
  }
  public setSpecialist(request) {

    const url = this.urls.setSpecialist;
    return this.http.post(url, request);
  }
  public deleteSpecialist(request) {

    const url = this.urls.deleteSpecialist;
    return this.http.post(url, request);
  }

  public addVineyard(formData) {

    const url = this.urls.addVineyard;
    return this.http.post(url, formData);
  }
  public getVineyard(id) {

    const url = this.urls.getVineyard + id;
    return this.httpMemory.get(url);
  }
  public editVineyard(id, formData) {

    const url = this.urls.editVineyard;
    return this.http.post(url, formData);
  }

  public deleteVineyard(data) {

    const url = this.urls.deleteVineyard;
    return this.http.post(url, data);
  }





  public getYourBusinesses() {
    const body = {
      id: this.cookieService.get('myId'),
      hash: this.cookieService.get('hash')
    };
    const url = this.urls.getYourBusinesses;
    return this.http.post(url, body);
  }

  public getGrapes() {

    const url = this.urls.getGrapes;
    return this.httpMemory.get(url);
  }
  public getCountries() {

    const url = this.urls.getCountries;
    return this.httpMultiload.get(url);
  }
  public getRegiones() {

    const url = this.urls.getRegiones;
    return this.httpMultiload.get(url);
  }
  public getQualities() {

    const url = this.urls.getQualities;
    return this.httpMemory.get(url);
  }
  public getKashruts() {

    const url = this.urls.getKashruts;
    return this.httpMemory.get(url);
  }

  public getPriceList() {

    const url = this.urls.getPriceList;
    return this.httpMultiload.get(url);
  }
  public getWrapList() {

    console.log('test');

    const url = this.urls.getWrapList;
    return this.httpMultiload.get(url);
  }
  public getCompetitionsList() {

    const url = this.urls.getCompetitionsList;
    return this.httpMemory.get(url);
  }
  public getAwardsList() {

    const url = this.urls.getAwardsList;
    return this.httpMemory.get(url);
  }

  public getProfessionalList() {

    const url = this.urls.getProfessionalList;
    return this.httpMemory.get(url);
  }

  public getWineType() {

    const url = this.urls.getWineType;
    return this.httpMultiload.get(url);
  }

  public getWineSubType() {

    const url = this.urls.getWineSubType;
    return this.httpMultiload.get(url);
  }

  public getSparklingType() {

    const url = this.urls.getSparklingType;
    return this.httpMultiload.get(url);
  }

  public getCorkTypes() {

    const url = this.urls.getCorkType;
    return this.httpMultiload.get(url);
  }

  public getNongrapeTypes() {

    const url = this.urls.getNongrapeTypes;
    return this.httpMultiload.get(url);
  }

  public getBarrelTypeList() {

    const url = this.urls.getBarrelTypeList;
    return this.httpMultiload.get(url);
  }

  public getBarrelSizeList() {

    const url = this.urls.getBarrelSizeList;
    return this.httpMultiload.get(url);
  }

  public getServingTemperatures() {

    const url = this.urls.getServingTemperatures;
    return this.httpMultiload.get(url);
  }

  public getHomepage() {

    const url = this.urls.getHomepage;
    return this.httpMemory.get(url);
  }

  public getConstructorPages() {

    const url = this.urls.getConstructorPages;
    return this.httpMemory.get(url);
  }

  public getConstructorBlocks() {

    const url = this.urls.getConstructorBlocks;
    return this.httpMemory.get(url);
  }

  public getConstructorBlocksSearch() {

    const url = this.urls.getConstructorBlocksSearch;
    return this.httpMemory.get(url);
  }

  public getConstructorStructure(data) {

    const url = this.urls.getConstructorStructure;
    return this.httpMemory.post(url, data);
  }

  public getBlockStructure(data) {

    const url = this.urls.getBlockStructure;
    return this.httpMemory.post(url, data);
  }

  public setAdditional(data) {

    const url = this.urls.setAdditional;
    return this.http.post(url, data);
  }

  public getAdditional(data) {

    const url = this.urls.getAdditional;
    return this.http.post(url, data);
  }

  public getPlaceholderImages(data) {

    const url = this.urls.getPlaceholderImages;
    return this.http.post(url, data);
  }

  public getWineChangelog(data) {

    const url = this.urls.getWineChangelog;
    return this.http.post(url, data);
  }
  public getWineryChangelog(data) {

    const url = this.urls.getWineryChangelog;
    return this.http.post(url, data);
  }
  public getWineryHistory(data) {

    const url = this.urls.getWineryHistory;
    return this.http.post(url, data);
  }
  public getWineHistory(data) {

    const url = this.urls.getWineHistory;
    return this.http.post(url, data);
  }
  public getBusinessHistory(data) {

    const url = this.urls.getBusinessHistory;
    return this.http.post(url, data);
  }
  public getShopHistory(data) {

    const url = this.urls.getShopHistory;
    return this.http.post(url, data);
  }
  public editWineryHistory(data) {

    const url = this.urls.editWineryHistory;
    return this.http.post(url, data);
  }
  public deleteWineryHistory(data) {

    const url = this.urls.deleteWineryHistory;
    return this.http.post(url, data);
  }
  public deleteWinery(data) {

    const url = this.urls.deleteWinery;
    return this.http.post(url, data);
  }
  public restoreWinery(data) {

    const url = this.urls.restoreWinery;
    return this.http.post(url, data);
  }


  public deleteSchemasForBlock(data) {

    const url = this.urls.deleteSchemasForBlock;
    return this.http.post(url, data);
  }
  public setSchemasForBlock(data) {

    const url = this.urls.setSchemasForBlock;
    return this.http.post(url, data);
  }
  public getSchemasForBlock(data) {

    const url = this.urls.getSchemasForBlock;
    return this.httpMemory.post(url, data);
  }
  public getSchemaTypes(data) {

    const url = this.urls.getSchemaTypes;
    return this.httpMemory.post(url, data);
  }
  public getSchemaBlock(data) {

    const url = this.urls.getSchemaBlock;
    return this.httpMemory.post(url, data);
  }

  public getUserById(data) {

    const url = this.urls.getUserById;
    return this.http.post(url, data);
  }

  public getAnyFile(path) {
    return this.http.get(path);
  }
  public setLanguageTable(request) {
    const data = new FormData();
    data.append('file', request);

    const url = this.urls.setLanguageTable;
    return this.http.post(url, data);
  }
  public getLanguageTable(request) {
    const body = request;

    const url = this.urls.getLanguageTable;
    return this.http.post(url, body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  public getLanguageList() {

    const url = this.urls.getLanguageList;
    return this.httpMultiload.get(url);
  }



  public visiting(data) {

    const url = this.urls.visiting;
    return this.httpMemory.post(url, data);
  }

  // public multiload() {
  //
  //   const url = this.urls.multiload;
  //   return this.http.get(url).sub;
  // }


}

export const urls = {
  multiload: 'data/multiload',
  visiting: 'data/visiting',

  setLanguageTable: 'data/set_language_table',
  getLanguageTable: 'data/get_language_table',
  getLanguageList: 'data/languagelist',

  registrateUser: 'user/add',
  getProfile: 'user/',
  login: 'user/login',
  editProfile: 'user/edit/',
  setLanguage: 'user/language',
  deleteUser: 'user/delete',
  getUserById: 'user/get_by_id',


  getYourBusinesses: 'data/yourBusinesses',
  getStorage: 'data/storage',
  getMyVote: 'data/myVote',
  getMyDescription: 'data/myDescription',
  getGrapes: 'data/grapes',
  getCountries: 'data/countries',
  getRegiones: 'data/regiones',

  setImage: 'data/image',

  getQualities: 'data/qualities',
  getQuality: 'quality/one/',
  addQuality: 'quality/add',
  editQuality: 'quality/edit/',
  deleteQuality: 'quality/delete/',


  getKashruts: 'data/kashrut',
  getKashrut: 'kashrut/one/',
  addKashrut: 'kashrut/add',
  editKashrut: 'kashrut/edit/',
  deleteKashrut: 'kashrut/delete/',

  getBiodinamic: 'biodinamic/one/',
  addBiodinamic: 'biodinamic/add',
  editBiodinamic: 'biodinamic/edit/',
  deleteBiodinamic: 'biodinamic/delete/',

  getOrganic: 'organic/one/',
  addOrganic: 'organic/add',
  editOrganic: 'organic/edit/',
  deleteOrganic: 'organic/delete/',

  getVegan: 'vegan/one/',
  addVegan: 'vegan/add',
  editVegan: 'vegan/edit/',
  deleteVegan: 'vegan/delete/',



  getPriceList: 'data/prices',
  getWrapList: 'data/wraps',
  getCompetitionsList: 'data/competitions',
  getAwardsList: 'data/awards',
  getProfessionalList: 'data/specialists',
  getWineType: 'data/winetype',
  getWineSubType: 'data/winesubtype',
  getSparklingType: 'data/sparklingtypes',
  getNongrapeTypes: 'data/nongrapetypes',
  getCorkType: 'data/corktypes',
  getBarrelTypeList: 'data/barreltypes',
  getBarrelSizeList: 'data/barrelsizes',
  getServingTemperatures: 'data/servingtemperatures',


  addShop: 'shop/add',
  getShop: 'shop/one/',
  editShop: 'shop/edit',


  addCompetition: 'competition/add',
  getCompetition: 'competition/one/',
  editCompetition: 'competition/edit',
  getCompetitionById: 'competition/get_by_id',
  getAwardById: 'competition/get_award_by_id',
  setAwardForEvent: 'competition/event_award',
  setAwardForWine: 'competition/wine_award',


  addWinery: 'winery/add',
  getWinery: 'winery/one/',
  editWinery: 'winery/edit',
  deleteWinery: 'winery/delete',
  restoreWinery: 'winery/restore',


  cloneEvent: 'event/clone',
  addEvent: 'event/add',
  getEvent: 'event/one/',
  editEvent: 'event/edit/',
  deleteEvent: 'event/delete/',
  enterEvent: 'event/enter/',
  leaveEvent: 'event/leave/',
  voteInEvent: 'event/vote/',
  addWineToEvent: 'event/add_wine',
  removeFromEvent: 'event/remove_wine',
  addWineToShop: 'shop/add_wine',
  removeFromShop: 'shop/remove_wine',
  getWineShopData: 'shop/get_wine_shop',
  setWineShopData: 'shop/set_wine_shop',

  addWine: 'wine/add',
  getWine: 'wine/one/',
  editWine: 'wine/edit',
  voteForWine: 'wine/vote',
  descriptionForWine: 'wine/description',
  setWineStorage: 'wine/storage',
  getWineStorage: 'wine/my_storage',
  getToPersonStorage: 'wine/personal_storage',
  removeFromPersonStorage: 'wine/remove_personal_storage',
  findWine: 'wine/find',
  setWineCollection: 'wine/collection',
  getWineCollection: 'wine/my_collection',
  deleteWine: 'wine/delete',
  restoreWine: 'wine/restore',
  setWineImage: 'wine/image',
  getWineryData: 'wine/wineryData/',
  cloneWine: 'wine/clone/',
  getWineries: 'data/winerylistSimple',
  wishToBuy: 'wine/wish_to_buy',
  wishToTaste: 'wine/wish_to_taste',
  unwish: 'wine/unwish',

  addBusiness: 'business/add',
  getBusiness: 'business/one/',
  editBusiness: 'business/edit',
  myBusiness: 'business/my/',
  getRelationsForBusiness: 'business/get_relations',
  setRelation: 'business/set_relation',
  deleteRelation: 'business/delete_relation',
  setBusiness: 'business/set_business',
  deleteBusiness: 'business/delete_business',
  setSpecialist: 'business/set_specialist',
  deleteSpecialist: 'business/delete_specialist',

  addVineyard: 'vineyard/add',
  getVineyard: 'vineyard/one/',
  editVineyard: 'vineyard/edit',
  deleteVineyard: 'vineyard/delete',

  getWineList: 'wine/all',
  getAwardList: 'data/awardlist',
  getCompetitionList: 'data/competitionlist',
  getKashrutList: 'data/kashrutlist',
  getQualityList: 'data/qualitylist',
  getRegionList: 'data/regionlist',
  getSpecialistList: 'data/specialistlist',
  getVineyardList: 'data/vineyardlist',
  getUserList: 'data/userlist',
  getBusinessList: 'data/businesslist',
  getWineryList: 'data/winerylist',
  getGrapeList: 'data/grapelist',

  geoByCoordinates: 'data/yandex',
  coordinatesByAddress: 'data/yandex_geo',

  geoByCoordinatesGoogle: 'data/google',
  coordinatesByAddressGoogle: 'data/google_geo',


  coordinatesByAddressLocationiq: 'data/locationiq_geo',
  addressByCoordinatesLocationiq: 'data/locationiq_coordinates',

  getHomepage: 'data/homepage',

  getConstructorPages: 'data/constructor_pages',
  getConstructorBlocks: 'data/constructor_blocks',
  getConstructorBlocksSearch: 'data/constructor_blocks_for_search',

  getConstructorStructure: 'data/get_consructor_structure',
  getBlockStructure: 'data/get_block_structure',
  setAdditional: 'business/set_additional',
  getAdditional: 'business/get_additional',
  getSchemasForBlock: 'data/find_schemas_for_block',
  setSchemasForBlock: 'data/set_schema_for_block',
  deleteSchemasForBlock: 'data/delete_schema_for_block',
  getSchemaBlock: 'data/get_schema_block',
  getSchemaTypes: 'data/get_schema_types',



  getPlaceholderImages: 'data/get_placeholder_images',

  getWineChangelog: 'wine/changelog',
  getWineryChangelog: 'winery/changelog',
  getWineryHistory: 'winery/history',
  getWineHistory: 'wine/history',
  getBusinessHistory: 'winery/history',
  getShopHistory: 'shop/history',

  editWineryHistory: 'winery/edit_history',
  deleteWineryHistory: 'winery/delete_history',
};
