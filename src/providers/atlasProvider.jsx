import React, { useEffect, useContext, createContext, useReducer } from 'react';
import { Map } from 'immutable';

const StateContext = createContext();
const DispatchContext = createContext();

const INITIAL_STATE = {
  viewport: {
    width: 600,
    height: 600,
    longitude: 0,
    latitude: 0,
    zoom: 0
  },
  map: null,
  layers: new Map()
};

function reducer(state, [type, payload]) {
  console.log(type, payload);
  switch (type) {
    case 'SET_VIEWPORT': {
      return {
        ...state,
        viewport: payload
      };
    }
    case 'SET_MAP': {
      return {
        ...state,
        map: payload
      };
    }
    case 'SET_LAYER': {
      return {
        ...state,
        layers: state.layers.set(payload.id, {
          ...state.layers.get(payload.id),
          ...payload
        })
      };
    }
    case 'DELETE_LAYER': {
      return {
        ...state,
        layers: state.layers.delete(payload)
      };
    }
    case 'CLEAR_LAYERS': {
      return { ...state, layers: [] };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

function AtlasProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function useAtlasState() {
  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error('useAtlasState must be used within a AtlasProvider');
  }

  return context;
}

function useAtlasDispatch(initialState) {
  const context = useContext(DispatchContext);

  if (context === undefined) {
    throw new Error('useAtlasDispatch must be used within a AtlasProvider');
  }

  useEffect(() => initialState && context(['SET_VIEWPORT', initialState]), []);

  return context;
}

function useAtlas(initialState) {
  return [useAtlasState(), useAtlasDispatch(initialState)];
}

export { AtlasProvider, useAtlasState, useAtlasDispatch, useAtlas };
