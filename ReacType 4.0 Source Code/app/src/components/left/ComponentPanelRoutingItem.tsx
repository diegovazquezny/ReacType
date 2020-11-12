import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import StateContext from '../../context/context';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// a component panel routing item is a Next.js component that allows the user to navigate between pages
const ComponentPanelRoutingItem: React.FC<{}> = () => {
  const classes = useStyles();
  const [state, dispatch] = useContext(StateContext);

  // find the root components that can be associated with a route
  // These will be the components that are displayed in the dropdown
  let navigableComponents = state.components
    .filter(comp => state.rootComponents.includes(comp.id))
    .map(comp => comp.name);

  // set state for the route curently selected in the dropdown
  const [route, setRoute] = useState(navigableComponents[0]);

  // TODO: Add a useMemo so that this isn't recalculated on every render
  let routeId;
  // check if the component in the drop down still references an existing component
  const referencedComponent = state.components.find(
    comp => comp.name === route
  );
  // if so, set the route id for that component to the id of the referenced compnent
  if (referencedComponent) routeId = referencedComponent.id;
  // otherwise, set the component name and and id to the root component
  else {
    setRoute(state.components[0].name);
    routeId = 1;
  }

  const handleRouteChange = event => {
    setRoute(event.target.value);
  };

  // useDrag hook allows components in left panel to be drag source

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.INSTANCE,
      newInstance: true,
      instanceType: 'Route Link',
      instanceTypeId: routeId
    },
    canDrag: true,
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <Grid
      item
      ref={drag}
      xs={8}
      style={{
        color: 'white',
        backgroundColor: 'transparent',
        height: '75px',
        marginBottom: '15px',
        border: '2px solid rgba(211,201,121, 0.75)',
        borderRadius: '8px'
      }}
    >
      <div className="compPanelItem">
        <h3>Route Link</h3>
        <Select
          variant="outlined"
          labelId="project-type-label"
          id="demo-simple-select"
          className={classes.routeSelector}
          value={route}
          onChange={handleRouteChange}
        >
          {navigableComponents.map(page => (
            <MenuItem key={'menu' + page} value={page}>
              {page}
            </MenuItem>
          ))}
        </Select>
      </div>
    </Grid>
  );
};

const useStyles = makeStyles({
  activeFocus: {
    backgroundColor: 'rgba(1,212,109,0.3)'
  },
  focusMark: {
    backgroundColor: '#01d46d',
    position: 'absolute',
    width: '12px',
    height: '12px',
    borderRadius: '12px',
    left: '-35px',
    top: '30px'
  },
  routeSelector: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginLeft: '20px',
    color: '#fff',
    height: '60%',
    alignSelf: 'center',
    minWidth: '100px'
  }
});

export default ComponentPanelRoutingItem;
