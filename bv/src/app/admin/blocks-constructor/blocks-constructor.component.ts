import {Component, ElementRef, OnInit} from '@angular/core';
import {RequestsService} from '@src/app/services/api/requests.service';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {LanguageServiceService} from '@src/app/services/language-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {AdminService} from '@src/app/services/api/admin.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {SuperTabComponent} from '@src/app/super-tab/super-tab.component';

@Component({
  selector: 'app-blocks-constructor',
  templateUrl: './blocks-constructor.component.html',
  styleUrls: ['./blocks-constructor.component.css']
})
export class BlocksConstructorComponent extends SuperTabComponent implements OnInit {
  tab = 'block_constructor';

  LANGUAGE_CURRENT_PAGE = 'block_constructor';


  avaliableBlocks: Block[] = [];
  blocksMap = new Map();
  avaliablePages: Block[] = [];
  avaliableTabs = [];
  rawRows = new Map();

  pageModel: PageModel = {
    versions: new Map(),
    name: 'test',
    id: 'test'
  };

  typeList = [
    {id: 0, name: 'select'},
    {id: 1, name: 'text'},
    {id: 12, name: 'link'},
    {id: 2, name: 'number'},
    {id: 3, name: 'pop up'},
    {id: 4, name: 'checkbox'},
    {id: 5, name: 'radio'},
    {id: 6, name: 'textarea'},
    {id: 7, name: 'checkbox group'},
    {id: 8, name: 'checkbox group with textbox'},
    {id: 9, name: 'temperature'},
    {id: 10, name: 'country/region'},
    {id: 13, name: 'country'},
    {id: 11, name: 'list of options'},
    {id: 14, name: 'user'},
    {id: 15, name: 'calendar'},
  ];


  currentTabCols: PageColModel[] = [];
  oppositeTabCols: PageColModel[] = [];

  newOptionId = -1;


  form = new FormGroup({
    page: new FormControl(''),
    selectTab: new FormControl(''),
    currentTabName: new FormControl(''),
    newTabName: new FormControl(''),
    version: new FormControl('edit'),


  });

  constructor(
    public activatedroute: ActivatedRoute,
    private cookieService: CookieService,
    public langService: LanguageServiceService,
    private service: RequestsService,
    private adminService: AdminService,

    // private renderer: Renderer,
    private elem: ElementRef
    ) {

      super();
    }

  ngOnInit(): void {



    this.service.getConstructorBlocks().subscribe((data: BlockData) => {

      this.avaliableBlocks.push({id: -1, name: 'Blank block'});
      this.blocksMap.set(-1, 'Blank block');
      data.res.forEach(row => {
        this.avaliableBlocks.push({id: row.id, name: row.name});
        this.blocksMap.set(row.id, row.name);
      });
    });

    this.service.getConstructorPages().subscribe((data: PageData) => {
      data.res.forEach(row => {
        this.avaliablePages.push({id: row.id, name: row.name});
      });
    });

    this.page.valueChanges.subscribe(value => {
      if(value) {


        this.adminService.getConstructorBlocks({page: value}).subscribe((res: ConstructorDataDownload[]) => {
          // console.log(res);


          if(res.length) {

            this.fullfillTabs(res);
            this.fullfillPageObj(res);
            // this.pageModel.tabs = new Map();
          }

          // console.log(this.avaliableTabs);

          const mapEdit = new Map();

          this.avaliableTabs.forEach(tabName => {

            mapEdit.set(tabName, this.renderTab(tabName, 'edit'));
          });

          const mapView = new Map();

          this.avaliableTabs.forEach(tabName => {

            mapView.set(tabName, this.renderTab(tabName, 'view'));
          });



          this.pageModel.versions.clear();
          this.pageModel.versions.set('edit', mapEdit);
          this.pageModel.versions.set('view', mapView);


        })
      }
    });

    this.selectTab.valueChanges.subscribe(() => {
      this.showTab();
    });

    this.version.valueChanges.subscribe(() => {
      this.showTab();
    });
  }

  // get

