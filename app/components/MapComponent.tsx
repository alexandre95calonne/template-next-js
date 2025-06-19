"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";

type City = {
  name: string;
  lat: number;
  lng: number;
  isCenter: boolean;
  postalCode?: string;
};

type MapComponentProps = {
  cities: City[];
  radius: number;
};

type MapControllerProps = {
  cities: City[];
  onMapReady: (map: L.Map) => void;
};

type PulseMarkerProps = {
  city: City;
  map: L.Map;
  index: number;
};

const PulseMarker = ({ city, map, index }: PulseMarkerProps) => {
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);
  const animationKey = useRef(`pulse-${city.name}-${index}`);

  // Délai basé sur l'index mais plus prévisible et espacé
  const animationDelay = useMemo(() => index * 0.5, [index]);

  useEffect(() => {
    let rafId: number;
    let lastUpdate = 0;

    const updatePoint = () => {
      const now = Date.now();
      // Limiter les mises à jour à 30fps maximum pour éviter les saccades
      if (now - lastUpdate < 33) return;

      rafId = requestAnimationFrame(() => {
        const newPoint = map.latLngToContainerPoint([city.lat, city.lng]);
        setPoint((prev) => {
          // Éviter les mises à jour inutiles si la position n'a pas significativement changé
          if (
            prev &&
            Math.abs(prev.x - newPoint.x) < 2 &&
            Math.abs(prev.y - newPoint.y) < 2
          ) {
            return prev;
          }
          return { x: newPoint.x, y: newPoint.y };
        });
        lastUpdate = now;
      });
    };

    updatePoint();

    // Debounce plus agressif pour mobile
    let timeoutId: NodeJS.Timeout;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updatePoint, 50); // Ralenti pour mobile
    };

    map.on("move", debouncedUpdate);
    map.on("zoom", debouncedUpdate);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      clearTimeout(timeoutId);
      map.off("move", debouncedUpdate);
      map.off("zoom", debouncedUpdate);
    };
  }, [map, city]);

  if (!point) return null;

  return (
    <div
      className="pointer-events-none absolute z-0"
      style={{
        left: `${point.x - 8}px`, // Ajustement pour centrer parfaitement
        top: `${point.y - 8}px`, // Ajustement pour centrer parfaitement
      }}
    >
      <div className="relative h-4 w-4">
        <motion.div
          key={animationKey.current} // Clé stable pour éviter les re-mounts
          className="absolute inset-0 rounded-full border border-tertiary/30"
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{
            scale: 2.5,
            opacity: 0,
          }}
          transition={{
            duration: 2.5, // Animation plus fluide
            repeat: Infinity,
            ease: "easeOut",
            repeatType: "loop", // Redémarre à chaque fois au lieu de faire l'aller-retour
            delay: animationDelay,
            repeatDelay: 0.5, // Pause entre les répétitions
          }}
        />
      </div>
    </div>
  );
};

export const MapController = ({ cities, onMapReady }: MapControllerProps) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      onMapReady(map);

      // Calculer les limites de la carte
      const bounds = L.latLngBounds(cities.map((city) => [city.lat, city.lng]));

      // Ajouter une marge réduite de 8% autour des points pour un zoom plus serré
      const padding = {
        top: bounds.getNorth() - bounds.getSouth(),
        right: bounds.getEast() - bounds.getWest(),
      };

      bounds.extend([
        bounds.getNorth() + padding.top * 0.08,
        bounds.getEast() + padding.right * 0.08,
      ]);
      bounds.extend([
        bounds.getSouth() - padding.top * 0.08,
        bounds.getWest() - padding.right * 0.08,
      ]);

      // Ajuster la vue de la carte avec un zoom plus élevé
      map.fitBounds(bounds, {
        padding: [20, 20],
        maxZoom: 12,
      });
    }
  }, [map, cities, onMapReady]);

  return null;
};

