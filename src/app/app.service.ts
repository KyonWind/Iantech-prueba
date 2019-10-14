import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public url: string = 'https://reqres.in/';

  constructor(public _http: HttpClient){}
  getList():Observable<any> {
    return this._http.get(this.url + 'api/unknown');
  }
}
