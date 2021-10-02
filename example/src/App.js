/* eslint-disable react/react-in-jsx-scope */
import { StaticMap } from 'react-map-gl';
import { schemeBlues } from 'd3-scale-chromatic';

import { useState, useEffect } from 'react';
import { Atlas, useLayer, useChoropleth, useBubble, useAtlas } from 'use-atlas';
import './App.css';

import POLYGONS from './geodata/polygons.json';
import POLYGON from './geodata/polygons.json';
import CHOROPLETH from './geodata/choropleth.json';
import BUBBLE from './geodata/bubble.json';

const TOKEN =
  'pk.eyJ1IjoiZGF2aXRlb2Rvcm8iLCJhIjoiY2pmYnJ1OHhyMGpuNzMxcGE5OTdvaXZlMCJ9._Cphfi7ZEtDPK8ohgLJGRQ';

const COUNTRIES =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson'; //eslint-disable-line

const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const EARTHQUAKES =
  'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson';

function App() {
  const [range, setRange] = useState(0);

  const [{ setData, setConfig }] = useLayer(
    {
      id: '123123-123123',
      getLineColor: [60, 60, 60],
      stroked: true,
      lineWidthMinPixels: 2
    },

    CHOROPLETH
  );
  // const [{ setData, setConfig }] = useLayer(
  //   {
  //     id: '123123-123123',
  //     getLineColor: [60, 60, 60],
  //     stroked: true,
  //     lineWidthMinPixels: 2,
  //     pointRadiusMinPixels: 2,
  //     pointRadiusScale: 500,
  //     getRadius: (f) => 11 - f.properties.scalerank,
  //     getFillColor: [200, 0, 80, 180]
  //   },
  //   EARTHQUAKES
  // );

  // const [{ setData, setConfig }] = useBubble(
  //   {
  //     id: '123123-12323',
  //     indicator: 'count',
  //     onHover: (info) => console.log('layer hover', info?.object)
  //   },
  //   bubble
  // );

  useChoropleth({
    id: '123123-123123',
    indicator: 'idade',
    domain: [50, 75, 200],
    colorRange: schemeBlues[7]
  });

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div
          style={{ cursor: 'pointer', zIndex: '9999' }}
          onClick={() => setData(POLYGONS)}
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
