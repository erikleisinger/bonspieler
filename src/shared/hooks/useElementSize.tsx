import { useState, useEffect, useCallback, useRef } from "react";

/**
 * A custom React hook that tracks an element's height and width
 * Similar to VueUse's useElementHeight
 *
 * @param {RefObject} [elementRef] - Optional ref to the element to measure
 * @returns {Object} - The element's dimensions and a ref if one wasn't provided
 */
function useElementSize(elementRef) {
  const [height, setHeight] = useState(undefined);
  const [width, setWidth] = useState(undefined);
  const localRef = useRef(null);
  const observedElementRef = useRef(null);

  // Use provided ref or the local one
  const ref = elementRef || localRef;

  const updateSize = useCallback(() => {
    if (ref.current) {
      const newHeight = ref.current.clientHeight;
      const newWidth = ref.current.clientWidth;

      // Only update state if values have changed to prevent unnecessary renders
      if (newHeight !== height) setHeight(newHeight);
      if (newWidth !== width) setWidth(newWidth);
    }
  }, [ref, height, width]);

  useEffect(() => {
    // Initial measurement
    updateSize();

    // Set up resize observer to track changes
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
      observedElementRef.current = ref.current;
    }

    // Add a mutation observer to detect DOM changes
    const mutationObserver = new MutationObserver(() => {
      // If the ref has been updated with a new element, update size and observe it
      if (ref.current && ref.current !== observedElementRef.current) {
        // Stop observing the old element
        if (observedElementRef.current) {
          resizeObserver.unobserve(observedElementRef.current);
        }
        // Start observing the new element
        resizeObserver.observe(ref.current);
        observedElementRef.current = ref.current;
        updateSize();
      }
    });

    // Observe the parent element for child changes to detect when ref is attached
    if (ref.current?.parentElement) {
      mutationObserver.observe(ref.current.parentElement, {
        childList: true,
        subtree: true,
      });
    }

    // Clean up
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      observedElementRef.current = null;
    };
  }, [ref?.current, updateSize]);

  // Add another effect to watch for ref changes
  useEffect(() => {
    updateSize();

    // When ref changes and exists, immediately measure it
    if (ref.current) {
      const newHeight = ref.current.clientHeight;
      const newWidth = ref.current.clientWidth;
      setHeight(newHeight);
      setWidth(newWidth);
    }
  }, [ref.current]); // Explicitly depend on ref.current

  return { height, width, ref };
}

export default useElementSize;
