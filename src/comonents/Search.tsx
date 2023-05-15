import { useContext } from "react";
import { StoreContext, actions } from "../store";

const Search = () => {
  const [state, dispatch] = useContext(StoreContext);
  const { searchInput } = state;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.searchTasks(event.target.value));
  };

  const handleReset = () => {
    dispatch(actions.searchTasks(""));
  };

  return (
    <div
      className="field has-addons is-justify-content-space-between mb-0"
      style={{ width: "100%" }}
    >
      <div className="control has-icons-left has-icons-right is-flex-grow-1 ">
        <input
          className="input is-primary"
          type="text"
          placeholder="Search tasks ..."
          value={searchInput}
          onChange={handleChange}
        />
        <span className="icon is-left " aria-hidden="true">
          <i className="fas fa-search"></i>
        </span>

        {searchInput.length > 0 && (
          <span
            className="is-clickable is-round icon is-small is-right has-text-grey-lighter"
            onClick={handleReset}
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
        )}
      </div>
      <div className="control">
        <button className="button is-info">Search</button>
      </div>
    </div>
  );
};

export default Search;
