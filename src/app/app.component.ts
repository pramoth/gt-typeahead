import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  ctrLocation:any={
    version: 23,
    createDate: "2003-01-05",
    createBy: "develop",
    updateDate: "2014-06-10",
    updateBy: "administrator",
    locId: 1,
    locCode: "100000",
    regId: 1,
    locAbbrName: "กรุงเทพมหานคร",
    locName: "กรุงเทพมหานคร",
    locRepName: "กรุงเทพมหานคร",
    aumpCode: "100000",
    provCode: "100000",
    postcode: null,
    provName: "กรุงเทพมหานคร",
    aumpName: null,
    tumbonName: null,
    useFlag: "1"
  };
  select(value:any){
    console.log(value)
  }


}
