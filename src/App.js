import './App.css';
import { StaticMap } from 'react-map-gl';

import Atlas from './components/Atlas';
import useLayer from './hooks/useLayer';

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
          [35.5107307434082, 33.90988735887179],
        ],
      },
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
            [35.50643920898437, 33.920001740102585],
          ],
        ],
      },
    },
  ],
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
            [35.49888610839844, 33.91928949902838],
          ],
        ],
      },
    },
  ],
};
function App() {
  const [setData, setStyles] = useLayer(geojson);
  const [_setData, _setStyles] = useLayer(geojson2);

  // const probe = useProbe();

  return (
    <>
      <button onClick={() => setData(geojson)}>geo1</button>
      <button onClick={() => setData(geojson2)}>geo2</button>
      <div class="map-container">
        <Atlas>
          <StaticMap mapboxApiAccessToken={TOKEN} />
        </Atlas>
      </div>
    </>
  );
}

export default App;
