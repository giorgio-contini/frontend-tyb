import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import "./FileUploaderComponent.scss";
/**
 * FileUploaderComponent
 * @param {function} handleFile - the handleFile function to call when the user change the file
 * @param {string} labelButton - the label of the button
 * @param {boolean} disabled - if true disable the button
 * @param acceptFile
 * @param prevFile
 * @param formik
 * @param name
 * @param isRequired
 * @param initFileInput
 * @returns {JSX.Element}
 */
const FileUploaderComponent = ({ handleFile, labelButton, disabled = false, acceptFile = "*", prevFile = undefined, formik, name, isRequired = false, initFileInput }) => {
    const hiddenFileInput = useRef(null);
    const [file, setFile] = useState(prevFile);
    const handleClick = () => {
        hiddenFileInput.current.click();
    };
    const handleFormik = (newFile) => {
        formik === null || formik === void 0 ? void 0 : formik.setFormikState((oldState) => {
            const newState = Object.assign({}, oldState);
            newState.values[name ? name : "file"] = newFile;
            return newState;
        });
        formik === null || formik === void 0 ? void 0 : formik.setFieldError(name ? name : "file", "");
    };
    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        if (typeof handleFile === "undefined" && !formik) {
            return;
        }
        if (formik) {
            handleFormik(fileUploaded);
        }
        else if (handleFile) {
            handleFile(fileUploaded);
        }
        setFile(fileUploaded);
    };
    const delFile = () => {
        if (handleFile) {
            handleFile(undefined);
        }
        else if (formik) {
            handleFormik(undefined);
        }
        setFile(undefined);
    };
    useEffect(() => {
        /**
         * inizializzare il fileInput appena effettuato l'inserimento
         */
        if (initFileInput === null || initFileInput === void 0 ? void 0 : initFileInput.init) {
            delFile();
            initFileInput.setInit(false);
        }
    }, [initFileInput === null || initFileInput === void 0 ? void 0 : initFileInput.init]);
    const getFileElement = (newFile) => {
        return (newFile &&
            _jsxs(_Fragment, { children: [_jsx("div", Object.assign({ className: "col-auto my-auto" }, { children: _jsx("label", { children: newFile.name }) })), _jsx("div", Object.assign({ className: "col-auto my-auto" }, { children: _jsx("i", { className: "bi bi-trash FileUploaderComponent__trash-icon", onClick: () => delFile() }) }))] }));
    };
    return (_jsxs("div", Object.assign({ className: "d-flex flex-row" }, { children: [_jsxs("button", Object.assign({ className: "btn btn-outline-primary d-flex d-inline me-2", onClick: () => handleClick(), disabled: disabled }, { children: [_jsx("i", { className: "bi bi-upload me-2" }), _jsx("span", Object.assign({ className: isRequired ? "FileUploaderComponent__upload-btn_required" : "" }, { children: labelButton }))] })), _jsx("input", { type: "file", ref: hiddenFileInput, accept: acceptFile, onChange: (e) => handleChange(e), className: "d-none", value: "" }), formik ? getFileElement(formik === null || formik === void 0 ? void 0 : formik.values[name ? name : "file"]) : getFileElement(file)] })));
};
export default FileUploaderComponent;
