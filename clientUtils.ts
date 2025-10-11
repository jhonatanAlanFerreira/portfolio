"use client";
import { useCallback, useRef } from "react";

export const useDebouncedCallback = (callback: Function, delay = 300) => {
  const timeoutRef = useRef<any>(null);

  const debouncedFunction = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedFunction;
};
