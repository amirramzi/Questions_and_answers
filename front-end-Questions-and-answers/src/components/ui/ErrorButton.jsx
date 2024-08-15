import PropTypes from "prop-types";
import { Button } from "@headlessui/react";

const ErrorButton = ({ children, btnIcon, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="rounded border-2 border-red-600 bg-red-950 py-2 px-4 text-sm text-white data-[hover]:bg-red-700 data-[hover]:data-[active]:bg-red-800  inline-flex "
    >
      {btnIcon}
      {children}
    </Button>
  );
};

ErrorButton.propTypes = {
  children: PropTypes.any,
  btnIcon: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

export default ErrorButton;
