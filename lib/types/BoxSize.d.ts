export interface BoxSizeProps {
    /**
     * Optional prop that sets maximum height values when the element is «resizable».
     * @see https://github.com/ruslan-mart/react-resize#min-and-max-size-usage
     */
    maxHeight?: number;
    /**
     * Optional prop that sets maximum width values when the element is «resizable».
     * @see https://github.com/ruslan-mart/react-resize#min-and-max-size-usage
     */
    maxWidth?: number;
    /**
     * Optional prop that sets minimum height values when the element is «resizable».
     * @see https://github.com/ruslan-mart/react-resize#min-and-max-size-usage
     */
    minHeight?: number;
    /**
     * Optional prop that sets minimum width values when the element is «resizable».
     * @see https://github.com/ruslan-mart/react-resize#min-and-max-size-usage
     */
    minWidth?: number;
}
