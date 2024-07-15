import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
/**
 * Libs
 */
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
/**
 * Route to a page, guarded from the allowed roles
 *
 * @param children routes
 * @param allowedRoles array of allowed roles
 * @returns
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isInRole } = useContext(AuthContext);
    const [isAuthorized] = useState(() => {
        let isAuthorized = false;
        for (let i = 0; i < allowedRoles.length; i++) {
            const allowedRole = allowedRoles[i];
            if (isInRole(allowedRole)) {
                isAuthorized = true;
                break;
            }
        }
        return isAuthorized;
    });
    return (_jsx(_Fragment, { children: isAuthorized ?
            _jsx(_Fragment, { children: children })
            : (_jsx(Navigate, { to: "/", replace: true })) }));
};
export default ProtectedRoute;
