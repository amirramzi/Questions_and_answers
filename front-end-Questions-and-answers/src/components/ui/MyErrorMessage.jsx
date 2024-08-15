import IconPlayer from "../IconPlayer";

import ICON from "../../assets/wired-outline-1140-error.json";
const MyErrorMessage = () => {
  return (
    <div className="w-full flex justify-center pt-20">
      <div className="border border-red-700  rounded-lg max-w-md py-10 px-16">
        <div className="flex justify-center">
          <IconPlayer icon={ICON} />
        </div>
        <div className="text-red-400 text-center space-y-2">
          <h2 className="font-bold text-4xl">خطا</h2>
          <p className="font-bold text-xl">سرور با مشکل مواجه شده است</p>
        </div>
      </div>
    </div>
  );
};

export default MyErrorMessage;
