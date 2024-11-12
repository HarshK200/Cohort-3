import { useRef, useState, useEffect } from "react";

// NOTE: this is a different debounce implementation
function useDebounceFunctionType(funcToCall) {
  const clock = useRef(); // NOTE: only get's called when component mounts

  return function () {
    if (clock.current) {
      clearTimeout(clock.current);
    }
    clock.current = setTimeout(funcToCall, 300);
  };
}

// NOTE: this is the main debounce implementation (IMPORTANT! this get's called on the mount as well whereas the prev implementation doesn't)
function useDebounce(value, delay) {
  const [debouncedVal, setDebouncedVal] = useState(value);

  useEffect(() => {
    const clock = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    // NOTE: cleanup function
    return () => {
      clearTimeout(clock);
    };
  }, [value, delay]);

  return debouncedVal;
}

export { useDebounce };
