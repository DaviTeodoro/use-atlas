import { useEffect, useRef, useState } from 'react';
import useLayer from './useLayer';

export default function useChoropleth(data, config) {
  return useLayer(data, config);
}
