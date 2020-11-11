import { useEffect, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

/*
this function returns the dimensions of the div containing
the tree. The tree will resize depending on these dimensions.
*/

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    // the element being observed (div with green border)
    const observeTarget: HTMLDivElement = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
        // contentRect is an object containing the dimensions of the observed element
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

export default useResizeObserver;
