import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Player } from "@lordicon/react";
const IconPlayer = ({ icon, timer }) => {
  const playerRef = useRef(Player);
  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);
  const playerTimer = (timer) => {
    setTimeout(() => {
      playerRef.current?.playFromBeginning();
    }, timer || 2000);
  };
  return (
    <Player
      size={100}
      ref={playerRef}
      icon={icon}
      onComplete={() => playerTimer(timer)}
    />
  );
};

IconPlayer.propTypes = {
  icon: PropTypes.object.isRequired,
  timer: PropTypes.number,
};

export default IconPlayer;
