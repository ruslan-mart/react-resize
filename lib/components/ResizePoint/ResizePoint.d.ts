import React from 'react';
import type { ResizePointProps } from './types';
/**
 * This component is a trigger for changing the size of `Resizable` container.
 * Use this component only inside `<Resizable>`.
 * @see https://github.com/ruslan-mart/react-resize#resizepoint-component
 * @see https://github.com/ruslan-mart/react-resize#resizepoint-usage
 */
export declare const ResizePoint: React.ForwardRefExoticComponent<ResizePointProps & React.RefAttributes<HTMLElement>>;
export type { ResizePointProps };
