import React from 'react';

import tree1 from '../../../resources/tree_tutorial_images/tree1.png';
import tree2 from '../../../resources/tree_tutorial_images/tree2.png';
import tree3 from '../../../resources/tree_tutorial_images/tree3.png';
import tree4 from '../../../resources/tree_tutorial_images/tree4.png';
import tree5 from '../../../resources/tree_tutorial_images/tree5.png';

const ComponentTree: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>React Component Tree</h1>
      <hr/>
      <p className={classes.text}>The tree provides the developer with a visual representation of the component hierarchy. The tree updates in real time as the developer adds or deletes components.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={tree1}></img>
      </div>
      <hr/>
      <p className={classes.text}>Each tree begins with a root node. The current page that is selected represents the root node.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={tree2}></img>
      </div>
      <hr/>
      <p className={classes.text}><span className={classes.notLink} onClick={() => setPage('Reusable_Components')} >Reusable Components</span> are shown attached to the current page along with their subtrees of components and <span className={classes.notLink} onClick={() => setPage('HTML_Elements')} >HTML Elements</span>.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={tree3}></img>
      </div>
      <hr/>
      <p className={classes.text}><span className={classes.notLink} onClick={() => setPage('HTML_Elements')} >HTML Elements</span> are shown by their tag name.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={tree4}></img>
      </div>
      <hr/>
      <p className={classes.text}>You can also view the tree for each <span className={classes.notLink} onClick={() => setPage('Reusable_Components')} >reusable component</span>.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={tree5}></img>
      </div>
      <hr/>
    </div>
  );
};

export default ComponentTree;
