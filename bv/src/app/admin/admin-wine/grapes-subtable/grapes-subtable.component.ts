import {AfterViewInit, Component, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {SuperlistComponent} from '../../../lists/superlist/superlist.component';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {LanguageServiceService} from '../../../services/language-service.service';
import {RequestsService} from '../../../services/api/requests.service';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-grapes-subtable',
  templateUrl: './grapes-subtable.component.html',
  styleUrls: ['./grapes-subtable.component.css']
})
export class GrapesSubtableComponent implements OnInit, AfterViewInit {
  public tab = 'grapes';
  routeData = {editable: true};

  listGrapes;
  listVineyards;
  subGrapes;
  subVineyards;
  tableColsGrapes = [
    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'synonyms', name: 'Synonyms', link: false, href: '', hrefId: '', searchFormControlName: 'searchSynonyms'}
  ];
  apiGrapes = 'getGrapeListForAdmin';


  // @ts-ignore
  // @ViewChild(SuperlistComponent) list: SuperlistComponent;


  tableColsVineyards = [
    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'National name', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'int_name', name: 'International name', link: false, href: '', hrefId: '', searchFormControlName: 'searchInternationalName'},
    {variable: 'region', name: 'Region', link: false, href: '', hrefId: '', searchFormControlName: 'searchRegion'}
  ];
  apiVineyards = 'getVineyardList';


  // @ts-ignore
  // @ViewChild(SuperlistComponent) list: SuperlistComponent;

  @ViewChildren(SuperlistComponent) lists: QueryList<SuperlistComponent>;
  // listGrapes = this.lists.first;
  // listVineyards = this.lists.last;

  editable = false;
  grapeList = [];
  availableGrapeList = [];
  vineyardList = [];
  availableVineyardList = [];

  // @Input() parentData: string;
  // // @ts-ignore
  // @Input() downloadedData: ReplaySubject;
  // // @ts-ignore
  // @Input() wineryData: ReplaySubject;

  form = new FormGroup({
    // search: new FormControl(''),
    grapes: new FormGroup({}),
    vineyards: new FormGroup({}),
    grapesData: new FormArray([]),
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

  constructor(private service: RequestsService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public dialogRef: MatDialogRef<GrapesSubtableComponent>,
              @Inject(MAT_DIALOG_DATA) public downloadedData) { }

  ngOnInit() {

    // this.wineryData.subscribe(downloadData => {
    //
    //   this.availableGrapeList.length = 0;
    //   // console.log(downloadData);
    //   if (downloadData) {
    //     this.availableGrapeList = downloadData.grapesFull;
    //     this.availableVineyardList = downloadData.vineyardsFull;
    //
    //   }
    // });
    this.downloadedData.subscribe(fatherData => {
      if (fatherData.dumpgrape) {
        const grapeData = JSON.parse(fatherData.dumpgrape);
        grapeData.forEach(grape => {
          this.addGrapeData(grape);
        });
      }
      // @ts-ignore
      // if (fatherData.user !== 0 && this.cookieService.get('myId') * 1 !== fatherData.user * 1 || !this.activatedroute.snapshot.data.editable) {
      //   this.routeData.editable = false;
      //   this.form.disable();
      // }
    });

  }

  get grapes(): FormGroup {
    return this.form.get('grapes') as FormGroup;
  }
  get vineyards(): FormGroup {
    return this.form.get('vineyards') as FormGroup;
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
  availableGrapes() {

    const sumGrapes = [].concat(this.availableGrapeList);
    this.grapeList.forEach(g => {
      if (!this.existIn(sumGrapes, g)) {
        sumGrapes.push(g);
      }
    });
    return sumGrapes;
  }
  availableVineyards() {

    const sum = [].concat(this.availableVineyardList);
    this.vineyardList.forEach(g => {
      if (!this.existIn(sum, g)) {
        sum.push(g);
      }
    });
    return sum;
  }
  existIn(arr, el) {
    let res = false;
    arr.forEach(x => {
      if (x.id == el.id) {
        res = true;
      }
    });
    return res;
  }
  ngAfterViewInit(): void {

    this.listGrapes = this.lists.first;
    this.listVineyards = this.lists.last;


    this.subGrapes = this.listGrapes.checkboxes.valueChanges.subscribe(() => {
      this.grapeList = Object.values(this.listGrapes.checkboxSelect);
      this.grapeList.forEach(grape => {
        this.grapes.addControl(grape.id + '', new FormControl(true));
      });
      console.log(this.grapeList);
    });

    this.subVineyards = this.listVineyards.checkboxes.valueChanges.subscribe(() => {
      this.vineyardList = Object.values(this.listVineyards.checkboxSelect);
      this.vineyardList.forEach(v => {
        this.vineyards.addControl(v.id + '', new FormControl(true));
      });
    });

    this.downloadedData.subscribe(fatherData => {


      if (fatherData.additionalGrapes) {
        console.log(fatherData.additionalGrapes);

// @ts-ignore
        fatherData.additionalGrapes.forEach(g => {

          this.service.getClonesFromAvaliableGrapes(g);

        });
        this.listGrapes.setData(fatherData.additionalGrapes);

      }
      if (fatherData.additionalVineyards) {
        this.listVineyards.setData(fatherData.additionalVineyards);
      }
    });
  }


  uncheckGrape(id) {
    if (this.langService.editable) {
      return;
    }
    this.listGrapes.unsetCheckboxes(id);
    this.grapeList = this.grapeList.filter(g => {
      return g.id != id;
    });
    this.grapes.removeControl(id);
  }
  uncheckVineyard(id) {
    if (this.langService.editable) {
      return;
    }
    this.listVineyards.unsetCheckboxes(id);
    this.vineyardList = this.vineyardList.filter(v => {
      return v.id != id;
    });
    this.vineyards.removeControl(id);
  }


  close(): void {
    this.dialogRef.close();
  }

  getResults() {
    return {
      additionalGrapes: this.grapeList,
      additionalVineyards: this.vineyardList,
      dumpgrape: JSON.stringify(this.grapesData.value),
    };
  }

  getClones(grapeId) {
    const grapes = this.availableGrapes().filter(g => {
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
}

// 'additionalGrapes' => [],
//   'additionalVineyards' => [],
//   'dumpgrape' => $value->dumpgrape,
