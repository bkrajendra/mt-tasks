import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TaskApiService } from 'src/app/central/services/task-api.service';
import { Status } from 'src/app/central/status';
import { Task } from 'src/app/central/task';

const ELEMENT_DATA: Task[] = [];
@Component({
  selector: 'app-manage-status',
  templateUrl: './manage-status.component.html',
  styleUrls: ['./manage-status.component.scss'],
})
export class ManageStatusComponent implements OnInit {
  open_tasks: Task[] = [];
  inprogress_tasks: Task[] = [];
  completed_tasks: Task[] = [];
  constructor(private task_api: TaskApiService) {}

  ngOnInit(): void {
    this.loadAllTasks();
  }

  drop1(event: CdkDragDrop<Task[]>) {
    //moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  // Drag-Drop handler for all cdkDropList
  // 1 - Identify destination droplist id to understand where item is dropped
  // 2 - Retreive data (Task) associated with dropped Item
  drop(event: CdkDragDrop<Task[]>) {
    console.log(event.container.id);
    console.log(event.item.data);

    // Update task after retreiving Task details and container id whre task being dropped
    this.updateTask(event.item.data, event.container.id);

    // Handle drag drop behavier.
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  loadAllTasks() {
    this.task_api.getTasks().subscribe((dbTasks: Task[]) => {
      console.log(dbTasks);

      // Tasks classification by their status into different task-arrays
      this.open_tasks = dbTasks.filter(t => t.status===Status.open);
      this.inprogress_tasks = dbTasks.filter(t => t.status===Status.inprogress);
      this.completed_tasks = dbTasks.filter(t => t.status===Status.completed);
    });
  }

  updateTask(task: Task, status_id: string) {
    //identify target status box and convert it to status value
    let status:any = status_id.split('_')[1];

    //update date not needed as its created_date. but just to demonstrate can be appplied to update_at
    task.created_at = Date.now().toString();

    //string value obtained drom target status box need to be converted into enum
    // getSttus returns Status enum
    task.status = this.getStatus(status);

    console.log(task);

    // Usual update task with staus // can be just status but passed entire Task just to keep it simple
    this.task_api.updateTask(task).subscribe((resp) => {
      console.log(resp);
      this.loadAllTasks();
    });
  }

  // String to Status Enum
  getStatus(status: string): Status {
    if(status === 'open'){
      return Status.open;
    }
    if(status === 'inprogress'){
      return Status.inprogress;
    }
    if(status === 'completed'){
      return Status.completed;
    }
    return Status.notknown;
  }
}
