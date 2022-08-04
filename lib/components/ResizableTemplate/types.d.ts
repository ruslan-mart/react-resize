import type { HTMLAttributes } from 'react';
export interface ResizeTemplateAllSideProps extends HTMLAttributes<HTMLElement> {
    as?: keyof JSX.IntrinsicElements;
    disallowBottom?: boolean;
    disallowLeft?: boolean;
    disallowRight?: boolean;
    disallowTop?: boolean;
}
export interface ResizeTemplateCornerProps extends HTMLAttributes<HTMLElement> {
    as?: keyof JSX.IntrinsicElements;
    disallowHorizontal?: boolean;
    disallowVertical?: boolean;
}
