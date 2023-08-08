export const assert = (condition: boolean, errorMsg?: string) => {
  if (!condition) {
    throw new Error(errorMsg ?? "Assertion failed");
  }
};

export const removeChildren = (elem: Element) => {
  Array.from(elem.children).forEach(c => elem.removeChild(c));
};