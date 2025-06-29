import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getCityCoordinate } from '../data/cityCoordinates';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const createCustomIcon = (color: string, size: 'small' | 'medium' | 'large' = 'medium') => {
  const sizes = {
    small: [20, 20],
    medium: [25, 25],
    large: [35, 35]
  };
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: ${sizes[size][0]}px;
      height: ${sizes[size][1]}px;
      background-color: ${color};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    "></div>`,
    iconSize: sizes[size] as [number, number],
    iconAnchor: [sizes[size][0] / 2, sizes[size][1] / 2],
  });
};

const sourceIcon = createCustomIcon('#10B981', 'large'); // Green
const destinationIcon = createCustomIcon('#EF4444', 'large'); // Red
const pathIcon = createCustomIcon('#3B82F6', 'medium'); // Blue
const cityIcon = createCustomIcon('#6B7280', 'small'); // Gray

interface MapVisualizationProps {
  cities: string[];
  source?: string;
  destination?: string;
  path?: string[];
}

// Component to fit map bounds
const MapBounds: React.FC<{ bounds: L.LatLngBounds }> = ({ bounds }) => {
  const map = useMap();
  
  useEffect(() => {
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [map, bounds]);
  
  return null;
};

const MapVisualization: React.FC<MapVisualizationProps> = ({ 
  cities, 
  source, 
  destination, 
  path 
}) => {
  const mapRef = useRef<L.Map>(null);

  // Get coordinates for all cities
  const cityMarkers = cities.map(city => {
    const coord = getCityCoordinate(city);
    if (!coord) return null;
    
    let icon = cityIcon;
    let zIndex = 1;
    
    if (city === source) {
      icon = sourceIcon;
      zIndex = 1000;
    } else if (city === destination) {
      icon = destinationIcon;
      zIndex = 1000;
    } else if (path && path.includes(city)) {
      icon = pathIcon;
      zIndex = 500;
    }
    
    return {
      ...coord,
      icon,
      zIndex,
      isSpecial: city === source || city === destination || (path && path.includes(city))
    };
  }).filter(Boolean);

  // Create path polyline
  const pathCoordinates = path ? path.map(city => {
    const coord = getCityCoordinate(city);
    return coord ? [coord.lat, coord.lng] as [number, number] : null;
  }).filter(Boolean) : [];

  // Calculate bounds
  const bounds = L.latLngBounds([]);
  cityMarkers.forEach(marker => {
    if (marker) {
      bounds.extend([marker.lat, marker.lng]);
    }
  });

  // Default center (Krishna District center)
  const defaultCenter: [number, number] = [16.5, 80.8];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Map</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
            <span className="text-gray-600">Source</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow"></div>
            <span className="text-gray-600">Destination</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow"></div>
            <span className="text-gray-600">Path Cities</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-500 rounded-full border border-white shadow"></div>
            <span className="text-gray-600">Other Cities</span>
          </div>
        </div>
      </div>
      
      <div className="h-96 relative">
        <MapContainer
          ref={mapRef}
          center={defaultCenter}
          zoom={9}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* City markers */}
          {cityMarkers.map((marker, index) => (
            marker && (
              <Marker
                key={`${marker.name}-${index}`}
                position={[marker.lat, marker.lng]}
                icon={marker.icon}
                zIndexOffset={marker.zIndex}
              >
                <Popup>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{marker.name}</div>
                    <div className="text-sm text-gray-600">
                      {marker.name === source && "🟢 Source City"}
                      {marker.name === destination && "🔴 Destination City"}
                      {path && path.includes(marker.name) && marker.name !== source && marker.name !== destination && "🔵 On Route"}
                      {!marker.isSpecial && "📍 City"}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
                    </div>
                  </div>
                </Popup>
              </Marker>
            )
          ))}
          
          {/* Path polyline */}
          {pathCoordinates.length > 1 && (
            <Polyline
              positions={pathCoordinates}
              color="#3B82F6"
              weight={4}
              opacity={0.8}
              dashArray="10, 5"
            />
          )}
          
          {/* Fit bounds */}
          {bounds.isValid() && <MapBounds bounds={bounds} />}
        </MapContainer>
      </div>
      
      {path && path.length > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Route:</span> {path.join(' → ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapVisualization;