import React, { createContext, useState, useContext, useEffect } from 'react';
import Postmate from 'postmate';

const Data = createContext(null);
const Terminate = createContext(null);
const Dimensions = createContext(null);
const Stores = createContext([]);

export const ParkgateProvider = ({children}) => {
    const [data, setData] = useState({});
    const [dimensions, setDimensions] = useState({});
    const [parent, setParent] = useState(null);
    const [storeState, setStoreState] = useState({});
    const [loadState, setLoadState] = useState({loading: true, error: false, loaded: false});

    const generateStoreState = (storeConfig) => {
        const state = storeConfig.reduce((prev, store) => ({
            ...prev,
            [store.name]: store.initialValue,
        }))
        setStoreState(state);
    };

    const setParentStoreState = (storeKey, storeValue) =>  {
        if (!storeState[storeKey]) {
            throw 'Store is not Registered';
        }
        parent.emit('store-change',[storeKey, storeValue]);
    };

    const onParentSetStoreState = (partialState) => 
        setStoreState({...storeState, ...partialState});
    
    const finishParkgateProcess = (returnValue) => {
        parent.emit('terminate-application', returnValue);
    }

    useEffect(() => {
        const _handshake = new Postmate.Model({
            title: null,
            storeConfig: {},
            setData,
            setDimensions,
            setStoreState: onParentSetStoreState
        });
        _handshake
            .then(parent => {
                generateStoreState(parent.model.storeConfig);
                setParent(parent);
                setData(parent.model.data);
                setLoadState({loading: false, error: false, loaded: true});
            })
            .catch(error => {
                setLoadState({loading: false, error: true, loaded: false})
            });
    }, []);

    return (
        <Terminate.Provider value={finishParkgateProcess}>
            <Stores.Provider value={[storeState, setParentStoreState]}>
                <Dimensions.Provider value={dimensions}>            
                    <Data.Provider value={data}>
                        {loadState.loading ?
                            <h1>Loading</h1>
                        : loadState.error ? 
                            <h1>Loading Error Add reset options</h1>
                        : children}
                    </Data.Provider>
                </Dimensions.Provider>
            </Stores.Provider>
        </Terminate.Provider>
    );
};

export const useParkgateData = () => {
    const data = useContext(Data);
    return data;
};

export const useParkgateDimensions = () => {
    const dimensions = useContext(Dimensions);
    return dimensions;
};


export const useParkgateStore = (store) => {
    const [storeState, setStoreState] = useContext(Stores);
    if (!store) {
        throw  `Must include name of the desired store as an argument.
            Usage: userParkgateStore('myRegisteredStore')
        `;
    }
    // see if memoization can imporve performance with this
    return [
        storeState[store],
        newValue => setStoreState(store, newValue)
    ];
};

export const finishParkgateProcess = (returnValue) => {
    const terminate = useContext(Terminate);
    terminate(returnValue);
};
