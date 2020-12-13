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
    const [likes, setLikes] = useParkgateStore('likes');

    const addNewLike = () => {
        const newLikesState = [...likes, 'like'];
        setLikes(newLikesState);
    };

    return (
        <div>
            <p>Data: {JSON.stringify(data)}</p>
            <p>Dimensions: {JSON.stringify(dimensions)}</p>
            <p>Likes Store: {JSON.stringify(likes)}</p>
            <button type="button" onClick={addNewLike.bind(this)}> Add Like </button>
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