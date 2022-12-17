import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-kashrut-list',
  templateUrl: './kashrut-list.component.html',
  styleUrls: ['./kashrut-list.component.css']
})
export class KashrutListComponent implements OnInit {

  total = 0;
  tableCols = [
    {variable: 'id', name: '#', link: true, href: 'admin/kashrut/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'int_name', name: 'International Name', link: false, href: '', hrefId: '', searchFormControlName: 'searchInternationalName'},
    {variable: 'hebrew_name', name: 'National name', link: false, href: '', hrefId: '', searchFormControlName: 'searchHebrewName'},
    {variable: 'picture', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'searchImage', image: true,
      imagePath: environment.kashrutImageStore}
  ];
  api = 'getKashrutList';
  constructor(
    private titleService: Title,
  ) {
  }

  ngOnInit() {

    let title = 'Kashrutlist - bonvino.com';
    this.titleService.setTitle(title);
  }
}
