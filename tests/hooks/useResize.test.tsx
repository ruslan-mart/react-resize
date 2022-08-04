import React, { CSSProperties, useRef } from 'react';
import { fireEvent, render } from '@testing-library/react';

import { useResize } from '../../src/hooks/useResize';
import { ResizeDirection, ResizeOrigin } from '../../src';
import { parseCurrentRect } from '../../src/helpers/parseCurrentRect';

const waitRAF = () => new Promise((resolve) => requestAnimationFrame(resolve));

describe('Check resizing in all directions', () => {
  const dataMock = Object.freeze({
    initialHeight: 300,
    initialLeft: 50,
    initialTop: 120,
    initialWidth: 400,
    moveX: 100,
    moveY: 200,
    startX: 80,
    startY: 90,
  });

  const styleMock: CSSProperties = {
    height: `${dataMock.initialHeight}px`,
    left: `${dataMock.initialLeft}px`,
    position: `absolute`,
    top: `${dataMock.initialTop}px`,
    width: `${dataMock.initialWidth}px`,
  };

  test('Check "bottom" resize by mouse event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.mouseDown(element, {
      clientX: dataMock.startX,
      clientY: dataMock.startY,
    });

    fireEvent.mouseMove(document, {
      clientX: dataMock.moveX,
      clientY: dataMock.moveY,
    });

    fireEvent.mouseUp(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.initialHeight + dataMock.moveY - dataMock.startY);
    expect(currentRect.width).toBe(dataMock.initialWidth);
    expect(currentRect.x).toBe(dataMock.initialLeft);
    expect(currentRect.y).toBe(dataMock.initialTop);
  });

  test('Check "bottom" resize by touch event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.touchStart(element, {
      touches: [
        {
          clientX: dataMock.startX,
          clientY: dataMock.startY,
        },
      ],
    });

    fireEvent.touchMove(document, {
      touches: [
        {
          clientX: dataMock.moveX,
          clientY: dataMock.moveY,
        },
      ],
    });

    fireEvent.touchEnd(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.initialHeight + dataMock.moveY - dataMock.startY);
    expect(currentRect.width).toBe(dataMock.initialWidth);
    expect(currentRect.x).toBe(dataMock.initialLeft);
    expect(currentRect.y).toBe(dataMock.initialTop);
  });

  test('Check "left" resize by mouse event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.LEFT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.mouseDown(element, {
      clientX: dataMock.startX,
      clientY: dataMock.startY,
    });

    fireEvent.mouseMove(document, {
      clientX: dataMock.moveX,
      clientY: dataMock.moveY,
    });

    fireEvent.mouseUp(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.initialHeight);
    expect(currentRect.width).toBe(dataMock.initialWidth - (dataMock.moveX - dataMock.startX));
    expect(currentRect.x).toBe(dataMock.initialLeft + dataMock.moveX - dataMock.startX);
    expect(currentRect.y).toBe(dataMock.initialTop);
  });

  test('Check "left" resize by touch event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.LEFT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.touchStart(element, {
      touches: [
        {
          clientX: dataMock.startX,
          clientY: dataMock.startY,
        },
      ],
    });

    fireEvent.touchMove(document, {
      touches: [
        {
          clientX: dataMock.moveX,
          clientY: dataMock.moveY,
        },
      ],
    });

    fireEvent.touchEnd(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.initialHeight);
    expect(currentRect.width).toBe(dataMock.initialWidth - (dataMock.moveX - dataMock.startX));
    expect(currentRect.x).toBe(dataMock.initialLeft + dataMock.moveX - dataMock.startX);
    expect(currentRect.y).toBe(dataMock.initialTop);
  });

  test('Check "right" resize by mouse event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.mouseDown(element, {
      clientX: dataMock.startX,
      clientY: dataMock.startY,
    });

    fireEvent.mouseMove(document, {
      clientX: dataMock.moveX,
      clientY: dataMock.moveY,
    });

    fireEvent.mouseUp(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.initialHeight);
    expect(currentRect.width).toBe(dataMock.initialWidth + dataMock.moveX - dataMock.startX);
    expect(currentRect.x).toBe(dataMock.initialLeft);
    expect(currentRect.y).toBe(dataMock.initialTop);
  });

  test('Check "right" resize by touch event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.touchStart(element, {
      touches: [
        {
          clientX: dataMock.startX,
          clientY: dataMock.startY,
        },
      ],
    });

    fireEvent.touchMove(document, {
      touches: [
        {
          clientX: dataMock.moveX,
          clientY: dataMock.moveY,
        },
      ],
    });

    fireEvent.touchEnd(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.initialHeight);
    expect(currentRect.width).toBe(dataMock.initialWidth + dataMock.moveX - dataMock.startX);
    expect(currentRect.x).toBe(dataMock.initialLeft);
    expect(currentRect.y).toBe(dataMock.initialTop);
  });

  test('Check "top" resize by mouse event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.TOP)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.mouseDown(element, {
      clientX: dataMock.startX,
      clientY: dataMock.startY,
    });

    fireEvent.mouseMove(document, {
      clientX: dataMock.moveX,
      clientY: dataMock.moveY,
    });

    fireEvent.mouseUp(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.initialHeight - (dataMock.moveY - dataMock.startY));
    expect(currentRect.width).toBe(dataMock.initialWidth);
    expect(currentRect.x).toBe(dataMock.initialLeft);
    expect(currentRect.y).toBe(dataMock.initialTop + dataMock.moveY - dataMock.startY);
  });

  test('Check "top" resize by touch event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.TOP)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.touchStart(element, {
      touches: [
        {
          clientX: dataMock.startX,
          clientY: dataMock.startY,
        },
      ],
    });

    fireEvent.touchMove(document, {
      touches: [
        {
          clientX: dataMock.moveX,
          clientY: dataMock.moveY,
        },
      ],
    });

    fireEvent.touchEnd(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.initialHeight - (dataMock.moveY - dataMock.startY));
    expect(currentRect.width).toBe(dataMock.initialWidth);
    expect(currentRect.x).toBe(dataMock.initialLeft);
    expect(currentRect.y).toBe(dataMock.initialTop + dataMock.moveY - dataMock.startY);
  });

  test('Check "bottomLeft" resize by mouse event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM_LEFT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.mouseDown(element, {
      clientX: dataMock.startX,
      clientY: dataMock.startY,
    });

    fireEvent.mouseMove(document, {
      clientX: dataMock.moveX,
      clientY: dataMock.moveY,
    });

    fireEvent.mouseUp(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.initialHeight + dataMock.moveY - dataMock.startY);
    expect(currentRect.width).toBe(dataMock.initialWidth - (dataMock.moveX - dataMock.startX));
    expect(currentRect.x).toBe(dataMock.initialLeft + dataMock.moveX - dataMock.startX);
    expect(currentRect.y).toBe(dataMock.initialTop);
  });

  test('Check "bottomLeft" resize by touch event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM_LEFT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.touchStart(element, {
      touches: [
        {
          clientX: dataMock.startX,
          clientY: dataMock.startY,
        },
      ],
    });

    fireEvent.touchMove(document, {
      touches: [
        {
          clientX: dataMock.moveX,
          clientY: dataMock.moveY,
        },
      ],
    });

    fireEvent.touchEnd(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.initialHeight + dataMock.moveY - dataMock.startY);
    expect(currentRect.width).toBe(dataMock.initialWidth - (dataMock.moveX - dataMock.startX));
    expect(currentRect.x).toBe(dataMock.initialLeft + dataMock.moveX - dataMock.startX);
    expect(currentRect.y).toBe(dataMock.initialTop);
  });

  test('Check "bottomRight" resize by mouse event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.mouseDown(element, {
      clientX: dataMock.startX,
      clientY: dataMock.startY,
    });

    fireEvent.mouseMove(document, {
      clientX: dataMock.moveX,
      clientY: dataMock.moveY,
    });

    fireEvent.mouseUp(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.initialHeight + dataMock.moveY - dataMock.startY);
    expect(currentRect.width).toBe(dataMock.initialWidth + dataMock.moveX - dataMock.startX);
    expect(currentRect.x).toBe(dataMock.initialLeft);
    expect(currentRect.y).toBe(dataMock.initialTop);
  });

  test('Check "bottomRight" resize by touch event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.touchStart(element, {
      touches: [
        {
          clientX: dataMock.startX,
          clientY: dataMock.startY,
        },
      ],
    });

    fireEvent.touchMove(document, {
      touches: [
        {
          clientX: dataMock.moveX,
          clientY: dataMock.moveY,
        },
      ],
    });

    fireEvent.touchEnd(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.initialHeight + dataMock.moveY - dataMock.startY);
    expect(currentRect.width).toBe(dataMock.initialWidth + dataMock.moveX - dataMock.startX);
    expect(currentRect.x).toBe(dataMock.initialLeft);
    expect(currentRect.y).toBe(dataMock.initialTop);
  });

  test('Check "topLeft" resize by mouse event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.TOP_LEFT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.mouseDown(element, {
      clientX: dataMock.startX,
      clientY: dataMock.startY,
    });

    fireEvent.mouseMove(document, {
      clientX: dataMock.moveX,
      clientY: dataMock.moveY,
    });

    fireEvent.mouseUp(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.initialHeight - (dataMock.moveY - dataMock.startY));
    expect(currentRect.width).toBe(dataMock.initialWidth - (dataMock.moveX - dataMock.startX));
    expect(currentRect.x).toBe(dataMock.initialLeft + dataMock.moveX - dataMock.startX);
    expect(currentRect.y).toBe(dataMock.initialTop + dataMock.moveY - dataMock.startY);
  });

  test('Check "topLeft" resize by touch event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.TOP_LEFT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.touchStart(element, {
      touches: [
        {
          clientX: dataMock.startX,
          clientY: dataMock.startY,
        },
      ],
    });

    fireEvent.touchMove(document, {
      touches: [
        {
          clientX: dataMock.moveX,
          clientY: dataMock.moveY,
        },
      ],
    });

    fireEvent.touchEnd(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.initialHeight - (dataMock.moveY - dataMock.startY));
    expect(currentRect.width).toBe(dataMock.initialWidth - (dataMock.moveX - dataMock.startX));
    expect(currentRect.x).toBe(dataMock.initialLeft + dataMock.moveX - dataMock.startX);
    expect(currentRect.y).toBe(dataMock.initialTop + dataMock.moveY - dataMock.startY);
  });

  test('Check "topRight" resize by mouse event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.TOP_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.mouseDown(element, {
      clientX: dataMock.startX,
      clientY: dataMock.startY,
    });

    fireEvent.mouseMove(document, {
      clientX: dataMock.moveX,
      clientY: dataMock.moveY,
    });

    fireEvent.mouseUp(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.initialHeight - (dataMock.moveY - dataMock.startY));
    expect(currentRect.width).toBe(dataMock.initialWidth + dataMock.moveX - dataMock.startX);
    expect(currentRect.x).toBe(dataMock.initialLeft);
    expect(currentRect.y).toBe(dataMock.initialTop + dataMock.moveY - dataMock.startY);
  });

  test('Check "topRight" resize by touch event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.TOP_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.touchStart(element, {
      touches: [
        {
          clientX: dataMock.startX,
          clientY: dataMock.startY,
        },
      ],
    });

    fireEvent.touchMove(document, {
      touches: [
        {
          clientX: dataMock.moveX,
          clientY: dataMock.moveY,
        },
      ],
    });

    fireEvent.touchEnd(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.initialHeight - (dataMock.moveY - dataMock.startY));
    expect(currentRect.width).toBe(dataMock.initialWidth + dataMock.moveX - dataMock.startX);
    expect(currentRect.x).toBe(dataMock.initialLeft);
    expect(currentRect.y).toBe(dataMock.initialTop + dataMock.moveY - dataMock.startY);
  });
});

