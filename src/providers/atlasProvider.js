import React, { useState, useContext, createContext, useReducer } from 'react';

const StateContext = createContext();
const DispatchContext = createContext();

const INITIAL_STATE = {
  viewport: {
    longitude: 35.50411547,
    latitude: 33.89508665,
    zoom: 12,
  },
  map: null,
  layers: [],
};

function reducer(state, { type, payload }) {
  console.log(type, payload);
  switch (type) {
    case 'SET_VIEWPORT': {
      return {
        ...state,
        viewport: payload,
      };
    }
    case 'SET_MAP': {
      return {
        ...state,
        map: payload,
      };
    }
    case 'SET_LAYERS': {
      return {
        ...state,
        layers: payload,
      };
    }
    case 'ADD_LAYER': {
      return {
        ...state,
        layers: [...state.layers, payload],
      };
    }
    case 'CLEAR_LAYERS': {
      return { ...state, layers: [] };
    }
    case 'REMOVE_LAYER_BY_ID': {
      // console.log(state.layers, payload);
      console.log(state.layers.filter((layer) => layer.id !== payload));
      return {
        ...state,
        layers: state.layers.filter((layer) => layer.id !== payload),
      };
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

function useAtlasDispatch() {
  const context = useContext(DispatchContext);

  if (context === undefined) {
    throw new Error('useAtlasDispatch must be used within a AtlasProvider');
  }

  return context;
}

function useAtlas() {
  return [useAtlasState(), useAtlasDispatch()];
}

export { AtlasProvider, useAtlasState, useAtlasDispatch, useAtlas };
