import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskApiService } from 'src/app/central/services/task-api.service';
import { Task } from '../../central/task';
import { MatTableDataSource } from '@angular/material/table';
import { Status } from 'src/app/central/status';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

// Manage Task component handles Task add, update and delete.
// Tasks listing is provided thorugh mat-table functionality.

@Component({
  selector: 'app-manage-tasks',
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.scss'],
})
export class ManageTasksComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  // get status enums to be populated in form status drop down
  // This can be just replaced by simple static drop down.
  status = Status; 

  title = 'Manage Task';

  // Initialize task to be used for create/update
  task: Task = { title: '', description: '' };

  // Define table column definition
  dColumns: string[] = ['id', 'title', 'description', 'status', 'created_at', 'action'];
  
  // Initialize Data source for mat-table with Task type
  tasksData = new MatTableDataSource<Task>();

  // This is just "getLastInsertedIDd" stuff for tasks-db
  lastid: any = 0;

  // edit box UI visiblitiy for New/Update functionality
  // Kept two different mat-cards whose visibility is controlled with editMode
  editMode: boolean = false;

  constructor(private task_api: TaskApiService) {
    // MatPaginator undefined issue fix - need to initialised
    this.paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  }

  ngOnInit(): void {
    // Load All tasks and populate data source
    this.showAllTasks();
    
  }
  ngAfterViewInit() {
    //this.tasksData.paginator = this.paginator;
  }

  showAllTasks() {
    this.task_api.getTasks().subscribe((d: Task[]) => {
      console.log(d);
      //Get and retain last record id
      this.lastid = d[d.length - 1].id;

      console.log(this.lastid);

      //Load data from task-api service to taskData data source.
      this.tasksData = new MatTableDataSource(d);

      // Assign paginator to datasource pagination
      this.tasksData.paginator = this.paginator;

      // make sure to set editMode UI disabled and create UI box is enabled
      // Text boxes can be cleared here to represent new/create Task functionality
      this.editMode = false;
    });
  }

  saveTask() {
    // get latest date string for created_at
    this.task.created_at = Date.now().toString();

    // Increament task.id
    this.task.id = this.lastid + 1;

    console.log(this.task);

    // Save taks with POST sevice request call
    this.task_api.saveTasks(this.task).subscribe((resp) => {
      console.log(resp);
      // Update Task list.
      this.showAllTasks();
      alert("New Task added!");
    });
  }

  // Delete a Task by its ID
  deleteTask(id: number) {
    this.task_api.deleteTask(id).subscribe((resp) => {
      console.log(resp);
      this.showAllTasks();
    });
  }

  // Update Task by ID
  updateTask() {
    this.task.created_at = Date.now().toString();
    console.log(this.task);

    // Update Task by its ID with PUT service call
    this.task_api.updateTask(this.task).subscribe((resp) => {
      console.log(resp);
      this.showAllTasks();
      alert("Task with ID [" + this.task.id + "] updated!");
    });
  }

  LoadData(id: number){
    // Load a Task by Its ID with GET= service call
    this.task_api.getTasksbyID(id).subscribe((d: Task) => {
      console.log(d);
      this.task = d;
      // Enable Edit Mode UI
      this.editMode = true;
    });
  }
}