describe('Check with disabled state', () => {
  const dataMock = Object.freeze({
    initialHeight: 300,
    initialLeft: 50,
    initialTop: 120,
    initialWidth: 400,
    moveX: 100,
    moveY: 200,
    startX: 80,
    startY: 90,
  });

  const styleMock: CSSProperties = {
    height: `${dataMock.initialHeight}px`,
    left: `${dataMock.initialLeft}px`,
    position: `absolute`,
    top: `${dataMock.initialTop}px`,
    width: `${dataMock.initialWidth}px`,
  };

  test('Check that the size is not changed by mouse event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
        disabled: true,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.TOP_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.mouseDown(element, {
      clientX: dataMock.startX,
      clientY: dataMock.startY,
    });

    fireEvent.mouseMove(document, {
      clientX: dataMock.moveX,
      clientY: dataMock.moveY,
    });

    fireEvent.mouseUp(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.initialHeight);
    expect(currentRect.width).toBe(dataMock.initialWidth);
    expect(currentRect.x).toBe(dataMock.initialLeft);
    expect(currentRect.y).toBe(dataMock.initialTop);
  });

  test('Check that the size is not changed by touch event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
        disabled: true,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.TOP_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.touchStart(element, {
      touches: [
        {
          clientX: dataMock.startX,
          clientY: dataMock.startY,
        },
      ],
    });

    fireEvent.touchMove(document, {
      touches: [
        {
          clientX: dataMock.moveX,
          clientY: dataMock.moveY,
        },
      ],
    });

    fireEvent.touchEnd(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.initialHeight);
    expect(currentRect.width).toBe(dataMock.initialWidth);
    expect(currentRect.x).toBe(dataMock.initialLeft);
    expect(currentRect.y).toBe(dataMock.initialTop);
  });

  test('Check that event handlers are not called by mouse event', async () => {
    const handleResizeMock = jest.fn();
    const handleResizeEndMock = jest.fn();
    const handleResizeStartMock = jest.fn();

    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
        disabled: true,
        onResize: handleResizeMock,
        onResizeEnd: handleResizeEndMock,
        onResizeStart: handleResizeStartMock,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.TOP_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.mouseDown(element, {
      clientX: dataMock.startX,
      clientY: dataMock.startY,
    });

    fireEvent.mouseMove(document, {
      clientX: dataMock.moveX,
      clientY: dataMock.moveY,
    });

    fireEvent.mouseUp(document);

    await waitRAF();

    expect(handleResizeMock).toHaveBeenCalledTimes(0);
    expect(handleResizeEndMock).toHaveBeenCalledTimes(0);
    expect(handleResizeStartMock).toHaveBeenCalledTimes(0);
  });

  test('Check that event handlers are not called by touch event', async () => {
    const handleResizeMock = jest.fn();
    const handleResizeEndMock = jest.fn();
    const handleResizeStartMock = jest.fn();

    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
        disabled: true,
        onResize: handleResizeMock,
        onResizeEnd: handleResizeEndMock,
        onResizeStart: handleResizeStartMock,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.TOP_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.touchStart(element, {
      touches: [
        {
          clientX: dataMock.startX,
          clientY: dataMock.startY,
        },
      ],
    });

    fireEvent.touchMove(document, {
      touches: [
        {
          clientX: dataMock.moveX,
          clientY: dataMock.moveY,
        },
      ],
    });

    fireEvent.touchEnd(document);

    await waitRAF();

    expect(handleResizeMock).toHaveBeenCalledTimes(0);
    expect(handleResizeEndMock).toHaveBeenCalledTimes(0);
    expect(handleResizeStartMock).toHaveBeenCalledTimes(0);
  });
});

