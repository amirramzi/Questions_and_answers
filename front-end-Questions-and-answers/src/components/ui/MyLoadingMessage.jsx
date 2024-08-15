import IconPlayer from "../IconPlayer";

import ICON from "../../assets/wired-outline-212-arrow-1-rounded.json";
const MyLoadingMessage = () => {
  return (
    <div className="w-full flex justify-center pt-20">
      <div className="border border-purple-950  rounded-lg max-w-md py-10 px-16">
        <div className="flex justify-center">
          <IconPlayer timer={20} icon={ICON} />
        </div>

        <h2 className="font-bold text-2xl text-center pt-6 text-purple-950">
          در حال بارگذاری...
        </h2>
      </div>
    </div>
  );
};

export default MyLoadingMessage;
