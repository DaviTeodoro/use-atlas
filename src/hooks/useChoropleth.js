import { useEffect, useReducer } from 'react';
import useLayer from './useLayer';
import { scaleThreshold } from 'd3-scale';
import { color } from 'd3-color';

function reducer(state, { type, payload }) {
  // console.log(type, payload)
  switch (type) {
    case 'SET_INDICATOR': {
      return {
        ...state,
        indicator: payload
      };
    }
    case 'SET_DOMAIN': {
      return {
        ...state,
        domain: payload
      };
    }
    case 'SET_COLOR_RANGE': {
      return {
        ...state,
        colorRange: payload
      };
    }
    case 'SET_CHOROPLETH': {
      const colorScale = scaleThreshold()
        .domain(state.domain)
        .range(state.colorRange);
      return {
        ...state,
        data: state.data.map((d) => {
          const rgbColor = color(colorScale(d.properties[state.indicator]));
          d.fillColor = [rgbColor.r, rgbColor.g, rgbColor.b, 160];
          return d;
        })
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

export default function useChoropleth(data, config) {
  const [{ data: _data, indicator, domain, colorRange }, dispatch] = useReducer(
    reducer,
    {
      data: data,
      indicator: config.indicator,
      domain: config.domain,
      colorRange: config.colorRange
    }
  );

  const [{ setData, setConfig }, layerId] = useLayer(_data, {
    ...config,
    getFillColor: (object) => object.fillColor
  });

  useEffect(() => {
    dispatch({ type: 'SET_CHOROPLETH' });
  }, []);

  const setDomain = (domain) => {
    dispatch({ type: 'SET_DOMAIN', payload: domain });
    dispatch({ type: 'SET_CHOROPLETH' });
    setData(_data);
  };

  const setIndicator = (indicator) => {
    dispatch({ type: 'SET_INDICATOR', payload: indicator });
    dispatch({ type: 'SET_CHOROPLETH' });
    setData(_data);
  };

  const setColorRange = (colorRange) => {
    dispatch({ type: 'SET_COLOR_RANGE', payload: colorRange });
    dispatch({ type: 'SET_CHOROPLETH' });
    setData(_data);
  };

  return [
    { setData, setIndicator, setDomain, setColorRange, setConfig },
    layerId
  ];
}
