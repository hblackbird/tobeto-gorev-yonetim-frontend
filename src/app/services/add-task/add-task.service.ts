import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {
  private http = inject(HttpClient)
  private apiUrl = 'http://localhost:60805/api/Gorevs';
  constructor() { }

  addTask(gorev: any): Observable<any>{
    const body = {
      title: gorev.title,
      description: gorev.description,
      status: 0,
      userId: gorev.userId
    }
    return this.http.post<any>(this.apiUrl, body)
  }
}
