import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor() { }

  ngOnInit(): void {
  }
  processForm() {
    const allInfo = `My email is ${this.email}. My password is ${this.password}`;
    alert(allInfo); 
  }

}
