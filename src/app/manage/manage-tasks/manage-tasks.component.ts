import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskApiService } from 'src/app/central/services/task-api.service';
import { Task } from '../../central/task';
import { MatTableDataSource } from '@angular/material/table';
import { Status } from 'src/app/central/status';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

const ELEMENT_DATA: Task[] = [
  {
    id: 1,
    title: 'Study Nestjs',
    description: 'Schedule for studying nestjs framework',
    status: Status.open,
    created_at: '11/08/2021',
  },
  {
    id: 2,
    title: 'Chat instance',
    description: 'Create new Chat instance',
    status: Status.inprogress,
    created_at: '11/08/2021',
  },
  {
    id: 3,
    title: 'Setup Server',
    description: 'Setup Server for online exam',
    status: Status.completed,
    created_at: '11/08/2021',
  },
];
@Component({
  selector: 'app-manage-tasks',
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.scss'],
})
export class ManageTasksComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  status = Status;
  title = 'Manage Task';
  task: Task = { title: '', description: '' };

  // Define column definition
  dColumns: string[] = ['id', 'title', 'description', 'status', 'created_at', 'action'];
  tasksData = new MatTableDataSource<Task>();
  lastid: any = 0;
  editMode: boolean = false;

  constructor(private task_api: TaskApiService) {
    // MatPaginator undefined issue fix
    this.paginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  }

  ngOnInit(): void {
    // Load All tasks
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

      //Load data from api-service to taskData data source.
      this.tasksData = new MatTableDataSource(d);
      this.tasksData.paginator = this.paginator;
      this.editMode = false;
    });
  }

  saveTask() {
    this.task.created_at = Date.now().toString();
    this.task.id = this.lastid + 1;
    console.log(this.task);
    this.task_api.saveTasks(this.task).subscribe((resp) => {
      console.log(resp);
      this.showAllTasks();
    });
  }

  deleteTask(id: number) {
    this.task_api.deleteTask(id).subscribe((resp) => {
      console.log(resp);
      this.showAllTasks();
    });
  }

  updateTask() {
    this.task.created_at = Date.now().toString();
    console.log(this.task);
    this.task_api.updateTask(this.task).subscribe((resp) => {
      console.log(resp);
      this.showAllTasks();
    });
  }

  LoadData(id: number){
    this.task_api.getTasksbyID(id).subscribe((d: Task) => {
      console.log(d);
      this.task = d;
      this.editMode = true;
    });
  }
}
