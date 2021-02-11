import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Test} from './model/test';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  test: Test;
  title = 'my-app-front';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    // this.getTest().subscribe(response => {
    //   console.log(response);
    // });
  }


  getTest() {
    return this.http
      .get<Test>('http://localhost:8081/test')
      .pipe(
        map(responseData => {
          this.test = responseData;
          console.log('Loguje test2 ' + this.test.test2);
          let myTest: Test = null;
          myTest = responseData;
          console.log(myTest.test);
        })
      );
  }
}
