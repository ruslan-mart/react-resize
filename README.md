# react-resize

<p align="center">
  <br>
  <br>
  <a href="#react-resize">
    <img alt="" src=".assets/logo.svg" width="600">
  </a>
</p>

<p align="center">
  <br>
  <br>
  <br>
  <sup>
    <a href="https://github.com/ruslan-mart/react-resize/actions/workflows/publish.yml">
      <img src="https://img.shields.io/github/workflow/status/ruslan-mart/react-resize/CI" alt="npm downloads" />
    </a>
    <a href="https://www.npmjs.com/package/@martdev/react-resize">
       <img src="https://img.shields.io/npm/v/@martdev/react-resize.svg" alt="npm package" />
    </a>
    <a href="https://www.npmjs.com/package/@martdev/react-resize">
       <img src="https://img.shields.io/npm/dw/@martdev/react-resize" alt="npm package" />
    </a>
  </sup>
</p>

---

## Description

This library will help you make your elements resizable inside React.

---

## Installation

```bash
npm install @martdev/react-resize
```

or yarn

```bash
yarn add @martdev/react-resize
```

---

## Syntax

### React Component

```
resizableProps = {
  as? : keyof JSX.IntrinsicElements = 'div',
  disabled? : boolean = false,
  onResizeStart? : (options) => boolean | void,
  onResize? : (options) => boolean | newSize | void,
  onResizeEnd? : (options) => void,
  onResizeMin? : (options) => void,
  onResizeMax? : (options) => void,
}

resizePointProps = {
  as? : keyof JSX.IntrinsicElements = 'div',
  direction: 'bottom' | 'left' | 'right' | 'top' | 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight',
}

<Resizable {...resizableProps}>
  <ResizePoint {...resizePointProps} />
  <ResizePoint {...resizePointProps} />
  <ResizePoint {...resizePointProps} />
  {...}
</Resizable>
```

### React Hook

```
{
  attachPoint: AttachPointHandler,
  currentDirection: 'bottom' | 'left' | 'right' | 'top' | 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight',
  isResizing: boolean,
} = useResize({
  containerRef: RefObject<HTMLElement>,
  disabled?: boolean = false,
  minWidth?: number,
  minHeight?: number,
  maxWidth?: number,
  maxHeight?: number,
  onResizeStart? : (options) => boolean | void,
  onResize? : (options) => boolean | newSize | void,
  onResizeEnd? : (options) => void,
  onResizeMin? : (options) => void,
  onResizeMax? : (options) => void,
})
```

---

## API

### `<Resizable>` component

It is a container component that will be «resizable».

#### `ResizableProps` properties

Extends: `HTMLAttributes<HTMLElement>`, and it means it is capable to transmit any basic properties of HTML-elements (for example, `className`, `role`, `onClick`, `title`, etc.).

The list of props is below:

##### _`as`_

Optional prop that sets an element type (`div`, `span`, `img`, etc.).

Default value: `"div"`

##### _`disabled`_

Optional prop needed for enabling/disabling the element to be «resizable».

Use this prop if you need to disable the element to be «resizable» for some conditions.

Default value: `false`

