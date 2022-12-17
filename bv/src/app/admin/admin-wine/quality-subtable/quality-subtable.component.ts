import {AfterViewInit, Component, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SuperlistComponent} from '../../../lists/superlist/superlist.component';
import {LanguageServiceService} from '../../../services/language-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-quality-subtable',
  templateUrl: './quality-subtable.component.html',
  styleUrls: ['./quality-subtable.component.css']
})
export class QualitySubtableComponent implements OnInit, AfterViewInit {

  country = '';

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

  tableColsQualities = [
    {variable: 'id', name: '#', link: true, href: 'quality/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'Quality', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'year', name: 'Year', link: false, href: '', hrefId: '', searchFormControlName: 'searchYear'},
    {variable: 'region', name: 'Region', link: false, href: '', hrefId: '', searchFormControlName: 'searchRegiones'},
    {variable: 'country', name: 'Country', link: false, href: '', hrefId: '', searchFormControlName: 'searchCountry'},
    {variable: 'picture', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'searchImage', image: true,
      imagePath: environment.qualityImageStore}
  ];
  apiQualities = 'getQualityList';


  @ViewChildren(SuperlistComponent) lists: QueryList<SuperlistComponent>;

  kashrutList = [];
  qualityList = [];
  biodynamicList = [];
  organicList = [];
  veganList = [];

  // // @ts-ignore
  // @Input() downloadedData: Subject;

  form = new FormGroup({
    qualities: new FormGroup({}),
    qualitiesWine: new FormGroup({}),
  });

  constructor(
    public langService: LanguageServiceService,
    public dialogRef: MatDialogRef<QualitySubtableComponent>,
    @Inject(MAT_DIALOG_DATA) public downloadedData) { }

  ngOnInit() {
  }
  get qualities(): FormGroup {
    return this.form.get('qualities') as FormGroup;
  }


  get qualitiesWine(): FormGroup {
    return this.form.get('qualitiesWine') as FormGroup;
  }

  ngAfterViewInit(): void {


    // this.listQualities = this.lists.first;
    this.lists.forEach(list => {
      console.log(list.api);
      if (list.api == this.apiQualities) {
        this.listQualities = list;
      }
    });

    this.subQualities = this.listQualities.checkboxes.valueChanges.subscribe(() => {
      this.qualityList = Object.values(this.listQualities.checkboxSelect);
      this.qualityList.forEach(v => {
        this.qualities.addControl(v.id + '', new FormControl(true));
        this.qualitiesWine.addControl(v.id + '', new FormControl(false));
      });

    });

    this.downloadedData.subscribe(fatherData => {
      if (fatherData.country) {
        (this.listQualities.form.get('searchCountry') as FormControl).setValue(fatherData.country);
        this.country = fatherData.country;
        this.listQualities.getData();
      }
      console.log(fatherData);
      if (fatherData.qualities) {
        this.listQualities.setData(fatherData.qualities);
      }
      if (fatherData.qualitiesWine) {
        fatherData.qualitiesWine.forEach(x => {
          try {
            this.qualitiesWine.get(x.id + '').setValue(true);
          } catch (e) {}
        });
      }
    });
  }

  uncheckQuality(id) {
    if (this.langService.editable) {
      return;
    }
    this.listQualities.unsetCheckboxes(id);
    this.qualityList = this.qualityList.filter(v => {
      return v.id != id;
    });
    this.qualities.removeControl(id);
    this.qualitiesWine.removeControl(id);
  }

  getQualitiesWine() {
    console.log(this.qualitiesWine.value);

    const res = [];
    for (const key in this.qualitiesWine.value) {
      if (this.qualitiesWine.value[key]) {
        res.push(key);
      }
    }
    return JSON.stringify(res);
  }

  close(): void {
    this.dialogRef.close();
  }

  getResults() {
    const wineryData = this.qualityList;
    const wineData = this.qualityList.filter(x => {
      // return true;
      return this.qualitiesWine.value[x.id + ''];
    });
    return {qualities: wineryData, qualitiesWine: wineData, country: this.country};
  }
}
