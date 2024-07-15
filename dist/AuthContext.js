import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState } from "react";
/**
 * Create initial empty context
 */
const AuthContext = createContext(null);
/**
 * Main app context
 *
 * @param {*} props
 * @returns
 */
const AuthContextProvider = ({ children }) => {
    //const { getItem, removeItem} = useLocalStorage();
    const [userState, setUserState] = useState(undefined);
    const isInRole = (role) => {
        if (userState) {
            return userState.role === role;
        }
    };
    return (_jsx(AuthContext.Provider, { value: {
            user: userState, setUser: setUserState, isInRole: isInRole
        }, children: children }));
};
export default AuthContextProvider;
export { AuthContext };