  showTab() {

    // console.log(this.pageModel);

    if(this.version.value && this.selectTab.value) {
      this.currentTabCols = this.pageModel.versions.get(this.version.value).get(this.selectTab.value);
      this.oppositeTabCols = this.pageModel.versions.get(this.getOppositeVersion(this.version.value))
        .get(this.selectTab.value);
    }

  }

  getOppositeVersion(version) {
    return version == 'edit' ? 'view' : 'edit';
  }


  renderTab(tabName, version) {

    // console.log(this.rawRows);

    if(version == 'view') {


      const tabCols = this.rawRows.get(tabName);

      const colsViewMap = new Map();

      if(tabCols) {
        tabCols.sort((a, b) => {
          return a.col_view - b.col_view;
        });

        tabCols.forEach(o => {

          if(!colsViewMap.has(o.col_view)){
            colsViewMap.set(o.col_view, []);
          }

          colsViewMap.get(o.col_view).push(o);
        });
      }

      const tab = [];
      colsViewMap.forEach((v, k) => {

        tab.push(this.renderCol(v, version));
      });
      return tab;
    }


    if(version == 'edit') {

      const tabCols = this.rawRows.get(tabName);

      console.log(this.rawRows);
      console.log(tabName);
      console.log(tabCols);
      const colsEditMap = new Map();

      if(tabCols) {
        tabCols.sort((a, b) => {
          return a.col_edit - b.col_edit;
        });

        tabCols.forEach(o => {

          if(!colsEditMap.has(o.col_edit)){
            colsEditMap.set(o.col_edit, []);
          }

          colsEditMap.get(o.col_edit).push(o);
        });
      }

      const tab = [];
      colsEditMap.forEach((v, k) => {

        tab.push(this.renderCol(v, version));
      });
      return tab;
    }
  }

  renderCol(col, version) : PageColModel {

    const blockMap = new Map();

    if(version == 'view') {
      col.sort((a, b) => {
        return a.row_view - b.row_view;
      });
    }
    if(version == 'edit') {
      col.sort((a, b) => {
        return a.row_edit - b.row_edit;
      });
    }


    col.forEach(o => {

      if(!blockMap.has(o.id_block)){
        blockMap.set(o.id_block, []);
      }

      blockMap.get(o.id_block).push(o);
    });
    const blocks: BlockModel[] = [];
    blockMap.forEach(b => {
      blocks.push(this.renderBlock(b, version));
    });

    return {
      blocks
    };
  }

  renderBlock(block, version): BlockModel {
    // console.log(block);
    const form: FormGroup = this.getFormBlock(block[0]);


    const optionMap = new Map();
    const parentMap = new Map();

    if(version == 'view') {
      block.sort((a, b) => {
        return a.order_view - b.order_view;
      });
    }
    if(version == 'edit') {
      block.sort((a, b) => {
        return a.order_edit - b.order_edit;
      });
    }


    block.forEach(o => {

      if(!optionMap.has(o.id_option)){
        optionMap.set(o.id_option, []);
      }

      optionMap.get(o.id_option).push(o);


      if(!parentMap.has(o.parent)){
        parentMap.set(o.parent, []);
      }

      parentMap.get(o.parent).push(o);
    });

    const options = [];
    block.forEach(b => {
      // console.log(b);
      if(!b.parent) {
        const opt = this.renderOption(b, parentMap);
        options.push(opt);
      }
    });



    const resBlock = {
      form, options
    };

    (form.get('id') as FormControl).valueChanges.subscribe(id => {
      this.blockChanges(id, resBlock, version);
    });
    return resBlock
  }

  blockChanges(id, resBlock, version) {

    // console.log(id);
    const data = {id};
    this.adminService.getConstructorBlockById(data).subscribe(res => {
      resBlock.options.length = 0;
      this.renderBlock(res, version).options.forEach(option => {

        resBlock.options.push(option);
      });


      // console.log(resBlock.options);
    });
  }

