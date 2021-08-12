import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Task } from '../task';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

api_endpoint = 'http://localhost:3000';

  constructor(
    private _http: HttpClient
  ) { }
  
  getTasks(){
    return this._http.get<Task[]>(this.api_endpoint + '/tasks');
  }
  
  getTasksbyID(id: number): Observable<Task>{
    return this._http.get<Task>(this.api_endpoint + '/tasks/' + id);
  }

  saveTasks(task: Task): Observable<Task>{
    const _httpOPT = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this._http.post<Task>(this.api_endpoint + '/tasks', task, _httpOPT);
  }

  updateTask(task: Task): Observable<Task>{
    const _httpOPT = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this._http.put<Task>(this.api_endpoint + '/tasks/' + task.id, task, _httpOPT);
  }

  deleteTask(id: number): Observable<unknown>{
    const _httpOPT = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this._http.delete(this.api_endpoint + '/tasks/'+id, _httpOPT);
  }
}
