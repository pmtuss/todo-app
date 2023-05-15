import { useContext, useEffect, useRef } from "react";
import { StoreContext } from "../store";
import { actions } from "../store";

const TaskForm = () => {
  const [state, dispatch] = useContext(StoreContext);
  const { taskForm } = state;
  const { isOpen, task } = taskForm;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      actions.updateForm({
        ...task,
        title: event.target.value,
      })
    );
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      actions.updateForm({
        ...task,
        description: event.target.value,
      })
    );
  };

  const handleClose = () => {
    dispatch(actions.closeForm());
  };

  const handleSubmit = () => {
    taskForm.action === "ADD"
      ? dispatch(actions.addTodo(task))
      : dispatch(actions.updateTodo(task));
  };

  const titleElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleElement.current && isOpen)
      titleElement.current.focus();
  }, [isOpen]);

  return (
    <div className={"modal" + (isOpen ? " is-active" : "")}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-card">
        <header className="modal-card-head has-background-primary">
          <p className="modal-card-title">
            {taskForm.action === "ADD" ? "ADD " : "Edit "} Task
          </p>
          <button className="delete" onClick={handleClose}></button>
        </header>
        <section className="modal-card-body py-3 px-5">
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="title"
                value={task.title}
                onChange={handleTitleChange}
                ref={titleElement}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea"
                value={task.description}
                placeholder="description"
                onChange={handleDescriptionChange}
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot py-3 ">
          <button className="button is-primary" onClick={handleSubmit}>
            {taskForm.action === "ADD" ? "Create" : "Save"}
          </button>
          <button className="button" onClick={handleClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default TaskForm;
