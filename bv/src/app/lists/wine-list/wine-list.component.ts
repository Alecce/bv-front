import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.css']
})
export class WineListComponent implements OnInit {
  tableCols = [
    {variable: 'id', name: '#', link: true, href: 'wine/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'international_wn', name: 'Name', link: true, href: '', hrefId: '', searchFormControlName: 'searchInternationalName', sorting: true},
    {variable: 'vintage_year', name: 'Year', link: true, href: '', hrefId: '', searchFormControlName: 'searchYear', sorting: true},
    {variable: 'wine_color', name: 'Color', link: true, href: '', hrefId: '', searchFormControlName: 'searchColor', sorting: true},
    {variable: 'type', name: 'Type', link: true, href: '', hrefId: '', searchFormControlName: 'searchType', sorting: true},
    {variable: 'name', name: 'Country', link: true, href: '', hrefId: '', searchFormControlName: 'searchCountry', sorting: true},
    {variable: 'international_name', name: 'Winery', link: true, href: '', hrefId: '', searchFormControlName: 'searchWinery', sorting: true},
    {variable: 'has_image', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'searchWinery', image: true, imagePath: environment.wineImageStore}
  ];
  api = 'getWineList';
  constructor() {
  }

  ngOnInit() {
  }

}
