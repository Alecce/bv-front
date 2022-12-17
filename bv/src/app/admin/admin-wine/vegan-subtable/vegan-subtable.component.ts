import {AfterViewInit, Component, Inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SuperlistComponent} from '../../../lists/superlist/superlist.component';
import {LanguageServiceService} from '../../../services/language-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-vegan-subtable',
  templateUrl: './vegan-subtable.component.html',
  styleUrls: ['./vegan-subtable.component.css']
})
export class VeganSubtableComponent implements OnInit, AfterViewInit {

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

  tableColsVegan = [
    {variable: 'id', name: '#', link: true, href: 'vegan/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'picture', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'searchImage', image: true,
      imagePath: environment.veganImageStore}
  ];
  apiVegan = 'getVeganList';


  @ViewChildren(SuperlistComponent) lists: QueryList<SuperlistComponent>;

  kashrutList = [];
  qualityList = [];
  biodynamicList = [];
  organicList = [];
  veganList = [];

  // // @ts-ignore
  // @Input() downloadedData: Subject;

  form = new FormGroup({
    vegans: new FormGroup({}),
    veganWine: new FormGroup({}),
  });

  constructor(
    public langService: LanguageServiceService,
    public dialogRef: MatDialogRef<VeganSubtableComponent>,
    @Inject(MAT_DIALOG_DATA) public downloadedData) { }

  ngOnInit() {
  }
  get vegans(): FormGroup {
    return this.form.get('vegans') as FormGroup;
  }


  get veganWine(): FormGroup {
    return this.form.get('veganWine') as FormGroup;
  }

  ngAfterViewInit(): void {


    // this.listQualities = this.lists.first;
    this.lists.forEach(list => {
      console.log(list.api);

      if (list.api == this.apiVegan) {
        this.listVegan = list;
      }
    });

    this.subVegan = this.listVegan.checkboxes.valueChanges.subscribe(() => {
      this.veganList = Object.values(this.listVegan.checkboxSelect);
      this.veganList.forEach(v => {
        this.vegans.addControl(v.id + '', new FormControl(true));
        this.veganWine.addControl(v.id + '', new FormControl(false));
      });

    });

    this.downloadedData.subscribe(fatherData => {
      console.log(fatherData);
      if (fatherData.vegans) {
        this.listVegan.setData(fatherData.vegans);
      }
      if (fatherData.veganWine) {
        fatherData.veganWine.forEach(x => {
          try {
            this.veganWine.get(x.id + '').setValue(true);
          } catch (e) {}
        });
      }
    });
  }

  uncheckVegan(id) {
    if (this.langService.editable) {
      return;
    }
    this.listVegan.unsetCheckboxes(id);
    this.veganList = this.veganList.filter(v => {
      return v.id != id;
    });
    this.vegans.removeControl(id);
    this.veganWine.removeControl(id);
  }

  getVeganWine() {

    const res = [];
    for (const key in this.veganWine.value) {
      if (this.veganWine.value[key]) {
        res.push(key);
      }
    }
    return JSON.stringify(res);
  }
  close(): void {
    this.dialogRef.close();
  }

  getResults() {
    const wineryData = this.organicList;
    const wineData = this.organicList.filter(x => {
      // return true;
      return this.veganWine.value[x.id + ''];
    });
    return {vegans: wineryData, veganWine: wineData};
  }
}
