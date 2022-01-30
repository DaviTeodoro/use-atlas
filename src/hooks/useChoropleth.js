import { useEffect, useReducer, useState } from 'react';
import useLayer from './useLayer';
import d3Scale from 'd3-scale';
import { color } from 'd3-color';

export default function useChoropleth(config, data = []) {
  const [{ setData: _setData, setConfig }, layer] = useLayer(
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
      setData(layer.data);
      setIsSet(true);
    }
  }, [layer]);

  useEffect(() => {
    if (layer?.data) {
      setData(layer.data);
    }
  }, [indicator, domain, colorRange]);

  function setDomain(domain) {
    dispatch({ type: 'SET_DOMAIN', payload: domain });
  }

  function setIndicator(indicator) {
    dispatch({ type: 'SET_INDICATOR', payload: indicator });
  }

  function setColorRange(colorRange) {
    dispatch({ type: 'SET_COLOR_RANGE', payload: colorRange });
  }

  function setData(data) {
    if (data) {
      _setData(generateChoropleth(data, indicator, domain, colorRange));
    }
  }

  return [
    { setData, setIndicator, setDomain, setColorRange, setConfig },
    layer
  ];
}

function generateChoropleth(data, indicator, domain, colorRange) {
  const colorScale = d3Scale['scaleThreshold']()
    .domain(domain)
    .range(colorRange);

  const isArray = data instanceof Array;
  const features = isArray ? data : data.features;

  return features.map((d) => {
    if (!d.properties[indicator]) {
      throw new Error(`Indicator "${indicator}" not found.`);
    }
    const rgbColor = color(colorScale(d.properties[indicator]));

    d.fillColor = [rgbColor.r, rgbColor.g, rgbColor.b, 160];
    return d;
  });
}

function reducer(state, { type, payload }) {
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
