import React from 'react';
import { render } from '@testing-library/react';

import { useIframeSkipEvents } from '../../src/hooks/useIframeSkipEvents';

test('Check iframe pointer-events', () => {
  const Component = () => {
    useIframeSkipEvents(true);

    return <iframe title="iframe" />;
  };

  const renderResult = render(<Component />);

  const element = renderResult.getByTitle('iframe');

  expect(window.getComputedStyle(element).pointerEvents).toBe('none');

  renderResult.unmount();

  expect(window.getComputedStyle(element).pointerEvents).toBe('');
});
