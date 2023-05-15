import { createContext } from "react";
import { useReducer } from "react";
import reducer, { initState, State, Action } from "./reducer";

type ContextType = [State, (action: Action) => any]

const Context = createContext<ContextType>([
  initState,
  () => { }
]);

type Props = {
  children: React.ReactNode
}

const Provider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  );
};

export { Context };
export default Provider;
