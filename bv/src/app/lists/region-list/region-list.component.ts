import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})
export class RegionListComponent implements OnInit {

  tableCols = [
    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'Region', link: false, href: '', hrefId: '', searchFormControlName: 'searchName',
      translateGroup: 'country_names', translateId: 'id'},
    {variable: 'index', name: 'Index', link: false, href: '', hrefId: '', searchFormControlName: 'searchIndex'},
    {variable: 'ISO2', name: 'ISO2', link: false, href: '', hrefId: '', searchFormControlName: 'searchISO2'},
    {variable: 'ISO3', name: 'ISO3', link: false, href: '', hrefId: '', searchFormControlName: 'searchISO3'},
    {variable: 'country', name: 'Country', link: false, href: '', hrefId: '', searchFormControlName: 'searchCountry'}
  ];
  api = 'getRegionList';
  constructor(
    private titleService: Title,
  ) {
  }

  ngOnInit() {

    let title = 'RegionList - bonvino.com';
    this.titleService.setTitle(title);
  }

}
