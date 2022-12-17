import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-wirery-list',
  templateUrl: './wirery-list.component.html',
  styleUrls: ['./wirery-list.component.css']
})
export class WireryListComponent implements OnInit {
  tableCols = [
    {variable: 'id', name: '#', link: true, href: 'winery/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'winery_name', name: 'Name', link: false, href: 'winery/', hrefId: 'id', searchFormControlName: 'searchName'},
    {variable: 'international_name', name: 'International name', link: false, href: '', hrefId: '', searchFormControlName: 'searchInternationalName'},
    {variable: 'name', name: 'Country', link: true, href: '', hrefId: '', searchFormControlName: 'searchCountry', sorting: true},
  ];
  api = 'getWineryList';
  constructor() {
  }

  ngOnInit() {
  }

}
