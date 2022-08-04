import React from 'react';
import type { ResizeTemplateAllSideProps, ResizeTemplateCornerProps } from './types';
/**
 * This component is a template that creates a set of trigger points for the change of the element's size at all sides (including corners).
 * Use this component only inside `<Resizable>`.
 * @see https://github.com/ruslan-mart/react-resize#resizetemplateallside-component
 * @see https://github.com/ruslan-mart/react-resize#resizetemplateallside-usage
 */
export declare const AllSide: React.ForwardRefExoticComponent<ResizeTemplateAllSideProps & React.RefAttributes<HTMLElement>>;
/**
 * This component is a template that creates a trigger point for the change of the element's size.
 * An element «corner» will be used as interactive element in the bottom-right corner of the parent element.
 * @see https://github.com/ruslan-mart/react-resize#resizetemplatecorner-component
 * @see https://github.com/ruslan-mart/react-resize#resizetemplatecorner-usage
 */
export declare const Corner: React.ForwardRefExoticComponent<ResizeTemplateCornerProps & React.RefAttributes<HTMLElement>>;
