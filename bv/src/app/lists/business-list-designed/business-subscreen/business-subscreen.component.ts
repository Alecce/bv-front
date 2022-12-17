import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '../../../services/language-service.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../../../services/api/requests.service';
import {CookieObserverService} from '../../../services/cookieObserver/cookie-observer.service';
import {ListsService} from '../../../services/api/lists.service';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-business-subscreen',
  templateUrl: './business-subscreen.component.html',
  styleUrls: ['./business-subscreen.component.css']
})
export class BusinessSubscreenComponent implements OnInit {

  businessPage = 1;
  businessTotal = 0;
  chosenBusiness;

  parentsArr = [];
  business = {type: null, id: null};

  form = new FormGroup({
    relatons: new FormArray([]),
    // id: new FormControl(0),
    // name: new FormControl(''),
    // type: new FormControl('select'),
  });

  constructor(
    public dialogRef: MatDialogRef<BusinessSubscreenComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    // @Inject(MAT_DIALOG_DATA) public type,
    private service: RequestsService,
    private activatedroute: ActivatedRoute,
    public listService: ListsService,
    private cookieService: CookieService,
    private cookieObserver: CookieObserverService,
    public langService: LanguageServiceService,
    private route: Router) { }

  ngOnInit() {
    console.log(this.data);
    // this.type = this.data.type;
    // this.idBusiness = this.data.id;
    this.business.type = this.data.type;
    this.business.id = this.data.id;

    this.service.getRelationsForBusiness(this.business).subscribe( res => {
      // @ts-ignore
      res.forEach(x => {

        this.addRelation(x, false);
      });
    });
    // if (this.data.business) {
    //   this.id.setValue(this.data.business.id);
    //   this.name.setValue(this.data.business.name);
    //   this.type.setValue(this.data.business.type);
    // }

  }
  get relatons(): FormArray {
    return this.form.get('relatons') as FormArray;
  }
  get name() {
    return this.form.get('name');
  }
  get type() {
    return this.form.get('type');
  }
  close(): void {
    this.dialogRef.close();
  }

  addRelation(relation, changeble) {

    const chosenParent = new ReplaySubject(1);
    this.parentsArr.push(chosenParent);
    const relationControl = new FormGroup({
      id: new FormControl(relation.id),
      type: new FormControl(relation.type),
      parent: new FormControl(relation.parent),
      parentName: new FormControl(relation.parentName),
      dateStart: new FormControl(relation.dateStart),
      dateEnd: new FormControl(relation.dateEnd),
      changeable: new FormControl(changeble),

    });
    chosenParent.subscribe(parent => {
      // @ts-ignore
      relationControl.get('parent').setValue(parent.id);
      // @ts-ignore
      relationControl.get('parentName').setValue(parent.name);
    });
    this.relatons.push(relationControl);
  }
  addNewRelation() {
    const relation = {
      id: '',
      type: '',
      parent: '',
      dateStart: '',
      dateEnd: '',
    };
    this.addRelation(relation, true);
  }

  changeRelation(i) {
    const relation = this.relatons.at(i).value;
    const request = {relation, child: this.business};
    this.service.setRelation(request).subscribe(result => {
      console.log(result);

      this.relatons.at(i).get('changeable').setValue(false);
    });
  }
  openRelation(i) {
    this.relatons.at(i).get('changeable').setValue(true);
  }

  deleteRelation(i) {

    const relation = this.relatons.at(i).value;
    const request = {relation, child: this.business};
    this.service.deleteRelation(request).subscribe(x => {
      this.relatons.removeAt(i);
    });
  }
  clearParent(i) {
    this.relatons.at(i).get('parent').setValue('');
    this.relatons.at(i).get('parentName').setValue('');
  }

  getRowNameBusiness = x => {
    return x.name;
  }
  // setWineryPage(page) {
  //   if (this.langService.editable) {
  //     return;
  //   }
  //   this.wineryPage = page;
  //   this.downloadWineries();
  //   return page;
  // }
}
