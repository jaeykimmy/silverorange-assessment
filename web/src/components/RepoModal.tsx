import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ChildModal(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log(props.readMe);
  return (
    <React.Fragment>
      <Button onClick={handleOpen}>ReadME</Button>
      <Modal
        hideBackdrop={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close ReadME</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function RepoModal(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>Repo Information</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Author: {props.commitData ? props.commitData.author.name : ''}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Message: {props.commitData ? props.commitData.message : ''}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Last Commit Date:{' '}
            {props.commitData ? props.commitData.author.date : ''}
          </Typography>
          <ChildModal readMe={props.readMe} />
        </Box>
      </Modal>
    </div>
  );
}
