var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import "./ImageFolderUploader.scss";
const ImageFolderUploader = ({ folderState, setFolderState, disabled, isRequired }) => {
    const handleFileChange = (event) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const files = event.target.files;
        if (files) {
            const imageFiles = [];
            for (const file of Array.from(files)) {
                if (file.type === "image/jpeg" || file.type === "image/png") {
                    const base64 = yield fileToBase64(file);
                    imageFiles.push({
                        fileName: (_a = file.name) === null || _a === void 0 ? void 0 : _a.split(".")[0],
                        base64
                    });
                }
            }
            setFolderState(imageFiles);
        }
    });
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    const delFile = () => {
        setFolderState([]);
    };
    const getFileElement = () => {
        return (_jsxs(_Fragment, { children: [_jsx("div", { className: "col-auto my-auto", children: _jsx("label", { children: `${folderState.length} immagini` }) }), _jsx("div", { className: "col-auto my-auto", children: _jsx("i", { className: "bi bi-trash FileUploaderComponent__trash-icon", onClick: () => delFile() }) })] }));
    };
    const hiddenFileInput = useRef(null);
    const handleClick = () => {
        hiddenFileInput.current.click();
    };
    return (_jsxs("div", { className: "d-flex flex-row", style: { alignItems: "center" }, children: [_jsxs("button", { className: "btn btn-outline-primary d-flex d-inline me-2", onClick: () => handleClick(), disabled: disabled, children: [_jsx("i", { className: "bi bi-upload me-2" }), _jsx("span", { className: isRequired ? "FileUploaderComponent__upload-btn_required" : "", children: "Carica cartella" })] }), _jsx("input", Object.assign({ type: "file", className: "d-none", ref: hiddenFileInput, webkitdirectory: "", mozdirectory: "", directory: "", multiple: true, accept: "image/jpeg, image/png", onChange: handleFileChange }, {})), folderState.length > 0 && getFileElement()] }));
};
export default ImageFolderUploader;
