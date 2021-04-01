import { useState, useEffect, useMemo } from 'react';
import { useAtlas } from '../providers/atlasProvider';
import { GeoJsonLayer } from '@deck.gl/layers';
import { v4 as uuidv4 } from 'uuid';

const createNewLayer = (geojson) => {
  return new GeoJsonLayer({
    id: uuidv4(),
    data: geojson,
    pickable: true,
    stroked: false,
    getFillColor: [160, 160, 180, 160],
    getRadius: 3,
  });
};
export default function useLayer(geojson, config) {
  const [{ viewport }, dispatch] = useAtlas();

  const [data, setData] = useState(geojson);

  console.log('data', data);
  const layer = useMemo(() => createNewLayer(data), [data]);

  return [layer, setData];
}
