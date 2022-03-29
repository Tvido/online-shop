import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {FbResponse} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  create(order) {
    return this.http.post(`${environment.fbDbUri}/orders.json`, order)
      .pipe(map((res: FbResponse) => {
        return {
          ...order,
          id: res.name,
          date: new Date(order.date)
        }
      }))
  }

  getAll() {
    return this.http.get(`${environment.fbDbUri}/orders.json`)
      .pipe(
        map(res => {
          return Object.keys(res)
            .map(key => ({
              ...res[key],
              id: key,
              date: new Date(res[key].date)
            }) )
        })
      )
  }

  remove(id) {
    return this.http.delete(`${environment.fbDbUri}/orders/${id}.json`)
  }
}
