import { useState, useEffect } from 'react';
import { Atlas, useLayer, useChoropleth, useBubble, useAtlas } from 'use-atlas';
import { schemeBlues } from 'd3-scale-chromatic';

import SidebarBubbleLayer from './SidebarBubbleLayer';
import geo from 'geo-faker';
import pointGrid from '@turf/point-grid';

const COUNTRIES =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson'; //eslint-disable-line

const featureCollection = geo
  .layer()
  .seed(42)
  .add([...pointGrid(geo.sqrBBox([0, 0], 1000), 1000).features])
  .addProperty('radius')
  .seed(41)
  .addProperty('bar')
  // .map((i) => circle(i, i.properties.radius * 100))
  .unwarp();

export default function () {
  return (
    <div>
      {/* <Item title='useChoropleth'>
        <ChoroplethLayer id='1' data={featureCollection} indicator='bar' />
      </Item> */}
      <Item title='useBubble'>
        <SidebarBubbleLayer
          id='1'
          data={featureCollection}
          indicator='radius'
        />
      </Item>
    </div>
  );
}

function ChoroplethLayer({ id, data, indicator }) {
  const [{ setData, setConfig }] = useChoropleth(
    {
      id,
      indicator,
      domain: [1, 0.5, 0.1],
      colorRange: schemeBlues[7]
    }
    // [] //TODO: accept a null value
    // data
  );

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch(COUNTRIES);
  //     const json = await response.json();
  //     setData(json);
  //   }
  //   fetchData();
  // }, []);

  return <div>some config</div>;
}

function Item({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className='sidebar-item'>
      <h3 onClick={() => setOpen(!open)} className='sidebar-item-title'>
        {title}
      </h3>
      {open && <div>{children}</div>}
    </div>
  );
}
