import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteTaskService {
  private http = inject(HttpClient)
  private apiUrl = 'http://localhost:60805/api/Gorevs';
  constructor() { }
  deleteTask(taskId:string):Observable<any>{
    return this.http.delete<any>(this.apiUrl+`/${taskId}`);
  }
}
