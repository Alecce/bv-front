import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-vegan-list',
  templateUrl: './vegan-list.component.html',
  styleUrls: ['./vegan-list.component.css']
})
export class VeganListComponent implements OnInit {
  total = 0;
  tableCols = [
    {variable: 'id', name: '#', link: true, href: 'admin/vegan/', hrefId: 'id', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'Name', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'picture', name: 'Image', link: false, href: '', hrefId: '', searchFormControlName: 'searchImage', image: true,
      imagePath: environment.veganImageStore}
  ];
  api = 'getVeganList';

  constructor(
    private titleService: Title,
    ) { }

  ngOnInit() {

    let title = 'Veganlist - bonvino.com';
    this.titleService.setTitle(title);
  }

}
