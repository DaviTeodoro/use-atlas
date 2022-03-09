import React, { useMemo } from 'react';
import loadable from '@loadable/component';

const DeckGL = loadable(() => import('./DeckGL'), { ssr: false });

import { useAtlas } from '../providers/atlasProvider';
import { GeoJsonLayer } from '@deck.gl/layers';

const renderInternalLayers = (layers) => {
  let internalLayers = [];
  for (let l of layers.values()) {
    switch (l.type) {
      case 'GEO_JSON':
        internalLayers.push(new GeoJsonLayer(l));
        break;
      default:
        break;
    }
  }
  return internalLayers;
};

function Atlas(props) {
  const [{ viewport, layers }, dispatch] = useAtlas(props.initialState);
  const internalLayers = useMemo(() => renderInternalLayers(layers), [layers]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <DeckGL
        {...props}
        layers={internalLayers}
        viewState={viewport}
        useDevicePixels={false}
        controller={true}
        onViewStateChange={({ viewState }) =>
          dispatch(['SET_VIEWPORT', viewState])
        }
      />
    </div>
  );
}

export default Atlas;
