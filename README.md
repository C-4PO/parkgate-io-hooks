# Parkgate IO Hooks

> Library for Parkgate IO plaform integration for a Developer Application

[![NPM](https://img.shields.io/npm/v/parkgate-io-hooks.svg)](https://www.npmjs.com/package/parkgate-io-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

__Parkgate IO Hooks__ is a frontend side library used for applications rendered on the **Parkgate IO Platform**. Using a React Hooks API, implementers have access to features provided by the platform. 

## Features
* Get initial state of application
* Listen to changes in application window dimensions
* Communicate with shared data accross multiple associated applications on a board
* More features coming soon!

### Install

```bash
npm install --save parkgate-io-hooks
```

***

## Parkgate IO Provider
The `ParkgateProvider` should be placed at the root of the application. Internaly using the _React Context API_, the provider manages the data-flow of the application. __Parkgate IO Hooks__ must be instantiated inside components nested within the `ParkgateProvider` and not the same component.

> Once an application is wrapped in the provider, the application will be not render useless within the Parkgate IO Platform experience. A developer testing evironment is still in development and will be posted soon. Stay tuned!

### Usage

```jsx
// Root of your application
import React, { Component } from 'react';

import { ParkgateProvider } from 'parkgate-io-hooks';

const App = () => {
    return (
        <ParkgateProvider>
            <Component />
        </ParkgateProvider>
    );
};
export default App;
```

***

## Hooks API
Parkgate IO features can be accessed by Parkgate IO Hooks. Hooks are only valid in components nested within the root `ParkgateProvider`. 

> ## useParkgateData
Returns configuration data of the application; used to specify initial state of the application
### Usage
```jsx
// Root of your application
import React, { Component } from 'react'

import { useParkgateData } from 'parkgate-io-hooks'

const Component = () => {
    const data = useParkgateData();
    return <p> {JSON.stringify(data)} </p>;
}
export default Component;
```
__Returns__: Object (key/value data specified in application config)
> ## useParkgateDimensions
Returns dimension properties updated on screen resize
### Usage
```jsx
// Root of your application
import React, { Component } from 'react';

import { useParkgateDemensions } from 'parkgate-io-hooks';

const Component = () => {
    const {
        shape,
        width,
        height,
    } = useParkgateDemensions();
    
    return <p> Shape: {shape}, Width: {width}, Height: {height} </p>;
}
export default Component;
```
### Returns Object (Dimensions Schema)

| Property | Type | Description | Values |
| --- | --- | --- | --- |
| `shape` | `String` | _String representation of current shape of the application window. possibly used as a class name for style logic._ | `large-square`, `small-square`, `horizontal-rectangle`, `vertical-rectangle`, `modal-square`, `fullscreen` |
| `width` | `number` | _Parkgate width unit representing a multiple of 90px_ | `3` (small) or `5`(large) or `7` (modal) or `null` (fullscreen)  |
| `height` | `number` | _Parkgate height unit representing a multiple of 90px_ | `3` (small) or `5`(large) or `7` (modal) or `null` (fullscreen)  |

> ## useParkgateStore
Applications on the Parkgate platform can share data amongst themselves using registered stores. You application can access and update the shared value using this hook. The desired store is indexed using the registered store key. It follows the same api as the _useState_ hook.
### Usage
```jsx
// Root of your application
import React, { Component } from 'react';

import { useParkgateDemensions } from 'parkgate-io-hooks';

const Component = () => {
    // Indexes the registered store `Count`
    // Similar API to `useState`
    const [
        count,
        setCount,
     ] = useParkgateStore('count');

     const incrementCount => () => {
         setCount(count++);
     };
    
    return (
        <>
            <p> Count {count}</p>
            <button onClick={incrementCount.bind(this)}>Increment</button>
        </>
    );
}
export default Component;
```
### Parameters
| Name | Type | Description |
| --- | --- | --- |
| `StoreKey` | `String` | _Used the index the sprecific store registered with this application to display or modify its state_ |

### Returns Array\<_StoreValue_, _SetStoreFunction_\>
| Array Index | Name | Description | Value |
| --- | --- | --- | --- |
| `0` | `Store Value` | _The value stored in the specified shared store_ | _any_ |
| `1` | `Set Store Function` | _A function that updates the shared store state_ | Function\<any\> |

> ## finishParkgateProcess
Nested applications or Modal applications can close themselves by calling the provided function. The parameter provided to this function passes a return value of the experience to the parkgate platform. This function is not effective if called in a board application instance.
### Usage
```jsx
import React, { Component } from 'react';

import { finishParkgateProcess } from 'parkgate-io-hooks';

const Component = () => {
    let computedValue = 42

     const closeApplication => () => {
         finishParkgateProcess(42);
     };
    
    return <button onClick={closeApplication.bind(this)}>Close</button>;
}
export default Component;
```
### Parameters
| Name | Type | Description |
| --- | --- | --- |
| `ReturnValue` | `Any` | _The final value returned by the application instance before the closure of the application is initiated._ |
### Returns undefined

---

## License

MIT © [ParkgateIO](https://github.com/ParkgateIO)

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
