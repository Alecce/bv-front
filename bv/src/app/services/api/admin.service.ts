import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {SuccessService} from '../success.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  urls = {
    setAdminOptions: 'admin/set_options',
    getAdminOptions: 'admin/get_options',

    getAdminUserList: 'admin/userlist',
    setUserFromAdmin: 'admin/user',
    deleteUserFromAdmin: 'admin/delete_user',

    getWinelist: 'admin/winelist',
    setWine: 'admin/wine',
    mergeWine: 'admin/merge_wines',
    deleteWine: 'admin/delete_wine',

    getWinerylist: 'admin/winerylist',
    setWinery: 'admin/winery',
    mergeWineries: 'admin/merge_wineries',
    deleteWinery: 'admin/delete_winery',

    getEventlist: 'admin/eventlist',
    setEvent: 'admin/event',
    deleteEvent: 'admin/delete_event',

    getVineyardlist: 'admin/vineyardlist',
    setVineyard: 'admin/vineyard',
    deleteVineyard: 'admin/delete_vineyard',

    getSpecialistlist: 'admin/specialistlist',
    setSpecialist: 'admin/specialist',
    deleteSpecialist: 'admin/delete_specialist',

    getRegionlist: 'admin/regionlist',
    setRegion: 'admin/region',
    deleteRegion: 'admin/delete_region',

    getQualitylist: 'admin/qualitylist',
    setQuality: 'admin/quality',
    deleteQuality: 'admin/delete_quality',

    getKashrutlist: 'admin/kashrutlist',
    setKashrut: 'admin/kashrut',
    deleteKashrut: 'admin/delete_kashrut',

    getGrapelist: 'admin/grapelist',
    setGrape: 'admin/grape',
    deleteGrape: 'admin/delete_grape',

    getGrapeClonelist: 'admin/grapeClonelist',
    setGrapeClone: 'admin/grapeClone',
    deleteGrapeClone: 'admin/delete_grapeClone',

    getCompetitionlist: 'admin/competitionlist',
    setCompetition: 'admin/competition',
    deleteCompetition: 'admin/delete_competition',

    getAwardlist: 'admin/awardlist',
    setAward: 'admin/award',
    deleteAward: 'admin/delete_award',

    getBiodynamiclist: 'admin/biodynamiclist',
    setBiodynamic: 'admin/biodynamic',
    deleteBiodynamic: 'admin/delete_biodynamic',

    getOrganiclist: 'admin/organiclist',
    setOrganic: 'admin/organic',
    deleteOrganic: 'admin/delete_organic',

    getVeganlist: 'admin/veganlist',
    setVegan: 'admin/vegan',
    deleteVegan: 'admin/delete_vegan',

    getAutodescriptionlist: 'admin/autodescriptionlist',
    setAutodescription: 'admin/autodescription',
    deleteAutodescription: 'admin/delete_autodescription',

    getAutodescriptionOptionslist: 'admin/autodescription_options_list',
    setAutodescriptionOptions: 'admin/autodescription_options',
    deleteAutodescriptionOptions: 'admin/delete_autodescription_options',

    getAutodescriptionlistCategories: 'admin/autodescription_categories_list',
    setAutodescriptionCategories: 'admin/autodescription_categories',
    deleteAutodescriptionCategories: 'admin/delete_autodescription_categories',

    getLanguagelist: 'admin/languagelist',
    setLanguage: 'admin/language',
    deleteLanguage: 'admin/delete_language',

    getVinetypelist: 'admin/vinetypelist',
    setVinetype: 'admin/vinetype',
    deleteVinetype: 'admin/delete_vinetype',

    getVineSubtypelist: 'admin/vinesubtypelist',
    setVineSubtype: 'admin/vinesubtype',
    deleteVineSubtype: 'admin/delete_vinesubtype',

    getSparklinglist: 'admin/sparklinglist',
    setSparkling: 'admin/sparkling',
    deleteSparkling: 'admin/delete_sparkling',

    getNongrapelist: 'admin/nongrapelist',
    setNongrape: 'admin/nongrape',
    deleteNongrape: 'admin/delete_nongrape',

    getCorklist: 'admin/corklist',
    setCork: 'admin/cork',
    deleteCork: 'admin/delete_cork',

    getBarrellist: 'admin/barrellist',
    setBarrel: 'admin/barrel',
    deleteBarrel: 'admin/delete_barrel',

    getBarrelsizelist: 'admin/barrelsizelist',
    setBarrelsize: 'admin/barrelsize',
    deleteBarrelsize: 'admin/delete_barrelsize',




    getHomelist: 'admin/homelist',
    setHome: 'admin/home',
    deleteHome: 'admin/delete_home',


    getConstructorPagelist: 'admin/constructor_pagelist',
    setConstructorPage: 'admin/constructor_page',
    deleteConstructorPage: 'admin/delete_constructor_page',

    getBlocklist: 'admin/blocklist',
    setBlock: 'admin/block',
    deleteBlock: 'admin/delete_block',

    getPageBlocklist: 'admin/page_blocklist',
    setPageBlock: 'admin/page_block',
    deletePageBlock: 'admin/delete_page_block',

    getBlockOptionlist: 'admin/block_optionlist',
    setBlockOption: 'admin/block_option',
    deleteBlockOption: 'admin/delete_block_option',

    getWineImagelist: 'admin/wine_image_list',
    setWineImage: 'admin/wine_image',
    deleteWineImage: 'admin/delete_wine_image',

    getBottlelist: 'admin/bottlelist',
    setBottle: 'admin/bottle',
    deleteBottle: 'admin/delete_bottle',

    getConstructorBlocks: 'admin/get_constructor_blocks',
    setConstructorBlocks: 'admin/set_constructor_blocks',
    getConstructorBlockById: 'admin/constructor_block_by_id',
};
  host = environment.host;

  public adminOptions = new ReplaySubject(1);


  constructor(private http: HttpClient, private cookieService: CookieService,
              private successService: SuccessService) {
    for (const url in this.urls) {
      this.urls[url] = this.host + this.urls[url];
    }
  }

  public setAdminOptions(req) {

    const url = this.urls.setAdminOptions;
    return this.http.post(url, req)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public getAdminOptions() {

    const url = this.urls.getAdminOptions;
    this.http.get(url).subscribe(data => {
      const res = {};
      // @ts-ignore
      data.forEach(x => {
        res[x.tab] = JSON.parse(x.options);
      });
      this.adminOptions.next(res);
    });
  }

  public getAdminUserList(option) {

    const url = this.urls.getAdminUserList;
    return this.http.post(url, option);
  }
  public setUserFromAdmin(option) {

    const url = this.urls.setUserFromAdmin;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteUserFromAdmin(option) {

    const url = this.urls.deleteUserFromAdmin;
    return this.http.post(url, option);
  }



  public getWinelist(option) {

    const url = this.urls.getWinelist;
    return this.http.post(url, option);
  }
  public setWine(option) {

    const url = this.urls.setWine;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public mergeWine(option) {

    const url = this.urls.mergeWine;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteWine(option) {

    const url = this.urls.deleteWine;
    return this.http.post(url, option);
  }


  public getWinerylist(option) {

    const url = this.urls.getWinerylist;
    return this.http.post(url, option);
  }
  public setWinery(option) {

    const url = this.urls.setWinery;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public mergeWineries(option) {

    const url = this.urls.mergeWineries;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteWinery(option) {

    const url = this.urls.deleteWinery;
    return this.http.post(url, option);
  }


  public getEventlist(option) {

    const url = this.urls.getEventlist;
    return this.http.post(url, option);
  }
  public setEvent(option) {

    const url = this.urls.setEvent;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteEvent(option) {

    const url = this.urls.deleteEvent;
    return this.http.post(url, option);
  }


  public getVineyardlist(option) {

    const url = this.urls.getVineyardlist;
    return this.http.post(url, option);
  }
  public setVineyard(option) {

    const url = this.urls.setVineyard;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteVineyard(option) {

    const url = this.urls.deleteVineyard;
    return this.http.post(url, option);
  }


  public getSpecialistlist(option) {

    const url = this.urls.getSpecialistlist;
    return this.http.post(url, option);
  }
  public setSpecialist(option) {

    const url = this.urls.setSpecialist;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteSpecialist(option) {

    const url = this.urls.deleteSpecialist;
    return this.http.post(url, option);
  }


  public getRegionlist(option) {

    const url = this.urls.getRegionlist;
    return this.http.post(url, option);
  }
  public setRegion(option) {

    const url = this.urls.setRegion;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteRegion(option) {

    const url = this.urls.deleteRegion;
    return this.http.post(url, option);
  }


  public getQualitylist(option) {

    const url = this.urls.getQualitylist;
    return this.http.post(url, option);
  }
  public setQuality(option) {

    const url = this.urls.setQuality;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteQuality(option) {

    const url = this.urls.deleteQuality;
    return this.http.post(url, option);
  }


  public getKashrutlist(option) {

    const url = this.urls.getKashrutlist;
    return this.http.post(url, option);
  }
  public setKashrut(option) {

    const url = this.urls.setKashrut;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteKashrut(option) {

    const url = this.urls.deleteKashrut;
    return this.http.post(url, option);
  }


  public getGrapelist(option) {

    const url = this.urls.getGrapelist;
    return this.http.post(url, option);
  }
  public setGrape(option) {

    const url = this.urls.setGrape;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteGrape(option) {

    const url = this.urls.deleteGrape;
    return this.http.post(url, option);
  }

  public getGrapeClonelist(option) {

    const url = this.urls.getGrapeClonelist;
    return this.http.post(url, option);
  }
  public setGrapeClone(option) {

    const url = this.urls.setGrapeClone;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteGrapeClone(option) {

    const url = this.urls.deleteGrapeClone;
    return this.http.post(url, option);
  }

  public getCompetitionlist(option) {

    const url = this.urls.getCompetitionlist;
    return this.http.post(url, option);
  }
  public setCompetition(option) {

    const url = this.urls.setCompetition;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteCompetition(option) {

    const url = this.urls.deleteCompetition;
    return this.http.post(url, option);
  }


  public getAwardlist(option) {

    const url = this.urls.getAwardlist;
    return this.http.post(url, option);
  }
  public setAward(option) {

    const url = this.urls.setAward;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteAward(option) {

    const url = this.urls.deleteAward;
    return this.http.post(url, option);
  }


  public getBiodynamiclist(option) {

    const url = this.urls.getBiodynamiclist;
    return this.http.post(url, option);
  }
  public setBiodynamic(option) {

    const url = this.urls.setBiodynamic;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteBiodynamic(option) {

    const url = this.urls.deleteBiodynamic;
    return this.http.post(url, option);
  }


  public getOrganiclist(option) {

    const url = this.urls.getOrganiclist;
    return this.http.post(url, option);
  }
  public setOrganic(option) {

    const url = this.urls.setOrganic;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteOrganic(option) {

    const url = this.urls.deleteOrganic;
    return this.http.post(url, option);
  }


  public getVeganlist(option) {

    const url = this.urls.getVeganlist;
    return this.http.post(url, option);
  }
  public setVegan(option) {

    const url = this.urls.setVegan;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteVegan(option) {

    const url = this.urls.deleteVegan;
    return this.http.post(url, option);
  }

  public getAutodescriptionlist(option) {

    const url = this.urls.getAutodescriptionlist;
    return this.http.post(url, option);
  }
  public setAutodescription(option) {

    const url = this.urls.setAutodescription;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteAutodescription(option) {

    const url = this.urls.deleteAutodescription;
    return this.http.post(url, option);
  }

  public getAutodescriptionOptionslist(option) {

    const url = this.urls.getAutodescriptionOptionslist;
    return this.http.post(url, option);
  }
  public setAutodescriptionOptions(option) {

    const url = this.urls.setAutodescriptionOptions;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteAutodescriptionOptions(option) {

    const url = this.urls.deleteAutodescriptionOptions;
    return this.http.post(url, option);
  }

  public getAutodescriptionlistCategories(option) {

    const url = this.urls.getAutodescriptionlistCategories;
    return this.http.post(url, option);
  }
  public setAutodescriptionCategories(option) {

    const url = this.urls.setAutodescriptionCategories;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteAutodescriptionCategories(option) {

    const url = this.urls.deleteAutodescriptionCategories;
    return this.http.post(url, option);
  }

  public getLanguagelist(option) {

    const url = this.urls.getLanguagelist;
    return this.http.post(url, option);
  }
  public setLanguage(option) {

    const url = this.urls.setLanguage;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteLanguage(option) {

    const url = this.urls.deleteLanguage;
    return this.http.post(url, option);
  }

  public getVinetypelist(option) {

    const url = this.urls.getVinetypelist;
    return this.http.post(url, option);
  }
  public setVinetype(option) {

    const url = this.urls.setVinetype;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteVinetype(option) {

    const url = this.urls.deleteVinetype;
    return this.http.post(url, option);
  }

  public getVineSubtypelist(option) {

    const url = this.urls.getVineSubtypelist;
    return this.http.post(url, option);
  }
  public setVineSubtype(option) {

    const url = this.urls.setVineSubtype;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteVineSubtype(option) {

    const url = this.urls.deleteVineSubtype;
    return this.http.post(url, option);
  }

  public getSparklinglist(option) {

    const url = this.urls.getSparklinglist;
    return this.http.post(url, option);
  }
  public setSparkling(option) {

    const url = this.urls.setSparkling;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteSparkling(option) {

    const url = this.urls.deleteSparkling;
    return this.http.post(url, option);
  }

  public getNongrapelist(option) {

    const url = this.urls.getNongrapelist;
    return this.http.post(url, option);
  }
  public setNongrape(option) {

    const url = this.urls.setNongrape;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteNongrape(option) {

    const url = this.urls.deleteNongrape;
    return this.http.post(url, option);
  }

  public getCorklist(option) {

    const url = this.urls.getCorklist;
    return this.http.post(url, option);
  }
  public setCork(option) {

    const url = this.urls.setCork;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteCork(option) {

    const url = this.urls.deleteCork;
    return this.http.post(url, option);
  }

  public getBarrellist(option) {

    const url = this.urls.getBarrellist;
    return this.http.post(url, option);
  }
  public setBarrel(option) {

    const url = this.urls.setBarrel;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteBarrel(option) {

    const url = this.urls.deleteBarrel;
    return this.http.post(url, option);
  }

  public getBarrelsizelist(option) {

    const url = this.urls.getBarrelsizelist;
    return this.http.post(url, option);
  }
  public setBarrelsize(option) {

    const url = this.urls.setBarrelsize;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteBarrelsize(option) {

    const url = this.urls.deleteBarrelsize;
    return this.http.post(url, option);
  }

  public getHomelist(option) {

    const url = this.urls.getHomelist;
    return this.http.post(url, option);
  }
  public setHome(option) {

    const url = this.urls.setHome;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteHome(option) {

    const url = this.urls.deleteHome;
    return this.http.post(url, option);
  }


  public getConstructorPagelist(option) {

    const url = this.urls.getConstructorPagelist;
    return this.http.post(url, option);
  }
  public setConstructorPage(option) {

    const url = this.urls.setConstructorPage;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteConstructorPage(option) {

    const url = this.urls.deleteConstructorPage;
    return this.http.post(url, option);
  }


  public getBlocklist(option) {

    const url = this.urls.getBlocklist;
    return this.http.post(url, option);
  }
  public setBlock(option) {

    const url = this.urls.setBlock;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteBlock(option) {

    const url = this.urls.deleteBlock;
    return this.http.post(url, option);
  }


  public getPageBlocklist(option) {

    const url = this.urls.getPageBlocklist;
    return this.http.post(url, option);
  }
  public setPageBlock(option) {

    const url = this.urls.setPageBlock;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deletePageBlock(option) {

    const url = this.urls.deletePageBlock;
    return this.http.post(url, option);
  }


  public getBlockOptionlist(option) {

    const url = this.urls.getBlockOptionlist;
    return this.http.post(url, option);
  }
  public setBlockOption(option) {

    const url = this.urls.setBlockOption;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteBlockOption(option) {

    const url = this.urls.deleteBlockOption;
    return this.http.post(url, option);
  }



  public getWineImagelist(option) {

    const url = this.urls.getWineImagelist;
    return this.http.post(url, option);
  }
  public setWineImage(option) {

    const url = this.urls.setWineImage;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteWineImage(option) {

    const url = this.urls.deleteWineImage;
    return this.http.post(url, option);
  }



  public getBottlelist(option) {

    const url = this.urls.getBottlelist;
    return this.http.post(url, option);
  }
  public setBottle(option) {

    const url = this.urls.setBottle;
    return this.http.post(url, option)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }
  public deleteBottle(option) {

    const url = this.urls.deleteBottle;
    return this.http.post(url, option);
  }



  public getConstructorBlocks(option) {

    const url = this.urls.getConstructorBlocks;
    return this.http.post(url, option);
  }
  public setConstructorBlocks(data) {

    const url = this.urls.setConstructorBlocks;
    return this.http.post(url, data)
      .pipe(
        map((res) => {
          this.successService.showSuccess();
          return res;
        })
      );
  }


  public getConstructorBlockById(data) {

    const url = this.urls.getConstructorBlockById;
    return this.http.post(url, data);
  }
  // public getRegionlist(option) {
  //
  //   const url = this.urls.getRegionlist;
  //   return this.http.post(url, option);
  // }
  // public setRegion(option) {
  //
  //   const url = this.urls.setRegion;
  //   return this.http.post(url, option)
  //     .pipe(
  //       map((res) => {
  //         this.successService.showSuccess();
  //         return res;
  //       })
  //     );
  // }
  // public deleteRegion(option) {
  //
  //   const url = this.urls.deleteRegion;
  //   return this.http.post(url, option);
  // }
}
