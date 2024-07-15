import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import * as XLSX from 'xlsx';
import FileUploaderComponent from "../FileUploaderComponent/FileUploaderComponent";
const ExcelReader = ({ manageDataFunction, formik }) => {
    const handleFileUpload = (file) => {
        //const file = e.target.files?.[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            var _a;
            const data = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            if (!data) {
                return;
            }
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            // Converti il foglio di lavoro in un array di oggetti
            const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }).slice(1).map((row) => {
                return {
                    description: row[0],
                    answer: row[1],
                    isCorrect: row[2] === "Si"
                };
            });
            const getObjectForQuiz = excelData.reduce((acc, oggetto) => {
                const { description, answer, isCorrect } = oggetto;
                if (!acc[description]) {
                    //@ts-ignore
                    acc[description] = { description, answers: [] };
                }
                acc[description].answers.push({ description: answer, isCorrect: isCorrect });
                return acc;
            }, {});
            const risultato = Object.values(getObjectForQuiz);
            //  Gestiamo i dati dell'Excel
            manageDataFunction(risultato);
        };
        reader.readAsBinaryString(file);
    };
    useEffect(() => {
        handleFileUpload(formik.values.file);
    }, [formik.values.file]);
    return (_jsx("div", Object.assign({ className: "text-center" }, { children: _jsx(FileUploaderComponent, { acceptFile: ".xlsx, .xls", labelButton: "Carica Excel", disabled: !formik.values.topic, isRequired: true, name: "file", formik: formik }) })));
};
export default ExcelReader;
