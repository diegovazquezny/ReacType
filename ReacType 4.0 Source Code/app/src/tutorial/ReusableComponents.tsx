import React from 'react';

import reusableComponents1 from '../../../resources/reusable_components_tutorial_images/reusableComponents1.png';
import reusableComponents2 from '../../../resources/reusable_components_tutorial_images/reusableComponents2.png';
import reusableComponents3 from '../../../resources/reusable_components_tutorial_images/reusableComponents3.png';

const ReusableComponents: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Reusable Components</h1>
      <hr/>
      <p className={classes.text}>To add a Reusable Component, use the top left input form to name a Component. Then select add to create a new Component.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={reusableComponents1} />
      </div>
      <hr/>
      <p className={classes.text}>The Components you create will populate the left container under the section called 'Reusable Components'.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={reusableComponents2} />
      </div>
      <hr/>
      <p className={classes.text}>After creating the desired Component, you can now use the components with the drag-n-drop functionality.
        If you'd like to know about about the drag-n-drop functionality, please locate the <span className={classes.notLink} onClick={() => setPage('Canvas')} >Canvas Tutorial</span> for more information on how it works.
      </p>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={reusableComponents3} />
      </div>
      <p className={classes.text}>You can place a reusable component inside <span className={classes.notLink} onClick={() => setPage('Pages')} >Pages</span> and populate the component itself with the <span className={classes.notLink} onClick={() => setPage('HTML_Elements')} >HTML Element</span>.</p>
      <hr/>
    </div>
  );
};

export default ReusableComponents;

