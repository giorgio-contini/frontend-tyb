import { useContext } from "react";

import { useLocalStorage } from "./useLocalStorage";
import {TUser} from "../types/types";
import {AuthContext} from "../AuthContext";
import {useNavigate} from "react-router-dom";


export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);

    const navigate= useNavigate()
    const addUser = (user: TUser) => {
        setUser(user);
    };

    const removeUser = () => {
        setUser(undefined);
        sessionStorage.clear();
        navigate("/tyb")
    };

    return { user, addUser, removeUser };
};
