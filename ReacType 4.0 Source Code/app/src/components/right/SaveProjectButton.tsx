import React, { useState, useContext } from 'react';
import StateContext from '../../context/context';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { saveProject } from '../../helperFunctions/projectGetSaveDel';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useContext(StateContext);

  const [projectName, setProjectName] = useState('');
  const [invalidProjectName, setInvalidProjectName] = useState(false);
  const [invalidProjectNameMessage, setInvalidProjectNameMessage] = useState(
    ''
  );

  const classes = useStyles();

  const handleClickOpen = () => {
    setInvalidProjectName(false);
    setOpen(true);
  };

  const handleSave = () => {
    if (state.isLoggedIn === true && projectName !== '') {
      // Update the project name to global state
      // Needed to disable delete button
      // Switch to Thunk
      // If errors occur on the backend, the project name still gets updated
      dispatch({ type: 'UPDATE PROJECT NAME', payload: projectName });
      saveProject(projectName, state);
      setOpen(false);
    } else {
      setInvalidProjectName(true);
      setInvalidProjectNameMessage('Please Enter');
    }
  };

  const handleClose = () => {
    setInvalidProjectName(false);
    setInvalidProjectNameMessage('');
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  return (
    <div>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        endIcon={<SaveOutlinedIcon />}
      >
        SAVE PROJECT AS
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Save Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            fullWidth
            value={projectName}
            onChange={handleChange}
            helperText={invalidProjectNameMessage}
            error={invalidProjectName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles({
  button: {
    width: '55%',
    backgroundColor: 'rgba(1,212,109,0.1)',
    fontSize: '1em',
    minWidth: '300px',
    marginTop: '10px',
    marginBotton: '10px'
  }
});