  renderOption(option, subMap): OptionModel  {


    const form = this.getFormOption(option);
    const subOptions = [];

    const blankMap = new Map();
    subMap.forEach((subArr, key) => {
      // console.log(subArr.parent);
      // console.log(option.id_option);
      if(key == option.id_option) {
        subArr.forEach(sub => {
          subOptions.push(this.renderOption(sub, blankMap));
        });
      }
    });
    // console.log(subOptions);
    return {
      form, subOptions
    };
  }
  // getFormSubOption(option, parent) {
  //
  //   return new FormGroup({
  //
  //     id: new FormControl(option.id_option),
  //     title: new FormControl(option.name_option),
  //     type: new FormControl(option.type_option),
  //     select: new FormControl(option.select_option),
  //     hide: new FormControl(option.hide),
  //     parent: new FormControl(parent),
  //     hidden: new FormControl(true),
  //   })
  // }
  getFormOption(option) {

    // console.log(option);
    return new FormGroup({

      id: new FormControl(option.id_option),
      title: new FormControl(option.name_option),
      type: new FormControl(option.type_option),
      select: new FormControl(option.select_option),
      hide: new FormControl(option.hide),
      parent: new FormControl(option.parent),
      hidden: new FormControl(true),
    })
  }
  getFormBlock(form) {
    return new FormGroup({

      id: new FormControl(form.id_block),
      hidden: new FormControl(true),
    })
  }

  fullfillPageObj(options: ConstructorDataDownload[]) {

    const tabColsView = new Map();
    const tabColsEdit = new Map();
    options.forEach((o: ConstructorDataDownload) => {

      this.pageModel.id = o.id_page;
      this.pageModel.name = o.name_page;

      if(!o.tab) {
        o.tab = 'default';
      }

      if(!tabColsView.has(o.tab)){
        tabColsView.set(o.tab, []);
        tabColsEdit.set(o.tab, []);
      }

      tabColsView.get(o.tab).push(o);
      tabColsEdit.get(o.tab).push(o);
    });


    this.rawRows = tabColsView;
  }
  fullfillTabs(options: ConstructorDataDownload[]) {
    const tabSet = new Set(['default']);
    options.forEach((o: ConstructorDataDownload) => {
      if(o.tab) {
        tabSet.add(o.tab);
      }
    });
    this.avaliableTabs = [...tabSet];
  }



  dropCol(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  dropOption(event: CdkDragDrop<any[]>) {
    // console.log(event);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {


      const idOption = event.previousContainer.data[event.previousIndex].form.get('id').value;

      const oppositeBefore = this.findOppositePreviousBlocksById(idOption, this.oppositeTabCols);

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      const currentAfter = this.findOppositePreviousBlocksById(idOption, this.currentTabCols);

      if(oppositeBefore.suboption) {
        oppositeBefore.option.subOptions.splice(oppositeBefore.suboptionPosition, 1);
      } else {
        oppositeBefore.block.options.splice(oppositeBefore.optionPosition, 1);
      }

      if(currentAfter.suboption) {
        this.findOption(currentAfter.option.form.get('id').value).subOptions.push(currentAfter.suboption);
      } else {
        this.findBlock(currentAfter.block.form.get('id').value).options.push(currentAfter.option);
      }
    }
  }

  findOppositePreviousBlocksById(idOption, arr) {


    // console.log(this.findOption(idOption));
    // console.log(this.findSubOption(idOption));

    // return this.findOption(idOption) || this.findSubOption(idOption);
    // this.findAndDeleteOption(idOption);
    // this.findAndDeleteSubOption(idOption);

    const res = {
      block: null,
      option: null,
      optionPosition: null,
      suboption: null,
      suboptionPosition: null,
    };

    arr.forEach((col, ii) => {
      col.blocks.forEach((block, jj) => {
        block.options.forEach((option, kk) => {

          if(option.form.get('id').value == idOption) {

            res.block = block;
            res.option = option;
            res.optionPosition = kk;
          } else {
            option.subOptions.forEach((suboption, ll) => {
              if(suboption.form.get('id').value == idOption) {

                res.block = block;
                res.option = option;
                res.optionPosition = kk;
                res.suboption = suboption;
                res.suboptionPosition = ll;
              }

            });
          }
        });
      });
    });

    return res;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    const elements = this.elem.nativeElement.querySelectorAll('.classImLookingFor');
    // console.log(elements);

  }

