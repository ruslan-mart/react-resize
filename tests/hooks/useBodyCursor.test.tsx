import React from 'react';
import { render } from '@testing-library/react';

import { useBodyCursor } from '../../src/hooks/useBodyCursor';

test('Check body cursor', () => {
  const Component = () => {
    useBodyCursor('n-resize');

    return null;
  };

  const renderResult = render(<Component />);

  const element = document.body;

  expect(window.getComputedStyle(element).cursor).toBe('n-resize');

  renderResult.unmount();

  expect(window.getComputedStyle(element).cursor).toBe('');
});