describe('Check width/height for min/max values', () => {
  const dataMock = Object.freeze({
    initialHeight: 300,
    initialWidth: 400,
    maxHeight: 600,
    maxWidth: 800,
    minHeight: 150,
    minWidth: 200,
    maxOffset: 1000,
    minOffset: 500,
  });

  const styleMock: CSSProperties = {
    height: `${dataMock.initialHeight}px`,
    position: `absolute`,
    width: `${dataMock.initialWidth}px`,
  };

  test('Check default minWidth/minHeight by mouse event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.mouseDown(element, {
      clientX: dataMock.minOffset,
      clientY: dataMock.minOffset,
    });

    fireEvent.mouseMove(document, {
      clientX: 0,
      clientY: 0,
    });

    fireEvent.mouseUp(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(0);
    expect(currentRect.width).toBe(0);
  });

  test('Check default minWidth/minHeight by touch event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.touchStart(element, {
      touches: [
        {
          clientX: dataMock.minOffset,
          clientY: dataMock.minOffset,
        },
      ],
    });

    fireEvent.touchMove(document, {
      touches: [
        {
          clientX: 0,
          clientY: 0,
        },
      ],
    });

    fireEvent.touchEnd(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(0);
    expect(currentRect.width).toBe(0);
  });

  test('Check custom minWidth/minHeight by mouse event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
        minHeight: dataMock.minHeight,
        minWidth: dataMock.minWidth,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.mouseDown(element, {
      clientX: dataMock.minOffset,
      clientY: dataMock.minOffset,
    });

    fireEvent.mouseMove(document, {
      clientX: 0,
      clientY: 0,
    });

    fireEvent.mouseUp(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.minHeight);
    expect(currentRect.width).toBe(dataMock.minWidth);
  });

  test('Check custom minWidth/minHeight by touch event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
        minHeight: dataMock.minHeight,
        minWidth: dataMock.minWidth,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.touchStart(element, {
      touches: [
        {
          clientX: dataMock.minOffset,
          clientY: dataMock.minOffset,
        },
      ],
    });

    fireEvent.touchMove(document, {
      touches: [
        {
          clientX: 0,
          clientY: 0,
        },
      ],
    });

    fireEvent.touchEnd(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.minHeight);
    expect(currentRect.width).toBe(dataMock.minWidth);
  });

  test('Check custom maxWidth/maxHeight by mouse event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
        maxHeight: dataMock.maxHeight,
        maxWidth: dataMock.maxWidth,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.mouseDown(element, {
      clientX: 0,
      clientY: 0,
    });

    fireEvent.mouseMove(document, {
      clientX: dataMock.maxOffset,
      clientY: dataMock.maxOffset,
    });

    fireEvent.mouseUp(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.maxHeight);
    expect(currentRect.width).toBe(dataMock.maxWidth);
  });

  test('Check custom maxWidth/maxHeight by touch event', async () => {
    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
        maxHeight: dataMock.maxHeight,
        maxWidth: dataMock.maxWidth,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.touchStart(element, {
      touches: [
        {
          clientX: 0,
          clientY: 0,
        },
      ],
    });

    fireEvent.touchMove(document, {
      touches: [
        {
          clientX: dataMock.maxOffset,
          clientY: dataMock.maxOffset,
        },
      ],
    });

    fireEvent.touchEnd(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.maxHeight);
    expect(currentRect.width).toBe(dataMock.maxWidth);
  });
});

