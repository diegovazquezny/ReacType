import createApplicationUtil from './createApplication.util';
import createNextApp from './createNextApp.util';
import createFiles from './createFiles.util';

// When a user clicks the "Export project" function from the app, this function is invoked
const exportProject = (
  path: string,
  appName: string,
  genOption: number,
  projectType: string,
  components: any,
  rootComponents: number[]
) => {
  // Create fully functional classic react application
  if (genOption === 1 && projectType === 'Classic React') {
    createApplicationUtil({ path, appName, components }).catch(err =>
      console.log(err)
    );
  } // export all component files, but don't create all application files
  else if (genOption === 0) {
    createFiles(components, path, appName, false);
  } // Create fully functional Next.js application
  else if (genOption === 1 && projectType === 'Next.js') {
    createNextApp({ path, appName, components, rootComponents }).catch(err =>
      console.log(err)
    );
  }
};

export default exportProject;