  getListByClass(cls) {

    const elements = this.elem.nativeElement.querySelectorAll(cls);
    const idArr = [];
    elements.forEach(element => {
      idArr.push(element.id);
    });
    // console.log(elements);
    // console.log(idArr);
    return idArr;
  }
  getOptionList() {

    const elements = this.elem.nativeElement.querySelectorAll('.optionlist');
    const idArr = [];
    elements.forEach(element => {
      idArr.push(element.id);
    });
    // console.log(elements);
    // console.log(idArr);
    return idArr;
  }

  savePage() {

    // console.log(this.oppositeTabCols);
    // console.log(this.currentTabCols);

    console.log(this.pageModel);

    // id, address, block, page_edit, col_edit, row_edit, col_view, row_view, tab

    const arrBlankBlock = [];
    const mapPageBlock = new Map();
    const mapBlockOption = new Map();

    let col_edit = 1;
    let row_edit = 1;
    let col_view = 1;
    let row_view = 1;
    this.pageModel.versions.get('edit').forEach((tab, tabName) => {
      console.log(tabName);
      console.log(tab);
      tab.forEach((col: PageColModel) => {
        col.blocks.forEach((block: BlockModel) => {

          const blockPage = {
            address: this.pageModel.id,
            block: block.form.get('id').value,
            col_edit,
            row_edit,
            col_view: null,
            row_view: null,
            tab: tabName == 'default' ? '' : tabName,
          };

          if(blockPage.block > 0) {

            mapPageBlock.set(blockPage.block, blockPage);

            let order_edit = 1;
            let order_view = 1;

            block.options.forEach((option: OptionModel) => {

              const blockOption = {
                id: option.form.value.id,
                block: block.form.get('id').value,
                name: option.form.value.title,
                type: option.form.value.type,
                select: option.form.value.select,
                order_edit,
                order_view,
                hide: option.form.value.hide,
                parent: null,
              };
              mapBlockOption.set(blockOption.id, blockOption);

              order_edit++;
              option.subOptions.forEach((suboption: OptionModel) => {

                const blockSubOption = {
                  id: suboption.form.value.id,
                  block: block.form.get('id').value,
                  name: suboption.form.value.title,
                  type: suboption.form.value.type,
                  select: suboption.form.value.select,
                  order_edit,
                  order_view: null,
                  hide: suboption.form.value.hide,
                  parent: option.form.value.id,
                };
                mapBlockOption.set(blockSubOption.id, blockSubOption);


                order_edit++;
              });

            });

          } else {
            arrBlankBlock.push(blockPage);
          }




          row_edit++;
        });
        col_edit++;
      })
    });

    let blankBlockIterator = 0;

    this.pageModel.versions.get('view').forEach((tab, tabName) => {
      tab.forEach((col: PageColModel) => {
        col.blocks.forEach((block: BlockModel) => {

          // const blockPage = mapPageBlock.get(block.form.get('id').value);
          let blockPage;

          if(block.form.get('id').value > 0) {

            blockPage = mapPageBlock.get(block.form.get('id').value);
          } else {

            blockPage = arrBlankBlock[blankBlockIterator];
            blankBlockIterator++;
          }

          blockPage.col_view = col_view;
          blockPage.row_view = row_view;


          let order_view = 1;

          block.options.forEach((option: OptionModel) => {

            const idOption = option.form.value.id;

            console.log(idOption);
            const blockOption = mapBlockOption.get(idOption);

            if(blockOption) {

              blockOption.order_view = order_view;

              order_view++;

              option.subOptions.forEach((suboption: OptionModel) => {

                const idSubOption = suboption.form.value.id;


                const blockSubOption = mapBlockOption.get(idSubOption);

                blockSubOption.order_view = order_view;
                order_view++;


              });
            }

          });

          row_view++;
        });
        col_view++;
      })
    });


    const req = {
      pageBlocks: [],
      blockOptions: []
    };
    // const pageBlock = [];
    mapPageBlock.forEach(x => {
      req.pageBlocks.push(x);
    });
    arrBlankBlock.forEach(x => {
      req.pageBlocks.push(x);
    });

    mapBlockOption.forEach(x => {
      req.blockOptions.push(x);
    });

    console.log(req);
    this.adminService.setConstructorBlocks(req).subscribe(res => {
      console.log(res);
    });
  }
  addTab() {
    this.avaliableTabs.push(this.newTabName.value);
    this.pageModel.versions.get('edit').set(this.newTabName.value, []);
    this.pageModel.versions.get('view').set(this.newTabName.value, []);
  }
  deleteTab() {
    this.avaliableTabs = this.avaliableTabs.filter(tab => {
      return this.selectTab.value != tab;

      this.pageModel.versions.get('edit').delete(tab);
      this.pageModel.versions.get('view').set(tab);
    });
    this.selectTab.setValue('');
  }

