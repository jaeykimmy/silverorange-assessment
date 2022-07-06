import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReactMarkdown from 'react-markdown';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
};

function ChildModal(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
        <Box sx={{ ...style }}>
          <ReactMarkdown>{props.readMe}</ReactMarkdown>
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
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}
