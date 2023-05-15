import {
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    OPEN_FORM,
    SUBMIT_FORM,
    UPDATE_FORM,
    CLOSE_FORM,
    FILTER_TASK,
    SEARCH_TASK,
  } from "./constants";

  import {Task} from "./reducer"
  
  export const addTodo = (task: Task) => ({
    type: ADD_TODO,
    payload: task,
  });
  
  export const updateTodo = (task: Task) => ({
    type: UPDATE_TODO,
    payload: task,
  });
  
  export const deleteTodo = (id: string) => ({
    type: DELETE_TODO,
    payload: id,
  });
  
  export const openForm = (payload: {action: string, task: Task}) => ({
    type: OPEN_FORM,
    payload: payload,
  });
  
  export const closeForm = () => ({
    type: CLOSE_FORM,
  });
  
  export const updateForm = (task: Task) => ({
    type: UPDATE_FORM,
    payload: task,
  });
  
  export const submitForm = (task: Task) => ({
    type: SUBMIT_FORM,
    payload: task,
  });
  
  export const filterTasks = (filterValue: string) => ({
    type: FILTER_TASK,
    payload: filterValue,
  });
  
  export const searchTasks = (searchValue: string) => ({
    type: SEARCH_TASK,
    payload: searchValue,
  });
  

  export enum AAAA {
    MOT,
    HAI,
    BA
  }