  addNewCol(tab) {
    tab.push(this.getBlankCol());
  }
  deleteCol(i) {
    if(!this.currentTabCols[i].blocks.length) {
      this.currentTabCols.splice(i, 1);
    }
  }
  getBlankCol() : PageColModel {
    return {
      blocks: []
    }
  }



  addNewBlock(i) {

    this.addNewCol(this.oppositeTabCols);
    const position = this.oppositeTabCols.length - 1;

    const newBlock = this.getBlankBlock();
    this.oppositeTabCols[position].blocks.push(newBlock);

    this.currentTabCols[i].blocks.push(newBlock);
  }
  deleteBlock(i, j) {

    const idBlock = this.currentTabCols[i].blocks[j].form.get('id').value;
    this.findAndDeleteBlock(idBlock);

    this.currentTabCols[i].blocks.splice(j, 1);
  }
  findAndDeleteBlock(idBlock) {
    let i = -1;
    let j = -1;
    this.oppositeTabCols.forEach((col, ii) => {
      col.blocks.forEach((block, jj) => {
        if(block.form.get('id').value == idBlock) {
          i = ii;
          j = jj;
        }
      });
    });
    if(i != -1 && j != -1) {

      this.oppositeTabCols[i].blocks.splice(j, 1);
    }
  }
  findBlock(idBlock) {
    let i = -1;
    let j = -1;
    this.oppositeTabCols.forEach((col, ii) => {
      col.blocks.forEach((block, jj) => {
        if(block.form.get('id').value == idBlock) {
          i = ii;
          j = jj;
        }
      });
    });

    try {
      return this.oppositeTabCols[i].blocks[j];
    } catch (e) {
      return null;
    }
  }
  getBlankBlock() : BlockModel {


    const form: FormGroup = this.getBlankBlockForm();

    const options = [];

    const resBlock = {
      form, options
    };

    (form.get('id') as FormControl).valueChanges.subscribe(id => {
      this.blockChanges(id, resBlock, this.version.value);
    });

    return resBlock;
  }


  addNewOption(i, j) {


    const idBlock = this.currentTabCols[i].blocks[j].form.get('id').value;
    const oppositeBlock = this.findBlock(idBlock);

    this.currentTabCols[i].blocks[j].options.push(this.getBlankOption(true));
    oppositeBlock.options.push(this.getBlankOption(false));
  }
  deleteOption(i, j, k) {

    const idOption = this.currentTabCols[i].blocks[j].options[k].form.get('id').value;
    this.findAndDeleteOption(idOption);

    this.currentTabCols[i].blocks[j].options.splice(k, 1);

  }
  getBlankOption(current) : OptionModel {
    return {
      form: this.getBlankOptionForm(current),
      subOptions: [],
    }
  }
  findAndDeleteOption(idOption) {
    let i = null;
    let j = null;
    let k = null;
    this.oppositeTabCols.forEach((col, ii) => {
      col.blocks.forEach((block, jj) => {
        block.options.forEach((option, kk) => {

          if(option.form.get('id').value == idOption) {
            i = ii;
            j = jj;
            k = kk;
          }
        });
      });
    });

    // console.log(idOption);
    // console.log(i);
    // console.log(j);
    // console.log(k);

    if(i !== null && j !== null && k !== null) {
      this.oppositeTabCols[i].blocks[j].options.splice(k, 1);
    }
  }
  findOption(idOption) {
    let i = null;
    let j = null;
    let k = null;
    this.oppositeTabCols.forEach((col, ii) => {
      col.blocks.forEach((block, jj) => {
        block.options.forEach((option, kk) => {

          if(option.form.get('id').value == idOption) {
            i = ii;
            j = jj;
            k = kk;
          }
        });
      });
    });

    try {
      return this.oppositeTabCols[i].blocks[j].options[k];
    } catch (e) {
      return null;
    }
  }

