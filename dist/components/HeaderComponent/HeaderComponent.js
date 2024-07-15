import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from 'react';
import { useHeaderRoutes } from "../../root/routes";
import "./HeaderComponent.scss";
import NavDropdown from "../NavDropdown/NavDropdown";
import NavLink from "../NavLink/NavLink";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
const HeaderComponent = ({}) => {
    const [headerRoutesArr] = useHeaderRoutes();
    const { user, isInRole, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    function logout() {
        return () => {
            setUser(undefined);
            sessionStorage.clear();
            navigate("/", { replace: true });
        };
    }
    return _jsxs("div", { className: "HeaderComponent", children: [_jsx("div", { className: "primary-header d-flex flex-row align-items-center", children: _jsx("div", { className: "container ", children: _jsxs("div", { className: "d-flex flex-row align-items-center ", children: [_jsx("span", { className: "me-auto", children: "TrainYourBrain" }), _jsx("div", { children: user ? _jsxs(_Fragment, { children: [_jsxs("button", { className: "btn btn-primary", onClick: () => {
                                                navigate("/profile");
                                            }, children: [_jsx("i", { className: "bi bi-person-circle" }), _jsx("span", { className: "ms-2 hide-on-sm", children: user.username })] }), _jsxs("button", { className: "btn btn-danger ms-2", onClick: logout(), children: [_jsx("i", { className: "bi bi-box-arrow-right" }), _jsx("span", { className: "ms-2 hide-on-sm", children: "Logout" })] })] }) : _jsxs("button", { className: "btn btn-primary", onClick: () => {
                                        navigate("/login", { replace: true });
                                    }, children: [_jsx("i", { className: "bi bi-box-arrow-in-left" }), _jsx("span", { className: "ms-2 hide-on-sm", children: "Login" })] }) })] }) }) }), _jsx("div", { className: "nav secondary-header", children: _jsx("div", { className: "container", children: _jsx("ul", { className: "nav-ul", children: headerRoutesArr.map((header, idx) => {
                            if (header.type === "nav-link") {
                                return (_jsx(NavLink, { label: header.label, href: header.path }, idx));
                            }
                            else if (header.type === "nav-dropdown") {
                                return (_jsx(NavDropdown, { label: header.label, routesArr: header.routesArr }, idx));
                            }
                            else {
                                return (_jsx(Link, { to: header.path, children: header.label }, idx));
                            }
                        }) }) }) })] });
};
export default HeaderComponent;
