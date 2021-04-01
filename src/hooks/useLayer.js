import { useEffect, useRef } from 'react';
import { useAtlas } from '../providers/atlasProvider';
import { v4 as uuidv4 } from 'uuid';

const createNewLayer = (id, data) => {
  return {
    id: id,
    data: data,
    // pickable: true,
    // stroked: false,
    // getFillColor: [160, 160, 180, 160],
    // getRadius: 3,
  };
};

export default function useLayer(data, config) {
  const [, dispatch] = useAtlas();

  const { current: layerId } = useRef(uuidv4());

  useEffect(() => {
    dispatch({ type: 'SET_LAYER', payload: createNewLayer(layerId, data) });
  }, []);

  const setData = (data) => {
    dispatch({ type: 'SET_LAYER', payload: createNewLayer(layerId, data) });
  };

  return [setData];
}
