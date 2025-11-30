'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet components with SSR disabled
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const GeoJSON = dynamic(
  () => import('react-leaflet').then((mod) => mod.GeoJSON),
  { ssr: false }
);

// Import Leaflet CSS only on client side
const LeafletCSS = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    import('leaflet/dist/leaflet.css');
  }, []);
  
  return null;
};

interface State {
  code: string;
  name: string;
  safety: number;
}

interface IndiaMapProps {
  states: State[];
  onStateClick: (stateCode: string) => void;
}

export default function IndiaMap({ states, onStateClick }: IndiaMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<any>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
    // Dynamically import Leaflet only on client side
    import('leaflet').then((leaflet) => {
      setL(leaflet);
      
      // Fix for default markers in Leaflet with webpack
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    });
  }, []);

  // Sample GeoJSON data for India states (simplified)
  const indiaGeoJSON = {
    type: "FeatureCollection",
    features: states.map(state => ({
      type: "Feature",
      properties: {
        name: state.name,
        code: state.code,
        safety: state.safety
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[ // Simplified coordinates - in real app, use actual GeoJSON
          77.0 + Math.random() * 10, 
          20.0 + Math.random() * 10
        ], [
          78.0 + Math.random() * 10, 
          21.0 + Math.random() * 10
        ], [
          79.0 + Math.random() * 10, 
          22.0 + Math.random() * 10
        ], [
          77.0 + Math.random() * 10, 
          20.0 + Math.random() * 10
        ]]]
      }
    }))
  };

  const getColor = (safety: number) => {
    if (safety >= 70) return '#1a9850';  // Green - High safety
    if (safety >= 60) return '#fee08b';  // Yellow - Medium safety
    return '#d73027';  // Red - Low safety
  };

  const style = (feature: any) => ({
    fillColor: getColor(feature.properties.safety),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.75
  });

  const onEachFeature = (feature: any, layer: any) => {
    if (L) {
      layer.on({
        mouseover: (e: any) => {
          const layer = e.target;
          layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
          });
          layer.bringToFront();
        },
        mouseout: (e: any) => {
          L.geoJSON(e.target.feature, { style }).resetStyle(e.target);
        },
        click: (e: any) => {
          onStateClick(feature.properties.code);
        }
      });

      layer.bindTooltip(
        `${feature.properties.name}<br>Safety: ${feature.properties.safety}%`,
        { permanent: false, sticky: true }
      );
    }
  };

  if (!isClient) {
    return (
      <div className="w-full h-full bg-slate-100 flex items-center justify-center">
        <div className="text-slate-600">Loading map...</div>
      </div>
    );
  }

  return (
    <>
      <LeafletCSS />
      <div className="w-full h-full transition-shadow duration-300 hover:shadow-lg rounded-b-xl">
        {MapContainer && TileLayer && GeoJSON ? (
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON
              data={indiaGeoJSON}
              style={style}
              onEachFeature={onEachFeature}
            />
          </MapContainer>
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center">
            <div className="text-slate-600">Loading map components...</div>
          </div>
        )}
      </div>
    </>
  );
}
