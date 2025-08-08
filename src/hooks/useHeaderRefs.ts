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

  const focusHeader = (index: number | null) => {
    if (!index) return false;
    const node = headerRefs.current[index];
    if (node) {
      node.focus();
      return true;
    }
    return false;
  };
  return { registerHeaderRef, focusHeader };
}
