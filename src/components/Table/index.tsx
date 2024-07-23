import { usePagination, useTable, useSortBy } from "react-table";

const Table = ({
  columns,
  data = [],
  loading,
  remoteLoading,
  limit,
  forcePage,
  initialState = {},
  tableContainerClass,
  paginate,
  handleCheckAll,
  isChecked,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
      {
        columns,
        data,
        initialState: {
          pageSize: limit ?? 10,
          ...initialState,
        },
        page: forcePage,
      },
      useSortBy,
      usePagination
    );

  return data?.length > 0 ? (
    <div className="relative mt-3">
      <div
        className={`w-full ${
          paginate ? "min-h-[400px]" : "min-h-full"
        } overflow-x-auto ${tableContainerClass || ""}`}
      >
        {loading ? (
          <div className="flex justify-center">Loading...</div>
        ) : (
          <table
            id="tabel"
            className={`w-full ${paginate ? "mb-4" : "mb-3"} rounded-md border`}
            {...getTableProps()}
          >
            <thead className="w-full sticky top-0 bg-[#405565] rounded-md">
              {headerGroups?.map((headerGroup, i) => {
                const { role } = headerGroup.getHeaderGroupProps();
                return (
                  <tr key={i} className="rounded-md" role={role}>
                    {headerGroup.headers.map((column, j) => {
                      const { key, ...headerProps } = column.getHeaderProps(
                        column.getSortByToggleProps()
                      );
                      return (
                        <th
                          key={j}
                          className={`text-left text-sm font-medium ${
                            column?.Header !== "Action" &&
                            column?.Header !== "" &&
                            column?.Header !== "No" &&
                            !column?.minW
                              ? "min-w-[160px] max-w[175px]"
                              : "min-w-[24px]"
                          } ${
                            column.isSorted
                              ? column.isSortedDesc
                                ? "sort-desc"
                                : "sort-asc"
                              : ""
                          } ${
                            column?.sticky
                              ? `${column?.sticky} sticky bg-[#405565]`
                              : ""
                          } ${column?.meta?.className ?? ""} text-center px-4`}
                          {...headerProps}
                        >
                          <span
                            className={`text-white text-lg font-medium my-4 inline-block`}
                          >
                            {column.render("Header")}
                          </span>
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody
              className={remoteLoading ? "pointer-events-none" : ""}
              {...getTableBodyProps()}
            >
              {page.map((row, i) => {
                prepareRow(row);
                const { key, role } = row.getRowProps();
                return (
                  <tr
                    key={i}
                    className="border-b-2 hover:bg-gray-200 sticky left-0"
                    role={role}
                  >
                    {row.cells.map((cell, j) => {
                      const { key, role } = cell.getCellProps();
                      return (
                        <td
                          key={j}
                          className={`${
                            cell?.column?.sticky
                              ? `${cell?.column?.sticky} sticky bg-white`
                              : ""
                          } px-4 py-2 font-medium text-sm text-center border border-gray-300`}
                          role={role}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center flex-col pt-14">
      <div className="text-3xl font-bold mt-4 text-gray-400">
        Data Tidak Ada
      </div>
    </div>
  );
};

export default Table;
