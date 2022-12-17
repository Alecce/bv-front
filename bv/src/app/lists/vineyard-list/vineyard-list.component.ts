import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-vineyard-list',
  templateUrl: './vineyard-list.component.html',
  styleUrls: ['./vineyard-list.component.css']
})
export class VineyardListComponent implements OnInit {

  tableCols = [
    {variable: 'id', name: '#', link: true, href: 'vineyard/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'National name', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'int_name', name: 'International name', link: false, href: '', hrefId: '', searchFormControlName: 'searchInternationalName'},
    {variable: 'region', name: 'Region', link: false, href: '', hrefId: '', searchFormControlName: 'searchRegion'}
  ];
  api = 'getVineyardList';
  constructor(
    private titleService: Title,
  ) {
  }

  ngOnInit() {

    let title = 'Vineyardlist - bonvino.com';
    this.titleService.setTitle(title);
  }
}
