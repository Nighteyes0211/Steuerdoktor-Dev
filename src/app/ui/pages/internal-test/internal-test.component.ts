import { Component, OnInit } from '@angular/core';
import { ESt1A } from 'src/app/structure/ESt1A/ESt1A';

@Component({
  selector: 'app-internal-test',
  templateUrl: './internal-test.component.html',
  styleUrls: ['./internal-test.component.css']
})
export class InternalTestComponent implements OnInit {

  est1a: ESt1A = null;

  constructor() 
  { 
    this.est1a = new ESt1A();
  }

  ngOnInit(): void {
  }

}
