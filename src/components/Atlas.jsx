import React from 'react'

import DeckGL from '@deck.gl/react'

import { useAtlas } from '../providers/atlasProvider'
import { GeoJsonLayer } from '@deck.gl/layers'

const renderInternalLayers = (layers) => {
  let internalLayers = []
  for (let l of layers.values()) {
    switch (l.type) {
      case 'GEO_JSON':
        internalLayers.push(new GeoJsonLayer(l))
        break
      default:
        break
    }
  }
  return internalLayers
}

function Atlas(props) {
  const [{ viewport, layers }, dispatch] = useAtlas()

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <DeckGL
        {...props}
        layers={[...renderInternalLayers(layers)]}
        viewState={viewport}
        useDevicePixels={false}
        controller={true}
        onClick={(e) => console.log(e)}
        onLoad={(e) => console.log('map', e)}
        onViewStateChange={({ viewState }) =>
          dispatch({ type: 'SET_VIEWPORT', payload: viewState })
        }
      />
    </div>
  )
}

export default Atlas