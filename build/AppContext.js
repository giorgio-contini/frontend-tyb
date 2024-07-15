import { jsx as _jsx } from "react/jsx-runtime";
import { createContext } from "react";
/**
 * Create initial empty context
 */
const AppContext = createContext({});
const AppContextProvider = ({ children }) => {
    return _jsx(AppContext.Provider, Object.assign({ value: {} }, { children: children }));
};
export default AppContextProvider;
export { AppContext };
