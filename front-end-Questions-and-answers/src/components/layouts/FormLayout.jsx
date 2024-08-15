import PropTypes from "prop-types";
import IconPlayer from "../IconPlayer";
import MyButton from "../ui/MyButton";

const FormLayout = ({
  children,
  submitHandler,
  btnText,
  btnIcon,
  headerIcon,
  description,
  dir,
}) => {
  return (
    <div dir={dir}>
      <div className="w-full max-w-md px-6">
        <div className="flex justify-center">
          {headerIcon && <IconPlayer icon={headerIcon} />}
        </div>

        <div className="text-sm text-white/50 py-5">{description}</div>

        {children}
      </div>
      <div className="w-full max-w-md px-6 flex justify-end mt-10">
        <MyButton onClick={submitHandler} btnIcon={btnIcon}>
          {btnText}
        </MyButton>
      </div>
    </div>
  );
};
FormLayout.propTypes = {
  children: PropTypes.node.isRequired,
  submitHandler: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired,
  btnIcon: PropTypes.node,
  headerIcon: PropTypes.object,
  description: PropTypes.string,
  dir: PropTypes.string,
};
export default FormLayout;
