import {
  Button,
  CircularProgress,
  Dialog,
  FormHelperText,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import RoundedBox from "Components/RoundedBox";
import useCreateRoom from "./useCreateRoom";
import useHome from "./useHome";
import useJoinRoom from "./useJoinRoom";
import useStyles from "./useStyles";

const Home = () => {
  const style = useStyles();
  const { handleChangeName, disableButtons, name } = useHome();
  const { iterateCreateModal, openCreateModal, loadingCreateRoom, roomCode } =
    useCreateRoom(name);
  const {
    iterateJoinModal,
    openJoinModal,
    handleChangeCode,
    submit,
    loadingJoinRoom,
    error,
  } = useJoinRoom(name);

  const hasDisableButton = openCreateModal || openJoinModal || disableButtons;

  return (
    <Box>
      <RoundedBox>
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
      </RoundedBox>

      <Dialog open={openCreateModal} onClose={iterateCreateModal}>
        <Box className={style.modalContent}>
          <Typography variant="h4">Room Created</Typography>
          <Typography
            textAlign={"center"}
            justifyContent={"center"}
            display={"flex"}
            gap={"1rem"}
          >
            Code: {loadingCreateRoom && <Skeleton width={"48%"} />}
            {roomCode}
          </Typography>

          <FormHelperText sx={{ textAlign: "center" }} error={true}>
            {roomCode ? "Esperando a que se unan a la partida..." : ""}
          </FormHelperText>

          <Button
            onClick={iterateCreateModal}
            variant="outlined"
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
            error={Boolean(error)}
            helperText={error}
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
            disabled={loadingJoinRoom}
            color="primary"
          >
            {loadingJoinRoom ? <CircularProgress /> : "Unirse a una sala"}
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Home;