  addNewSubOption(i, j, k) {

    const idOption = this.currentTabCols[i].blocks[j].options[k].form.get('id').value;
    const oppositeOption = this.findOption(idOption);

    this.currentTabCols[i].blocks[j].options[k].subOptions.push(this.getBlankOption(true));
    oppositeOption.subOptions.push(this.getBlankOption(false));

  }
  deleteSubOption(i, j, k, l) {
    // this.currentTabCols[i].blocks[j].options[k].subOptions.splice(l, 1);


    const idOption = this.currentTabCols[i].blocks[j].options[k].subOptions[l].form.get('id').value;
    this.findAndDeleteSubOption(idOption);

    this.currentTabCols[i].blocks[j].options[k].subOptions.splice(l, 1);
  }

  findAndDeleteSubOption(idOption) {
    let i = null;
    let j = null;
    let k = null;
    let l = null;
    this.oppositeTabCols.forEach((col, ii) => {
      col.blocks.forEach((block, jj) => {
        block.options.forEach((option, kk) => {
          option.subOptions.forEach((suboption, ll) => {

            if(suboption.form.get('id').value == idOption) {
              i = ii;
              j = jj;
              k = kk;
              l = ll;
            }

          });
        });
      });
    });

    if(i !== null && j !== null && k !== null && l !== null) {
      this.oppositeTabCols[i].blocks[j].options[k].subOptions.splice(l, 1);
    }
  }
  findSubOption(idOption) {
    let i = null;
    let j = null;
    let k = null;
    let l = null;
    this.oppositeTabCols.forEach((col, ii) => {
      col.blocks.forEach((block, jj) => {
        block.options.forEach((option, kk) => {
          option.subOptions.forEach((suboption, ll) => {

            if(suboption.form.get('id').value == idOption) {
              i = ii;
              j = jj;
              k = kk;
              l = ll;
            }

          });
        });
      });
    });

    try {
      return this.oppositeTabCols[i].blocks[j].options[k].subOptions[l];
    } catch (e) {
      return null;
    }
  }

  getBlankOptionForm(current): FormGroup {

    if(current) {
      this.newOptionId--;
    }
    return new FormGroup({

      id: new FormControl(this.newOptionId),
      title: new FormControl('new option'),
      type: new FormControl('0'),
      select: new FormControl(''),
      hide: new FormControl(false),
      parent: new FormControl(''),
      hidden: new FormControl(true),
    });
  }

  getBlankBlockForm(): FormGroup {
    return new FormGroup({

      id: new FormControl(-1),
      hidden: new FormControl(true),
    })
  }

  get page() {
    return this.form.get('page');
  }

  get selectTab() {
    return this.form.get('selectTab');
  }

  get newTabName() {
    return this.form.get('newTabName');
  }
  get version() {
    return this.form.get('version');
  }
}

export interface PageData {
  res: Page[]
}
export interface Page {
  active: any;
  businessOnly: any;
  id: any;
  name: any;
  parentpage: any;
}

export interface BlockData {
  res: Block[]
}
export interface Block {
  id: any;
  name: any;
}

export interface ConstructorDataDownload {
  id_page: any;
  name_page: any;
  id_block: any;
  name_block: any;
  col_edit: any;
  row_edit: any;
  col_view: any;
  row_view: any;
  tab: any;
  id_option: any;
  name_option: any;
  type_option: any;
  select_option: any;
  order_edit: any;
  order_view: any;
  hide: any;
  parent: any;
}



export interface PageModel {
  id: any;
  name: any;
  versions: any;
}

export interface VersionModel {
  tabs: any;
}
export interface TabModel {
  name: any;
  colsView: PageColModel[];
  colsEdit: PageColModel[];
}
export interface PageColModel {
  blocks: BlockModel[];
}
export interface BlockModel {
  form: FormGroup;
  options: OptionModel[];
}
export interface OptionModel {
  form: FormGroup;
  subOptions: OptionModel[];
}


