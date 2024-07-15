var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Libs
 */
// @ts-ignore
import XLSX from "sheetjs-style";
// @ts-ignore
import * as FileSaver from "file-saver";
import { useEffect, useState } from "react";
/**
 * Button to export props react-table data to excel table file
 *
 * @param columns react-table columns array
 * @param data data objects array
 * @param fileName filename for the exported file
 * @param config configs array
 * @param customStyle styles css string
 * @param disabled
 * @returns JSX
 */
const ExportXLSXButton = ({ columns, data, fileName, config, customStyle, disabled, title }) => {
    /**
     * Constant for filetype
     */
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    /**
     * Constant for file extension
     */
    const fileExtension = ".xlsx";
    const [dataToPrint, setDataToPrint] = useState([]);
    const regexDate = new RegExp("([0-9]+(-[0-9]+)+)");
    /**
     *
     * @param columnsFiltered
     * @param accessor
     * @param newSingleData
     * @param d
     */
    function manageSimpleAccessor(columnsFiltered, accessor, newSingleData, d) {
        var _a;
        const column = columnsFiltered.find((c) => c.accessor === accessor);
        if (column) {
            newSingleData[column.Header] =
                regexDate.test(d[accessor])
                    ? d[accessor].substring(0, 10)
                    : (_a = d[accessor]) === null || _a === void 0 ? void 0 : _a.toString();
        }
    }
    /**
     *
     * @param accessor
     * @param d
     * @param columnsFiltered
     * @param newSingleData
     */
    function manageComplexAccessor(accessor, d, columnsFiltered, newSingleData) {
        const accessorElementArray = accessor.split(".");
        let accessorElement = d;
        accessorElementArray.forEach((el) => {
            accessorElement = accessorElement[el];
        });
        const column = columnsFiltered.find((c) => c.accessor === accessor);
        if (column) {
            newSingleData[column.Header] =
                regexDate.test(accessorElement)
                    ? accessorElement.substring(0, 10)
                    : accessorElement === null || accessorElement === void 0 ? void 0 : accessorElement.toString();
        }
    }
    /**
     * ###########FOR PRINTING ONLY FIELDS IN TABLE VIEW ###########################
     */
    const filterDataForPrintNoConfig = () => {
        const accessors = [];
        columns.forEach((column) => {
            if (column.accessor && column.Header) {
                accessors.push(column.accessor.toString());
            }
        });
        const columnsFiltered = columns.filter((column) => column.accessor && column.Header);
        const newData = data.map((d) => {
            const newSingleData = {};
            accessors.forEach((accessor) => {
                if (accessor.includes(".")) {
                    manageComplexAccessor(accessor, d, columnsFiltered, newSingleData);
                }
                else {
                    manageSimpleAccessor(columnsFiltered, accessor, newSingleData, d);
                }
            });
            return newSingleData;
        });
        setDataToPrint(newData);
    };
    /**
     * Filter data for print
     */
    const filterDataForPrint = () => {
        if (config) {
            const newData = data.map((row) => {
                const newSingleData = {};
                config.forEach((el) => {
                    newSingleData[el.header] =
                        el.getFieldValue(row);
                });
                return newSingleData;
            });
            setDataToPrint(newData);
        }
    };
    /**
     * Filter data on data update condtionally to config
     */
    useEffect(() => {
        if (config) {
            filterDataForPrint();
        }
        else {
            filterDataForPrintNoConfig();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    /**
     * Generate .xlsx
     */
    const exportToExcel = () => __awaiter(void 0, void 0, void 0, function* () {
        const wscols = [];
        Object.keys(dataToPrint[0]).forEach((el) => {
            wscols.push({ wch: 20 });
        });
        const ws = XLSX.utils.json_to_sheet(dataToPrint);
        Object.keys(ws).forEach((cell) => {
            if (cell !== "!ref") {
                ws[cell].s = {
                    alignment: {
                        vertical: "center",
                        horizontal: "center"
                    }
                };
                if (new RegExp("^[A-Z]1$").test(cell)) {
                    ws[cell].s = Object.assign(Object.assign({}, ws[cell].s), { font: {
                            bold: true
                        } });
                }
            }
        });
        ws["!cols"] = wscols;
        const wb = {};
        wb.Sheets = {};
        wb.Sheets[fileName] = ws;
        wb.SheetNames = [fileName];
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(blob, fileName + fileExtension);
    });
    return (_jsx("div", { className: "", children: _jsxs("button", { className: customStyle
                ? customStyle + " btn btn-secondary me-auto"
                : "btn btn-secondary me-auto", onClick: (e) => !disabled && exportToExcel(), disabled: disabled, children: [_jsx("i", { className: "bi bi-filetype-xlsx me-2" }), title ? title : "Esporta Excel"] }) }));
};
export default ExportXLSXButton;
