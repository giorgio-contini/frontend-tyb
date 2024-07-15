import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Locals
 */
import "./PageSubtitle.scss";
/**
 * PageSubtitle component
 *
 * @param {string} subtitle the subtitle of the page
 * @param classCustom
 * @returns {JSX.Element}
 */
const PageSubtitle = ({ subtitle = "Page Subtitle", classCustom }) => (_jsx("div", Object.assign({ className: "PageSubtitle " + (classCustom ? classCustom : "") }, { children: _jsx("p", { children: subtitle }) })));
export default PageSubtitle;
