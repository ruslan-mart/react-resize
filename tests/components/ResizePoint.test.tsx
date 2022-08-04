import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { Resizable, ResizeDirection, ResizePoint } from '../../src';

describe('Check correct render', () => {
  test('Check render inside "Resizable"', () => {
    const consoleWarnMock = jest.spyOn(console, 'warn');

    consoleWarnMock.mockImplementation();

    render(
      <Resizable>
        <ResizePoint direction={ResizeDirection.BOTTOM_RIGHT} />
      </Resizable>
    );

    expect(consoleWarnMock).toHaveBeenCalledTimes(0);

    consoleWarnMock.mockRestore();
  });

  test('Check render outside "Resizable"', () => {
    const consoleWarnMock = jest.spyOn(console, 'warn');

    consoleWarnMock.mockImplementation();

    render(<ResizePoint direction={ResizeDirection.BOTTOM_RIGHT} />);

    expect(consoleWarnMock).toHaveBeenCalledTimes(1);

    consoleWarnMock.mockRestore();
  });
});

describe('Check "as" prop', () => {
  test('Check default tagName', () => {
    const renderResult = render(
      <Resizable>
        <ResizePoint direction={ResizeDirection.BOTTOM_RIGHT}>Point</ResizePoint>
      </Resizable>
    );

    const element = renderResult.getByText('Point');

    expect(element.tagName).toBe('DIV');
  });

  test('Check custom tagName', () => {
    const renderResult = render(
      <Resizable>
        <ResizePoint as="span" direction={ResizeDirection.BOTTOM_RIGHT}>
          Point
        </ResizePoint>
      </Resizable>
    );

    const element = renderResult.getByText('Point');

    expect(element.tagName).toBe('SPAN');
  });
});

describe('Check that base events are not overridden', () => {
  test('Check mouseDown event', () => {
    const handleMouseDownMock = jest.fn();

    const renderResult = render(
      <Resizable>
        <ResizePoint direction={ResizeDirection.BOTTOM_RIGHT} onMouseDown={handleMouseDownMock}>
          Point
        </ResizePoint>
      </Resizable>
    );

    const element = renderResult.getByText('Point');

    fireEvent.mouseDown(element, {
      clientX: 0,
      clientY: 0,
    });

    expect(handleMouseDownMock).toHaveBeenCalledTimes(1);
  });

  test('Check touchStart event', () => {
    const handleTouchStartMock = jest.fn();

    const renderResult = render(
      <Resizable>
        <ResizePoint direction={ResizeDirection.BOTTOM_RIGHT} onTouchStart={handleTouchStartMock}>
          Point
        </ResizePoint>
      </Resizable>
    );

    const element = renderResult.getByText('Point');

    fireEvent.touchStart(element, {
      touches: [
        {
          clientX: 0,
          clientY: 0,
        },
      ],
    });

    expect(handleTouchStartMock).toHaveBeenCalledTimes(1);
  });
});
