var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
/**
 * Locals
 */
import "./AddQuizPage.scss";
import ExportXLSXButton from "../../components/ExcelButton/ExportXLSXButton";
import ExcelReader from "../../components/ExcelButton/ExcelReader";
import QuizClient from "../../services/API/openapicode_tyb_user/QuizClient";
import { showDialogFailed, showDialogSuccess } from "../../utils/DialogUtils";
import PageTitle from "../../components/PageTitle/PageTitle";
import NotificationComponent from "../../components/NotificationComponent/NotificationComponent";
import InputTextComponent from "../../components/form-fields/InputTextComponent/InputTextComponent";
import { useFormik } from "formik";
import * as Yup from "yup";
import FileUploaderComponent from "../../components/FileUploaderComponent/FileUploaderComponent";
import ImageFolderUploader from "../../components/ImageFolderUploader/ImageFolderUploader";
import ToggleButtonComponent from "../../components/ToggleComponent/ToggleButtonComponent";
const AddQuizPage = () => {
    const [dataToSave, setDataToSave] = useState([]);
    const [foldertoJson, setFolderToJson] = useState([]);
    const [quizTestuale, setQuizTestuale] = useState(true);
    const [fileImage, setFileImage] = useState(undefined);
    const templateColumns = [{
            Header: "Domanda",
            accessor: "domanda"
        }, {
            Header: "Risposta",
            accessor: "risposta"
        }, {
            Header: "Corretta(Si/No)",
            accessor: "corretta"
        }];
    const initialFormState = {
        topic: "",
        topicDescription: "",
        file: undefined
    };
    const validationSchema = Yup.object().shape({
        topic: Yup.string().required('Campo obbligatorio'),
        topicDescription: Yup.string().required('Campo obbligatorio')
    });
    const createQuiz = (data) => {
        QuizClient.createQuizUsingPost(Object.assign(Object.assign({ questions: data }, formik.values), { imagesQuiz: !quizTestuale, imageFile: fileImage })).then((response) => {
            showDialogSuccess("", response.data.descrizione, () => {
                formik.resetForm(Object.assign(Object.assign({}, formik), { values: initialFormState, errors: {} }));
            });
        }).catch((error) => {
            var _a;
            showDialogFailed((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data.error);
        });
    };
    const formik = useFormik({
        initialValues: initialFormState, validationSchema: validationSchema, onSubmit: () => {
            createQuiz(quizTestuale ? dataToSave : transformData(foldertoJson));
        }
    });
    function transformData(folderToJson) {
        // Helper function to get random indices for incorrect answers
        return folderToJson.map((item, index, array) => {
            const fileNames = folderToJson.map(item => item.fileName);
            const filtered = fileNames.filter(filename => filename !== item.fileName);
            const shuffledFileNames = filtered.sort(() => Math.random() - 0.5);
            // Build answers array
            const answers = [
                {
                    description: item.fileName,
                    isCorrect: true
                },
                ...shuffledFileNames.slice(0, 3).map(desc => ({
                    description: desc,
                    isCorrect: false
                }))
            ];
            // Shuffle answers to randomize the position of the correct answer
            answers.sort(() => Math.random() - 0.5);
            return {
                description: item.base64,
                answers
            };
        });
    }
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    useEffect(() => {
        if (quizTestuale) {
            setFolderToJson([]);
        }
        else {
            formik === null || formik === void 0 ? void 0 : formik.setFormikState((oldState) => {
                const newState = Object.assign({}, oldState);
                newState.values["file"] = undefined;
                return newState;
            });
        }
    }, [quizTestuale]);
    return _jsxs("div", { className: "mb-5", children: [_jsx(PageTitle, { title: "Aggiungi un quiz" }), _jsxs("div", { className: "container", children: [_jsx(NotificationComponent, { className: "mt-3", type: "info", messages: "In questa pagina potrai inserire un quiz" +
                            " seguendo gli step" +
                            " sotto.", children: _jsxs("ul", { children: [_jsx("li", { children: "Scegli la tipologia di quiz che vuoi inserire, le opzioni sono \"Quiz testuale\" oppure" +
                                        " \"Quiz ad immagini\"" }), _jsx("li", { children: "Specifica l'argomento e una descrizione breve" }), quizTestuale ?
                                    _jsx("li", { children: "Scarica il template, compilalo e poi caricalo utilizzando l'apposito tasto" }) :
                                    _jsx("li", { children: "Seleziona la cartella da cui caricare le immagini" })] }) }), _jsxs("div", { className: "row", style: { alignItems: "center" }, children: [_jsx("div", { className: "col-12 mb-3", children: _jsx(ToggleButtonComponent, { flag: quizTestuale, setFlag: setQuizTestuale, option1: "Testuale", option2: "Immagini" }) }), _jsx("div", { className: "col-lg-6 col-sm-12 ", children: _jsx(InputTextComponent, { label: "Argomento", formik: formik, name: "topic", isRequired: true }) }), _jsx("div", { className: "col-lg-6 col-sm-12 ", children: _jsx(InputTextComponent, { label: "Descrizione", formik: formik, name: "topicDescription", isRequired: true }) }), quizTestuale ? _jsxs(_Fragment, { children: [_jsx("div", { className: "col-lg-2 col-sm-12 mt-2", children: _jsx(ExportXLSXButton, { disabled: !formik.values.topic, columns: templateColumns, data: [{}], fileName: "Quiz_" + formik.values.topic, title: "Scarica Template" }) }), _jsx("div", { className: "col-lg-4 col-sm-12 mt-2", children: _jsx(ExcelReader, { manageDataFunction: (risultato) => {
                                                setDataToSave(risultato);
                                            }, formik: formik }) })] }) : _jsx(_Fragment, { children: _jsx("div", { className: "col-lg-6 col-sm-12 mt-2", children: _jsx(ImageFolderUploader, { folderState: foldertoJson, isRequired: true, disabled: false, setFolderState: setFolderToJson }) }) }), _jsx("div", { className: "col-lg-4 col-sm-12 mt-2", children: _jsx(FileUploaderComponent, { labelButton: "Carica una copertina", disabled: !formik.values.topic, name: "imageFile", handleFile: (file) => __awaiter(void 0, void 0, void 0, function* () {
                                        const base64 = yield fileToBase64(file);
                                        setFileImage(base64);
                                    }) }) })] }), _jsx("div", { className: "row mt-5 d-flex ms-auto me-auto", children: _jsx("button", { className: "btn btn-primary mt-4", type: "submit", onClick: () => formik.handleSubmit(), title: "Salva", disabled: !(formik.values.topic !== ""
                                && formik.values.topicDescription !== ""
                                && (formik.values.file !== undefined || foldertoJson.length > 0)), children: "Salva" }) })] })] });
};
export default AddQuizPage;
