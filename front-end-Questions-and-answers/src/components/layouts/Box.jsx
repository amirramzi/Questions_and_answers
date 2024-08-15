import PropTypes from "prop-types";

const Box = ({ children }) => {
  return (
    <div className="flex flex-col justify-center  h-screen px-6">
      <div className="mx-auto w-full max-w-md  shadow-2xl rounded-2xl ring-1 ring-purple-950 pt-14 pb-8 px-8">
        {children}
      </div>
    </div>
  );
};
Box.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Box;
