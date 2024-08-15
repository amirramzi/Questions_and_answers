import PropTypes from "prop-types";
import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import MyPaginate from "./MyPaginate";

const MyTable = ({
  rows,
  columns,
  onDelete,
  onEdit,
  onSee,
  onPageChangeHandler,
  pageCount,
  page,
}) => {
  return (
    <div className="overflow-x-auto rounded-xl overflow-hidden border border-purple-950">
      <table
        id="table-to-xls"
        className="min-w-full divide-y divide-purple-950 table-fixed rounded-t-xl overflow-hidden"
      >
        <thead className="text-center bg-gray-700">
          <tr>
            {rows.map((row) => (
              <th
                key={row.id}
                className="py-3 px-6 text-md font-medium tracking-wider text-center uppercase text-gray-400"
              >
                {row.name}
              </th>
            ))}
            {onSee && (
              <th className="py-3 text-xs font-medium tracking-wider text-center uppercase text-gray-400">
                مشاهده
              </th>
            )}
            {onEdit && (
              <th className="py-3 text-xs font-medium tracking-wider text-center uppercase text-gray-400">
                ویرایش
              </th>
            )}
            {onDelete && (
              <th className="py-3 text-xs font-medium tracking-wider text-center uppercase text-gray-400">
                حذف
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-950 text-center">
          {columns.map((row, rowIndex) => {
            const { id, answers, ...rowData } = row;
            answers;
            id;
            return (
              <tr className="bg-gray-800" key={rowIndex}>
                {Object.values(rowData).map((value, i) => (
                  <td
                    key={i}
                    className="py-4 px-6 text-sm font-medium whitespace-nowrap text-white"
                  >
                    {value}
                  </td>
                ))}
                {onSee && (
                  <td className="py-4 text-sm font-medium text-center whitespace-nowrap">
                    <button
                      className="px-2 py-1 rounded-md hover:underline bg-gray-700 hover:bg-gray-500 text-blue-300 hover:text-blue-600"
                      onClick={() => onSee(row)}
                    >
                      <EyeIcon className="h-6 w-6" />
                    </button>
                  </td>
                )}
                {onEdit && (
                  <td className="py-4 text-sm font-medium text-center whitespace-nowrap">
                    <button
                      className="px-2 py-1 rounded-md hover:underline bg-gray-700 hover:bg-gray-500 text-lime-300 hover:text-lime-600"
                      onClick={() => onEdit(row)} 
                    >
                      <PencilSquareIcon className="h-6 w-6" />
                    </button>
                  </td>
                )}
                {onDelete && (
                  <td className="py-4 text-sm font-medium text-center whitespace-nowrap">
                    <button
                      className="px-2 py-1 rounded-md hover:underline bg-gray-700 hover:bg-gray-500 text-red-400 hover:text-red-600"
                      onClick={() => onDelete(row)} 
                    >
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="bg-gray-700 py-2 flex justify-center">
        <MyPaginate
          onPageChangeHandler={onPageChangeHandler}
          pageCount={pageCount}
          page={page}
        />
      </div>
    </div>
  );
};

MyTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onSee: PropTypes.func, 
  page: PropTypes.number,
  pageCount: PropTypes.number,
  onPageChangeHandler: PropTypes.func,
};

export default MyTable;
