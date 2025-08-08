import { useRef } from "react";

// useHeaderRefs.ts
export function useHeaderRefs() {
  const headerRefs = useRef<(HTMLTableCellElement | null)[]>([]);

  const registerHeaderRef = (
    index: number,
    node: HTMLTableCellElement | null
  ) => {
    headerRefs.current[index] = node;
  };

  const focusHeader = (index: number) => {
    console.log(headerRefs.current[index]);

    headerRefs.current[index]?.focus();
  };
  return { registerHeaderRef, focusHeader };
}
