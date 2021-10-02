import { useEffect, useReducer, useState } from 'react';
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
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

function generateChoropleth(data, indicator, domain, colorRange) {
  const colorScale = scaleThreshold().domain(domain).range(colorRange);
  return data.map((d) => {
    if (!d.properties[indicator]) {
      throw new Error(`Indicator "${indicator}" not found.`);
    }
    const rgbColor = color(colorScale(d.properties[indicator]));
    d.fillColor = [rgbColor.r, rgbColor.g, rgbColor.b, 160];
    return d;
  });
}

export default function useChoropleth(config, data) {
  const [{ setData, setConfig }, layer] = useLayer(
    {
      ...config,
      getFillColor: (object) => object.fillColor
    },
    data
  );

  const [{ indicator, domain, colorRange }, dispatch] = useReducer(reducer, {
    indicator: config.indicator,
    domain: config.domain,
    colorRange: config.colorRange
  });

  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    if (layer?.data && !isSet) {
      setData(generateChoropleth(layer.data, indicator, domain, colorRange));
      setIsSet(true);
    }
  }, [layer]);

  useEffect(() => {
    if (layer?.data) {
      setData(generateChoropleth(layer.data, indicator, domain, colorRange));
    }
  }, [indicator, domain, colorRange]);

  const setDomain = (domain) => {
    dispatch({ type: 'SET_DOMAIN', payload: domain });
  };

  const setIndicator = (indicator) => {
    dispatch({ type: 'SET_INDICATOR', payload: indicator });
  };

  const setColorRange = (colorRange) => {
    dispatch({ type: 'SET_COLOR_RANGE', payload: colorRange });
  };

  return [
    { setData, setIndicator, setDomain, setColorRange, setConfig },
    layer
  ];
}
