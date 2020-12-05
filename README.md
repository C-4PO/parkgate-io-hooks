# parkgate-io-hooks

> Library for Parkgate IO plaform integration

[![NPM](https://img.shields.io/npm/v/parkgate-io-hooks.svg)](https://www.npmjs.com/package/parkgate-io-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save parkgate-io-hooks
```

## Usage

```jsx
import React, { Component } from 'react'

import { useMyHook } from 'parkgate-io-hooks'

const Example = () => {
  const example = useMyHook()
  return (
    <div>{example}</div>
  )
}
```

## License

MIT © [ParkgateIO](https://github.com/ParkgateIO)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
