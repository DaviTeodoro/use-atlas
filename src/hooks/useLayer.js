import { useEffect, useRef, useReducer } from 'react';
import { useAtlas } from '../providers/atlasProvider';

const DEFAULT_CONFIG = {
  type: 'GEO_JSON',
  pickable: true,
  stroked: false,
  // TODO: essa questao do default config precisa mudar...
  // getFillColor: [160, 160, 180, 160],
  // getRadius: 100,
  filled: true,
  getLineColor: [60, 60, 60, 20],
  // stroked: true,
  lineWidthMinPixels: 2
  // extruded: true,
  // lineWidthScale: 20,
  // lineWidthMinPixels: 2,
  // getFillColor: [160, 160, 180, 200],
  // getLineColor: [160, 160, 180, 160],
  // getRadius: 100,
  // getLineWidth: 1,
  // getElevation: 30
};

export default function useLayer(config, data) {
  if (!config.id) {
    throw new Error('Layer must have a id');
  }
  const { id } = config;

  const [{ layers }, dispatchAtlas] = useAtlas();

  useEffect(() => {
    if (data) {
      console.log('eu to setando default?');
      dispatchAtlas(['SET_LAYER', Layer(id, data, config)]);
    } else {
      dispatchAtlas(['SET_LAYER', { id: id, ...config }]);
    }

    // return () => {
    //   dispatchAtlas(['DELETE_LAYER', id]);
    // };
  }, []);

  const setData = (data) => {
    dispatchAtlas(['SET_LAYER', { id: id, data: data }]);
  };

  const setConfig = (config) => {
    dispatchAtlas(['SET_LAYER', { id: id, ...config }]);
  };

  return [{ setData, setConfig }, layers.get(id)];
}

function Layer(id, _data, config) {
  const data = Array.isArray(_data) ? _data : _data.features;

  return Object.freeze({
    id,
    data,
    ...DEFAULT_CONFIG,
    ...config
  });
}
