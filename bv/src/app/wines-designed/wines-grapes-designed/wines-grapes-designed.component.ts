import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RequestsService} from '../../services/api/requests.service';
import {LanguageServiceService} from '../../services/language-service.service';
import {ListsService} from '../../services/api/lists.service';
import {Overlay} from '@angular/cdk/overlay';
import {CookieService} from 'ngx-cookie-service';
import {debounceTime, filter} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {AccountServiceService} from '@src/app/services/account-service.service';

@Component({
  selector: 'app-wines-grapes-designed',
  templateUrl: './wines-grapes-designed.component.html',
  styleUrls: ['./wines-grapes-designed.component.css']
})
export class WinesGrapesDesignedComponent implements OnInit {
  tab = 'grapes';
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() isWineryOwnerSubject: Subject;
  isWineryOwner = false;

  form = new FormGroup({
    grapes: new FormGroup({}),
    vineyards: new FormGroup({}),
    grapesData: new FormArray([]),

    grapeSearch: new FormControl(''),


    vineyardsData: new FormArray([]),

    vineyardSearch: new FormControl(''),

    loadingCheck: new FormControl(false),
  });

  ageList = [
    {id: '1', name: '4-7'},
    {id: '2', name: '7-10'},
    {id: '3', name: '10-15'},
    {id: '4', name: '15-25'},
    {id: '5', name: '25-40'},
    {id: '6', name: '40-60'},
    {id: '7', name: '60-80'},
    {id: '8', name: '80-100'},
    {id: '9', name: '100-140'},
    {id: '10', name: '140-180'},
    {id: '11', name: '>180'},
  ];


  grapeList = [];
  vineyardList = [];
  wineryGrapeList = [];
  wineryVineyardList = [];

  grapePage = 1;
  grapeTotal = 0;
  vineyardPage = 1;
  vineyardTotal = 0;

  constructor(private service: RequestsService,
              public listService: ListsService,
              private activatedroute: ActivatedRoute,
              public accountService: AccountServiceService,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public overlay: Overlay) { }


  getResult() {

    this.grapesData.controls.forEach((grape, i) => {
      if (i > 0) {
        console.log(grape);
        grape.get('main').setValue(false);
      }
    })


    return this.form.value;
  }
  ngOnInit() {

    this.isWineryOwnerSubject.subscribe(v => {
      this.isWineryOwner = v;
    });

    this.langService.languageChanged.subscribe(() => {
      this.sortGrapes();
    });
    this.grapeSearch.valueChanges.pipe(
      debounceTime(1000),
      filter(form => !form.invalid),
    ).subscribe(() => {
      this.downloadGrape();
    });


    this.vineyardSearch.valueChanges.pipe(
      debounceTime(1000),
      filter(form => !form.invalid),
    ).subscribe(() => {
      this.downloadVineyard();
    });

    this.activatedroute.data.subscribe(data => {
      if (data.download) {
        this.downloadedData.subscribe(downloadData => {
          if (downloadData.dumpgrape) {
            const grapeData = JSON.parse(downloadData.dumpgrape);
            grapeData.forEach(grape => {
              this.addGrapeData(grape);
            });
          }
          //grapes and vineyards are downloading according to winery change, not here.




          this.sortingGrapes();
          this.sortingVineyards();
        });
      }
    });



    this.langService.download.subscribe(() => {

      this.sortingGrapes();
      this.sortingVineyards();
    })
  }
  get loadingCheck() {
    return this.form.get('loadingCheck');
  }
  get grapeSearch() {
    return this.form.get('grapeSearch');
  }

  get vineyardSearch() {
    return this.form.get('vineyardSearch');
  }

  downloadVineyard() {
    this.listService.getVineyardListForWinery({search: this.vineyardSearch.value, page: this.vineyardPage}).subscribe(data => {
        // @ts-ignore
        this.vineyardList = data.rows;
        // @ts-ignore
        this.vineyardTotal = data.total;
      }
    );
  }
  selectVineyard(vineyard) {
    if (!this.isContain(this.wineryVineyardList, vineyard.id)) {
      this.wineryVineyardList.push(vineyard);
      this.sortingVineyards();
    }
  }
  getVineyardName(vineyard) {
    if (vineyard) {
      if (vineyard.name && (vineyard.name == vineyard.international || !vineyard.international)) {
        return `${vineyard.name}`;
      }
      if (vineyard.international && !vineyard.name) {
        return `${vineyard.international}`;
      }
      return `${vineyard.name} (${vineyard.international})`;
    }
  }
  downloadGrape() {
    const search = this.grapeSearch.value.split(',').join('');
    this.listService.getGrapeListForWinery({search, page: this.grapePage}).subscribe(data => {
        // @ts-ignore
        this.grapeList = data.rows;
        // this.grapeList.forEach(g => {
        //
        //   if (g.name.toLowerCase().includes(search.toLowerCase())) {
        //     g.row = g.name;
        //   } else if (g.synonyms.toLowerCase().includes(search.toLowerCase())) {
        //     const synArr = g.synonyms.split(', ');
        //     const syn = synArr.filter(x => {
        //       return x.toLowerCase().includes(search.toLowerCase());
        //     })[0];
        //     g.row = syn + ' (' + g.name + ')';
        //   } else if (g.translate.toLowerCase().includes(search.toLowerCase())) {
        //
        //     g.row = g.translate + ' (' + g.name + ')';
        //   }
        // });
      // @ts-ignore
        this.grapeTotal = data.total;
      }
    );
  }
  isContain(arr: any[], id: any) {
    let res = false;
    arr.forEach(x => {
      if (x.id == id) {
        res = true;
      }
    });
    return res;
  }
  isContainGrapeWithSynonym(arr: any[], grape: any) {
    let res = false;
    arr.forEach(x => {
      // @ts-ignore
      if (x.id == grape.id && x.synonim == grape.synonim) {
        res = true;
      }
    });
    return res;
  }
  selectGrape(grape) {
    console.log(grape);
    console.log(this.wineryGrapeList);

    if (!this.isContainGrapeWithSynonym(this.wineryGrapeList, grape)) {
      this.wineryGrapeList.push(grape);
      this.sortGrapes();
      this.sortingGrapes();
    }
  }
  getGrapeName(grape) {
    // console.log(this.wineryGrapeList);

    return grape.row;
  }
  reloadGrapes(winery) {
    // console.log(winery);

    // @ts-ignore
    this.wineryGrapeList = winery.additionalGrapes;



    // @ts-ignore
    this.wineryVineyardList = winery.additionalVineyards;

    this.sortGrapes();
    this.sortingVineyards();
    this.sortingGrapes();
  }
  removeGrapeFromWinery(i) {
    // @ts-ignore
    this.wineryGrapeList.splice(i, 1);
    this.sortingGrapes();
  }
  removeVineyardFromWinery(i) {
    // @ts-ignore
    this.wineryVineyardList.splice(i, 1);
    this.sortingVineyards();
  }



