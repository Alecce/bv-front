import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  tableCols = [
    {variable: 'id', name: '#', link: true, href: 'event/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'Name', link: true, href: '', hrefId: '', searchFormControlName: 'searchName', sorting: true},
    {variable: 'name_international', name: 'Neutral name', link: true, href: '', hrefId: '', searchFormControlName: 'searchNameInternational', sorting: true},
    {variable: 'address', name: 'Address', link: true, href: '', hrefId: '', searchFormControlName: 'searchAddress', sorting: true},
    {variable: 'type', name: 'Type', link: true, href: '', hrefId: '', searchFormControlName: 'searchType', sorting: true},
    {variable: 'language', name: 'Language', link: true, href: '', hrefId: '', searchFormControlName: 'searchLanguage', sorting: true},
  ];
  api = 'getEventList';
  constructor() {
  }
  ngOnInit() {
  }

}
