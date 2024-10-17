import { useCallback, useEffect, useRef } from 'react';

export default function useStableCallback<T extends (...args: Parameters<T>) => void>(fn: T): T {
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  return useCallback(((...args: Parameters<T>) => fnRef.current(...args)) as T, []);
}
