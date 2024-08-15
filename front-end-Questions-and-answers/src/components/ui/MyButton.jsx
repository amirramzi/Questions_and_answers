import PropTypes from "prop-types";
import { Button } from "@headlessui/react";

const MyButton = ({ children, btnIcon, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="rounded border-2 border-purple-600 bg-purple-950 py-2 px-4 text-sm text-white data-[hover]:bg-purple-700 data-[hover]:data-[active]:bg-purple-800  inline-flex "
    >
      {children}
      {btnIcon}
    </Button>
  );
};

MyButton.propTypes = {
  children: PropTypes.any,
  btnIcon: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

export default MyButton;
