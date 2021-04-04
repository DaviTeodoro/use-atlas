import { useEffect, useRef, useReducer } from 'react';
import { useAtlas } from '../providers/atlasProvider';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_CONFIG = {
  type: 'GEO_JSON',
  pickable: false,
  stroked: false,
  getFillColor: [160, 160, 180, 160],
  getRadius: 3
};

const createNewLayer = (id, data, config) => {
  return {
    id: id,
    data: data,
    ...config
  };
};
function reducer(state, [type, payload]) {
  console.log(type, payload);
  switch (type) {
    case 'SET_DATA': {
      return {
        ...state,
        data: payload
      };
    }
    case 'SET_CONFIG': {
      return {
        ...state,
        config: { ...state.config, ...payload }
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}
export default function useLayer(data, config) {
  const [{ data: _data, config: _config }, dispatch] = useReducer(reducer, {
    data: data,
    config: { ...DEFAULT_CONFIG, ...config }
  });
  const [, dispatchAtlas] = useAtlas();
  const { current: layerId } = useRef(uuidv4());

  useEffect(() => {
    dispatchAtlas({
      type: 'SET_LAYER',
      payload: createNewLayer(layerId, _data, _config)
    });
    return () => {
      dispatchAtlas({
        type: 'DELETE_LAYER',
        payload: layerId
      });
    };
  }, []);

  const setData = (config) => {
    dispatch(['SET_DATA', config]);
  };

  const setConfig = (config) => {
    dispatch(['SET_CONFIG', config]);
  };

  useEffect(() => {
    dispatchAtlas({
      type: 'SET_LAYER',
      payload: createNewLayer(layerId, _data, _config)
    });
  }, [_config, _data]);

  return [{ setData, setConfig }, layerId];
}
