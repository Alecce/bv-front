import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Overlay} from '@angular/cdk/overlay';
import {RequestsService} from '@src/app/services/api/requests.service';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {AccountServiceService} from '@src/app/services/account-service.service';
import {ActivatedRoute} from '@angular/router';
import {ListsService} from '@src/app/services/api/lists.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {languagesInterface} from '@src/environments/languages';

@Component({
  selector: 'app-wine-description',
  templateUrl: './wine-description.component.html',
  styleUrls: ['./wine-description.component.css']
})
export class WineDescriptionComponent implements OnInit {
  tab = 'description';
  LANGUAGE_CURRENT_PAGE = 'wine_description';
  // @ts-ignore
  @Input() generatedDescriptionSubject: Subject;
  // @ts-ignore
  @Input() descriptionsSubject: Subject;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() isWineryOwnerSubject: Subject;
  // @ts-ignore
  @Input() isSelect: Subject;

  isWineryOwner = false;


  languageArr = languagesInterface;

  form = new FormGroup({
    descriptions: new FormArray([]),
    descriptions_confirmation: new FormGroup({}),

    order: new FormControl('checkbox'),
  });


  descriptionsArr = [];

  constructor(private service: RequestsService,
              public listService: ListsService,
              public accountService: AccountServiceService,
              private activatedroute: ActivatedRoute,
              private cookieService: CookieService,
              public langService: LanguageServiceService,
              public overlay: Overlay) { }

  ngOnInit(): void {
    if(this.isWineryOwnerSubject) {
      this.isWineryOwnerSubject.subscribe(v => {
        this.isWineryOwner = v;
        // this.isWineryOwner = true;
      });
    }


    this.downloadedData.subscribe(downloadData => {
      // console.log('reseting');
      // this.descriptions.clear();

      if (downloadData.textDescriptionDB) {

        const textDescriptionDB = JSON.parse(downloadData.textDescriptionDB);

        console.log(textDescriptionDB);

        // const profpointData = JSON.parse(downloadData.profPointsDB);
        textDescriptionDB.forEach(description => {
          console.log(description);
          this.addDescription(description);
        });
      }


      if (downloadData.professionalDescriptionDB && downloadData.professionalDescriptionDB.length) {

        downloadData.professionalDescriptionDB.forEach(pd => {
          this.descriptions_confirmation.addControl(pd.id + '', new FormControl(pd.confirmation));
          this.descriptionsArr.push(pd);
        });
        this.orderTableByCheckbox('checkbox');
      }

// @ts-ignore
//       if (this.accountService.isNoUser() || (downloadData.user && downloadData.user * 1 != this.cookieService.get('myId') * 1 && !this.accountService.isAdmin())) {
//         this.routeData.editable = false;
//         this.form.disable();
//       }
    });


    this.generatedDescriptionSubject.subscribe(gd => {

      // console.log(gd);
      let control;
      this.descriptions.controls.forEach(d => {
        if(d.value.language == gd.language && !control) {
          control = d;
        }
      });

      if(control) {
        control.get('language').setValue(gd.language);
        control.get('text').setValue(gd.text);
      } else {
        this.addDescription(gd);
      }
    });

    this.descriptions.valueChanges.subscribe(v => {
      this.descriptionsSubject.next(v);
    })
  }




  addDescription(description) {
    if (this.langService.editable) {
      return;
    }
    console.log('test');
    if (description) {
      (this.descriptions as FormArray).push(this.getFormDescription(description));
    } else {
      (this.descriptions as FormArray).push(this.getBlancFormDescription());
    }
  }

  removeDescription(i) {
    if (this.langService.editable) {
      return;
    }
    (this.descriptions as FormArray).removeAt(i);
  }

  getBlancFormDescription() {

    return new FormGroup({
      text: new FormControl(''),
      language: new FormControl('')
    });
  }
  getFormDescription(description) {


    return new FormGroup({
      text: new FormControl(description.text),
      language: new FormControl(description.language)
    });
  }

  possibleLanguages() {
    const usedLanguages = [];
    // console.log(this.descriptions.value);
    this.descriptions.value.forEach(d => {
      usedLanguages.push(d.language);
    });



    // console.log(usedLanguages);
    // console.log(this.languageArr);
    return this.languageArr.filter(l => {
      // console.log(l.place);
      // console.log(l.value);
      return !(usedLanguages.includes(l.value));
    })
  }


  public getFormValue() {
    return this.descriptions.value;
  }

  public getConfirmatonValue() {
    return this.descriptions_confirmation.value;
  }

  orderTableBy(order) {
    this.order.setValue(order);
  }
  getSortingClass(sortarr) {
    let isOrdered = false;
    sortarr.forEach(sort => {
      if (this.order.value == sort) {
        isOrdered = true;
      }
    });
    if (isOrdered) {
      return 'sorting-col';
    } else {
      return '';
    }
  }
  get order() {
    return this.form.get('order');
  }
  get descriptions(): FormArray {
    return this.form.get('descriptions') as FormArray;
  }
  get descriptions_confirmation(): FormGroup {
    return this.form.get('descriptions_confirmation') as FormGroup;
  }
  getSpecialistName(description) {
    return description.specialistName;
  }

  orderTableByLanguage(order) {
    let direction = 1;
    if(order == 'language') {
      direction = -1;
    }
    this.descriptionsArr.sort((a, b) => {
      if(a.language > b.language) {
        return 1 * direction;
      } else {
        return -1 * direction;
      }
    });
    this.order.setValue(order);
  }
  orderTableByCheckbox(order) {
    let direction = 1;
    if(order == 'checkbox') {
      direction = -1;
    }
    this.descriptionsArr.sort((a, b) => {
      if(this.descriptions_confirmation.get(a.id + '').value > this.descriptions_confirmation.get(b.id + '').value) {
        return 1 * direction;
      } else {
        return -1 * direction;
      }
    });
    this.order.setValue(order);
  }
  orderTableByUser(order) {
    let direction = 1;
    if(order == 'author') {
      direction = -1;
    }
    this.descriptionsArr.sort((a, b) => {
      if(a.specialistName > b.specialistName) {
        return 1 * direction;
      } else {
        return -1 * direction;
      }
    });
    this.order.setValue(order);
  }
}
