import {Injectable} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {InputData} from '@src/app/business-designed/business-designed.component';
import {ReplaySubject, Subject} from 'rxjs';
import {RequestsService} from '@src/app/services/api/requests.service';

@Injectable({
  providedIn: 'root'
})
export class AdditionalServiceService {

  public PLAIN = 'plain';
  public CHECKBOX = 'checkbox';
  public CHECKBOX_TEXT = 'checkboxText';
  public COUNTRY = 'country';
  public REGIONSFORM = 'regionsForm';
  public TEMPERATURE = 'temperature';
  public TEMPERATURE_F = 'temperature_f';
  public IS_FAHRENHEIT = 'is_fahrenheit';
  public CALENDAR = 'calendar';

  public structure = new ReplaySubject(10);
  public changes = new ReplaySubject(10);

  constructor(private service: RequestsService) {

  }

  public transformAdditional(data, structure, form) {
    data.forEach((x: InputData) => {
      if(x.tab) {
        x.tab = x.tab + '';
      } else {
        x.tab = '';
      }


      while (structure.length <= x.col_edit - 1) {
        structure.push([]);
      }

      const controlName = x.block_id + '_' + x.option_id;
      x.controlName = controlName;

      const hideControlName = x.block_id + '_' + x.option_id + '_hide';
      const typeControlName = x.block_id + '_' + x.option_id + '_type';
// @ts-ignore
      x.hideControlName = hideControlName;

      if (x.input_type == 3 || x.input_type == 5 || x.input_type == 7 || x.input_type == 8) {
        const options = x.select_data + '';
        x.select_options = [];
        options.split(',').forEach(opt => {
// @ts-ignore
          x.select_options.push({id: opt.trim()});
        });
        // x.select_options = options.split(',');
      }

      if (form) {
        form.addControl(hideControlName, new FormControl());
        form.addControl(typeControlName, new FormControl(x.input_type));


        if (x.input_type == 7 || x.input_type == 8) {

          const formArr = new FormArray([]);
          x.select_options.forEach(opt => {
            formArr.push(new FormControl(false));
          });


          form.addControl(controlName, formArr);
        } else {
          form.addControl(controlName, new FormControl(''));
        }

        if (x.input_type == 8) {

          const formArr = new FormArray([]);
          x.select_options.forEach(opt => {
            formArr.push(new FormControl(''));
          });


          form.addControl(controlName + '_text', formArr);
        }
      }


      // console.log(structure);
      // console.log(x.col_edit - 1);

      const colEdit = Math.max(0, x.col_edit - 1)
      structure[colEdit].push(x);
    });

    structure.forEach(col => {
      col.sort((a, b) => {
        if (a.row_edit != b.row_edit) {
          return a.row_edit - b.row_edit;
        } else {
          return a.order_edit - b.order_edit;
        }
      });
    });
  }


