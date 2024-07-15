import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Libs
 */
import { useContext } from "react";
import { useTable, usePagination, useSortBy } from 'react-table';
/**
 * Locals
 */
import "./ReactTable.scss";
import { AppContext } from "../../AppContext";
function manageSortingArrows(column) {
    if (column.isSorted) {
        if (column.isSortedDesc) {
            return _jsx("i", { className: "bi bi-arrow-down arrowCustom" });
        }
        else {
            return _jsx("i", { className: "bi bi-arrow-up arrowCustom" });
        }
    }
    else {
        return _jsx("i", { className: "bi bi-arrow-down-up arrowCustom" });
    }
}
function getHeaderRow(headerGroup, props) {
    return _jsx("tr", Object.assign({}, headerGroup.getHeaderGroupProps(), { children: headerGroup.headers.map((column) => props.hasSorting === true ? (_jsx("th", Object.assign({ className: `${props.border
                ? "ReactTable__border"
                : ""}` }, column.getHeaderProps(column.getSortByToggleProps()), { children: _jsxs("div", { className: "TableClassic__thead_th-flex", children: [(column === null || column === void 0 ? void 0 : column.Header) ? column.render("Header") : "", column.Header &&
                        !column.disableSortBy ? (_jsx(_Fragment, { children: _jsx("span", { children: manageSortingArrows(column) }) })) : null] }) }))) : (_jsx("th", Object.assign({ className: `${props.border
                ? "ReactTable__border"
                : ""}` }, column.getHeaderProps(), { children: column.render("Header") })))) }));
}
function manageHooks(props) {
    const outputHooks = [];
    if (props.hasSorting === true) {
        outputHooks.push(useSortBy);
    }
    if (props.hasPagination === true) {
        outputHooks.push(usePagination);
    }
    if (props.tableHooks !== undefined) {
        outputHooks.push(props.tableHooks);
    }
    return outputHooks;
}
function getOptions(props) {
    const outputOptions = {
        columns: props.columns,
        data: props.data
    };
    if (props.initialState) {
        outputOptions.initialState = props.initialState;
    }
    return outputOptions;
}
function getTd(props, cell) {
    return (_jsx("td", Object.assign({ className: `${props.border
            ? "ReactTable__border p-1"
            : "p-1"}` }, cell.getCellProps(), { children: cell.render("Cell") })));
}
function getPageComponent(canPreviousPage, previousPage, pageIndex, canNextPage, nextPage) {
    return _jsxs(_Fragment, { children: [canPreviousPage ? (_jsx("button", { onClick: () => previousPage(), children: pageIndex })) : null, _jsx("button", { className: "ReactTable__pagination-PageIndices-CurrentIndex", children: pageIndex + 1 }), canNextPage ? (_jsx("button", { onClick: () => nextPage(), children: pageIndex + 2 })) : null] });
}
/**
 * @description A reusable component abstraction of a core react-table table instance.
 * The passed columns and data should be memoized values with the useMemo hook.
 *
 * @param {props} props the props of the component
 * @param {Column[]} props.columns MEMOIZED columns of the table
 * @param {any} props.data MEMOIZED data of the table
 * @param {boolean} props.hasSorting whether the table has sorting
 * @param {boolean} props.hasPagination whether the table has pagination
 * @param {Partial<TableState> | undefined} props.initialState the initial state of the table
 * @param {PluginHook<{}> | ((hooks: any) => void)} props.tableHooks the table hooks
 * @returns {JSX.Element}  the react-table component
 */
const ReactTable = (props) => {
    var _a;
    const { appText } = useContext(AppContext);
    /**
     * Add props table hooks to hook array and prepare for useTable hook parameter
     *
     * @returns table hooks array
     */
    const getPresentTableHooks = () => {
        return manageHooks(props);
    };
    /**
     * Prepare props table options for useTable hook parameter
     *
     * @returns table options
     */
    const getTableOptions = () => {
        return getOptions(props);
    };
    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page, rows, canPreviousPage, canNextPage, nextPage, previousPage, setPageSize, state: { pageIndex, pageSize }, columns } = useTable(Object.assign({}, getTableOptions()), ...getPresentTableHooks());
    const getRowOrPageMappable = () => {
        return props.hasPagination ? page : rows;
    };
    return (_jsxs("div", { className: "ReactTable__wrapper", children: [_jsx("div", { className: "ReactTable__tableWrapper", children: _jsxs("table", Object.assign({ className: "ReactTable__table" }, getTableProps(), { children: [_jsx("thead", { children: headerGroups.map((headerGroup) => getHeaderRow(headerGroup, props)) }), _jsx("tbody", Object.assign({}, getTableBodyProps(), { children: (props.data === undefined ||
                                JSON.stringify(props.data) === "[]") &&
                                props.displaysMissingDataError !== false ? (_jsx("tr", { children: _jsx("td", { colSpan: columns === null || columns === void 0 ? void 0 : columns.length, style: { fontWeight: "normal" }, children: "Non ci sono dati da mostrare" }) })) : (getRowOrPageMappable().map((row, i) => {
                                prepareRow(row);
                                return (_jsx("tr", Object.assign({}, row.getRowProps(), { children: row.cells.map((cell) => {
                                        return getTd(props, cell);
                                    }) })));
                            })) }))] })) }), props.hasPagination && ((_a = props.data) === null || _a === void 0 ? void 0 : _a.length) > 1 ? (_jsx("div", { className: "ReactTable__pagination", children: _jsxs("div", { className: "d-flex flex-row w-100 mt-2", children: [_jsx("div", { className: "bootstrap-select-wrapper  justify-content-start mt-2 col-4" }), _jsx("div", { className: "d-flex justify-content-center col-4", children: _jsxs("div", { className: "ReactTable__pagination-wrapper", children: [_jsx("button", { className: "bi bi-chevron-left", onClick: () => previousPage(), disabled: !canPreviousPage }), _jsx("div", { className: "ReactTable__pagination-PageIndices", children: getPageComponent(canPreviousPage, previousPage, pageIndex, canNextPage, nextPage) }), _jsx("button", { className: "bi bi-chevron-right", onClick: () => nextPage(), disabled: !canNextPage })] }) })] }) })) : null] }));
};
export default ReactTable;
