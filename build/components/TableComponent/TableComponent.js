import { jsx as _jsx } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import DataTable from 'react-data-table-component';
//column{
// name,
// accessor,
// cell}
const TableComponent = ({ columns, data }) => {
    const params = useParams();
    return (_jsx("div", Object.assign({ className: "TableComponent" }, { children: _jsx(DataTable, { columns: columns, data: data, className: "table-responsive", defaultSortAsc: true }) })));
};
export default TableComponent;
