import DeckGL from '@deck.gl/react';

import { useAtlas } from '../providers/atlasProvider';

function Atlas(props) {
  const [{ viewport, layers }, dispatch] = useAtlas();

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <DeckGL
        layers={{ ...layers }}
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
