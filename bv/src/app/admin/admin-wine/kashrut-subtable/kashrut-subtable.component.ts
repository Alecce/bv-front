import {AfterViewInit, Component, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {SuperlistComponent} from '../../../lists/superlist/superlist.component';
import {FormControl, FormGroup} from '@angular/forms';
import {LanguageServiceService} from '../../../services/language-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-kashrut-subtable',
  templateUrl: './kashrut-subtable.component.html',
  styleUrls: ['./kashrut-subtable.component.css']
})
export class KashrutSubtableComponent implements OnInit, AfterViewInit {

  listKashruts;
  listQualities;
  listBiodynamic;
  listOrganic;
  listVegan;

  subKashruts;
  subQualities;
  subBiodynamic;
  subOrganic;
  subVegan;

  tableColsKashruts = [
    {variable: 'id', name: '#', link: true, href: 'kashrut/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'int_name', name: 'International Name', link: false, href: '', hrefId: '', searchFormControlName: 'searchInternationalName'},
    {variable: 'hebrew_name', name: 'National name', link: false, href: '', hrefId: '', searchFormControlName: 'searchHebrewName'},
    {variable: 'picture', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'searchImage', image: true,
      imagePath: environment.kashrutImageStore}
  ];
  apiKashruts = 'getKashrutList';


  @ViewChildren(SuperlistComponent) lists: QueryList<SuperlistComponent>;

  kashrutList = [];
  qualityList = [];
  biodynamicList = [];
  organicList = [];
  veganList = [];


  // // @ts-ignore
  // @Input() downloadedData: Subject;

  form = new FormGroup({
    kashruts: new FormGroup({}),
    kashrutsWine: new FormGroup({}),
  });

  constructor(
    public langService: LanguageServiceService,
    public dialogRef: MatDialogRef<KashrutSubtableComponent>,
    @Inject(MAT_DIALOG_DATA) public downloadedData) { }

  ngOnInit() {
  }
  get kashruts(): FormGroup {
    return this.form.get('kashruts') as FormGroup;
  }


  get kashrutsWine(): FormGroup {
    return this.form.get('kashrutsWine') as FormGroup;
  }

  ngAfterViewInit(): void {


    // this.listQualities = this.lists.first;
    this.lists.forEach(list => {
      console.log(list.api);
      if (list.api == this.apiKashruts) {
        this.listKashruts = list;
      }
    });

    this.subKashruts = this.listKashruts.checkboxes.valueChanges.subscribe(() => {
      this.kashrutList = Object.values(this.listKashruts.checkboxSelect);
      this.kashrutList.forEach(grape => {
        this.kashruts.addControl(grape.id + '', new FormControl(true));
        this.kashrutsWine.addControl(grape.id + '', new FormControl(false));
      });
    });

    this.downloadedData.subscribe(fatherData => {
      console.log(fatherData);
      if (fatherData.kashruts) {
        this.listKashruts.setData(fatherData.kashruts);
      }
      if (fatherData.kashrutsWine) {
        fatherData.kashrutsWine.forEach(x => {
          try {
            this.kashrutsWine.get(x.id + '').setValue(true);
          } catch (e) {}
        });
      }
    });
  }

  uncheckKashrut(id) {
    if (this.langService.editable) {
      return;
    }
    this.listKashruts.unsetCheckboxes(id);
    this.kashrutList = this.kashrutList.filter(g => {
      return g.id != id;
    });
    this.kashruts.removeControl(id);
    this.kashrutsWine.removeControl(id);
  }

  getKashrutsWine() {

    const res = [];
    for (const key in this.kashrutsWine.value) {
      if (this.kashrutsWine.value[key]) {
        res.push(key);
      }
    }
    return JSON.stringify(res);
  }
  close(): void {
    this.dialogRef.close();
  }

  getResults() {
    const wineryData = this.kashrutList;
    const wineData = this.kashrutList.filter(x => {
      // return true;
      return this.kashrutsWine.value[x.id + ''];
    });
    return {kashruts: wineryData, kashrutsWine: wineData, test: this.kashrutsWine.value};
  }
}
