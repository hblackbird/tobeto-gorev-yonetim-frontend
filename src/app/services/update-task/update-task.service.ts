import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateTaskService {

  constructor() { }
  private apiUrl = 'http://localhost:60805/api/Gorevs';
  private http = inject(HttpClient)
  updateTask(taskId: string, taskData: any): Observable<any> {
    return this.http.put(this.apiUrl, taskData);
  }
}