  public transformAdditionalForSearch(data, structure, form: FormGroup) {
    data.forEach((x: InputData) => {
      if(x.tab) {
        x.tab = x.tab + '';
      } else {
        x.tab = '';
      }


      while (structure.length <= x.col_edit - 1) {
        structure.push([]);
      }
      // console.log(this.structure);
      // console.log(x);

      const controlName = x.block_id + '_' + x.option_id;
      x.controlName = controlName;

      const hideControlName = x.block_id + '_' + x.option_id + '_hide';
      const typeControlName = x.block_id + '_' + x.option_id + '_type';
// @ts-ignore
      x.hideControlName = hideControlName;

      if (x.input_type == 3 || x.input_type == 5 || x.input_type == 7 || x.input_type == 8) {
        const options = x.select_data + '';
        x.select_options = [];
        options.split(',').forEach(opt => {
// @ts-ignore
          x.select_options.push({id: opt.trim()});
        });
        // x.select_options = options.split(',');
      }

      if (form) {

        const block = x.block_id + '';
        const option = x.option_id + '';

        if(!form.get(block)) {

          form.addControl(block, new FormGroup({}));
        }
        if(!form.get(block).get(option)) {

          (form.get(block) as FormGroup).addControl(option, new FormGroup({}));
        }

        if(x.input_type == 7) {

          (form.get(block).get(option) as FormGroup).addControl(this.CHECKBOX, new FormGroup({}));
          x.select_options.forEach((opt, i) => {
            (form.get(block).get(option).get(this.CHECKBOX) as FormGroup).addControl(i + '', new FormControl(false));
          });

        } else if(x.input_type == 8) {

          (form.get(block).get(option) as FormGroup).addControl(this.CHECKBOX, new FormGroup({}));
          (form.get(block).get(option) as FormGroup).addControl(this.CHECKBOX_TEXT, new FormGroup({}));
          x.select_options.forEach((opt, i) => {
            (form.get(block).get(option).get(this.CHECKBOX) as FormGroup).addControl(i + '', new FormControl(false));
            (form.get(block).get(option).get(this.CHECKBOX_TEXT) as FormGroup).addControl(i + '', new FormControl(''));
          });
        } else if(x.input_type == 10) {

          (form.get(block).get(option) as FormGroup).addControl(this.COUNTRY, new FormGroup({}));
          (form.get(block).get(option).get(this.COUNTRY) as FormGroup).addControl('', new FormControl(false));

          (form.get(block).get(option) as FormGroup).addControl(this.REGIONSFORM, new FormGroup({}));
          for(let i = 0; i < 6; i++) {
            (form.get(block).get(option).get(this.REGIONSFORM) as FormGroup).addControl(i + '', new FormControl(false));
          }
        } else if(x.input_type == 13) {

          (form.get(block).get(option) as FormGroup).addControl(this.COUNTRY, new FormGroup({}));
          (form.get(block).get(option).get(this.COUNTRY) as FormGroup).addControl('', new FormControl(false));
        } else if(x.input_type == 9) {

          (form.get(block).get(option) as FormGroup).addControl(this.TEMPERATURE, new FormGroup({}));
          (form.get(block).get(option) as FormGroup).addControl(this.TEMPERATURE_F, new FormGroup({}));
          (form.get(block).get(option) as FormGroup).addControl(this.IS_FAHRENHEIT, new FormGroup({}));
          (form.get(block).get(option).get(this.TEMPERATURE) as FormGroup).addControl('', new FormControl(false));
          (form.get(block).get(option).get(this.TEMPERATURE_F) as FormGroup).addControl('', new FormControl(false));
          (form.get(block).get(option).get(this.IS_FAHRENHEIT) as FormGroup).addControl('', new FormControl(false));
        } else if(x.input_type == 15) {

          (form.get(block).get(option) as FormGroup).addControl(this.CALENDAR, new FormGroup({}));
          // (form.get(block).get(option).get(this.CALENDAR) as FormGroup).addControl('', new FormControl(false));
        } else if(x.input_type == 11) {

        } else if(true) {

          (form.get(block).get(option) as FormGroup).addControl(this.PLAIN, new FormGroup({}));
          (form.get(block).get(option).get(this.PLAIN) as FormGroup).addControl('', new FormControl(''));
        }


        // {id: 0, name: 'select'},
        // {id: 1, name: 'text'},
        // {id: 12, name: 'link'},
        // {id: 2, name: 'number'},
        // {id: 3, name: 'pop up'},
        // {id: 4, name: 'checkbox'},
        // {id: 5, name: 'radio'},
        // {id: 6, name: 'textarea'},
        // {id: 7, name: 'checkbox group'},
        // {id: 8, name: 'checkbox group with textbox'},
        // {id: 9, name: 'temperature'},
        // {id: 10, name: 'country/region'},
        // {id: 13, name: 'country'},
        // {id: 11, name: 'list of options'},
        // {id: 14, name: 'user'},
        //
      }


      structure[x.col_edit - 1].push(x);
    });

    structure.forEach(col => {
      col.sort((a, b) => {
        if (a.row_edit != b.row_edit) {
          return a.row_edit - b.row_edit;
        } else {
          return a.order_edit - b.order_edit;
        }
      });
    });
  }


