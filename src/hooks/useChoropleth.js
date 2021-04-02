import { useEffect, useReducer } from 'react';
import useLayer from './useLayer';

import { scaleThreshold } from 'd3-scale';
import { schemeBlues } from 'd3-scale-chromatic';
import { color } from 'd3-color';

function reducer(state, { type, payload }) {
  console.log(type, payload);
  switch (type) {
    case 'SET_DATA': {
      return {
        ...state,
        data: payload,
      };
    }
    case 'SET_INDICATOR': {
      return {
        ...state,
        indicator: payload,
      };
    }
    case 'SET_DOMAIN': {
      return {
        ...state,
        domain: payload,
      };
    }
    case 'SET_CHOROPLETH': {
      const colorScale = scaleThreshold()
        .domain(state.domain)
        .range(schemeBlues[7]);
      return {
        ...state,
        data: state.data.map((d) => {
          const rgbColor = color(colorScale(d.properties[state.indicator]));
          d.fillColor = [rgbColor.r, rgbColor.g, rgbColor.b, 160];
          return d;
        }),
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

export default function useChoropleth(_data, _indicator, _domain) {
  const [{ data, indicator, domain }, dispatch] = useReducer(reducer, {
    data: _data,
    indicator: _indicator,
    domain: _domain,
  });
  const [setData] = useLayer(data, {
    getFillColor: (object) => object.fillColor,
  });

  useEffect(() => {
    dispatch({ type: 'SET_CHOROPLETH' });
  }, []);

  const setDomain = (domain) => {
    dispatch({ type: 'SET_DOMAIN', payload: domain });
    dispatch({ type: 'SET_CHOROPLETH' });
    setData(data);
  };

  const setIndicator = (indicator) => {
    dispatch({ type: 'SET_INDICATOR', payload: indicator });
    dispatch({ type: 'SET_CHOROPLETH' });
    setData(data);
  };

  return [setData, setIndicator, setDomain];
}
