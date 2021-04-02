import { useEffect, useRef, useState } from 'react';
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

export default function useLayer(data, config) {
  const [, dispatch] = useAtlas();
  const { current: layerId } = useRef(uuidv4());
  const [_config, setConfig] = useState({ ...DEFAULT_CONFIG, ...config });
  const [_data, setData] = useState(data);

  useEffect(() => {
    dispatch({
      type: 'SET_LAYER',
      payload: createNewLayer(layerId, _data, _config),
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'SET_LAYER',
      payload: createNewLayer(layerId, _data, _config),
    });
  }, [_data, _config, dispatch]);

  return [setData, setConfig];
}
