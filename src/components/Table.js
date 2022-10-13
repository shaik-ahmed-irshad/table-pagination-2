import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import "./table.css";

const Table = () => {
  const COLUMNS = [
    {
      Header: "AlbumId",
      accessor: "albumId",
    },
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Image",
      accessor: "url",
      Cell: (tableProps) => (
        <img src={tableProps.row.original.url} width={60} alt="Img" />
      ),
    },
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Thumbnail",
      accessor: "thumbnailUrl",
      Cell: (tableProps) => (
        <img src={tableProps.row.original.thumbnailUrl} width={30} alt="Img" />
      ),
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
    canNextPage,
    canPreviousPage,
    pageOptions,
    
    setPageSize,
    state
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  const { pageIndex, pageSize } = state
  return (
    <>
      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<<'}
            </button>
            <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of { pageOptions.length}
                </strong>{' '}
                <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {
                        [10, 50, 100].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))
                    }
                </select>
            </span>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>>'}
            </button>
      </div>
      <br></br>
      
    </>
  );
};

export default Table;
