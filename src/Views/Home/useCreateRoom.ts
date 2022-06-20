import { useState } from "react";

const useCreateRoom = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const IterateCreateModal = () => {
    setOpenCreateModal((prev) => !prev);
  };

  return { openCreateModal, IterateCreateModal };
};

export default useCreateRoom;
