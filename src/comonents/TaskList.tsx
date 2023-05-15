import { useContext } from "react";

import Filter from "./Filter";
import Search from "./Search";
import TaskItem from "./TaskItem";

import TaskForm from "./TaskForm";

import { StoreContext, actions } from "../store";

const TaskList = () => {
  const [state, dispatch] = useContext(StoreContext);
  const { tasks, searchInput, filter } = state;

  const displayTasks = tasks
    .filter((task) => {
      if (filter === "ALL") return true;
      else return task.status === filter;
    })
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        task.description.toLowerCase().includes(searchInput.toLowerCase())
    )
    .sort((a, b) => {
      if (a.status === "DONE") return 1;
      return 0;
    });

  const totalTasks = displayTasks.length;

  const handleOpenForm = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(
      actions.openForm({
        action: "ADD",
        task: { ...state.taskForm.task, title: "", description: "" },
      })
    );
  };

  return (
    <div className="container is-max-desktop mt-5 px-5">
      <article className="panel is-primary">
        <p className="panel-heading has-text-centered is-size-4 is-uppercase">
          Todo list
        </p>
        <div className="panel-block is-flex-direction-column is-align-items-start">
          <Search />
          <div
            className="is-flex is-flex-direction-row is-justify-content-space-between is-align-items-baseline"
            style={{ width: "100%" }}
          >
            <a
              href="/"
              className="is-clickable has-text-primary is-size-6 pt-2 px-3"
              onClick={handleOpenForm}
            >
              + Add task
            </a>
            <span className=" is-size-6 has-text-weight-semibold pr-2">
              Total: {totalTasks}
            </span>
          </div>
        </div>
        <Filter />
        {displayTasks.map((task) => (
          <TaskItem key={task.id} item={task} />
        ))}
      </article>

      <TaskForm />
    </div>
  );
};

export default TaskList;
