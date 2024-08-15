import PropTypes from "prop-types";

const Bg = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <div className="fixed inset-x-0 top-0 h-32 bg-gradient-to-b from-purple-500 to-transparent blur-2xl opacity-20 pointer-events-none"></div>
      {children}
      <div className="fixed inset-x-0 bottom-0 h-32 bg-gradient-to-t from-purple-500 to-transparent blur-2xl opacity-20 pointer-events-none"></div>
    </div>
  );
};
Bg.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Bg;
