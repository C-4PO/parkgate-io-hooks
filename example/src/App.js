import React from 'react';
import {
    ParkgateProvider,
    useParkgateData,
    useParkgateStore,
    useParkgateDimensions
} from 'parkgate-io-hooks';

const Component = () => {
    const data = useParkgateData();
    const dimensions = useParkgateDimensions();
    const [cart] = useParkgateStore('cart');

    // const addNewLike = () => {
    //     const newLikesState = [...likes, 'like'];
    //     setLikes(newLikesState);
    // };

    return (
        <div>
            <p>Data: {JSON.stringify(data)}</p>
            <p>Dimensions: {JSON.stringify(dimensions)}</p>
            <p>Cart Store: {JSON.stringify(cart)}</p>
            {/*<button type="button" onClick={addNewLike.bind(this)}> Add Like </button>}*/}
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