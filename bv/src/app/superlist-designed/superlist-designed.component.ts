import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, filter} from 'rxjs/operators';
import {LanguageServiceService} from '../services/language-service.service';
import {ListsService} from '../services/api/lists.service';

@Component({
  selector: 'app-superlist-designed',
  templateUrl: './superlist-designed.component.html',
  styleUrls: ['./superlist-designed.component.css']
})
export class SuperlistDesignedComponent implements OnInit {

  itemList = [];
  searchList = [];
  page = 1;
  optionTotal;

  @Input() searchApi;
  @Input() title;


  @Input() pageForSearch;
  @Input() placeForSearch;
  @Input() defaultForSearch;

  @Input() getRowName;

  @Input() chosenItem;


  form = new FormGroup({
    search: new FormControl(''),
  });

  constructor(
    public langService: LanguageServiceService,
    public listService: ListsService,
    ) { }

  ngOnInit() {


    this.search.valueChanges.pipe(
      debounceTime(1000),
      filter(form => !form.invalid),
    ).subscribe(() => {
      this.downloadAfterSearch();
    });

  }

  downloadAfterSearch() {
    console.log(this.search.value);
    this.listService[this.searchApi]({search: this.search.value, page: this.page}).subscribe( result => {
      console.log(result);
      this.searchList = result.rows;
    });
    return this.form.get('downloadAfterSearch');
  }
  get search() {
    return this.form.get('search');
  }
  setItemList(list) {
    this.itemList = list;
  }
  getItemList() {
    return this.itemList;
  }
  selectOption(option) {
    // this.itemList.push(option);
    this.chosenItem.next(option);
  }
  getOptionName(option) {
    console.log(this.getRowName);
    if (this.getRowName) {
      return this.getRowName(option);
    } else {
      return option.name;
    }
  }
  setPage(page) {
    if (this.langService.editable) {
      return;
    }
    this.page = page;
    this.downloadAfterSearch();
    return page;
  }
}
