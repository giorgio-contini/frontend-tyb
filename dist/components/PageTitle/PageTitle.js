import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Locals
 */
import "./PageTitle.scss";
/**
 * PageTitle
 *
 * @param {string} title the title of the page
 * @returns {JSX.Element}
 */
const PageTitle = ({ title = "Page Title" }) => (_jsx("div", { className: "PageTitle", children: _jsx("h1", { children: title }) }));
export default PageTitle;
