import React, { useState, useContext } from 'react';
import StateContext from '../../context/context';
import Grid from '@material-ui/core/Grid';
import ComponentPanelItem from './ComponentPanelItem';
import ComponentPanelRoutingItem from './ComponentPanelRoutingItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core/styles';

// The component panel section of the left panel displays all components and has the ability to add new components
const ComponentPanel = (): JSX.Element => {
  const classes = useStyles();
  const [state, dispatch] = useContext(StateContext);

  //state hooks for inputted component name, component id and array of components
  const [errorStatus, setErrorStatus] = useState(false);
  // errorMsg refers to the error message on the new component text field
  const [errorMsg, setErrorMsg] = useState('');
  const [compName, setCompName] = useState('');
  const [isRoot, setIsRoot] = useState(false);

  // function to create error message for component name input
  const triggerError = (type: String) => {
    setErrorStatus(true);
    if (type === 'empty') {
      setErrorMsg('Component name cannot be blank.');
    } else if (type === 'dupe') {
      setErrorMsg('Component name already exists.');
    } else if (type === 'letters') {
      setErrorMsg('Component name must start with a letter.');
    } else if (type === 'symbolsDetected') {
      setErrorMsg('Component name must not contain symbols.');
    }
  };

  const resetError = () => {
    setErrorStatus(false);
  };

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetError();
    setCompName(e.target.value);
  };

  // check if name of new component is the same as an existing component
  const checkNameDupe = (inputName: String) => {
    let checkList = state.components.slice();

    // checks to see if inputted comp name already exists
    let dupe = false;
    checkList.forEach(comp => {
      if (comp.name.toLowerCase() === inputName.toLowerCase()) {
        dupe = true;
      }
    });
    return dupe;
  };

  // "Root" components are not draggable into the main canvas
  // If next.js mode is on, root components will be seperate pages
  const toggleRootStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRoot(isRoot ? false : true);
  };

  // Add a new component
  const createOption = (inputName: String) => {
    // format name so first letter is capitalized and there are no white spaces
    let inputNameClean = inputName.replace(/\s+/g, '');
    const formattedName =
      inputNameClean.charAt(0).toUpperCase() + inputNameClean.slice(1);
    // add new component to state
    dispatch({
      type: 'ADD COMPONENT',
      payload: { componentName: formattedName, root: isRoot }
    });
    // reset root toggle back to default position
    setIsRoot(false);
    // reset name field
    setCompName('');
  };

  const alphanumeric = input => {
    let letterNumber = /^[0-9a-zA-Z]+$/;
    if (input.match(letterNumber)) return true;
    return false;
  };

  const handleNameSubmit = () => {
    let letters = /[a-zA-Z]/;
    if (!compName.charAt(0).match(letters)) {
      triggerError('letters');
      return;
    } else if (!alphanumeric(compName)) {
      triggerError('symbolsDetected');
      return;
    } else if (compName.trim() === '') {
      triggerError('empty');
      return;
    } else if (checkNameDupe(compName)) {
      triggerError('dupe');
      return;
    }
    createOption(compName);
    resetError();
  };

  const isFocus = (targetId: Number) => {
    return state.canvasFocus.componentId === targetId ? true : false;
  };

  return (
    <div className={classes.panelWrapper}>
      {/* Add a new component*/}
      <div className={classes.addComponentWrapper}>
        <div>
          <div className={classes.inputWrapper}>
            <TextField
              color={'primary'}
              label="Component Name"
              variant="outlined"
              className={classes.inputField}
              InputProps={{ className: classes.input }}
              InputLabelProps={{ className: classes.inputLabel }}
              value={compName}
              error={errorStatus}
              helperText={errorStatus ? errorMsg : ''}
              onChange={handleNameInput}
            />
            <div className={classes.btnGroup}>
              <FormControlLabel
                value="top"
                control={
                  <Checkbox
                    color="primary"
                    checked={isRoot}
                    onChange={toggleRootStatus}
                  />
                }
                label={state.projectType === 'Next.js' ? 'Page' : 'Root'}
                className={classes.rootCheckBoxLabel}
                labelPlacement="top"
              />
            </div>
          </div>
          <Button
            className={classes.button}
            color="primary"
            onClick={handleNameSubmit}
          >
            ADD
          </Button>
        </div>
      </div>
      {/* Display all root components */}
      <div className={classes.panelWrapperList}>
        <h4>{state.projectType === 'Next.js' ? 'Pages' : 'Root components'}</h4>
        <Grid container direction="row" justify="center" alignItems="center">
          {state.components
            .filter(comp => state.rootComponents.includes(comp.id))
            .map(comp => {
              return (
                <ComponentPanelItem
                  isFocus={isFocus(comp.id)}
                  key={`comp-${comp.id}`}
                  name={comp.name}
                  id={comp.id}
                  root={true}
                />
              );
            })}
        </Grid>
        {/* Display all reusable components */}
        <h4>Reusable components</h4>
        <Grid container direction="row" justify="center" alignItems="center">
          {state.components
            .filter(comp => !state.rootComponents.includes(comp.id))
            .map(comp => {
              return (
                <ComponentPanelItem
                  isFocus={isFocus(comp.id)}
                  key={`comp-${comp.id}`}
                  name={comp.name}
                  id={comp.id}
                  root={false}
                />
              );
            })}
        </Grid>
        {/* Display navigation components - (only applies to next.js which has routing built in) */}
        {state.projectType === 'Next.js' ? (
          <React.Fragment>
            <h4>Navigation</h4>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <ComponentPanelRoutingItem key={'premadecomp-1'} />
            </Grid>
          </React.Fragment>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  inputField: {
    marginTop: '15px'
  },
  inputWrapper: {
    // height: '115px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingLeft: '35px',
    marginBottom: '15px'
  },
  addComponentWrapper: {
    border: '1px solid rgba(70,131,83)',
    padding: '20px',
    margin: '20px'
  },
  rootCheckBox: {},
  rootCheckBoxLabel: {
    color: 'white'
  },
  panelWrapper: {
    width: '100%',
    marginTop: '15px'
  },
  panelWrapperList: {
    // maxHeight: '400px',
    minHeight: '120px',
    // overflowY: 'auto',
    marginLeft: '-15px',
    marginRight: '-15px'
  },
  panelSubheader: {
    textAlign: 'center',
    color: '#fff'
  },
  input: {
    color: '#fff',
    borderRadius: '5px',
    paddingLeft: '15px',
    paddingRight: '10px',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    border: '1px solid rgba(51,235,145,0.75)',
    backgroundColor: 'rgba(255,255,255,0.15)'
  },
  inputLabel: {
    fontSize: '14px',
    zIndex: 20,
    color: '#fff',
    marginTop: '-10px'
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '10px',
    marginLeft: '10px'
  },
  button: {
    fontSize: '1rem',
    height: '40px',
    maginTop: '10px',
    width: '100%',
    // border: '1px solid rgba(70,131,83)',
    backgroundColor: 'rgba(1,212,109,0.1)'
  },
  rootToggle: {
    color: '#01d46d',
    fontSize: '0.85rem'
  }
});

export default ComponentPanel;
