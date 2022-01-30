import { useState, useEffect } from 'react';
import { Atlas, useLayer, useChoropleth, useBubble, useAtlas } from 'use-atlas';
import { schemeBlues } from 'd3-scale-chromatic';

const COUNTRIES =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson'; //eslint-disable-line

export default function () {
  return (
    <div>
      <Item title='useChoropleth'>
        <ChoroplethLayer id='1' />
      </Item>
      <Item title='useChoropleth'>
        <ChoroplethLayer id='12' />
      </Item>
    </div>
  );
}

function ChoroplethLayer({ id }) {
  const [{ setData, setConfig }] = useChoropleth(
    {
      id: `useChoropleth-${id}`,
      indicator: 'scalerank',
      domain: [1, 2, 3, 4, 5, 6],
      colorRange: schemeBlues[7]
    },
    [] //TODO: accept a null value
  );

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(COUNTRIES);
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []);

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
