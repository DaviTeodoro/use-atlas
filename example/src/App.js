/* eslint-disable react/react-in-jsx-scope */
import { StaticMap } from 'react-map-gl';
import { schemeBlues } from 'd3-scale-chromatic';

import { useState, useEffect } from 'react';
import { Atlas, useLayer, useChoropleth, useBubble, useAtlas } from 'use-atlas';
import './App.css';

const TOKEN =
  'pk.eyJ1IjoiZGF2aXRlb2Rvcm8iLCJhIjoiY2pmYnJ1OHhyMGpuNzMxcGE5OTdvaXZlMCJ9._Cphfi7ZEtDPK8ohgLJGRQ';

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
};
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
};

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
];

const bubble = [
  {
    type: 'Feature',
    properties: {
      'marker-color': '#7e7e7e',
      'marker-size': 'medium',
      'marker-symbol': '',
      count: 100
    },
    geometry: {
      type: 'Point',
      coordinates: [35.47403812408447, 33.90593387655014]
    }
  },
  {
    type: 'Feature',
    properties: {
      'marker-color': '#7e7e7e',
      'marker-size': 'medium',
      'marker-symbol': '',
      count: 50
    },
    geometry: {
      type: 'Point',
      coordinates: [35.47506809234619, 33.910350367328554]
    }
  },
  {
    type: 'Feature',
    properties: {
      'marker-color': '#7e7e7e',
      'marker-size': 'medium',
      'marker-symbol': '',
      count: 75
    },
    geometry: {
      type: 'Point',
      coordinates: [35.480732917785645, 33.90807091679133]
    }
  }
];
function Layer() {
  const [{ setData, setConfig }, layerId] = useLayer(geojson);
  return (
    <div style={{ height: '100vh' }}>
      <h2>useLayer</h2>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() =>
          setConfig({
            getFillColor: [242, 108, 100, 160]
          })
        }
      >
        set config
      </div>

      <div style={{ cursor: 'pointer' }} onClick={() => setData(choropleth)}>
        set data
      </div>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() =>
          setConfig({
            visible: false
          })
        }
      >
        set invisible
      </div>
    </div>
  );
}

function Choropleth() {
  const [, { id }] = useLayer(choropleth);

  const [{ setData, setIndicator, setDomain, setConfig }] = useChoropleth(id, {
    indicator: 'idade',
    domain: [1, 3, 6, 11],
    colorRange: schemeBlues[7]
  });
  return (
    <div style={{ height: '100vh' }}>
      <h2>useChoropleth</h2>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() =>
          setConfig({
            getFillColor: [242, 108, 100, 160]
          })
        }
      >
        set config
      </div>
      <div style={{ cursor: 'pointer' }} onClick={() => setData(choropleth)}>
        set data
      </div>
    </div>
  );
}

function App() {
  const [range, setRange] = useState(0);

  // const [{ viewport, layers }, dispatch] = useAtlas({
  //   longitude: 35.50411547,
  //   latitude: 33.89508665,
  //   zoom: 12
  // });

  const [{ setData, setConfig }] = useBubble(
    {
      id: '123123-12323',
      indicator: 'count'
    },
    bubble
  );

  useChoropleth({
    id: '123123-12323',
    indicator: 'count',
    domain: [50, 75, 200],
    colorRange: schemeBlues[7]
  });

  // const [{ setData, setConfig }] = useChoropleth(
  //   {
  //     id: '123123-12323',
  //     indicator: 'idade',
  //     domain: [1, 3, 6, 11],
  //     colorRange: schemeBlues[7]
  //   },
  //   choropleth
  // );

  // console.log('layer', layer);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div
          style={{ cursor: 'pointer', zIndex: '9999' }}
          onClick={() => setData(geojson2)}
        >
          set data
        </div>
        <div
          style={{ cursor: 'pointer', zIndex: '9999' }}
          onClick={() =>
            setConfig({
              getFillColor: [242, 108, 100, 10]
            })
          }
        >
          set config
        </div>
        <div className='map-container' style={{ position: 'fixed' }}>
          <Atlas
            initialState={{
              longitude: 35.50411547,
              latitude: 33.89508665,
              zoom: 12
            }}
          >
            <StaticMap mapboxApiAccessToken={TOKEN}></StaticMap>
          </Atlas>
        </div>
        <div style={{ marginLeft: '810px' }}>
          {/* <Choropleth /> */}
          {/* <Layer /> */}
        </div>
      </div>
    </>
  );
}

export default App;
