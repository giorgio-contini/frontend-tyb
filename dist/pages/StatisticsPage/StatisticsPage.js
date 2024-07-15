import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from "react-router-dom";
/**
 * Locals
 */
import "./StatisticsPage.scss";
import { AuthContext } from "../../AuthContext";
import ReactTable from "../../components/ReactTable/ReactTable";
import QuizClient from "../../services/API/openapicode_tyb_user/QuizClient";
import { showDialogFailed } from "../../utils/DialogUtils";
import ExportXLSXButton from "../../components/ExcelButton/ExportXLSXButton";
import PageTitle from "../../components/PageTitle/PageTitle";
import PlotComponent from "../../components/PlotComponent/PlotComponent";
import PageDescription from "../../components/PageDescription/PageDescription";
import ToggleButtonComponent from "../../components/ToggleComponent/ToggleButtonComponent";
const StatisticsPage = () => {
    const { user, isInRole } = useContext(AuthContext);
    const { state: location } = useLocation();
    const { topic } = location || {};
    const [tableData, setTableData] = useState([]);
    const getTableDate = (userId) => {
        QuizClient.getQuizResultsByUserId(userId).then((res) => {
            setTableData(res.data.result || []);
        }).catch((error) => {
            var _a;
            showDialogFailed((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data.error);
        });
    };
    useEffect(() => {
        if (isInRole("P") || isInRole("A")) {
            //recupero i dati di tutti gli utenti
            getTableDate("all");
        }
        else {
            //recupero i dati dello studente loggato
            getTableDate(user === null || user === void 0 ? void 0 : user.username);
        }
    }, [user]);
    const getColumns = useMemo(() => {
        return [{
                Header: "Id utente",
                accessor: "userId"
            }, {
                Header: "Argomento",
                accessor: "topic"
            }, {
                Header: "Punteggio",
                accessor: "totalScore"
            }, {
                Header: "Data completamento",
                accessor: "date"
            }];
    }, []);
    const [showCart, setShowChart] = useState(true);
    return _jsxs("div", { children: [_jsx(PageTitle, { title: "Le tue statistiche" }), _jsx(PageDescription, { description: "Di seguito i risultati raggiunti distinti per argomento e data" }), _jsxs("div", { className: "container p-4", children: [_jsxs("div", { className: "d-flex row justify-content-between mt-3 mb-4", style: { alignItems: "center" }, children: [_jsx("div", { className: "col-lg-9 col-sm-12", children: _jsx(ToggleButtonComponent, { flag: showCart, setFlag: setShowChart, option2: "Tabella", option1: "Grafici" }) }), _jsx("div", { className: "col-lg-3 col-sm-12 mb-2", children: _jsx(ExportXLSXButton, { columns: getColumns, data: tableData, fileName: "Statistiche", customStyle: "d-flex me-0 ms-auto" }) })] }), showCart ? _jsx("div", { className: "border rounded shadow", children: _jsx(PlotComponent, { label: "Math", data: tableData.map((el) => {
                                return { label: el.topic, value: el.totalScore, labelAX: el.date || "test" };
                            }), plotType: "line" }) }) : _jsx("div", { children: _jsx(ReactTable, { columns: getColumns, data: tableData, hasPagination: true, initialState: { pageSize: 10, pageIndex: 0 }, border: true, hasSorting: true }) })] })] });
};
export default StatisticsPage;
