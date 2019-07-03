import { Injectable } from '@angular/core';
import { ENV } from '../core/env.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContractService {

  constructor(private http: HttpClient) { }
  getContracts(): Observable<any> {
    return this.http.get(ENV.CONTRACT_URI);
  }
  removeContract(id): Observable<any> {
    return this.http.get(ENV.CONTRACT_URI + '/delete/' + id);
  }
  addContracts(data): Observable<any> {
    return this.http.post(ENV.CONTRACT_URI, data);
  }
  updateContract(id, data): Observable<any> {
    return this.http.put(ENV.CONTRACT_URI + '/' + id, data);
  }
}
