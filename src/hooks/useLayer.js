import { useEffect, useRef, useReducer } from 'react';
import { useAtlas } from '../providers/atlasProvider';

const DEFAULT_CONFIG = {
  type: 'GEO_JSON',
  pickable: false,
  stroked: false,
  getFillColor: [160, 160, 180, 160],
  getRadius: 100,
  filled: true
  // extruded: true,
  // lineWidthScale: 20,
  // lineWidthMinPixels: 2,
  // getFillColor: [160, 160, 180, 200],
  // getLineColor: [160, 160, 180, 160],
  // getRadius: 100,
  // getLineWidth: 1,
  // getElevation: 30
};

const createNewLayer = (id, data, config) => {
  return {
    id: id,
    data: data,
    ...DEFAULT_CONFIG,
    ...config
  };
};

export default function useLayer(config, data) {
  if (!config.id) {
    throw new Error('Layer must have a id');
  }
  const { id } = config;

  const [{ layers }, dispatchAtlas] = useAtlas();

  useEffect(() => {
    if (data) {
      dispatchAtlas({
        type: 'SET_LAYER',
        payload: createNewLayer(id, data, config)
      });
    } else {
      dispatchAtlas({
        type: 'SET_LAYER',
        payload: { id: id, ...config }
      });
    }

    return () => {
      dispatchAtlas({
        type: 'DELETE_LAYER',
        payload: id
      });
    };
  }, []);

  const setData = (data) => {
    dispatchAtlas({
      type: 'SET_LAYER',
      payload: { id: id, data: data }
    });
  };

  const setConfig = (config) => {
    dispatchAtlas({
      type: 'SET_LAYER',
      payload: { id: id, ...config }
    });
  };

  return [{ setData, setConfig }, layers.get(id)];
}
