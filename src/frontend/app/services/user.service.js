import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export default class UserService {

  constructor(http) {
    this.http = http
    this._users = []
    this.http.get("/contributors").toPromise()
            .then(response => this._users.push(...response.json()))
            .catch(err => console.log(err))
    this.currentUser = { name: 'Tell me who you are?' }
  }

  get users() {
    return this._users
  }

  getContributor(id) {
    return this.http.get(`/contributors/${id}`).toPromise()
            .then(response => {
              this.currentUser = response.json();
              return response.json();
            })
  }

  create(user) {
    this.http.post("/contributors", JSON.stringify(user), { headers: {'Content-Type': 'application/json'}})
            .toPromise()
            .then(theUser => this.users.push(theUser.json()))
            .catch(err => console.log(err))
  }
}

ProjectService.parameters = [
  Http
]
