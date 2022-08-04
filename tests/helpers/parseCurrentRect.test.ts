import { parseCurrentRect } from '../../src/helpers/parseCurrentRect';

test('Check rect values', () => {
  const element = document.createElement('div');

  element.style.height = '100px';
  element.style.left = '50px';
  element.style.top = '150px';
  element.style.width = '200px';

  document.body.appendChild(element);

  expect(parseCurrentRect(element)).toEqual({
    height: 100,
    width: 200,
    x: 50,
    y: 150,
  });
});
