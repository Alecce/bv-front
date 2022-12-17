import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-grape-list',
  templateUrl: './grape-list.component.html',
  styleUrls: ['./grape-list.component.css']
})
export class GrapeListComponent implements OnInit {
  tableCols = [
    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'searchName',
      translateGroup: 'grapes_names', translateId: 'id'},
    {variable: 'country', name: 'Country', link: false, href: '', hrefId: '', searchFormControlName: 'searchCountry'},
    {variable: 'color', name: 'Color', link: false, href: '', hrefId: '', searchFormControlName: 'searchColor'},
    {variable: 'type', name: 'Type', link: false, href: '', hrefId: '', searchFormControlName: 'searchType'}
  ];
  api = 'getGrapeList';
  constructor(
    private titleService: Title,
    ) {
  }

  ngOnInit() {

    let title = 'Grapelist - bonvino.com';
    this.titleService.setTitle(title);
  }
}
