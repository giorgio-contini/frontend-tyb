import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Libs
 */
import { Link } from "react-router-dom";
/**
 * Locals
 */
import "./NavLink.scss";
/**
 * Navigation link item
 *
 * @param label label for the item
 * @param href route for the item
 * @returns JSX
 */
const NavLink = ({ label, href }) => {
    return (_jsx("li", { className: "NavLink user-select-none", children: _jsx(Link, { to: href, children: label }) }));
};
export default NavLink;
