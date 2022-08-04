import React from 'react';
import { render } from '@testing-library/react';

import { Resizable, ResizableTemplate } from '../../src';

describe('Check "as" prop', () => {
  test('Check default tagName at "AllSide" template', () => {
    const renderResult = render(
      <Resizable>
        <ResizableTemplate.AllSide title="Point" />
      </Resizable>
    );

    const element = renderResult.getByTitle('Point');

    expect(element.tagName).toBe('DIV');
  });

  test('Check default tagName at "Corner" template', () => {
    const renderResult = render(
      <Resizable>
        <ResizableTemplate.Corner>Point</ResizableTemplate.Corner>
      </Resizable>
    );

    const element = renderResult.getByText('Point');

    expect(element.tagName).toBe('DIV');
  });

  test('Check custom tagName at "AllSide" template', () => {
    const renderResult = render(
      <Resizable>
        <ResizableTemplate.AllSide as="span" title="Point" />
      </Resizable>
    );

    const element = renderResult.getByTitle('Point');

    expect(element.tagName).toBe('SPAN');
  });

  test('Check custom tagName at "Corner" template', () => {
    const renderResult = render(
      <Resizable>
        <ResizableTemplate.Corner as="span">Point</ResizableTemplate.Corner>
      </Resizable>
    );

    const element = renderResult.getByText('Point');

    expect(element.tagName).toBe('SPAN');
  });
});
