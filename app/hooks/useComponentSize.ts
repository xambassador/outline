import { useState, useLayoutEffect } from "react";

export default function useComponentSize(
  ref: React.RefObject<HTMLElement | null>
): {
  width: number;
  height: number;
} {
  const [size, setSize] = useState({
    width: ref.current?.clientWidth || 0,
    height: ref.current?.clientHeight || 0,
  });

  useLayoutEffect(() => {
    const sizeObserver = new ResizeObserver((entries) => {
      entries.forEach(({ target }) => {
        if (
          size.width !== target.clientWidth ||
          size.height !== target.clientHeight
        ) {
          setSize({ width: target.clientWidth, height: target.clientHeight });
        }
      });
    });

    if (ref.current) {
      sizeObserver.observe(ref.current);
    }

    return () => sizeObserver.disconnect();
  }, [ref, size.height, size.width]);

  return size;
}
