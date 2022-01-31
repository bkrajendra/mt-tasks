import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
//import { catchError, retry } from 'rxjs/operators';
import { Task } from '../task';

// very smple service to handle all rest call to tasks-db
// error handling is not done to keept it simple

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  // end point URL
api_endpoint = 'http://my-json-server.typicode.com/bkrajendra/mt-tasks';

  constructor(
    private _http: HttpClient
  ) { }
  
  // GET all tasks from tasks-db
  // returns Task[]
  getTasks(){
    return this._http.get<Task[]>(this.api_endpoint + '/tasks');
  }
  
  // Get task by id from tasks-db
  //// returns Task
  getTasksbyID(id: number): Observable<Task>{
    return this._http.get<Task>(this.api_endpoint + '/tasks/' + id);
  }

  // Create new Task
  // returns Task
  saveTasks(task: Task): Observable<Task>{
    const _httpOPT = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this._http.post<Task>(this.api_endpoint + '/tasks', task, _httpOPT);
  }

  // Update Task by ID 
  // returns Task
  updateTask(task: Task): Observable<Task>{
    const _httpOPT = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this._http.put<Task>(this.api_endpoint + '/tasks/' + task.id, task, _httpOPT);
  }

  // Delete Task by ID
  deleteTask(id: number): Observable<unknown>{
    const _httpOPT = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this._http.delete(this.api_endpoint + '/tasks/'+id, _httpOPT);
  }
}
