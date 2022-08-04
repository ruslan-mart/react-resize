import type { UseResizeProps, UseResizeResult } from './types';
/**
 * This hook will give you opportunity to use the element's «resizable» without usage of integral components.
 * Use this hook if you want to interact with elements directly and if there is not enough functionality for integral components usage.
 * @param props an object with a list of props (`UseResizeProps`)
 * @see https://github.com/ruslan-mart/react-resize#useresize-hook
 * @see https://github.com/ruslan-mart/react-resize#useresize-hook-base-usage
 */
export declare const useResize: (props: UseResizeProps) => UseResizeResult;
export type { UseResizeProps, UseResizeResult };