[See example](#disabled-usage)

##### _`minWidth`_

Optional prop that sets minimum width values when the element is «resizable».

[See example](#min-and-max-size-usage)

##### _`minHeight`_

Optional prop that sets minimum height values when the element is «resizable».

[See example](#min-and-max-size-usage)

##### _`maxWidth`_

Optional prop that sets maximum width values when the element is «resizable».

[See example](#min-and-max-size-usage)

##### _`maxHeight`_

Optional prop that sets maximum height values when the element is «resizable».

[See example](#min-and-max-size-usage)

##### _`onResizeStart`_

Optional function that is an event handler and is called out before the start of «resizable».

It receives following arguments:
+ _`options`_ — see [`ResizeEventOptions`](#resizeeventoptions-object)

Return value variants:
+ _`void`_ — the event will be executed with default values.
+ _`false`_ — use this if you need to abort the element's «resizable».

[See example](#onresizestart-and-onresizeend-usage)

##### _`onResize`_

Optional function that is an event handler and is called out in every change of element's size.

It receives following arguments:
+ _`options`_ — see [`ResizeEventOptions`](#resizeeventoptions-object)

Return value variants:
+ _`void`_ — the event will be executed with default values.
+ _`false`_ — use this if you need to abort the element's «resizable».
+ _`newSize`_ — an object of two numeric values (`width` and `height`), and those contain new values for element's size. If one of the props is not specified, then the current value will be used.

[See example](#onresize-usage)

##### _`onResizeEnd`_

Optional function that is an event handler and is called out after completion of element's «resizable».

It receives following arguments:
+ _`options`_ — see [`ResizeEventOptions`](#resizeeventoptions-object)

Return value variants:
+ _`void`_ — the event will be executed with default values.
+ _there are no more value options available_

[See example](#onresizestart-and-onresizeend-usage)

##### _`onResizeMin`_

Optional function that is an event handler and is called out when the size of the element (width or height) is minimum.

It receives following arguments:
+ _`options`_ — see [`ResizeEventOptionsWithAxis`](#resizeeventoptionswithaxis-object)

Return value variants:
+ _`void`_ — the event will be executed with default values.
+ _there are no more value options available_

[See example](#onresizemin-and-onresizemax-usage)

##### _`onResizeMax`_

Optional function that is an event handler and is called out when the size of the element (width or height) is maximum.

It receives following arguments:
+ _`options`_ — see [`ResizeEventOptionsWithAxis`](#resizeeventoptionswithaxis-object)

Return value variants:
+ _`void`_ — the event will be executed with default values.
+ _there are no more value options available_

[See example](#onresizemin-and-onresizemax-usage)

---

### `<ResizePoint>` component

This component is a trigger for changing the size of `Resizable` container.

Use this component only inside `<Resizable>`.

[See example](#resizepoint-usage)

#### `ResizePointProps` properties

Extends: `HTMLAttributes<HTMLElement>`, and it means it is capable to transmit any basic props of HTML-elements (for example, `className`, `role`, `onClick`, `title`, etc.).

The list of props is below:

##### _`as`_

Optional prop that sets an element type (`div`, `span`, `img`, etc.).

Default value: `"div"`

##### _`direction`_

Required prop that sets the point of direction for changing size of the element.

Variants of values:
+ _`"bottom"`_ — you can change the element's size only in the direction of down and back.
+ _`"left"`_ — you can change the element's size only in the direction of left and back.
+ _`"right"`_ — you can change the element's size only in the direction of right and back.
+ _`"top"`_ — you can change the element's size only in the direction of up and back.
+ _`"bottomLeft"`_ — you can change the element's size only in the direction of bottom-left and back.
+ _`"bottomRight"`_ — you can change the element's size only in the direction of bottom-right and back.
+ _`"topLeft"`_ — you can change the element's size only in the direction of top-left and back.
+ _`"topRight"`_ — you can change the element's size only in the direction of top-right and back.

---

### `<ResizableTemplate.AllSide>` component

This component is a template that creates a set of trigger points for the change of the element's size at all sides (including corners).

Use this component only inside `<Resizable>`.

[See example](#resizetemplateallside-usage)

#### `ResizeTemplateAllSideProps` properties

Extends: `HTMLAttributes<HTMLElement>`, and it means it is capable to transmit any basic props of HTML-elements (for example, `className`, `role`, `onClick`, `title`, etc.).

The list of props is below:

##### _`disallowBottom`_

Optional prop that disallows the change of the element by its bottom side.

Default value: `false`

[See example](#disallow-usage)

##### _`disallowLeft`_

Optional prop that disallows the change of the element by its left side.

Default value: `false`

[See example](#disallow-usage)

##### _`disallowRight`_

Optional prop that disallows the change of the element by its right side.

Default value: `false`

[See example](#disallow-usage)

##### _`disallowRight`_

Optional prop that disallows the change of the element by its top side.

Default value: `false`

[See example](#disallow-usage)

---

### `<ResizableTemplate.Corner>` component

This component is a template that creates a trigger point for the change of the element's size.

An element «corner» will be used as interactive element in the bottom-right corner of the parent element.

Use this component only inside `<Resizable>`.

[See example](#resizetemplatecorner-usage)

#### `ResizeTemplateCornerProps` properties

Extends: `HTMLAttributes<HTMLElement>`, and it means it is capable to transmit any basic props of HTML-elements (for example, `className`, `role`, `onClick`, `title`, etc.).

The list of props is below:

##### _`as`_

Optional prop that sets an element type (`div`, `span`, `img`, etc.).

Default value: `"div"`

##### _`disallowVertical`_

Optional prop that disallows the change of the element in a vertical direction.

Default value: `false`

##### _`disallowHorizontal`_

Optional prop that disallows the change of the element in a horizontal direction.

Default value: `false`

---

### `useResize` hook

This hook will give you opportunity to use the element's «resizable» without usage of integral components.

Use this hook if you want to interact with elements directly and if there is not enough functionality for integral components usage.

[See example](#useresize-hook-base-usage)

#### `UseResizeProps` properties

An object with a list of props, which are stated below:

##### _`containerRef`_

Required prop, which value is a `ref` on container element that will be «resizable».

This value must be created with React hook `useRef` with reference on `HTMLElement`.

##### _`disabled`_

Optional prop needed for enabling/disabling the element to be «resizable».

Use this prop if you need to disable the element to be «resizable» for some conditions.

Default value: `false`

##### _`minWidth`_

Optional prop that sets minimum width values when the element is «resizable».

##### _`minHeight`_

Optional prop that sets minimum height values when the element is «resizable».

##### _`maxWidth`_

Optional prop that sets maximum width values when the element is «resizable».

##### _`maxHeight`_

Optional prop that sets maximum height values when the element is «resizable».

##### _`onResizeStart`_

Optional function that is an event handler and is called out before the start of «resizable».

It receives following arguments:
+ _`options`_ — [`ResizeEventOptions`](#resizeeventoptions-object)

Return value variants:
+ _`void`_ — the event will be executed with default values.
+ _`false`_ — use this if you need to abort the element's «resizable».

##### _`onResize`_

Optional function that is an event handler and is called out in every change of element's size.

It receives following arguments:
+ _`options`_ — [`ResizeEventOptions`](#resizeeventoptions-object)

Return value variants:
+ _`void`_ — the event will be executed with default values.
+ _`false`_ — use this if you need to abort the element's «resizable».
+ _`newSize`_ — an object of two numeric values (`width` and `height`), and those contain new values for element's size. If one of the props is not specified, then the current value will be used.

##### _`onResizeEnd`_

Optional function that is an event handler and is called out after completion of element's «resizable».

It receives following arguments:
+ _`options`_ — [`ResizeEventOptions`](#resizeeventoptions-object)

Return value variants:
+ _`void`_ — the event will be executed with default values.
+ _there are no more value options available_

##### _`onResizeMin`_

Optional function that is an event handler and is called out when the size of the element (width or height) is minimum.

It receives following arguments:
+ _`options`_ — [`ResizeEventOptionsWithAxis`](#resizeeventoptionswithaxis-object)

Return value variants:
+ _`void`_ — the event will be executed with default values.
+ _there are no more value options available_

##### _`onResizeMax`_

Optional function that is an event handler and is called out when the size of the element (width or height) is maximum.

It receives following arguments:
+ _`options`_ — [`ResizeEventOptionsWithAxis`](#resizeeventoptionswithaxis-object)

Return value variants:
+ _`void`_ — the event will be executed with default values.
+ _there are no more value options available_

#### Return value

Returns the object with following props and methods:

##### _`attachPoint`_

A function for attaching trigger points to the element.

It accepts following arguments:
+ _`direction`_ — a direction value for changing the element's size.

##### _`currentDirection`_

A prop which value is the direction of active trigger point.

If there is no active points at the moment, the value type can be `Direction` or `null`.

##### _`isResizing`_

A prop which value is a `boolean` type, that means, is the element in the process of changing its size right now.

---

### `ResizeEventOptions` object

An object of the state that is initialized in result of completion of `onResizeStart`, `onResize` and `onResizeEnd` events.

It contains following props:

##### _`direction`_

A value of direction in which the event is called out.

##### _`origin`_

An origin of called event (`"mouse"` or `"touch"`).

##### _`side`_

An object that contains a map of sides that were used for changing size of the element at the moment when the element is triggered.

+ _`bottom`_ — a `boolean` value that contains `true`, if the element's bottom side is used during the size change.
+ _`left`_ — a `boolean` value that contains `true`, if the element's left side is used during the size change.
+ _`right`_ — a `boolean` value that contains `true`, if the element's right side is used during the size change.
+ _`top`_ — a `boolean` value that contains `true`, if the element's top side is used during the size change.

##### _`x`_

A value of element's current position on the x-axis at the moment of event's call.

##### _`y`_

A value of element's current position on the y-axis at the moment of event's call.

##### _`width`_

A value of element's current width at the moment of event's call.

##### _`height`_

A value of element's current height at the moment of event's call.

### `ResizeEventOptionsWithAxis` object

An object of the state that is initialized in result of completion of `onResizeMin` и `onResizeMax` events.

It contains the same props as `ResizeEventOptions` object, but also has its own props:

##### _`axis`_

An object of two props:
+ _`width`_ — a `boolean` value that contains `true`, if event's call is initialized in result of width minimum/maximum value.
+ _`height`_ — a `boolean` value that contains `true`, if event's call is initialized in result of height minimum/maximum value.

---

## Examples

### `<ResizableTemplate.AllSide>` usage

Example of template's usage for changing size of the element from each of its edges and corners.

There will be a small blue square. Pull the element at any edge or corner to resize.

[Watch demo](https://codepen.io/ruslan-mart/pen/mdxxGXB)

```css
.box {
  background-color: #a9def9;
  height: 240px;
  position: absolute;
  width: 240px;
}
```

```tsx
const App = () => {
  return (
    <Resizable className="box">
      <ResizableTemplate.AllSide />
    </Resizable>
  );
};
```

---

### `<ResizableTemplate.Corner>` usage

Example of template's usage for changing size of the element by a «corner» interactive element.

There will be a small blue square. Pull the element in the bottom-right corner.

[Watch demo](https://codepen.io/ruslan-mart/pen/QWmmVrz)

```css
.box {
  background-color: #a9def9;
  height: 240px;
  position: absolute;
  width: 240px;
}
```

```tsx
const App = () => {
  return (
    <Resizable className="box">
      <ResizableTemplate.Corner />
    </Resizable>
  );
};
```

---

### `<ResizePoint>` usage

Example of usage of `ResizePoint` components for trigger points' customization.

There will be a small blue square. Pull the circle pink points left to right.

[Watch demo](https://codepen.io/ruslan-mart/pen/LYddJBb)

```css
.box {
  background-color: #a9def9;
  height: 240px;
  left: 100px;
  position: absolute;
  top: 100px;
  width: 240px;
}

.point-left,
.point-right {
  background-color: #9F86C0;
  border-radius: 50%;
  bottom: 0;
  height: 24px;
  margin: auto 0;
  position: absolute;
  top: 0;
  width: 24px;
}

.point-left {
  cursor: w-resize;
  left: -12px;
}

.point-right {
  cursor: e-resize;
  right: -12px;
}
```

```tsx
const App = () => {
  return (
    <Resizable className="box">
      <ResizePoint className="point-left" direction="left" />
      <ResizePoint className="point-right" direction="right" />
    </Resizable>
  );
};
```

---

### `useResize` hook base usage

Example that is similar to the previous one, but now used with `useResize` hook.

[Watch demo](https://codepen.io/ruslan-mart/pen/dymmqqW)

```css
.box {
  background-color: #a9def9;
  height: 240px;
  left: 100px;
  position: absolute;
  top: 100px;
  width: 240px;
}

.point-left,
.point-right {
  background-color: #9F86C0;
  border-radius: 50%;
  bottom: 0;
  height: 24px;
  margin: auto 0;
  position: absolute;
  top: 0;
  width: 24px;
}

.point-left {
  cursor: w-resize;
  left: -12px;
}

.point-right {
  cursor: e-resize;
  right: -12px;
}
```

```tsx
const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { attachPoint } = useResize({
    containerRef,
  });

  return (
    <div className="box" ref={containerRef}>
      <div className="point-left" {...attachPoint('left')} />
      <div className="point-right" {...attachPoint('right')} />
    </div>
  );
};
```

---

### `disabled` usage

Example of `disabled` state's usage for `Resizable` container.

Pull any edge or corner to change size. If you tick the «disabled» box, the «resizable» will be disabled.

[Watch demo](https://codepen.io/ruslan-mart/pen/bGvvxmm)

```css
.box {
  align-items: center;
  background-color: #a9def9;
  display: flex;
  height: 240px;
  justify-content: center;
  overflow: hidden;
  position: absolute;
  user-select: none;
  white-space: nowrap;
  width: 240px;
}
```

```tsx
const App = () => {
  const [disabled, setDisabled] = useState(false);

  const handleChange = () => {
    setDisabled((value) => !value);
  };

  return (
    <Resizable className="box" disabled={disabled}>
      <label>
        <input
          type="checkbox"
          checked={disabled}
          onChange={handleChange}
        />
        <span>Disabled</span>
      </label>
      <ResizableTemplate.AllSide />
    </Resizable>
  );
};
```

---

### `disallow*` usage

Example of usage of `disallowBottom`, `disallowLeft`, `disallowRight` and `disallowTop` for a `ResizableTemplate.AllSide` template.

In this example we can fully enable/disable each of the sides.

[Watch demo](https://codepen.io/ruslan-mart/pen/rNddZoV)

```css
.box {
  align-items: center;
  background-color: #a9def9;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
  overflow: hidden;
  position: absolute;
  user-select: none;
  width: 240px;
}

.box label {
  margin: 10px 0;
  white-space: nowrap;
}
```

```tsx
const keys = ['disallowBottom', 'disallowLeft', 'disallowRight', 'disallowTop'];

const initState = () => {
  const map: Record<string, boolean> = {};

  for (let key of keys) {
    map[key] = false;
  }

  return map;
};

const App = () => {
  const [disallows, setDisallows] = useState(initState);

  const handleChange: ChangeEventHandler = (event) => {
    const target = event.target as HTMLInputElement;
    const { key } = target.dataset;

    setDisallows((map) => ({
      ...map,
      [key!]: target.checked,
    }));
  };

  return (
    <Resizable className="box">
      {keys.map((key) => (
        <label key={key}>
          <input
            data-key={key}
            type="checkbox"
            onChange={handleChange}
          />
          <span>{key}</span>
        </label>
      ))}
      <ResizableTemplate.AllSide {...disallows} />
    </Resizable>
  );
};
```

---

### Min and max size usage

Example of usage of `minWidth`, `minHeight`, `maxWidth` and `maxHeight`.

In this example, the minimum width and height of the element is `100px` and the maximum is `500px`.

By changing element's size, you can also see its width and height.

Pull the bottom-right corner to change the element's size.

[Watch demo](https://codepen.io/ruslan-mart/pen/ExEEeMK)

```css
.box {
  align-items: center;
  background-color: #a9def9;
  display: flex;
  height: 240px;
  justify-content: center;
  overflow: hidden;
  position: absolute;
  user-select: none;
  width: 240px;
}

.size {
  background-color: #ffffff;
  display: inline-block;
  padding: 10px;
}
```

```tsx
const App = () => {
  const [sizeText, setSizeText] = useState('240 x 240');

  const handleResize: ResizeEventHandler = (options) => {
    setSizeText(`${options.width} x ${options.height}`);
  };

  return (
    <Resizable
      className="box"
      minWidth={100}
      minHeight={100}
      maxWidth={500}
      maxHeight={500}
      onResize={handleResize}
    >
      <span className="size">
        {sizeText}
      </span>
      <ResizableTemplate.Corner />
    </Resizable>
  );
};
```

---

### `onResize` usage

Example of usage of `onResize` event handler by redefinition of width and height values.

In this example, if the width or height is beyond 75% of browser window's size, then the value of the element's width/height stretches up to window's limits.

[Watch demo](https://codepen.io/ruslan-mart/pen/QWmmVPP)

```css
.box {
  background-color: #a9def9;
  height: 240px;
  position: fixed;
  width: 240px;
}
```

```tsx
const App = () => {
  const handleResize: ResizeEventHandler = (options) => {
    const { innerWidth, innerHeight } = window;
    const { x, y } = options;

    let { width, height } = options;

    if (x + width > innerWidth * 0.75) {
      width = innerWidth - x;
    }

    if (y + height > innerHeight * 0.75) {
      height = innerHeight - y;
    }

    return { width, height };
  };

  return (
    <Resizable
      className="box"
      onResize={handleResize}
    >
      <ResizableTemplate.AllSide />
    </Resizable>
  );
};
```

---

### `onResizeStart` and `onResizeEnd` usage

Use `onResizeStart` and `onResizeEnd` event handlers for determine status.

In this example, by «resizable» the element will change its color because of adding/deleting additional CSS-class.

[Watch demo](https://codepen.io/ruslan-mart/pen/QWmmVPP)

```css
.box {
  background-color: #a9def9;
  height: 240px;
  position: absolute;
  transition: 0.3s background-color ease-in;
  width: 240px;
}

.box-resizing {
  background-color: #9F86C0;
}
```

```tsx
const App = () => {
  const [resizing, setResizing] = useState(false);

  const handleResizeStart = () => {
    setResizing(true);
  };

  const handleResizeEnd = () => {
    setResizing(false);
  };

  return (
    <Resizable
      className={!resizing ? 'box' : 'box box-resizing'}
      onResizeStart={handleResizeStart}
      onResizeEnd={handleResizeEnd}
    >
      <ResizableTemplate.Corner />
    </Resizable>
  );
};
```

---

### `onResizeMin` and `onResizeMax` usage

Usage of `onResizeMin` and `onResizeMax` event handlers

In this example, when the width/height is minimum or maximum, the element's background color becomes random.

[Watch demo](https://codepen.io/ruslan-mart/pen/zYWWmOB)

```css
.box {
  background-color: #a9def9;
  height: 240px;
  position: absolute;
  transition: 0.1s background-color;
  width: 240px;
}
```

```tsx
const getRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const App = () => {
  const [backgroundColor, setBackgroundColor] = useState('');

  const handleResizeMinMax = () => {
    const nextColor = getRandomValue(0, 0xFFFFFF).toString(16).padStart(6, '0');
    setBackgroundColor(`#${nextColor}`);
  };

  return (
    <Resizable
      className="box"
      style={{ backgroundColor }}
      minWidth={100}
      minHeight={100}
      maxWidth={500}
      maxHeight={500}
      onResizeMin={handleResizeMinMax}
      onResizeMax={handleResizeMinMax}
    >
      <ResizableTemplate.AllSide />
    </Resizable>
  );
};
```
