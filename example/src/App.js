import React from 'react';
import {
    ParkgateProvider,
    useParkgateData,
    useParkgateDimensions,
    finishParkgateProcess
} from 'parkgate-io-hooks';

const Component = () => {
    const data = useParkgateData();
    const dimensions = useParkgateDimensions();

    const finish = () => {
        finishParkgateProcess({hey: 'hey'});
    };

    return (
        <div>
            <p>Data: {JSON.stringify(data)}</p>
            <p>Dimensions: {JSON.stringify(dimensions)}</p>
            <button type="button" onClick={finish}> Finish Process </button>
        </div>
    );
};

const App = () => {
  return (
    <ParkgateProvider>
      <Component />
    </ParkgateProvider>
  )
}
export default App;