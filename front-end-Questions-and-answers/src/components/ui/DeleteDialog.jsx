import PropTypes from "prop-types";
import ErrorButton from "./ErrorButton";
import MyButton from "./MyButton";
import MyDialog from "./MyDialog";

const DeleteDialog = ({ open, close, deleteHandler }) => {
  return (
    <MyDialog open={open} close={close} title="پاک کردن" btn={false}>
      <div className="py-5">
        <h2 className="text-gray-200 ">از پاک کردن اطمینان دارید؟</h2>
        <div className="flex justify-end gap-4 pt-10">
          <MyButton onClick={close}>لغو</MyButton>
          <ErrorButton onClick={deleteHandler}>بله، پاک کن</ErrorButton>
        </div>
      </div>
    </MyDialog>
  );
};

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
};

export default DeleteDialog;
