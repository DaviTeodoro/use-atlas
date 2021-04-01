import { useEffect, useRef } from 'react';
import { useAtlas } from '../providers/atlasProvider';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_CONFIG = {
  type: 'GEO_JSON',
  pickable: true,
  stroked: false,
  getFillColor: [160, 160, 180, 160],
  getRadius: 3,
};

const createNewLayer = (id, data, config) => {
  return {
    id: id,
    data: data,
    ...config,
  };
};

export default function useLayer(data, config = DEFAULT_CONFIG) {
  const [, dispatch] = useAtlas();

  const { current: layerId } = useRef(uuidv4());

  useEffect(() => {
    dispatch({
      type: 'SET_LAYER',
      payload: createNewLayer(layerId, data, config),
    });
  }, []);

  const setData = (data) => {
    dispatch({
      type: 'SET_LAYER',
      payload: createNewLayer(layerId, data, config),
    });
  };

  return [setData];
}
