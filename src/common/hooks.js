import { useEffect, useRef } from "react";

export function useOnce(callback, deps = []) {
  const flag = useRef(true);

  useEffect(() => {
    if (flag.current) {
      flag.current = false;
      return callback();
    }
    return;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}