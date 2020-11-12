import {
  Component,
  State,
  ChildElement,
  HTMLType
} from '../interfaces/Interfaces';

declare global {
  interface Window {
    api: any;
  }
}

// generate code based on the component hierarchy
const generateUnformattedCode = (
  comps: Component[],
  componentId: number,
  rootComponents: number[],
  projectType: string,
  HTMLTypes: HTMLType[]
) => {
  const components = [...comps];
  // find the component that we're going to generate code for
  const currentComponent = components.find(elem => elem.id === componentId);
  // find the unique components that we need to import into this component file
  let imports: any = [];
  let links: boolean = false;

  const isRoot = rootComponents.includes(componentId);

  // get metadata for each child (e.g. the name/tag of the component/element)
  const getEnrichedChildren = (currentComponent: Component | ChildElement) => {
    const enrichedChildren = currentComponent.children.map((elem: any) => {
      const child = { ...elem };
      if (child.type === 'Component') {
        const referencedComponent = components.find(
          elem => elem.id === child.typeId
        );
        if (!imports.includes(referencedComponent.name))
          imports.push(referencedComponent.name);
        child['name'] = referencedComponent.name;
        return child;
      } else if (child.type === 'HTML Element') {
        const referencedHTML = HTMLTypes.find(elem => elem.id === child.typeId);
        child['tag'] = referencedHTML.tag;
        if (referencedHTML.tag === 'div') {
          child.children = getEnrichedChildren(child);
        }
        return child;
      } else if (child.type === 'Route Link') {
        links = true;
        child.name = components.find(
          (comp: Component) => comp.id === child.typeId
        ).name;
        return child;
      }
    });
    return enrichedChildren;
  };

  // write all code that will be under the "return" of the component
  const writeNestedElements = (enrichedChildren: any) => {
    return `${enrichedChildren
      .map((child: any) => {
        if (child.type === 'Component') {
          return `<${child.name}${formatStyles(child.style)} />`;
        } else if (child.type === 'HTML Element') {
          if (child.tag === 'img') {
            return `<${child.tag} src=""${formatStyles(child.style)} />`;
          } else if (child.tag === 'a') {
            return `<${child.tag} href=""${formatStyles(child.style)}>[LINK]</${
              child.tag
            }>`;
          } else if (child.tag === 'div') {
            return `<${child.tag}${formatStyles(
              child.style
            )}>${writeNestedElements(child.children)}</${child.tag}>`;
          } else if (child.tag === 'h1') {
            return `<${child.tag}${formatStyles(child.style)}>HEADER 1</${
              child.tag
            }>`;
          } else if (child.tag === 'h2') {
            return `<${child.tag}${formatStyles(child.style)}>HEADER 2</${
              child.tag
            }>`;
          } else if (child.tag === 'form') {
            return `<${child.tag}${formatStyles(child.style)}>FORM</${
              child.tag
            }>`;
          } else if (child.tag === 'p') {
            return `<${child.tag}${formatStyles(
              child.style
            )}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</${
              child.tag
            }>`;
          } else if (child.tag === 'li') {
            return `<ul${formatStyles(child.style)}><li>item 1</li>
            <li>item 2</li>
            <li>item 3</li></ul>`;
          } else if (child.tag === 'button') {
            return `<${child.tag}${formatStyles(child.style)}>BUTTON</${
              child.tag
            }>`;
          } else {
            return `<${child.tag}${formatStyles(child.style)}></${child.tag}>`;
          }
        }
        // route links are only a next.js feature. if the user creates a route link and then switches projects, generate code for a normal link instead
        else if (child.type === 'Route Link') {
          return projectType === 'Next.js'
            ? `<div><Link href="/${child.name}"><a>${child.name}</a></Link></div>`
            : `<div><a>${child.name}</a></div>`;
        }
      })
      .join('\n')}`;
  };

  // format styles stored in object to match React inline style format
  const formatStyles = (styleObj: any) => {
    if (Object.keys(styleObj).length === 0) return ``;
    const formattedStyles = [];
    for (let i in styleObj) {
      const styleString = i + ': ' + "'" + styleObj[i] + "'";
      formattedStyles.push(styleString);
    }
    return ' style={{' + formattedStyles.join(',') + '}}';
  };

  const enrichedChildren: any = getEnrichedChildren(currentComponent);

  const next = true;

  // import statements differ between root (pages) and regular components (components)
  const importsMapped =
    projectType === 'Next.js'
      ? imports
          .map((comp: string) => {
            return isRoot
              ? `import ${comp} from '../components/${comp}'`
              : `import ${comp} from './${comp}'`;
          })
          .join('\n')
      : imports
          .map((comp: string) => {
            return `import ${comp} from './${comp}.tsx'`;
          })
          .join('\n');

  const stateful = true;
  const classBased = false;

  // create final component code. component code differs between classic react and next.js
  // classic react code
  if (projectType !== 'Next.js') {
    return `
    ${stateful && !classBased ? `import React, {useState} from 'react';` : ''}
    ${classBased ? `import React, {Component} from 'react';` : ''}
    ${!stateful && !classBased ? `import React from 'react';` : ''}
    ${importsMapped}

      ${
        classBased
          ? `class ${currentComponent.name} extends Component {`
          : `const ${currentComponent.name} = (props): JSX.Element => {`
      }
      ${
        stateful && !classBased
          ? `const  [value, setValue] = useState<any | undefined>("INITIAL VALUE");`
          : ``
      }
      ${
        classBased && stateful
          ? `constructor(props) {
        super(props);
        this.state = {}
       }`
          : ``
      }

      ${classBased ? `render(): JSX.Element {` : ``}

      return (
        <div className="${currentComponent.name}" style={props.style}>
        ${writeNestedElements(enrichedChildren)}
        </div>
        );
      }
      ${classBased ? `}` : ``}
      export default ${currentComponent.name};
    `;
  }
  // next.js component code
  else {
    return `
    import React, { useState } from 'react';
    ${importsMapped}
    import Head from 'next/head'
    ${links ? `import Link from 'next/link'` : ``}

      const ${currentComponent.name} = (props): JSX.Element => {

        const  [value, setValue] = useState<any | undefined>("INITIAL VALUE");

      return (
        <>
        ${
          isRoot
            ? `<Head>
        <title>${currentComponent.name}</title>
        </Head>`
            : ``
        }
        <div className="${currentComponent.name}" style={props.style}>
        ${writeNestedElements(enrichedChildren)}
        </div>
        </>
        );
      }

      export default ${currentComponent.name};
    `;
  }
};

// formats code with prettier linter
const formatCode = (code: string) => {
  // in test environment, window.api is not defined,
  // so we reference original prettier format function instead
  if (process.env.NODE_ENV === 'test') {
    const { format } = require('prettier');
    return format(code, {
      singleQuote: true,
      trailingComma: 'es5',
      bracketSpacing: true,
      jsxBracketSameLine: true,
      parser: 'babel'
    });
  } else {
    return window.api.formatCode(code);
  }
};

// generate code based on component hierarchy and then return the rendered code
const generateCode = (
  components: Component[],
  componentId: number,
  rootComponents: number[],
  projectType: string,
  HTMLTypes: HTMLType[]
) => {
  const code = generateUnformattedCode(
    components,
    componentId,
    rootComponents,
    projectType,
    HTMLTypes
  );
  return formatCode(code);
};

export default generateCode;
