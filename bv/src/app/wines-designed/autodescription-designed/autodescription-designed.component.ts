import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {RequestsService} from '../../services/api/requests.service';
import {forkJoin, Subject} from 'rxjs';
import {LanguageServiceService} from '../../services/language-service.service';
import {ListsService} from '../../services/api/lists.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {CookieService} from 'ngx-cookie-service';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {AccountServiceService} from '@src/app/services/account-service.service';

@Component({
  selector: 'app-autodescription-designed',
  templateUrl: './autodescription-designed.component.html',
  styleUrls: ['./autodescription-designed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutodescriptionDesignedComponent implements OnInit, OnChanges {

  languageArr = [];


  public tab = 'autodescription';
  routeData = {editable: true};
  pageForForm = 'wines_autodescription';
  page = 'wines_autodescription_in_text';
  notSelectedBlock = 'notSelectedBlock';
  changeDoneBlock = 'changeWasDoneBlock';
  checkString = '_check';

  @Input() parentData: string;
  // @ts-ignore
  @Input() downloadedData: Subject;
  // @ts-ignore
  @Input() isWineryOwnerSubject: Subject;
  // @ts-ignore
  @Input() generatedDescriptionSubject: Subject;
  // @ts-ignore
  @Input() descriptionsSubject: Subject;
  isWineryOwner = false;

  fields = [

  ];
  show = false;
  schemas;
  schemasMap = new Map();

  schemasArr;

  actionMap = new Map();

  form = new FormGroup({

    language: new FormControl('english'),

    description: new FormControl(''),
    descriptionRU: new FormControl(''),
    descriptionHE: new FormControl(''),
  });

  descriptionsMap = new Map;

  constructor(private service: RequestsService,
              private listService: ListsService,
              private activatedroute: ActivatedRoute,
              public accountService: AccountServiceService,
              private cookieService: CookieService,
              private changeDetector: ChangeDetectorRef,
              public langService: LanguageServiceService) {
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
  ngOnInit() {

    this.descriptionsSubject.subscribe(ds => {
      ds.forEach(d => {
        this.descriptionsMap.clear();
        this.descriptionsMap.set(d.language, d.text);
      });
    });

    this.listService.getAutodescriptionsList().subscribe(data => {
      // @ts-ignore
      this.schemas = data.rows;
      this.schemas.forEach(row => {
        this.schemasMap.set(row.id, row);
        this.form.addControl('description_' + row.id, new FormControl());

        // @ts-ignore
        row.schemaLanguage = 'schema_' + row.id;

        this.languageArr.push({value: row.schemaLanguage, name: row.code});
        // this.langService.forcedLanguageLoadingForLanguage(row.schemaLanguage).subscribe();
      });
      //
      this.langService.forcedLanguageLoadingForPage('wines_autodescription_in_text').subscribe();
      this.schemasArr = Array.from(this.schemasMap.values());
    });


    const getCategories = this.listService.getAutodescriptionCategoryList();

    const getOptions = this.listService.getAutodescriptionsOptionList();

    forkJoin([getCategories, getOptions]).subscribe(results => {

      // @ts-ignore
      const categories = results[0].rows;
      // @ts-ignore
      const options = results[1].rows;

      const optionMap = new Map();

      options.forEach(x => {
        if (!optionMap.get(x.category)) {

          optionMap.set(x.category, []);
        }

        optionMap.get(x.category).push({name: x.name, sortingCategory: x.sorting_category});
      });

      const categoryMap = new Map();
      const groupMap = new Map();



      categories.forEach(row => {
        const optionsFromMap = optionMap.get(row.id) || [];
        const form = {id: row.id, name: row.name, place: row.place, type: row.type, options: optionsFromMap, selected: []};

        // form.options.sort((a, b) => {
        //   return a.subtitle >= b.subtitle;
        // });

        if (!categoryMap.get(row.group)) {
          categoryMap.set(row.group, []);
        }
        categoryMap.get(row.group).push(form);

        this.actionMap.set(row.place, this.replaceInTextOne(row));
      });


      categories.forEach(row => {
        if (row.group_place && !this.actionMap.get(row.group_place)) {
          this.actionMap.set(row.group_place, this.replaceInTextMulti(row, categories));
        }

      });

      categoryMap.forEach((v, k) => {
        const field = {name: k, form: v};
        this.fields.push(field);
        // console.log(x);
      });

      this.sortFields();
      // console.log(this.fields);

      this.fields.forEach(g => {
        this.form.addControl(g.name, new FormGroup({}));
        g.form.forEach(f => {

          (this.form.get(g.name) as FormGroup).addControl(f.name + this.checkString, new FormControl(true));
          if (f.type == 'select') {
            (this.form.get(g.name) as FormGroup).addControl(f.name, new FormControl('not selected'));
          }
          if (f.type == 'checkbox') {
            (this.form.get(g.name) as FormGroup).addControl(f.name, new FormGroup({}));
            f.options.forEach(o => {
              ((this.form.get(g.name) as FormGroup).get(f.name) as FormGroup).addControl(this.getName(o.name), new FormControl(false));
              ((this.form.get(g.name) as FormGroup).get(f.name).get(this.getName(o.name)) as FormControl).valueChanges.subscribe(x => {
                if (x) {
                  f.selected.push(o);
                } else {
                  f.selected = f.selected.filter(xx => {
                    return xx !== o;
                  });
                }
              });
            });
          }
          if (f.type == 'textarea') {
            (this.form.get(g.name) as FormGroup).addControl(f.name, new FormControl(''));
          }

        });
      });



      this.downloadedData.subscribe(downloadData => {

        // console.log('reseting');
        // this.form.reset();

        if (downloadData.autodescription) {
          const auto = JSON.parse(downloadData.autodescription);
          console.log(auto);
          Object.keys(this.form.controls).forEach(key => {
            if (this.form.get(key) instanceof FormControl) {
              this.form.get(key).setValue(auto[key]);
            }
            if (this.form.get(key) instanceof FormGroup && auto[key]) {

              // @ts-ignore
              Object.keys(this.form.get(key).controls).forEach(key2 => {
                if (this.form.get(key).get(key2) instanceof FormControl) {
                  this.form.get(key).get(key2).setValue(auto[key][key2]);
                }
                // @ts-ignore
                if (this.form.get(key).get(key2) instanceof FormGroup && auto[key][key2]) {
                  // console.log(auto[key][key2]);
                  let arr = [];

                  // @ts-ignore
                  Object.keys(auto[key][key2]).forEach(key3 => {
                    // if (this.form.get(key).get(key2).get(key3) instanceof FormControl) {
                    //   this.form.get(key).get(key2).get(key3).setValue(auto[key][key2][key3]);
                    // }
                    if (auto[key][key2][key3]) {
                      arr.push({name: key3, value: auto[key][key2][key3]});
                    }
                  });
                  arr = arr.sort((a, b) => {
                    return a.value - b.value;
                  });
                  // console.log(arr);
                  arr.forEach(key3 => {
                    if (this.form.get(key).get(key2).get(key3.name) instanceof FormControl) {
                      this.form.get(key).get(key2).get(key3.name).setValue(auto[key][key2][key3.name]);
                    }
                  });
                  // @ts-ignore
                  // Object.keys(this.form.get(key).get(key2).controls).forEach(key3 => {
                  //   if (this.form.get(key).get(key2).get(key3) instanceof FormControl) {
                  //     this.form.get(key).get(key2).get(key3).setValue(auto[key][key2][key3]);
                  //   }
                  // });
                }

              });

            }

          });
        }




// @ts-ignore
//             if (this.accountService.isNoUser() || (downloadData.user && downloadData.user * 1 != this.cookieService.get('myId') * 1 && !this.accountService.isAdmin())) {
//               this.routeData.editable = false;
//               this.form.disable();
//             }
        this.show = true;
        this.changeDetector.detectChanges();
      });

      this.show = true;
      this.changeDetector.detectChanges();

//       console.log(this.form.value);
//       this.activatedroute.data.subscribe(data => {
//         if (data.download) {
//           this.downloadedData.subscribe(downloadData => {
//
//
//             if (downloadData.autodescription) {
//               const auto = JSON.parse(downloadData.autodescription);
//               console.log(auto);
//               Object.keys(this.form.controls).forEach(key => {
//                 if (this.form.get(key) instanceof FormControl) {
//                   this.form.get(key).setValue(auto[key]);
//                 }
//                 if (this.form.get(key) instanceof FormGroup && auto[key]) {
//
//                   // @ts-ignore
//                   Object.keys(this.form.get(key).controls).forEach(key2 => {
//                     if (this.form.get(key).get(key2) instanceof FormControl) {
//                       this.form.get(key).get(key2).setValue(auto[key][key2]);
//                     }
//                     // @ts-ignore
//                     if (this.form.get(key).get(key2) instanceof FormGroup && auto[key][key2]) {
//                       // console.log(auto[key][key2]);
//                       let arr = [];
//
//                       // @ts-ignore
//                       Object.keys(auto[key][key2]).forEach(key3 => {
//                         // if (this.form.get(key).get(key2).get(key3) instanceof FormControl) {
//                         //   this.form.get(key).get(key2).get(key3).setValue(auto[key][key2][key3]);
//                         // }
//                         if (auto[key][key2][key3]) {
//                           arr.push({name: key3, value: auto[key][key2][key3]});
//                         }
//                       });
//                       arr = arr.sort((a, b) => {
//                         return a.value - b.value;
//                       });
//                       // console.log(arr);
//                       arr.forEach(key3 => {
//                         if (this.form.get(key).get(key2).get(key3.name) instanceof FormControl) {
//                           this.form.get(key).get(key2).get(key3.name).setValue(auto[key][key2][key3.name]);
//                         }
//                       });
//                       // @ts-ignore
//                       // Object.keys(this.form.get(key).get(key2).controls).forEach(key3 => {
//                       //   if (this.form.get(key).get(key2).get(key3) instanceof FormControl) {
//                       //     this.form.get(key).get(key2).get(key3).setValue(auto[key][key2][key3]);
//                       //   }
//                       // });
//                     }
//
//                   });
//
//                 }
//
//               });
//             }
//
//
//
//
// // @ts-ignore
// //             if (this.accountService.isNoUser() || (downloadData.user && downloadData.user * 1 != this.cookieService.get('myId') * 1 && !this.accountService.isAdmin())) {
// //               this.routeData.editable = false;
// //               this.form.disable();
// //             }
//             this.show = true;
//           });
//         } else {
//
//           this.show = true;
//         }
//       });
    });


    this.langService.languageChanged.subscribe(() => {
      this.sortFields();
    });

    this.langService.editableSubject.subscribe(x => {
      console.log('editableSubject')
      this.changeDetector.detectChanges();
    });

    this.langService.download.pipe(
        map(data => {

          this.changeDetector.detectChanges();
          // this.download.next(true);
        })
      );
    this.langService.languageChanged.pipe(
      map(data => {

        this.changeDetector.detectChanges();
        // this.download.next(true);
      })
    );
  }

  public getFormValue() {
    const thisForm = this.form.value;

    this.fields.forEach(g => {
      g.form.forEach(f => {
        // console.log(this.form.value);

        if (f.type == 'checkbox') {
          // (this.form.get(g.name) as FormGroup).addControl(f.name, new FormGroup({}));
          let i = 1;
          f.selected.forEach(o => {
            thisForm[g.name][f.name][this.getName(o.name)] = i;
            // ((this.form.get(g.name) as FormGroup).get(f.name).get(this.getName(o.name)) as FormControl).setValue(i);
            i++;
          });
        }
      });
    });
    return thisForm;
  }

  sortFields() {

    // console.log(this.fields);
    this.fields.forEach(field => {
      field.form.forEach(f => {
        // console.log(f.options);
        f.options = f.options.sort((a, b) => {
          if (a.sortingCategory > b.sortingCategory) {
            return 1;
          } else if (a.sortingCategory < b.sortingCategory) {
            return -1;
          } else {
            const language = this.langService.getLanguage();
            const aField = this.langService.morphStr(field.name + '_' + f.name + '_' + a.name);

            const aName = this.langService.getTextLanguage(language, this.pageForForm, '', aField);

            const bField = this.langService.morphStr(field.name + '_' + f.name + '_' + b.name);

            const bName = this.langService.getTextLanguage(language, this.pageForForm, '', bField);


            if (aName > bName) {
              return 1;
            } else if (aName < bName) {
              return -1;
            } else {
              return 0;
            }
          }
        });

        // console.log(f.options);
      });
    });
  }
  replaceInTextMulti(row, categories) {
    const notSelectedBlock = this.notSelectedBlock;
    const changeDoneBlock = this.changeDoneBlock;


    if (row.type === 'select') {
      const res = function(text, language, delimiter) {
        let replacement = '';
        categories.forEach(category => {
          if (category.group_place == row.group_place) {
            if (replacement.length) {
              replacement = replacement + ' ,';
            }
            replacement += this.simpleWord(row.group, row.name, language);
          }
        });
        if (!replacement) {
          replacement = notSelectedBlock;
        } else {

          replacement += changeDoneBlock;
        }


        text = text.replace(row.group_place, replacement);
        return text;
      };
      return res;
    }
    if (row.type === 'checkbox') {
      const res = function(text, language, delimiter) {
        let replacement = '';
        categories.forEach(category => {
          if (category.group_place == row.group_place) {

            const dlmtr = delimiter ? (delimiter + ' ') : ', ';
            const addReplacement = this.multiWord(category.group, category.name, language, delimiter);
            if (replacement.length && addReplacement) {
              replacement = replacement + ', ';
            }
            replacement += addReplacement;
            // console.log(category);
            // console.log(replacement);
          }
        });
        if (!replacement) {
          replacement = notSelectedBlock;
        } else {

          replacement += changeDoneBlock;
        }


        text = text.replace(row.group_place, replacement);
        return text;
      };
      return res;
    }
    if (row.type === 'textarea') {
      const res = function(text, language, delimiter) {
        let replacement = '';
        categories.forEach(category => {
          if (category.group_place == row.group_place) {
            if (replacement.length) {
              replacement = replacement + ' ';
            }
            replacement += this.simpleWord(row.group, row.name, language);
          }
        });
        if (!replacement) {
          replacement = notSelectedBlock;
        } else {

          replacement += changeDoneBlock;
        }

        text = text.replace(row.group_place, replacement);
        return text;
      };
      return res;
    }
  }
  replaceInTextOne(row) {

    const notSelectedBlock = this.notSelectedBlock;
    const changeDoneBlock = this.changeDoneBlock;

    if (row.type === 'select' || row.type === 'textarea') {
      const res = function(text, language, delimiter) {
        let replacement = this.simpleWord(row.group, row.name, language);
        if (!replacement) {
          replacement = notSelectedBlock;
        } else {
          replacement += changeDoneBlock;
        }

        text = text.replace(row.place, replacement);
        return text;
      };
      return res;
    }
    if (row.type === 'checkbox') {
      const res = function(text, language, delimiter) {
        let replacement = this.multiWord(row.group, row.name, language, delimiter);
        if (!replacement) {
          replacement = notSelectedBlock;
        } else {
          replacement += changeDoneBlock;
        }

        text = text.replace(row.place, replacement);
        return text;
      };
      return res;
    }
  }

  simpleWord(group, select, language) {

    const text = this.langService.morphStr(group + '_' + select + '_' + this.form.get(group).get(select).value);

    let res = this.langService.getTextLanguage(language, this.page, '', text)
      || this.langService.getTextInEnglish(this.page, '', text)
      || this.form.get(group).get(select).value;


    if (res && (this.form.get(group).get(select + this.checkString) as FormControl).value) {
    } else {
      res = '';
    }
    // console.log(res);
    return res;
  }

  multiWord(group, checkbox, language, delimiter) {

    const dlmtr = delimiter ? (delimiter + ' ') : ', ';
    let res = '';
    const obj = (this.form.get(group).get(checkbox) as FormGroup).value;
    const form = this.fields.filter(x => x.name === group)[0].form.filter(x => x.name === checkbox)[0];
    form.selected.forEach(value => {
      const text = this.langService.morphStr(group + '_' + checkbox + '_' + value.name);

      // console.log(language);
      // console.log(this.langService.getTextLanguage(language, this.page, '', text));
      // console.log(this.langService.getTextInEnglish(this.page, '', text));
      // console.log(value);
      res += (this.langService.getTextLanguage(language, this.page, '', text)
        || this.langService.getTextInEnglish(this.page, '', text)
        || value.name) + dlmtr;
    });
    if (res && (this.form.get(group).get(checkbox + this.checkString) as FormControl).value) {
      // @ts-ignore
      res = res.slice(0, -2);
    } else {
      res = '';
    }
    // console.log(res);
    return res;
  }

  getName(text: string) {
    return text.replace(/.*( : )/, '');
  }






  makeReplacesInText(text, language, delimiter) {
    let textForChange = text;
    this.actionMap.forEach((v, k) => {
      if (v) {
        let res = null;
        while (res !== textForChange) {
          res = textForChange;
          textForChange = v.bind(this)(textForChange, language, delimiter);
        }
      }
    });

    return textForChange;
  }


  s(group, select) {
    return this.form.get(group).get(select).value;
  }

  c(group, checkbox) {
    let res = '';
    const obj = (this.form.get(group).get(checkbox) as FormGroup).value;
    for (const prop in obj) {
      if (obj[prop]) {
        res += prop + ' ';
      }
    }
    return res;
  }

  generateText() {



    this.schemasMap.forEach(schema => {

      // console.log(schema);
      const schemaLanguage = schema.schemaLanguage;


      this.langService.forcedLanguageLoadingForPage('wines_autodescription_in_text').subscribe(() => {

        // console.log(schema);
        let text = this.makeReplacesInText(schema.adschema, schemaLanguage, schema.delimiter);

        // console.log(text);
        text = this.clearText(text);
        this.form.get('description_' + schema.id).setValue(text);
      });
      // this.langService.forcedLanguageLoadingForLanguage(schemaLanguage).subscribe(() => {
      //
      //   console.log(schema.adschema);
      //   let text = this.makeReplacesInText(schema.adschema, schemaLanguage);
      //
      //   console.log(text);
      //   text = this.clearText(text);
      //   this.form.get('description_' + schema.id).setValue(text);
      // })

    });


  }

  clearText(text) {
    let res = '';
    const removeNotChangedBlocks = new RegExp('(\\\{)((?!' + this.changeDoneBlock + ').)*(\\\})', 'g');
    const removeNotSelected1 = new RegExp('(' + this.notSelectedBlock + ', )', 'g');
    const removeNotSelected2 = new RegExp('(, ' + this.notSelectedBlock + ')', 'g');
    const removeNotSelected3 = new RegExp('(' + this.notSelectedBlock + ')', 'g');
    const removeChangesAncors = new RegExp('(' + this.changeDoneBlock + ')', 'g');
    const removeBrackets = new RegExp('[\{\}]', 'g');

    res = text.replace(removeNotChangedBlocks, '');
    res = res.replace(removeNotSelected1, '');
    res = res.replace(removeNotSelected2, '');
    res = res.replace(removeNotSelected3, '');
    res = res.replace(removeChangesAncors, '');
    res = res.replace(removeBrackets, '');
    return res;
  }

  saveAsMain(schema) {
    console.log(schema);
    const savedDescription = {
      language: schema.language,
      text: this.form.get('description_' + schema.id).value
    };

    this.generatedDescriptionSubject.next(savedDescription);


  }

  isSameDescription(schema) {
    return this.form.get('description_' + schema.id).value === this.descriptionsMap.get(schema.language);
  }

  hasTitle(arr, i) {
    // console.log(arr);
    return 0;

    if(arr[i].subtitle && (!i || arr[i-1].subtitle != arr[i].subtitle)) {
      return 1;
    } else {
      return 0;
    }
  }

  getSubcats(arr) {
    const subcategories = new Set();
    arr.forEach(x => {
      subcategories.add(x.subtitle);
    });

    const res = Array.from(subcategories);
    // console.log(res);
    return res;
  }


  get language() {
    return this.form.get('language');
  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log('change!?')
  }
}
