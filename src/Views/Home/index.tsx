import { Button, Dialog, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useCreateRoom from "./useCreateRoom";
import useJoinRoom from "./useJoinRoom";
import useStyles from "./useStyles";

const Home = () => {
  const { content, buttonBox, modalContent } = useStyles();
  const { IterateCreateModal, openCreateModal } = useCreateRoom();
  const { IterateJoinModal, openJoinModal } = useJoinRoom();

  const hasDisableButton = openCreateModal || openJoinModal;

  return (
    <Box>
      <Box className={content}>
        <TextField
          label="Nombre o apodo"
          fullWidth
          type={"text"}
          placeholder="Giuliano"
        />

        <Box className={buttonBox}>
          <Button
            disabled={hasDisableButton}
            variant="contained"
            onClick={IterateCreateModal}
            fullWidth
            color="primary"
          >
            Crear nueva sala
          </Button>
          <Button
            disabled={hasDisableButton}
            onClick={IterateJoinModal}
            variant="contained"
            fullWidth
            color="primary"
          >
            Unirse a una sala
          </Button>
        </Box>
      </Box>

      <Dialog open={openCreateModal} onClose={IterateCreateModal}>
        <Box className={modalContent}>
          <Typography variant="h4">RoomCreated</Typography>
          <Typography>Code: 12313131</Typography>
          <Button
            onClick={IterateCreateModal}
            variant="outlined"
            color="primary"
          >
            Retroceder
          </Button>
        </Box>
      </Dialog>

      <Dialog open={openJoinModal} onClose={IterateJoinModal}>
        <Box className={modalContent}>
          <Typography variant="h4">Join room</Typography>
          <TextField
            label="Room code"
            fullWidth
            type={"text"}
            placeholder="abll7k582mx2k"
          />
          <Button variant="contained" fullWidth color="primary">
            Unirse a una sala
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Home;
