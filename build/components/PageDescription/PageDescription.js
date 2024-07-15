import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Locals
 */
import "./PageDescription.scss";
/**
 * PageDescription component
 *
 * @param {string} description the description of the page
 * @param {string} className the className of the component
 * @returns {JSX.Element}
 */
const PageDescription = ({ description = "Page Description", className }) => {
    const _className = ["PageDescription"];
    if (typeof className !== "undefined") {
        const temp = className.split(" ");
        _className.push(...temp);
    }
    return (_jsx("div", Object.assign({ className: _className.join(" ") }, { children: _jsx("p", { children: description }) })));
};
export default PageDescription;
