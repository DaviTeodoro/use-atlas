import DeckGL from '@deck.gl/react';

import { useAtlas } from '../providers/atlasProvider';
import { GeoJsonLayer } from '@deck.gl/layers';

const renderInternalLayers = (layers) => {
  let internalLayers = [];
  for (let l of layers.values()) {
    internalLayers.push(
      new GeoJsonLayer({
        id: l.id,
        data: l.data,
        pickable: true,
        stroked: false,
        getFillColor: [160, 160, 180, 160],
        getRadius: 3,
      })
    );
  }
  return internalLayers;
};

function Atlas(props) {
  const [{ viewport, layers }, dispatch] = useAtlas();

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <DeckGL
        layers={[...renderInternalLayers(layers)]}
        viewState={viewport}
        useDevicePixels={false}
        controller={true}
        onClick={(e) => console.log(e)}
        onViewStateChange={({ viewState }) =>
          dispatch({ type: 'SET_VIEWPORT', payload: viewState })
        }
        {...props}
      />
    </div>
  );
}

export default Atlas;
