import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import ComponentPanel from '../components/left/ComponentPanel';
import HTMLPanel from '../components/left/HTMLPanel';
import { styleContext } from './AppContainer';

// Left-hand portion of the app, where component options are displayed
const LeftContainer = (): JSX.Element => {
  const { style } = useContext(styleContext);

  return (
    <div className="column left" style={style}>
      <Grid container direction="row" alignItems="center">
        <ComponentPanel />
        <HTMLPanel />
      </Grid>
    </div>
  );
};

export default LeftContainer;