const createCustomIcon = (isCenter: boolean) => {
  return L.divIcon({
    html: `<div class="${isCenter ? "map-pin-center" : "map-pin"}"></div>`,
    className: "",
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

export const MapComponent = ({ cities, radius }: MapComponentProps) => {
  const radiusInMeters = radius * 1000;
  const [mapLoaded, setMapLoaded] = useState(false);
  const [map, setMap] = useState<L.Map | null>(null);
  const componentMounted = useRef(true);

  // Calculer le centre géographique réel de toutes les villes
  const initialCenter: L.LatLngExpression = useMemo(
    () => [
      cities.reduce((sum, city) => sum + city.lat, 0) / cities.length,
      cities.reduce((sum, city) => sum + city.lng, 0) / cities.length,
    ],
    [cities],
  );

  const handleMapReady = useCallback((map: L.Map) => {
    if (componentMounted.current) {
      setMap(map);
      setMapLoaded(true);
    }
  }, []);

  useEffect(() => {
    componentMounted.current = true;
    return () => {
      componentMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .map-pin {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #D91F10;
        border: 2px solid #D91F10;
        box-shadow: 0 2px 8px rgba(217, 31, 16, 0.3);
      }
      .map-pin-center {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #D91F10;
        border: 3px solid #D91F10;
        box-shadow: 0 3px 12px rgba(217, 31, 16, 0.4);
        position: relative;
      }
      .map-pin-center::after {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border: 2px solid rgba(217, 31, 16, 0.3);
        border-radius: 50%;
      }
      .leaflet-container {
        background-color: #f8f6f0;
        height: 100%;
        width: 100%;
        border-radius: 0.75rem;
        z-index: 1;
        border: 1px solid #e5e7eb;
        touch-action: pan-x pan-y;
      }
      .leaflet-popup-content-wrapper {
        background-color: white;
        color: #303234;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      .leaflet-popup-tip {
        background-color: white;
        border: 1px solid #e5e7eb;
      }
      .leaflet-popup-close-button {
        color: #303234 !important;
      }
      .map-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 10;
        border-radius: 0.75rem;
        overflow: hidden;
      }
      .leaflet-marker-icon {
        filter: none;
      }
      .leaflet-control-zoom {
        border: none !important;
        margin: 15px !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
      }
      .leaflet-control-zoom a {
        background-color: white !important;
        color: #303234 !important;
        border: 1px solid #e5e7eb !important;
        width: 32px !important;
        height: 32px !important;
        line-height: 30px !important;
        font-size: 16px !important;
      }
      .leaflet-control-zoom a:hover {
        background-color: #f9fafb !important;
        border-color: #D91F10 !important;
        color: #D91F10 !important;
      }
      .leaflet-control-zoom-in {
        border-radius: 6px 6px 0 0 !important;
      }
      .leaflet-control-zoom-out {
        border-radius: 0 0 6px 6px !important;
        border-top: none !important;
      }
      /* Masquer les crédits de la carte */
      .leaflet-control-attribution {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={initialCenter}
        zoom={8}
        style={{ height: "100%", width: "100%" }}
        attributionControl={false}
        zoomControl={true}
        scrollWheelZoom={false}
        dragging={true}
        touchZoom={true}
      >
        <MapController cities={cities} onMapReady={handleMapReady} />

        {/* Tuile de carte claire et moderne */}
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

        {/* Marqueurs des villes */}
        {cities.map((city) => (
          <Marker
            key={`marker-${city.name}`}
            position={[city.lat, city.lng] as L.LatLngExpression}
            icon={createCustomIcon(city.isCenter)}
          >
            <Popup>
              <div className="text-center">
                <div className="font-semibold text-secondary">{city.name}</div>
                {city.postalCode && (
                  <div className="text-sm text-secondary/70">
                    {city.postalCode}
                  </div>
                )}
                {city.isCenter && (
                  <div className="mt-1 text-xs font-medium text-tertiary">
                    Centre d&apos;intervention
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Effet de pulsation sur les marqueurs */}
      {mapLoaded && map && componentMounted.current && (
        <div className="map-overlay">
          {cities.map((city, index) => (
            <PulseMarker
              key={`pulse-${city.name}-${city.lat}-${city.lng}`}
              city={city}
              map={map}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};
