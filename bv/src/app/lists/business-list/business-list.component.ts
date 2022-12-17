import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {


  tableCols = [
    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'National name', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'international_name', name: 'International name', link: false, href: '', hrefId: '', searchFormControlName: 'searchIntName'}
  ];
  api = 'getBusinessList';
  constructor() {
  }

  ngOnInit() {
  }

}
