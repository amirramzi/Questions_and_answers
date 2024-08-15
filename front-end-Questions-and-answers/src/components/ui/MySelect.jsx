import PropTypes from "prop-types";
import { Field, Label, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

const MySelect = ({ value, onChangeHandler }) => {
  return (
    <div className="w-full max-w-md ">
      <Field className="space-y-4 mb-2">
        <Label className="text-sm/6 font-medium text-white">جنسیت</Label>

        <div className="relative">
          <Select
            value={value}
            onChange={onChangeHandler}
            className={clsx(
              "mt-3 block w-full appearance-none rounded-lg  bg-white/5 py-3 px-6 text-sm/6 text-white",
              "outline-none outline-2 -outline-offset-2 outline-purple-950",
              "*:text-black"
            )}
          >
            <option></option>
            <option value="خانم">خانم</option>
            <option value="آقا">آقا</option>
          </Select>
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 left-2.5 size-6 fill-white/60"
            aria-hidden="true"
          />
        </div>
      </Field>
    </div>
  );
};

MySelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};
export default MySelect;
