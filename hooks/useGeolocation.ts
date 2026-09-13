'use client';

import { useCallback, useState } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    loading: false,
    error: null,
  });

  const request = useCallback(() => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: 'Geolocalização não suportada neste navegador.' }));
      return;
    }

    setState((s) => ({ ...s, loading: true, error: null }));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: false,
          error: null,
        });
      },
      () => {
        setState((s) => ({ ...s, loading: false, error: 'Não foi possível obter sua localização.' }));
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  return { ...state, request };
}
