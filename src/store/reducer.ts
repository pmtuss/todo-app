"";
import { getId } from "../utils/util";

import {
  ADD_TODO,
  UPDATE_TODO,
  OPEN_FORM,
  UPDATE_FORM,
  CLOSE_FORM,
  DELETE_TODO,
  FILTER_TASK,
  SEARCH_TASK,
} from "./constants";

export enum TaskStatus {
  TODO = "TODO",
  INPROGRESS = "INPROGRESS",
  DONE = "DONE",
}

interface Task {
  id: string,
  title: string,
  description: string,
  status: TaskStatus,
}

interface TaskForm {
  isOpen: boolean,
  action: string,
  task: Task,
}

interface State {
  searchInput: string,
  filter: string,
  taskForm: TaskForm,
  tasks: Task[]
}

interface Action {
  type: string,
  payload?: any,
}

const initState: State = {
  searchInput: "",
  filter: "ALL",
  taskForm: {
    isOpen: false,
    action: "",
    task: {
      id: "",
      title: "",
      description: "",
      status: TaskStatus.TODO
    },
  },
  tasks: [
    {
      id: '1',
      title: "Giặt đồ",
      description: "Giặt áo trắng, giặt giày ...",
      status: TaskStatus.TODO,
    },
    {
      id: '10',
      title: "inprogress",
      description: "Giặt áo trắng, giặt giày ...",
      status: TaskStatus.INPROGRESS,
    },
    {
      id: '2',
      title: "Mua đồ",
      description: "bột giặt, kem đánh răng",
      status: TaskStatus.DONE,
    },
    { id: '3', title: "Rửa bát", description: "Rửa bát đê ....", status: TaskStatus.DONE },
  ],
};

type ReducerFn = (state: State, action: Action) => State

const reducer : ReducerFn = (state: State, action: Action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        tasks: [
          { ...action.payload, id: getId(), status: "TODO" },
          ...state.tasks,
        ],
        taskForm: {
          ...state.taskForm,
          isOpen: false,
        },
      };
    case UPDATE_TODO:
      const updatedTask = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return (task = { ...action.payload });
        } else return task;
      });

      return {
        ...state,
        taskForm: {
          ...state.taskForm,
          isOpen: false,
        },
        tasks: [...updatedTask],
      };
    case DELETE_TODO:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case OPEN_FORM:
      return {
        ...state,
        taskForm: {
          ...state.taskForm,
          isOpen: true,
          task: {
            ...state.taskForm.task,
            ...action.payload.task,
          },
          action: action.payload.action,
        },
      };

    case UPDATE_FORM:
      return {
        ...state,
        taskForm: {
          ...state.taskForm,
          task: {
            ...action.payload,
          },
        },
      };

    case CLOSE_FORM:
      return {
        ...state,
        taskForm: {
          ...state.taskForm,
          isOpen: false,
        },
      };
    case FILTER_TASK:
      return {
        ...state,
        filter: action.payload,
      };
    case SEARCH_TASK:
      return {
        ...state,
        searchInput: action.payload,
      };
    default:
      return state;
  }
};

export { initState };
    export type { State, ReducerFn, Action, Task};
export default reducer;
