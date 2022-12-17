import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {variables} from '@src/environments/variables';

@Component({
  selector: 'app-subrouter',
  templateUrl: './subrouter.component.html',
  styleUrls: ['./subrouter.component.css']
})
export class SubrouterComponent implements OnInit, OnDestroy {

  variables = variables;

  constructor(

    private activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    console.log(this.activatedroute.snapshot);

    this.variables.bengat = true;
    console.log(this.variables);

  }

  ngOnDestroy(): void {

    this.variables.bengat = false;
    console.log(this.variables);


  }

}
