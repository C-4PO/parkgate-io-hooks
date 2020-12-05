import React from 'react'
import { useMyHook } from 'parkgate-io-hooks'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App