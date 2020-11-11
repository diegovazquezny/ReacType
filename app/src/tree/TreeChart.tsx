import React, { useRef, useEffect, useContext } from "react";
import { select, hierarchy, tree, linkHorizontal } from "d3";
import useResizeObserver from "./useResizeObserver";
import StateContext from '../context/context';
import { Component } from '../interfaces/Interfaces';

function usePrevious(value) {
  const ref = useRef<Array<Component>>(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const TreeChart = ({ data }): JSX.Element => {
  const [state, dispatch] = useContext(StateContext);
  const canvasId: number = state.canvasFocus.componentId;

  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const xPosition: number = 50;
  const textAndBorderColor: string = 'rgb(51, 235, 145)';

  const dimensions: DOMRectReadOnly = useResizeObserver(wrapperRef);

  // we save data to see if it changed
  const previouslyRenderedData: Array<Component> = usePrevious(data);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    
    // use dimensions from useResizeObserver,
    // but use getBoundingClientRect on initial render
    // (dimensions are null for the first render)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();
    // transform hierarchical data
    const root = hierarchy(data[canvasId - 1]);
    const treeLayout = tree<Component>().size([height, width - 125]);

    // Returns a new link generator with horizontal display.
    // To visualize links in a tree diagram rooted on the left edge of the display
    const linkGenerator: void = linkHorizontal()
      .x(link => link.y)
      .y(link => link.x);

    // insert our data into the tree layout
    treeLayout(root);

    // node - each element in the tree
    svg
      .selectAll('.node')
      .data(root.descendants())
      .join(enter => enter.append('circle').attr('opacity', 0))
      .attr('class', 'node')
      /*
        The cx, cy attributes are associated with the circle and ellipse elements and designate the centre of each shape. The coordinates are set from the top, left hand corner of the web page.
        cx: The position of the centre of the element in the x axis measured from the left side of the screen.
        cy: The position of the centre of the element in the y axis measured from the top of the screen.
      */
      // translate (x, y)
      .attr('cx', node => node.y)
      .attr('cy', node => node.x)
      .attr('r', 4) // radius of circle
      .attr('opacity', 1)
      .style('fill', 'white')
      .attr('transform', `translate(${xPosition}, 0)`);

      console.log(svg);

    // link - lines that connect the nodes
    svg
      .selectAll('.link')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('d', linkGenerator)
      .attr('stroke', 'white')
      .attr('fill', 'none')
      .attr('opacity', 1)
      .attr('transform', `translate(${xPosition}, 0)`);

    // if (data !== previouslyRenderedData) {
    //   enteringAndUpdatingLinks
    //     .attr('stroke-dashoffset', function() {
    //       console.log(this.getTotalLength());
    //       return this.getTotalLength();
    //     })
    //     .attr('stroke-dashoffset', 100);
    // }

    // label - the names of each html element (node)
    svg
      .selectAll('.label')
      .data(root.descendants())
      .join(enter => enter.append('text').attr('opacity', 0))
      .attr('class', 'label')
      .attr('x', node => node.y)
      .attr('y', node => node.x - 12)
      .attr('text-anchor', 'middle')
      .attr('font-size', 18)
      .style('fill', textAndBorderColor)
      .text(node => node.data.name)
      .attr('opacity', 1)
      .attr('transform', `translate(${xPosition}, 0)`);
  }, [data, dimensions, previouslyRenderedData, canvasId]);

  const treeStyles = {
    height: '100%',
    width: `100%`,
    margin: '10px 10px 10px 10px',
    overflow: 'auto'
  };

  const wrapperStyles = {
    border: `2px solid ${textAndBorderColor}`,
    borderRadius: '8px',
    width: '100%',
    height: '90%',
    display: 'flex',
    justifyContent: 'center'
  };

  return (
    <div ref={wrapperRef} style={wrapperStyles}>
      <svg ref={svgRef} style={treeStyles}></svg>
    </div>
  );
}

export default TreeChart;
