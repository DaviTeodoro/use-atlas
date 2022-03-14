# useAtlas-beta 

> A powerful and easy to use react-hooks library to accelerate web maps development.

> useAtlas is built on top of [deck.gl](https://deck.gl/) so they are fully compatible with each other.

[![NPM](https://img.shields.io/npm/v/use-atlas.svg)](https://www.npmjs.com/package/use-atlas) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-atlas
```

```bash
yarn add use-atlas
```

## Usage

useAtlas is easy to use and setup.

### First setup the provider

AtlasProvider provides the Atlas state and dispatcher witch will be consumed by all its hooks.

```jsx
import App from './App';
import { AtlasProvider } from 'use-atlas';

export default function App() {
  return (
    <AtlasProvider>
      <App />
    </AtlasProvider>
  );
}
```

### Import the Atlas component and hooks

You can now have maps and layers wherever you like inside your App.

```jsx
import { StaticMap } from 'react-map-gl';

import { Atlas, useLayer } from 'use-atlas';

function App() {
  const [setData, setConfig] = useLayer(geojson);

  return (
    <>
      <div className='map-container'>
        <Atlas>
          <StaticMap mapboxApiAccessToken={TOKEN} />
        </Atlas>
      </div>
    </>
  );
}

export default App;
```

> Did you notice the StaticMap? It is your choice. useAtlas is agnostic about which static map service you chose. For more information see [using-with-map](https://deck.gl/docs/get-started/using-with-map).

# API

useAtlas is built on top of deck.gl, so they share most of the same API. The hooks are abstrations on top of deck.gl layers.

## Components

### AtlasProvider

AtlasProvider provides the Atlas state and dispatcher witch will be consumed by all its hooks.

```jsx
import { AtlasProvider } from 'use-atlas'

export default function App() {
  return (
    <AtlasProvider>
      <App>
    </AtlasProvider>
  )
}
```

### Atlas

The map compoment, it is a wrapper around [DeckGL React component](https://deck.gl/docs/api-reference/react/deckgl).

## Hooks

### useLayer

The most basic hook, it renders a geoJson or a array of features. All other hooks are composed from it.

```jsx
const [setData, setConfig] = useLayer(geojson);
```

### useChoroplet

Renders a choroplet from a array of features

```jsx
const [setData, setIndicator, setDomain] = useChoropleth(
  featuresArray,
  'someIndicator',
  [1, 3, 6, 11]
);
```

## License

MIT © [DaviTeodoro](https://github.com/DaviTeodoro)
