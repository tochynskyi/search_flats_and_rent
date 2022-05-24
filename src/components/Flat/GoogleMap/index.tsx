import React, { FC, ReactNode, useEffect } from 'react';

type MapOptions = {
  center: { lat: number; lng: number };
  zoom: number;
};
interface MapProps {
  id: string;
  options: MapOptions;
  onMapLoad: (map: ReactNode) => void;
}
const Map: FC<MapProps> = ({ id, options, onMapLoad }) => {
  const onScriptLoad = () => {
    const map = new window.google.maps.Map(
      document.getElementById(id),
      options,
    );
    onMapLoad(map);
  };

  useEffect(() => {
    if (!window.google) {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyAWQzaokWX9P8xGf81X0H4yLcTuHx6D0mw`;
      const x = document.getElementsByTagName('script')[0];
      x.before(s, x);
      s.addEventListener('load', () => {
        onScriptLoad();
      });
    } else {
      onScriptLoad();
    }
  });

  return <div style={{ width: '100%', height: '100%' }} id={id} />;
};

export default Map;
