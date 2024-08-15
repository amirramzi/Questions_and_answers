import { useState } from "react";
import PropTypes from "prop-types";
import { Field, Label, Input } from "@headlessui/react";
import clsx from "clsx";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

const MyInput = ({ label, value, onChangeHandler, type }) => {
  const [inputType, setInputType] = useState(type);
  const [showPass, setShowPass] = useState(false);
  const showPassHandler = () => {
    setShowPass(!showPass);
    if (showPass) {
      setInputType("password");
    } else {
      setInputType("text");
    }
  };
  return (
    <div className="w-full max-w-md ">
      <Field className="space-y-4 mb-2">
        <Label className="text-sm/6 font-medium text-white">{label}</Label>
        <div className="relative">
          <Input
            type={inputType}
            value={value}
            onChange={onChangeHandler}
            className={clsx(
              "w-full rounded-lg bg-white/5 py-3 px-6 text-sm/6 text-white",
              "outline-none outline-2 -outline-offset-2 outline-purple-950",
              "[-moz-appearance:textfield]",
              "[&::-webkit-inner-spin-button]:appearance-none",
              "[&::-webkit-outer-spin-button]:appearance-none"
            )}
          />
          {type == "password" ? (
            showPass ? (
              <EyeSlashIcon
                onClick={showPassHandler}
                className="group text-purple-700 absolute top-3 right-3 size-6  cursor-pointer"
                aria-hidden="true"
              />
            ) : (
              <EyeIcon
                onClick={showPassHandler}
                className="group text-purple-600  absolute top-3 right-3 size-6  cursor-pointer"
                aria-hidden="true"
              />
            )
          ) : (
            ""
          )}
        </div>
      </Field>
    </div>
  );
};

MyInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default MyInput;
