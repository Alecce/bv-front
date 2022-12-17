import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {LanguageServiceService} from '../../services/language-service.service';
import {CookieService} from 'ngx-cookie-service';
import {forkJoin, ReplaySubject} from 'rxjs';
import {RequestsService} from '../../services/api/requests.service';
import {ListsService} from '../../services/api/lists.service';
import {Overlay} from '@angular/cdk/overlay';

@Component({
  selector: 'app-wines-full-designed',
  templateUrl: './wines-full-designed.component.html',
  styleUrls: ['./wines-full-designed.component.css']
})
export class WinesFullDesignedComponent implements OnInit {
  professionalList = [];
  competitionList = [];
  awardList = [];
  barrelTypeList = [];
  wrappingList = [];
  priceList = [];

  glasses = [
    1, 2, 3, 4, 5, 6, 7
  ];

  profMap = new Map();
  awardsMap = new Map();
  competitionMap = new Map();
  barrelTypeMap = new Map();
  wrappingMap = new Map();
  priceMap = new Map();
  grapeMap = new Map();
  vineyardMap = new Map();
  wineData = null;
  noImage = '../../../assets/images/no-image.png';
  downloadedData = new ReplaySubject(1);
  profPoints = [];
  awards = [];
  grapes = [];
  barrels = [];
  bottles = [];

  constructor(private service: RequestsService,
              public listService: ListsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              public overlay: Overlay,
              private router: Router,
              public langService: LanguageServiceService) { }

  ngOnInit() {
    const id = this.activatedroute.snapshot.params.id;

    const getAwardsList = this.service.getAwardsList();
    const getCompetitionsList = this.service.getCompetitionsList();

    const getBarrelTypeList = this.service.getBarrelTypeList();

    const getWrapList = this.service.getWrapList();
    const getPriceList = this.service.getPriceList();
    const getProfList = this.service.getProfessionalList();



    forkJoin([getAwardsList, getCompetitionsList, getBarrelTypeList, getWrapList, getPriceList, getProfList]).subscribe(results => {

      // @ts-ignore
      this.professionalList = results[5];
      // @ts-ignore
      this.awardList = results[0];
      // @ts-ignore
      this.competitionList = results[1];
      // @ts-ignore
      this.barrelTypeList = results[2];
      // @ts-ignore
      this.wrappingList = results[3];
      // @ts-ignore
      this.priceList = results[4];

      this.professionalList.forEach(x => {
        this.profMap.set(x.id, x.name);
        // this.profMap.
      });

      this.awardList.forEach(x => {
        this.awardsMap.set(x.id, x.name);
        // this.profMap.
      });

      this.competitionList.forEach(x => {
        this.competitionMap.set(x.id, x.compname);
        // this.profMap.
      });

      this.barrelTypeList.forEach(x => {
        this.barrelTypeMap.set(x.id, x.name);
        // this.profMap.
      });

      this.wrappingList.forEach(x => {
        this.wrappingMap.set(x.id, x.size);
        // this.profMap.
      });

      this.priceList.forEach(x => {
        this.priceMap.set(x.id, x.price);
        // this.profMap.
      });
    });
    this.service.getWine(id, {}).subscribe(data => {
      // this.downloadedData.next(data);
      this.wineData = data;
      this.downloadedData.next(data);

      // @ts-ignore
      this.profPoints = JSON.parse(data.profPointsDB);

      // @ts-ignore
      this.awards = JSON.parse(data.competitionDB);

      // @ts-ignore
      this.grapes = JSON.parse(data.dumpgrape);

      // @ts-ignore
      this.barrels = JSON.parse(data.barrelsDB);

      console.log(this.barrels);

      // @ts-ignore
      this.bottles = JSON.parse(data.wrappingDB);



      // @ts-ignore
      data.additionalGrapes.forEach(x => {
        // @ts-ignore
        this.grapeMap.set(x.id, x.name);
        // this.profMap.
      });


      // @ts-ignore
      data.additionalVineyards.forEach(x => {
        // @ts-ignore
        this.vineyardMap.set(x.id, x.name);
        // this.profMap.
      });
    }, err => {

    });
  }

  getImage() {
    if (this.wineData && this.wineData.image) {
      return environment.wineImageStore + `${this.wineData.id + '_' + this.wineData.image}.png`;

    } else {
      return this.noImage;
    }
  }


  shortInfo() {

    this.router.navigate(['/wine/' + this.activatedroute.snapshot.params.id]);
  }
  editWine() {
    this.router.navigate(['/wine-edit/' + this.activatedroute.snapshot.params.id]);
  }
}
