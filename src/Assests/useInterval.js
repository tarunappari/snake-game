
import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remembering the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Setting up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}