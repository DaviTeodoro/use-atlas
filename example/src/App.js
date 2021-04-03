/* eslint-disable react/react-in-jsx-scope */
import { StaticMap } from 'react-map-gl'

import { Atlas, useLayer, useChoropleth } from 'use-atlas'
import './App.css'

const TOKEN =
  'pk.eyJ1IjoiZGF2aXRlb2Rvcm8iLCJhIjoiY2pmYnJ1OHhyMGpuNzMxcGE5OTdvaXZlMCJ9._Cphfi7ZEtDPK8ohgLJGRQ'

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          [35.48807144165039, 33.92940276425315],
          [35.475711822509766, 33.91059967853272],
          [35.5107307434082, 33.90988735887179]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [35.50643920898437, 33.920001740102585],
            [35.53699493408203, 33.920001740102585],
            [35.53699493408203, 33.93994207264901],
            [35.50643920898437, 33.93994207264901],
            [35.50643920898437, 33.920001740102585]
          ]
        ]
      }
    }
  ]
}
const geojson2 = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [35.49888610839844, 33.91928949902838],
            [35.494766235351555, 33.91302152084973],
            [35.503692626953125, 33.90988735887179],
            [35.50575256347656, 33.91359135609923],
            [35.49888610839844, 33.91928949902838]
          ]
        ]
      }
    }
  ]
}

const choropleth = [
  {
    type: 'Feature',
    properties: {
      stroke: '#555555',
      'stroke-width': 2,
      'stroke-opacity': 1,
      fill: '#555555',
      'fill-opacity': 0.5,
      idade: 5
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [35.489444732666016, 33.91743764437134],
          [35.5026626586914, 33.91743764437134],
          [35.5026626586914, 33.9285481685662],
          [35.489444732666016, 33.9285481685662],
          [35.489444732666016, 33.91743764437134]
        ]
      ]
    }
  },
  {
    type: 'Feature',
    properties: {
      stroke: '#555555',
      'stroke-width': 2,
      'stroke-opacity': 1,
      fill: '#555555',
      'fill-opacity': 0.5,
      idade: 10
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [35.50661087036133, 33.91701028758101],
          [35.5217170715332, 33.91701028758101],
          [35.5217170715332, 33.92826330143173],
          [35.50661087036133, 33.92826330143173],
          [35.50661087036133, 33.91701028758101]
        ]
      ]
    }
  },
  {
    type: 'Feature',
    properties: {
      stroke: '#555555',
      'stroke-width': 2,
      'stroke-opacity': 1,
      fill: '#555555',
      'fill-opacity': 0.5,
      idade: 15
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [35.52480697631836, 33.91615556757033],
          [35.538883209228516, 33.91615556757033],
          [35.538883209228516, 33.92883303474793],
          [35.52480697631836, 33.92883303474793],
          [35.52480697631836, 33.91615556757033]
        ]
      ]
    }
  }
]
function App() {
  // const [setData, setConfig] = useLayer(geojson);
  const [_setData, setIndicator, setDomain] = useChoropleth(
    choropleth,
    'idade',
    [1, 3, 6, 11]
  )

  // const probe = useProbe();

  return (
    <>
      {/* <button onClick={() => setData(geojson)}>geo1</button>
      <button onClick={() => setData(geojson2)}>geo2</button> */}
      {/* <button
        onClick={() =>
          setConfig((config) => {
            return { ...config, getFillColor: [160, 160, 180, 60] };
          })
        }
      >
        config
      </button> */}
      {/* <button
        onClick={() =>
          _setConfig((config) => {
            return { ...config, getFillColor: [160, 160, 180, 60] };
          })
        }
      >
        config
      </button> */}

      <button onClick={() => setDomain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])}>
        domain
      </button>
      <div className='map-container'>
        <Atlas>
          <StaticMap mapboxApiAccessToken={TOKEN} />
        </Atlas>
      </div>
    </>
  )
}

export default App
