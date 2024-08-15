import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
const MyPaginate = ({
  pageRangeDisplayed = 3,
  marginPagesDisplayed = 2,
  pageCount = 0,
  page = 0,
  onPageChangeHandler,
}) => {
  return pageCount > 1 ? (
    <ReactPaginate
      className="relative  z-0 inline-flex rounded-md shadow-sm -space-x-px"
      breakLabel="..."
      breakClassName="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-sm font-medium text-gray-700"
      nextLabel="بعدی"
      nextClassName="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-600"
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      activeClassName="z-10 bg-purple-950 border-purple-400 text-purple-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
      onPageChange={onPageChangeHandler}
      forcePage={page - 1}
      pageCount={pageCount}
      pageClassName="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
      previousLabel="قبلی"
      previousClassName="relative inline-flex items-center text-sm px-3 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-600"
      renderOnZeroPageCount={undefined}
    />
  ) : null;
};

MyPaginate.propTypes = {
  pageRangeDisplayed: PropTypes.number,
  marginPagesDisplayed: PropTypes.number,
  pageCount: PropTypes.number,
  page: PropTypes.number,
  onPageChangeHandler: PropTypes.func,
};

export default MyPaginate;
