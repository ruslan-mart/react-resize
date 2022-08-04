export const parseCurrentRect = (node: HTMLElement) => {
  const { height, left, top, width } = window.getComputedStyle(node);

  return {
    height: parseFloat(height),
    width: parseFloat(width),
    x: parseFloat(left),
    y: parseFloat(top),
  } as const;
};
