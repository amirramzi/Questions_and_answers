import PropTypes from "prop-types";
import Box from "./layouts/Box";
import ICON from "../assets/system-regular-31-check.json";
import IconPlayer from "./IconPlayer";

const EndQuestion = ({ name, endMessage }) => {
  return (
    <Box>
      <div className="flex flex-col  items-center justify-between pb-6">
        <IconPlayer icon={ICON} />

        <h1 className="text-2xl font-bold my-4">{endMessage}</h1>
        <p className="text-lg mt-2 text-center pb-4">
          <span className="font-bold text-purple-600"> {name}</span> عزیز منون
          از اینکه به سوالات پاسخ دادی در ضمن خیلی بیکاری کسخل
        </p>
      </div>
    </Box>
  );
};
EndQuestion.propTypes = {
  name: PropTypes.string.isRequired,
  endMessage: PropTypes.string.isRequired,
};
export default EndQuestion;