  getExistedSchemas(form: FormGroup, structure, options, listerner: Subject<any>, schemaCounter) {
    const setBlock = new Set();
    structure.forEach(tab => {
      tab.forEach(row => {
        setBlock.add(row.block_id);
      });
    });
    setBlock.forEach((blockId: any) => {
      const req = {block: blockId}
      this.service.getSchemasForBlock(req).subscribe(data => {
        form.addControl(blockId + '', new FormControl(''));

        form.get(blockId + '').valueChanges.subscribe(value => {
          if(value != '') {
            listerner.next({
              block: blockId,
              id: value
            });
          }
        });
// @ts-ignore
        options[blockId] = data.schemas;
// @ts-ignore
        schemaCounter[blockId] = data.counter;
        // console.log(data);
      })
    });
    // console.log(form);
    // console.log(form);
  }


  public transformAdditionalBlock(data, structure, form) {
    data.forEach((x: InputData) => {
      // if(x.tab) {
      //   x.tab = x.tab + '';
      // } else {
      //   x.tab = '';
      // }


      // while (structure.length <= x.col_edit - 1) {
      //   structure.push([]);
      // }
      // console.log(this.structure);
      // console.log(x);

      const controlName = x.block_id + '_' + x.option_id;
      x.controlName = controlName;

      // const hideControlName = x.block_id + '_' + x.option_id + '_hide';
      const typeControlName = x.block_id + '_' + x.option_id + '_type';
// @ts-ignore
//       x.hideControlName = hideControlName;

      if (x.input_type == 3 || x.input_type == 5 || x.input_type == 7 || x.input_type == 8) {
        const options = x.select_data + '';
        x.select_options = [];
        options.split(',').forEach(opt => {
// @ts-ignore
          x.select_options.push({id: opt.trim()});
        });
        // x.select_options = options.split(',');
      }

      if (form) {
        // form.addControl(hideControlName, new FormControl());
        form.addControl(typeControlName, new FormControl(x.input_type));


        if (x.input_type == 7 || x.input_type == 8) {

          const formArr = new FormArray([]);
          x.select_options.forEach(opt => {
            formArr.push(new FormControl(false));
          });


          form.addControl(controlName, formArr);
        } else {
          form.addControl(controlName, new FormControl());
        }

        if (x.input_type == 8) {

          const formArr = new FormArray([]);
          x.select_options.forEach(opt => {
            formArr.push(new FormControl(''));
          });


          form.addControl(controlName + '_text', formArr);
        }
      }


      structure.push(x);
    });

    structure.sort((a, b) => {
      return a.order_edit - b.order_edit;
    });
  }

  public getTabs(data) {
    const tabs = new Set();
    data.forEach(row => {
      tabs.add(row.tab);
    });

    return Array.from(tabs).filter(x => x);
  }

  public getStructureForTab(structure, tab) {
    return structure.filter(col => {
      return col.filter(inp => {
        return inp.tab == tab;
      }).length;
    })
  }


  public sortSubBlocks(data, structure, form) {
    const optionsMap = new Map();

    data.forEach(row => {
      if(row.input_type == 11) {
        row.children = [];
        optionsMap.set(row.option_id * 1, row);
      }
    });

    data.forEach(row => {
      if(row.parent && optionsMap.get(row.parent * 1)) {
        optionsMap.get(row.parent * 1).children.push(row);
        row.block_name = optionsMap.get(row.parent * 1).title_name;
      }
    });

    return data.filter(col => {
      return !col.parent;
    });
  }


  public setChange(change) {
    // console.log('change set');
    this.changes.next(change);
  }

  public setStructure(structure) {
    this.structure.next(structure);
  }
}
