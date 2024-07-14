import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListTaskService {
  private http = inject(HttpClient)
  private apiUrl = 'http://localhost:60805/api/Gorevs?PageIndex=0&PageSize=100';
  constructor() { }

  listTasks(): Observable<any>{
    return this.http.get<any>(this.apiUrl)
  }
}
