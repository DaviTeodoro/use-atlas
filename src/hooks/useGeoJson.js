import { useEffect, useRef, useState } from 'react';
import useLayer from './useLayer';

export default function useGeoJson(data, config) {
  return useLayer(data, config);
}
