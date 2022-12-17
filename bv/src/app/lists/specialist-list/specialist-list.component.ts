import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-specialist-list',
  templateUrl: './specialist-list.component.html',
  styleUrls: ['./specialist-list.component.css']
})
export class SpecialistListComponent implements OnInit {

  tableCols = [
    {variable: 'id', name: '#', link: false, href: '', hrefId: '', searchFormControlName: 'searchId'},
    {variable: 'name', name: 'Specialist', link: false, href: '', hrefId: '', searchFormControlName: 'searchName'},
    {variable: 'pointsystem', name: 'Point system', link: false, href: '', hrefId: '', searchFormControlName: 'searchPointSystem'},
  ];
  api = 'getSpecialistList';
  constructor(
    private titleService: Title,
  ) {
  }

  ngOnInit() {

    let title = 'Specialists - bonvino.com';
    this.titleService.setTitle(title);
  }

}