  addGrapeData(grape) {
    if (this.langService.editable) {
      return;
    }
    if (grape) {
      this.grapesData.push(this.newGrapesDataGroup(grape));
    } else {
      this.grapesData.push(this.newBlancGrapesDataGroup());
    }
  }
  removeGrapeData(i) {
    if (this.langService.editable) {
      return;
    }
    this.grapesData.removeAt(i);
  }
  get grapesData(): FormArray {
    return this.form.get('grapesData') as FormArray;
  }
  newBlancGrapesDataGroup() {
    return new FormGroup({
      grape: new FormControl(0),
      percent: new FormControl(''),
      vineyard: new FormControl(0),
      grapeyard: new FormControl(''),
      age: new FormControl(''),
      gharvest_date: new FormControl(''),
      brix: new FormControl(''),
      nightHarvest: new FormControl(0),
      handPicked: new FormControl(0),
      main: new FormControl(''),
      clone: new FormControl(0),
    });
  }
  newGrapesDataGroup(grape) {
    return new FormGroup({
      grape: new FormControl(grape.grape),
      percent: new FormControl(grape.percent),
      vineyard: new FormControl(grape.vineyard),
      grapeyard: new FormControl(grape.grapeyard),
      age: new FormControl(grape.age),
      gharvest_date: new FormControl(grape.gharvest_date),
      brix: new FormControl(grape.brix),
      nightHarvest: new FormControl(grape.nightHarvest),
      handPicked: new FormControl(grape.handPicked),
      main: new FormControl(grape.main),
      clone: new FormControl(grape.clone),
    });
  }
  setGrapePage(page) {
    if (this.langService.editable) {
      return;
    }
    this.grapePage = page;
    this.downloadGrape();
    return page;
  }
  setVineyardPage(page) {
    if (this.langService.editable) {
      return;
    }
    this.vineyardPage = page;
    this.downloadVineyard();
    return page;
  }
  vineyardLink(vineyard) {

    return '/vineyard/' + vineyard.id;
  }
  sortGrapes() {

    // this.wineryGrapeList = this.langService.sortByTranslate('grapes_names', '', 'id', this.wineryGrapeList, 'name');
  }

  get grapesListUnique() {
    const list = [];
    const ordered = [...this.wineryGrapeList].sort((a, b) => {
      return a.id - b.id;
    });
    ordered.forEach((x, i) => {
      if (i == 0 || ordered[i].id != ordered[i - 1].id) {
        list.push(x);
      }
    });
    return list.sort((a, b) => {
      const firstTextInCurrentLanguage = a.synonim
        || this.langService.getTextFromEverySource('grapes_names', '', a.id, a.name)
        || a.name;
      const secondTextInCurrentLanguage = b.synonim
        || this.langService.getTextFromEverySource('grapes_names', '', b.id, b.name)
        || b.name;

      return firstTextInCurrentLanguage > secondTextInCurrentLanguage ? 1 : -1;
    });
  }

  getClones(grapeId) {
    const grapes = this.wineryGrapeList.filter(g => {
      return g.id == grapeId;
    });
    let grape = null;

    if (grapes.length) {
      grape = grapes[0];
    }

    let clones = [];

    if (grape) {
      clones = grape.clones;
    }

    return clones;
  }


  sortingGrapes() {
    console.log(this.wineryGrapeList);

    this.wineryGrapeList.sort((a, b) => {
      const firstTextInCurrentLanguage = a.synonim
        || this.langService.getTextFromEverySource('grapes_names', '', a.id, a.name)
        || a.name;
      const secondTextInCurrentLanguage = b.synonim
        || this.langService.getTextFromEverySource('grapes_names', '', b.id, b.name)
        || b.name;

      return firstTextInCurrentLanguage > secondTextInCurrentLanguage ? 1 : -1;
    })
  }

  sortingVineyards() {
    // console.log(this.wineryVineyardList);

    this.wineryVineyardList.sort((a, b) => {
      const firstTextInCurrentLanguage = this.getVineyardName(a);
      const secondTextInCurrentLanguage = this.getVineyardName(b);



      return firstTextInCurrentLanguage > secondTextInCurrentLanguage ? 1 : -1;
    })
  }


  isBigScreen() {
    return window.innerWidth > 1080
  }
}
