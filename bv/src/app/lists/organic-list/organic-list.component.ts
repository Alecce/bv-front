import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-organic-list',
  templateUrl: './organic-list.component.html',
  styleUrls: ['./organic-list.component.css']
})
export class OrganicListComponent implements OnInit {

  total = 0;
  tableCols = [
    {variable: 'id', name: '#', link: true, href: 'admin/organic/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'picture', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'searchImage', image: true,
      imagePath: environment.organicImageStore}
  ];
  api = 'getOrganicList';
  constructor(
    private titleService: Title,
  ) { }

  ngOnInit() {

    let title = 'Organiclist - bonvino.com';
    this.titleService.setTitle(title);
  }

}
