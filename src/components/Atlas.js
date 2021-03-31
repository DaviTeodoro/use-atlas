import DeckGL from '@deck.gl/react';

import { useAtlas } from '../providers/atlasProvider';

function Atlas(props) {
  console.log(props);
  const [{ viewport }, dispatch] = useAtlas();

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <DeckGL
        // layers={[idleLayer, editableLayer, snappingPointsLayer]}
        viewState={viewport}
        useDevicePixels={false}
        controller={true}
        // onClick={(info) => handleLayerClick(info)}
        onViewStateChange={({ viewState }) =>
          dispatch({ type: 'SET_VIEWPORT', payload: viewState })
        }
        {...props}
      />
    </div>
  );
}

export default Atlas;
