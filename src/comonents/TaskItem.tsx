import { useContext } from "react";
import { actions, StoreContext, Task, TaskStatus } from "../store";


type Props = {
  item: Task
}

const TaskItem: React.FC<Props> = ({ item }) => {
  const [, dispatch] = useContext(StoreContext);

  const checked = item.status === "DONE";

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const status = event.target.checked ? TaskStatus.DONE : TaskStatus.TODO;
    dispatch(actions.updateTodo({ ...item, status }));
  };

  const handleRunningBtnClick = (status: TaskStatus) => {
    const updatedStatus = status === "TODO" ? TaskStatus.INPROGRESS : TaskStatus.TODO;
    dispatch(actions.updateTodo({ ...item, status: updatedStatus }));
  };

  return (
    <div className="panel-block is-justify-content-space-between">
      <div className="is-flex is-flex-direction-row is-justify-content-flex-start">
        <label className="is-flex is-align-items-center px-1 is-clickable is-size-5">
          <input
            className="is-hidden"
            type="checkbox"
            checked={item.status === "DONE"}
            onChange={handleCheckboxChange}
          />
          {checked ? (
            <span className="icon has-text-primary">
              <i className="fas fa-check-square"></i>
            </span>
          ) : (
            <span className="icon has-text-primary">
              <i className="fa-regular fa-square"></i>
            </span>
          )}
        </label>

        <div
          className={
            "pl-2" + (checked ? " is-linethrough has-text-grey-light" : "")
          }
        >
          <div
            className={
              "is-size-6 has-text-weight-semibold" +
              (item.status === "INPROGRESS"
                ? " has-text-primary has-text-weight-bold is-uppercase"
                : "")
            }
          >
            {item.title}
          </div>
          <div className="is-size-7">{item.description}</div>
        </div>
      </div>
      <div className="is-flex is-flex-direction-row">
        {item.status !== "DONE" && (
          <span
            className="icon has-text-primary is-clickable	m-1 p-2"
            onClick={() => handleRunningBtnClick(item.status)}
          >
            {item.status === "TODO" ? (
              <i className="fa-solid fa-play"></i>
            ) : (
              <i className="fa-solid fa-pause"></i>
            )}
          </span>
        )}
        <span
          className="icon has-text-warning is-clickable	m-1 p-2"
          onClick={() =>
            dispatch(actions.openForm({ action: "EDIT", task: { ...item } }))
          }
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </span>

        <span
          className="icon has-text-danger is-clickable	m-1 p-2"
          onClick={() => dispatch(actions.deleteTodo(item.id))}
        >
          <i className="fa-solid fa-trash"></i>
        </span>
      </div>
    </div>
  );
};

export default TaskItem;
