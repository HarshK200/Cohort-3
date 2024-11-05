import { useRef, useEffect } from "react";

// custom hook used to get the prev value
function usePrev(value, initial) {
  const ref = useRef({ target: value, previous: initial });

  if (ref.current.target !== value) {
    ref.current.previous = ref.current.target;
    ref.current.target = value;
  }

  return ref.current.previous;
}

export { usePrev };
