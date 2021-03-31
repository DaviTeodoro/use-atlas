import './App.css';
import { StaticMap } from 'react-map-gl';

import Atlas from './components/Atlas';
import { useAtlas } from './providers/atlasProvider';

const TOKEN =
  'pk.eyJ1IjoiZGF2aXRlb2Rvcm8iLCJhIjoiY2pmYnJ1OHhyMGpuNzMxcGE5OTdvaXZlMCJ9._Cphfi7ZEtDPK8ohgLJGRQ';

function App() {
  // const [{ viewport }, dispatch] = useAtlas();
  // const layer = useLayer([]);

  return (
    <div class="map-container">
      <Atlas layers={[]}>
        <StaticMap mapboxApiAccessToken={TOKEN} />
      </Atlas>
    </div>
  );
}

export default App;
