import { useContext } from "react";
import { StoreContext, actions } from "../store";

const Filter = () => {
  const [state, dispatch] = useContext(StoreContext);

  const { filter: value } = state;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, status: string) => {
    event.preventDefault();
    dispatch(actions.filterTasks(status));
  };

  return (
    <p className="panel-tabs">
      <a
        className={value === "ALL" ? "is-active" : ""}
        onClick={(event) => handleClick(event, "ALL")}
        href="/"
      >
        All
      </a>
      <a
        className={value === "TODO" ? "is-active" : ""}
        onClick={(event) => handleClick(event, "TODO")}
        href="/"
      >
        Todo
      </a>
      <a
        className={value === "INPROGRESS" ? "is-active" : ""}
        onClick={(event) => handleClick(event, "INPROGRESS")}
        href="/"
      >
        In-Progress
      </a>
      <a
        className={value === "DONE" ? "is-active" : ""}
        onClick={(event) => handleClick(event, "DONE")}
        href="/"
      >
        Done
      </a>
    </p>
  );
};

export default Filter;
