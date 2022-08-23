import { useEffect, useState } from "react";

const useHome = () => {
  const [name, setName] = useState("");
  const [disableButtons, setDisableButtons] = useState(true);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (name === "" || name.length < 3 || name.length > 40) {
      setDisableButtons(true);
    } else {
      setDisableButtons(false);
    }
  }, [name]);

  return { name, handleChangeName, disableButtons };
};
export default useHome;
