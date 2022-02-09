import { useBubble } from 'use-atlas';

export default function BubbleLayer({ id, data, indicator }) {
  const [{ setData, setConfig }] = useBubble(
    {
      id: id,
      // getLineColor: [60, 60, 60, 130],
      getFillColor: [250, 0, 0, 100],
      // stroked: true,
      // lineWidthMinPixels: 2,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 1500,
      indicator,
      onHover: (info) => console.log('layer hover', info?.object)
    },
    data
  );

  return <div>some config</div>;
}
