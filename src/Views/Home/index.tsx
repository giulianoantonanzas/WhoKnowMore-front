import { Button, Dialog, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useCreateRoom from "./useCreateRoom";
import useHome from "./useHome";
import useJoinRoom from "./useJoinRoom";
import useStyles from "./useStyles";

const Home = () => {
  const style = useStyles();
  const { handleChangeName, disableButtons, name } = useHome();
  const { iterateCreateModal, openCreateModal, loadingCreateRoom, roomCode } =
    useCreateRoom(name);
  const { iterateJoinModal, openJoinModal, handleChangeCode, submit } =
    useJoinRoom(name);

  const hasDisableButton = openCreateModal || openJoinModal || disableButtons;

  return (
    <Box>
      <Box className={style.content}>
        <TextField
          label="Nombre o apodo"
          fullWidth
          focused={true}
          onChange={handleChangeName}
          type={"text"}
          placeholder="Giuliano"
        />

        <Box className={style.buttonBox}>
          <Button
            disabled={hasDisableButton}
            variant="contained"
            onClick={iterateCreateModal}
            fullWidth
            color="primary"
          >
            Crear nueva sala
          </Button>
          <Button
            disabled={hasDisableButton}
            onClick={iterateJoinModal}
            variant="contained"
            fullWidth
            color="primary"
          >
            Unirse a una sala
          </Button>
        </Box>
      </Box>

      <Dialog open={openCreateModal} onClose={iterateCreateModal}>
        <Box className={style.modalContent}>
          <Typography variant="h4">Room Created</Typography>
          <Typography>Code: {roomCode}</Typography>
          <Button
            onClick={iterateCreateModal}
            variant="outlined"
            disabled={loadingCreateRoom}
            color="primary"
          >
            Retroceder
          </Button>
        </Box>
      </Dialog>

      <Dialog open={openJoinModal} onClose={iterateJoinModal}>
        <Box className={style.modalContent}>
          <Typography variant="h4">Join room</Typography>
          <TextField
            onChange={handleChangeCode}
            label="Room code"
            fullWidth
            type={"text"}
            placeholder="abll7k582mx2k"
          />
          <Button
            variant="contained"
            onClick={submit}
            fullWidth
            color="primary"
          >
            Unirse a una sala
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Home;
