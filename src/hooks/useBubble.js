import { useEffect, useReducer, useState } from 'react';
import useLayer from './useLayer';

function reducer(state, { type, payload }) {
  // console.log(type, payload)
  switch (type) {
    case 'SET_INDICATOR': {
      return {
        ...state,
        indicator: payload
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

function generateBubble(data, indicator) {
  return data.map((d) => {
    d.radius = d.properties[indicator];
    return d;
  });
}

export default function useBubble(config, data) {
  const [{ setData, setConfig }, layer] = useLayer(
    {
      ...config,
      getRadius: (object) => object.radius
    },
    data
  );

  const [{ indicator, domain, colorRange }, dispatch] = useReducer(reducer, {
    indicator: config.indicator
  });

  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    if (layer?.data && !isSet) {
      setData(generateBubble(layer.data, indicator));
      setIsSet(true);
    }
  }, [layer]);

  useEffect(() => {
    if (layer?.data) {
      setData(generateBubble(layer.data, indicator));
    }
  }, [indicator]);

  const setIndicator = (indicator) => {
    dispatch({ type: 'SET_INDICATOR', payload: indicator });
  };

  return [{ setData, setIndicator, setConfig }, layer];
}
