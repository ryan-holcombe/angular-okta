import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './model/user.model';
import 'rxjs-compat/add/observable/of';
import {OktaAuthService} from '@okta/okta-angular';
import {from, Observable} from 'rxjs';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private oktaAuth: OktaAuthService) { }
  baseUrl = 'http://localhost:8000/users';

  private buildReq<A>(path): Observable<A> {

    return from(this.oktaAuth.getAccessToken().then(accessToken => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + accessToken,
        })
      };

      return this.http.get<A>(path, httpOptions).toPromise();
    }));
  }

  getUsers() {
    return this.buildReq<User[]>(this.baseUrl);
  }

  getUserById(id: number) {
    return this.http.get<User>(this.baseUrl + '/' + id);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + '/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
