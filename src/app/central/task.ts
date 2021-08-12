import { Status } from "./status";
// Task Interface to manage task defination
export interface Task{
    id?: number,
    title: string,
    description: string,
    status?: Status,
    created_at?: string
  }