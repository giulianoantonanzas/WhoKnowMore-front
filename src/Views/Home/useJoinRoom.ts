import { useState } from "react";

const useJoinRoom = () => {
  const [openJoinModal, setOpenJoinModal] = useState(false);

  const IterateJoinModal = () => {
    setOpenJoinModal((prev) => !prev);
  };

  return { openJoinModal, IterateJoinModal };
};

export default useJoinRoom;
