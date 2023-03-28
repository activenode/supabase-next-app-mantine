import { useCallback, useState } from "react";

export const usePromiseFnWithLoadingState = <A extends any[], T extends any>(
  fn: (...args: A) => Promise<T>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [wasResolved, setWasResolved] = useState(false);

  const promiseCaller = useCallback(
    (...args: A) => {
      console.log("@here");
      setWasResolved(false);
      setIsLoading(true);
      return fn(...args)
        .then((result) => {
          setWasResolved(true);
          return result;
        })
        .finally(() => setIsLoading(false));
    },
    [setIsLoading, fn]
  );

  return [promiseCaller, isLoading, wasResolved] as const;
};