describe('Check event handlers', () => {
  const dataMock = Object.freeze({
    initialHeight: 300,
    initialLeft: 50,
    initialTop: 120,
    initialWidth: 400,
    maxHeight: 600,
    maxOffset: 1000,
    maxWidth: 800,
    minHeight: 150,
    minOffset: 500,
    minWidth: 200,
    moveX: 100,
    moveY: 200,
    overwriteHeight: 600,
    overwriteWidth: 800,
    startX: 80,
    startY: 90,
  });

  const styleMock: CSSProperties = {
    height: `${dataMock.initialHeight}px`,
    left: `${dataMock.initialLeft}px`,
    position: `absolute`,
    top: `${dataMock.initialTop}px`,
    width: `${dataMock.initialWidth}px`,
  };

  test('Check onResize, onResizeStart and onResizeEnd handlers by mouse event', async () => {
    const handleResizeMock = jest.fn();
    const handleResizeEndMock = jest.fn();
    const handleResizeStartMock = jest.fn();

    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
        onResize: handleResizeMock,
        onResizeEnd: handleResizeEndMock,
        onResizeStart: handleResizeStartMock,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.mouseDown(element, {
      clientX: dataMock.startX,
      clientY: dataMock.startY,
    });

    fireEvent.mouseMove(document, {
      clientX: dataMock.moveX,
      clientY: dataMock.moveY,
    });

    fireEvent.mouseUp(document);

    await waitRAF();

    const expectedHandlerOptions = {
      direction: ResizeDirection.BOTTOM_RIGHT,
      origin: ResizeOrigin.MOUSE,
      side: {
        bottom: true,
        left: false,
        right: true,
        top: false,
      },
      x: dataMock.initialLeft,
      y: dataMock.initialTop,
    };

    expect(handleResizeMock).toHaveBeenCalledTimes(1);
    expect(handleResizeMock).toHaveBeenCalledWith({
      ...expectedHandlerOptions,
      height: dataMock.initialHeight + dataMock.moveY - dataMock.startY,
      width: dataMock.initialWidth + dataMock.moveX - dataMock.startX,
    });

    expect(handleResizeEndMock).toHaveBeenCalledTimes(1);
    expect(handleResizeEndMock).toHaveBeenCalledWith({
      ...expectedHandlerOptions,
      height: dataMock.initialHeight + dataMock.moveY - dataMock.startY,
      width: dataMock.initialWidth + dataMock.moveX - dataMock.startX,
    });

    expect(handleResizeStartMock).toHaveBeenCalledTimes(1);
    expect(handleResizeStartMock).toHaveBeenCalledWith({
      ...expectedHandlerOptions,
      height: dataMock.initialHeight,
      width: dataMock.initialWidth,
    });
  });

  test('Check onResize, onResizeStart and onResizeEnd handlers by touch event', async () => {
    const handleResizeMock = jest.fn();
    const handleResizeEndMock = jest.fn();
    const handleResizeStartMock = jest.fn();

    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
        onResize: handleResizeMock,
        onResizeEnd: handleResizeEndMock,
        onResizeStart: handleResizeStartMock,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.touchStart(element, {
      touches: [
        {
          clientX: dataMock.startX,
          clientY: dataMock.startY,
        },
      ],
    });

    fireEvent.touchMove(document, {
      touches: [
        {
          clientX: dataMock.moveX,
          clientY: dataMock.moveY,
        },
      ],
    });

    fireEvent.touchEnd(document);

    await waitRAF();

    const expectedHandlerOptions = {
      direction: ResizeDirection.BOTTOM_RIGHT,
      origin: ResizeOrigin.TOUCH,
      side: {
        bottom: true,
        left: false,
        right: true,
        top: false,
      },
      x: dataMock.initialLeft,
      y: dataMock.initialTop,
    };

    expect(handleResizeMock).toHaveBeenCalledTimes(1);
    expect(handleResizeMock).toHaveBeenCalledWith({
      ...expectedHandlerOptions,
      height: dataMock.initialHeight + dataMock.moveY - dataMock.startY,
      width: dataMock.initialWidth + dataMock.moveX - dataMock.startX,
    });

    expect(handleResizeEndMock).toHaveBeenCalledTimes(1);
    expect(handleResizeEndMock).toHaveBeenCalledWith({
      ...expectedHandlerOptions,
      height: dataMock.initialHeight + dataMock.moveY - dataMock.startY,
      width: dataMock.initialWidth + dataMock.moveX - dataMock.startX,
    });

    expect(handleResizeStartMock).toHaveBeenCalledTimes(1);
    expect(handleResizeStartMock).toHaveBeenCalledWith({
      ...expectedHandlerOptions,
      height: dataMock.initialHeight,
      width: dataMock.initialWidth,
    });
  });

  test('Check for overwriting of coordinates from the handler by mouse event', async () => {
    const handleResizeMock = jest.fn().mockReturnValue({
      height: dataMock.overwriteHeight,
      width: dataMock.overwriteWidth,
    });

    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
        onResize: handleResizeMock,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.mouseDown(element, {
      clientX: dataMock.startX,
      clientY: dataMock.startY,
    });

    fireEvent.mouseMove(document, {
      clientX: dataMock.moveX,
      clientY: dataMock.moveY,
    });

    fireEvent.mouseUp(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.overwriteHeight);
    expect(currentRect.width).toBe(dataMock.overwriteWidth);
  });

  test('Check for overwriting of coordinates from the handler by touch event', async () => {
    const handleResizeMock = jest.fn().mockReturnValue({
      height: dataMock.overwriteHeight,
      width: dataMock.overwriteWidth,
    });

    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
        onResize: handleResizeMock,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.touchStart(element, {
      touches: [
        {
          clientX: dataMock.startX,
          clientY: dataMock.startY,
        },
      ],
    });

    fireEvent.touchMove(document, {
      touches: [
        {
          clientX: dataMock.moveX,
          clientY: dataMock.moveY,
        },
      ],
    });

    fireEvent.touchEnd(document);

    await waitRAF();

    const currentRect = parseCurrentRect(element.parentElement!);

    expect(currentRect.height).toBe(dataMock.overwriteHeight);
    expect(currentRect.width).toBe(dataMock.overwriteWidth);
  });

  test('Check onResizeMin handler by mouse event', async () => {
    const handleResizeMin = jest.fn();

    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
        minHeight: dataMock.minHeight,
        minWidth: dataMock.minWidth,
        onResizeMin: handleResizeMin,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.mouseDown(element, {
      clientX: dataMock.minOffset,
      clientY: dataMock.minOffset,
    });

    fireEvent.mouseMove(document, {
      clientX: 0,
      clientY: 0,
    });

    fireEvent.mouseUp(document);

    await waitRAF();

    const expectedHandlerOptions = {
      axis: {
        height: true,
        width: true,
      },
      direction: ResizeDirection.BOTTOM_RIGHT,
      height: dataMock.minHeight,
      origin: ResizeOrigin.MOUSE,
      side: {
        bottom: true,
        left: false,
        right: true,
        top: false,
      },
      width: dataMock.minWidth,
      x: dataMock.initialLeft,
      y: dataMock.initialTop,
    };

    expect(handleResizeMin).toHaveBeenCalledTimes(1);
    expect(handleResizeMin).toHaveBeenCalledWith(expectedHandlerOptions);
  });

  test('Check onResizeMin handler by touch event', async () => {
    const handleResizeMin = jest.fn();

    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
        minHeight: dataMock.minHeight,
        minWidth: dataMock.minWidth,
        onResizeMin: handleResizeMin,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.touchStart(element, {
      touches: [
        {
          clientX: dataMock.minOffset,
          clientY: dataMock.minOffset,
        },
      ],
    });

    fireEvent.touchMove(document, {
      touches: [
        {
          clientX: 0,
          clientY: 0,
        },
      ],
    });

    fireEvent.touchEnd(document);

    await waitRAF();

    const expectedHandlerOptions = {
      axis: {
        height: true,
        width: true,
      },
      direction: ResizeDirection.BOTTOM_RIGHT,
      height: dataMock.minHeight,
      origin: ResizeOrigin.TOUCH,
      side: {
        bottom: true,
        left: false,
        right: true,
        top: false,
      },
      width: dataMock.minWidth,
      x: dataMock.initialLeft,
      y: dataMock.initialTop,
    };

    expect(handleResizeMin).toHaveBeenCalledTimes(1);
    expect(handleResizeMin).toHaveBeenCalledWith(expectedHandlerOptions);
  });

  test('Check onResizeMax handler by mouse event', async () => {
    const handleResizeMax = jest.fn();

    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
        maxHeight: dataMock.maxHeight,
        maxWidth: dataMock.maxWidth,
        onResizeMax: handleResizeMax,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.mouseDown(element, {
      clientX: 0,
      clientY: 0,
    });

    fireEvent.mouseMove(document, {
      clientX: dataMock.maxOffset,
      clientY: dataMock.maxOffset,
    });

    fireEvent.mouseUp(document);

    await waitRAF();

    const expectedHandlerOptions = {
      axis: {
        height: true,
        width: true,
      },
      direction: ResizeDirection.BOTTOM_RIGHT,
      height: dataMock.maxHeight,
      origin: ResizeOrigin.MOUSE,
      side: {
        bottom: true,
        left: false,
        right: true,
        top: false,
      },
      width: dataMock.maxWidth,
      x: dataMock.initialLeft,
      y: dataMock.initialTop,
    };

    expect(handleResizeMax).toHaveBeenCalledTimes(1);
    expect(handleResizeMax).toHaveBeenCalledWith(expectedHandlerOptions);
  });

  test('Check onResizeMax handler by touch event', async () => {
    const handleResizeMax = jest.fn();

    const Component = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      const { attachPoint } = useResize({
        containerRef,
        maxHeight: dataMock.maxHeight,
        maxWidth: dataMock.maxWidth,
        onResizeMax: handleResizeMax,
      });

      return (
        <div ref={containerRef} style={styleMock}>
          <div {...attachPoint(ResizeDirection.BOTTOM_RIGHT)}>Point</div>
        </div>
      );
    };

    const renderResult = render(<Component />);

    const element = renderResult.getByText('Point');

    fireEvent.touchStart(element, {
      touches: [
        {
          clientX: 0,
          clientY: 0,
        },
      ],
    });

    fireEvent.touchMove(document, {
      touches: [
        {
          clientX: dataMock.maxOffset,
          clientY: dataMock.maxOffset,
        },
      ],
    });

    fireEvent.touchEnd(document);

    await waitRAF();

    const expectedHandlerOptions = {
      axis: {
        height: true,
        width: true,
      },
      direction: ResizeDirection.BOTTOM_RIGHT,
      height: dataMock.maxHeight,
      origin: ResizeOrigin.TOUCH,
      side: {
        bottom: true,
        left: false,
        right: true,
        top: false,
      },
      width: dataMock.maxWidth,
      x: dataMock.initialLeft,
      y: dataMock.initialTop,
    };

    expect(handleResizeMax).toHaveBeenCalledTimes(1);
    expect(handleResizeMax).toHaveBeenCalledWith(expectedHandlerOptions);
  });
});
