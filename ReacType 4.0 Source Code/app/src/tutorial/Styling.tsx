import React from 'react';
import theme from '../../../resources/customizing_elements_images/Theme.png';
import lighting from '../../../resources/customizing_elements_images/Lighting.png';
import resize from '../../../resources/customizing_elements_images/Resize.png';
import codeChange from '../../../resources/customizing_elements_images/CodeChange.png';


const Styling: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Styling Features</h1>
      <hr />
      <h2>Code Preview Theme Changer</h2>
      <div className={classes.imgWrapper}>
        <img src={theme} />
      </div>
      <p className={classes.text}>
        Select your favorite theme from the drop down menu to personalize your
        view of the <span className={classes.notLink} onClick={() => setPage('Code_Preview')} >code preview</span>!
      </p>
      <hr />
      <h2>Lighting Mode</h2>
      <div className={classes.imgWrapper}>
        <img src={lighting} />
      </div>
      <p className={classes.text}>
        Spice up the app by toggling between different lighting modes! The
        lighting mode will change the background color of the app as well as the
        background color of the <span className={classes.notLink} onClick={() => setPage('Component_Tree')} >component tree</span>.
      </p>
      <hr />
      <h2>Resize Code Preview & Component Tree</h2>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={resize} />
      </div>
      <p className={classes.text}>
        Hover over the line above the <span className={classes.notLink} onClick={() => setPage('Code_Preview')} >code preview</span> and/or <span className={classes.notLink} onClick={() => setPage('Component_Tree')} >component tree</span> to
        resize the section. Simply click and drag up or down to resize.
      </p>
      <hr />
      <h2>Customize Code Preview</h2>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={codeChange} />
      </div>
      <p className={classes.text}>
        Change your code before exporting and see the changes in your exported
        file!
      </p>
      <hr />
    </div>
  );
};

export default Styling;
