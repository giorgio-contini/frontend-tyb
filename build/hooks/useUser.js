import { useContext } from "react";
import { AuthContext } from "../AuthContext";
export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    const addUser = (user) => {
        setUser(user);
    };
    const removeUser = () => {
        setUser(undefined);
        sessionStorage.clear();
    };
    return { user, addUser, removeUser };
};
