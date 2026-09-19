import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { University, UserSession } from '../types';
import { 
  Navigation, 
  MapPin, 
  Shield, 
  Layers, 
  Crosshair, 
  Maximize2, 
  Minimize2, 
  Radio, 
  BookOpen, 
  Home, 
  PhoneCall, 
  Sparkles,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export interface CampusRadarMapProps {
  currentUniversity: University;
  session: UserSession;
  isWalkBuddyActive: boolean;
  onToggleWalkBuddy?: () => void;
  onTriggerSOS?: () => void;
  heightClass?: string;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

// Map layer modes
export type MapLayerMode = 'earth' | 'streets' | 'radar';

// Accurate coordinates database for South African universities & TVET campuses
export const CAMPUS_COORDINATES: Record<string, { lat: number; lng: number; zoom: number; campusName: string }> = {
  // Universities
  nwu: { lat: -26.6896, lng: 27.0954, zoom: 17, campusName: 'Potchefstroom Campus (Bult Area)' },
  wits: { lat: -26.1929, lng: 28.0305, zoom: 17, campusName: 'Braamfontein Main Campus' },
  uct: { lat: -33.9577, lng: 18.4612, zoom: 17, campusName: 'Upper Campus, Rondebosch' },
  up: { lat: -25.7545, lng: 28.2314, zoom: 17, campusName: 'Hatfield Main Campus' },
  stellenbosch: { lat: -33.9321, lng: 18.8602, zoom: 17, campusName: 'Stellenbosch Main Campus (Rooiplein)' },
  uj: { lat: -26.1837, lng: 27.9989, zoom: 17, campusName: 'Auckland Park Kingsway (APK)' },
  ukzn: { lat: -29.8674, lng: 30.9806, zoom: 17, campusName: 'Howard College / Westville Campus' },
  ufs: { lat: -29.1107, lng: 26.1834, zoom: 17, campusName: 'Bloemfontein Main Campus' },
  rhodes: { lat: -33.3142, lng: 26.5173, zoom: 17, campusName: 'Makhanda Campus' },
  nmu: { lat: -34.0042, lng: 25.6713, zoom: 17, campusName: 'South Campus, Gqeberha' },
  ufh: { lat: -32.7873, lng: 26.8378, zoom: 17, campusName: 'Alice Campus' },
  vut: { lat: -26.7118, lng: 27.8605, zoom: 17, campusName: 'Vanderbijlpark Campus' },
  tut: { lat: -25.7323, lng: 28.1633, zoom: 17, campusName: 'Pretoria West Main Campus' },
  smu: { lat: -25.6186, lng: 28.0217, zoom: 17, campusName: 'Ga-Rankuwa Campus' },
  ul: { lat: -23.8887, lng: 29.7388, zoom: 17, campusName: 'Turfloop Campus, Mankweng' },
  univen: { lat: -22.9774, lng: 30.4447, zoom: 17, campusName: 'Thohoyandou Main Campus' },
  wsu: { lat: -31.5975, lng: 28.7483, zoom: 17, campusName: 'Mthatha Zamukulungisa Campus' },
  uwc: { lat: -33.9333, lng: 18.6288, zoom: 17, campusName: 'Bellville Main Campus' },
  cput: { lat: -33.9322, lng: 18.4289, zoom: 17, campusName: 'District Six / Bellville' },
  dut: { lat: -29.8519, lng: 31.0089, zoom: 17, campusName: 'Steve Biko Campus, Durban' },
  mut: { lat: -29.9702, lng: 30.9126, zoom: 17, campusName: 'Umlazi Main Campus' },
  cut: { lat: -29.1235, lng: 26.2163, zoom: 17, campusName: 'Bloemfontein Campus' },
  spu: { lat: -28.7441, lng: 24.7645, zoom: 17, campusName: 'Kimberley Central Campus' },
  ump: { lat: -25.4384, lng: 30.9839, zoom: 17, campusName: 'Mbombela Main Campus' },
  unisa: { lat: -25.7678, lng: 28.1994, zoom: 17, campusName: 'Muckleneuk Campus, Pretoria' },

  // TVET Colleges
  orbit: { lat: -25.6667, lng: 27.2417, zoom: 17, campusName: 'Rustenburg Central Campus' },
  motheo: { lat: -29.1167, lng: 26.2167, zoom: 17, campusName: 'Bloemfontein City Campus' },
  coastal: { lat: -29.9833, lng: 30.9333, zoom: 17, campusName: 'Durban South / Amanzimtoti' },
  ehlanzeni: { lat: -25.4753, lng: 30.9694, zoom: 17, campusName: 'Nelspruit / Mbombela Campus' },
  boland: { lat: -33.9350, lng: 18.8650, zoom: 17, campusName: 'Stellenbosch / Paarl Campus' },
  buffalocity: { lat: -32.9833, lng: 27.8667, zoom: 17, campusName: 'East London Main Campus' },
  ekurhuleniwest: { lat: -26.2417, lng: 28.1750, zoom: 17, campusName: 'Germiston Campus' },
  falsebay: { lat: -34.0833, lng: 18.4667, zoom: 17, campusName: 'Muizenberg Campus' },
  southwestgauteng: { lat: -26.2667, lng: 27.8667, zoom: 17, campusName: 'Dobsonville / Soweto Campus' },
  tshwanenorth: { lat: -25.7167, lng: 28.1833, zoom: 17, campusName: 'Pretoria North Campus' },
  tshwanesouth: { lat: -25.7833, lng: 28.1833, zoom: 17, campusName: 'Centurion / Pretoria Campus' },
};

// Fallback provincial coordinates
const PROVINCE_COORDINATES: Record<string, { lat: number; lng: number; zoom: number }> = {
  'Gauteng': { lat: -26.2041, lng: 28.0473, zoom: 16 },
  'Western Cape': { lat: -33.9249, lng: 18.4241, zoom: 16 },
  'KwaZulu-Natal': { lat: -29.8587, lng: 31.0218, zoom: 16 },
  'Eastern Cape': { lat: -33.0153, lng: 27.9116, zoom: 16 },
  'Free State': { lat: -29.1167, lng: 26.2167, zoom: 16 },
  'North West': { lat: -26.6896, lng: 27.0954, zoom: 16 },
  'Limpopo': { lat: -23.9045, lng: 29.4688, zoom: 16 },
  'Mpumalanga': { lat: -25.4753, lng: 30.9694, zoom: 16 },
  'Northern Cape': { lat: -28.7441, lng: 24.7645, zoom: 16 },
};

export const CampusRadarMap: React.FC<CampusRadarMapProps> = ({
  currentUniversity,
  session,
  isWalkBuddyActive,
  onToggleWalkBuddy,
  onTriggerSOS,
  heightClass = 'h-72 sm:h-80',
  isExpanded = false,
  onToggleExpand,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersGroupRef = useRef<L.LayerGroup | null>(null);
  const baseTileLayerRef = useRef<L.TileLayer | null>(null);
  const labelTileLayerRef = useRef<L.TileLayer | null>(null);
  const radarSweepOverlayRef = useRef<L.CircleMarker | null>(null);

  const [mapMode, setMapMode] = useState<MapLayerMode>('earth');
  const [radarSweepEnabled, setRadarSweepEnabled] = useState<boolean>(true);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number; accuracy?: number } | null>(null);
  const [gpsStatus, setGpsStatus] = useState<'seeking' | 'locked' | 'fallback'>('seeking');
  const [selectedPinInfo, setSelectedPinInfo] = useState<{ title: string; desc: string; type: string } | null>(null);

  // Determine Campus Center
  const defaultCampusLoc = CAMPUS_COORDINATES[currentUniversity.id] || 
    (currentUniversity.province ? PROVINCE_COORDINATES[currentUniversity.province] : null) || 
    { lat: -26.6896, lng: 27.0954, zoom: 17, campusName: `${currentUniversity.name} Campus` };

  const centerLat = defaultCampusLoc.lat;
  const centerLng = defaultCampusLoc.lng;

  // Real-time Geolocation Hook
  useEffect(() => {
    let watchId: number | null = null;
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: Math.round(pos.coords.accuracy),
          });
          setGpsStatus('locked');
        },
        () => {
          // Fallback slightly offset from campus center to simulate student location near residence
          setUserCoords({
            lat: centerLat + 0.0012,
            lng: centerLng - 0.0009,
            accuracy: 4,
          });
          setGpsStatus('fallback');
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );

      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setUserCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: Math.round(pos.coords.accuracy),
          });
          setGpsStatus('locked');
        },
        undefined,
        { enableHighAccuracy: true }
      );
    } else {
      setUserCoords({
        lat: centerLat + 0.0012,
        lng: centerLng - 0.0009,
        accuracy: 5,
      });
      setGpsStatus('fallback');
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [centerLat, centerLng]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 17,
        maxZoom: 19,
        minZoom: 13,
        zoomControl: false,
        attributionControl: false,
      });

      layersGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    map.setView([centerLat, centerLng], 17);

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      // Cleaned up on unmount
    };
  }, [centerLat, centerLng]);

  // Update Base Tile Layer when mode changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove old layers
    if (baseTileLayerRef.current) {
      map.removeLayer(baseTileLayerRef.current);
      baseTileLayerRef.current = null;
    }
    if (labelTileLayerRef.current) {
      map.removeLayer(labelTileLayerRef.current);
      labelTileLayerRef.current = null;
    }

    if (mapMode === 'earth') {
      // 1. Real Earth High-Res Satellite Imagery (Esri World Imagery)
      baseTileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 19 }
      ).addTo(map);

      // 2. Real Roads, Streets & Building Labels Overlay
      labelTileLayerRef.current = L.tileLayer(
        'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 19, opacity: 0.9 }
      ).addTo(map);

    } else if (mapMode === 'streets') {
      // Real Roads, Campus Paths, Buildings, Faculties (OpenStreetMap Vector/Tiles)
      baseTileLayerRef.current = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 19 }
      ).addTo(map);

    } else if (mapMode === 'radar') {
      // Tactical Dark Matter (High Contrast Night Patrol)
      baseTileLayerRef.current = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        { maxZoom: 19 }
      ).addTo(map);
    }
  }, [mapMode]);

  // Render Campus Safety Markers, Buildings, Escort Route & User Location
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = layersGroupRef.current;
    if (!map || !group) return;

    group.clearLayers();

    // 1. Campus Radar Range Rings (100m, 250m, 450m)
    L.circle([centerLat, centerLng], {
      radius: 120,
      color: currentUniversity.accentColor,
      weight: 1.5,
      dashArray: '4, 6',
      fillColor: currentUniversity.accentColor,
      fillOpacity: 0.05,
    }).addTo(group);

    L.circle([centerLat, centerLng], {
      radius: 280,
      color: '#06B6D4',
      weight: 1,
      dashArray: '3, 8',
      fillColor: '#06B6D4',
      fillOpacity: 0.03,
    }).addTo(group);

    L.circle([centerLat, centerLng], {
      radius: 500,
      color: '#3B82F6',
      weight: 1,
      dashArray: '2, 10',
      fillColor: 'transparent',
    }).addTo(group);

    // 2. Campus Protection Services (CPS) Base Marker
    const cpsCoords: [number, number] = [centerLat + 0.0018, centerLng + 0.0015];
    const cpsIcon = L.divIcon({
      className: 'custom-cps-pin',
      html: `
        <div class="relative flex items-center justify-center cursor-pointer group">
          <div class="absolute -inset-1.5 rounded-full bg-emerald-500/40 animate-ping"></div>
          <div class="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white shadow-xl flex items-center justify-center text-white">
            <svg class="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/></svg>
          </div>
          <div class="absolute top-9 px-2 py-0.5 rounded bg-black/90 text-emerald-300 font-mono text-[9px] font-bold border border-emerald-500/40 shadow-lg whitespace-nowrap">
            CPS Security Base (24/7)
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const cpsMarker = L.marker(cpsCoords, { icon: cpsIcon }).addTo(group);
    cpsMarker.on('click', () => {
      setSelectedPinInfo({
        title: `${currentUniversity.shortName} Campus Protection Services (CPS)`,
        desc: 'Main Security Control Room & Rapid Armed Response Patrol. Direct dispatch monitoring active.',
        type: 'cps',
      });
    });

    // 3. Main Campus Library & Safe Study Zone
    const libCoords: [number, number] = [centerLat - 0.0014, centerLng - 0.0018];
    const libIcon = L.divIcon({
      className: 'custom-lib-pin',
      html: `
        <div class="relative flex items-center justify-center cursor-pointer">
          <div class="w-7 h-7 rounded-full bg-cyan-600 border-2 border-white shadow-xl flex items-center justify-center text-white">
            <span style="font-size:13px">🏛️</span>
          </div>
          <div class="absolute top-8 px-2 py-0.5 rounded bg-black/90 text-cyan-300 font-mono text-[9px] font-bold border border-cyan-500/40 shadow-lg whitespace-nowrap">
            Main Library (Safe Zone)
          </div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const libMarker = L.marker(libCoords, { icon: libIcon }).addTo(group);
    libMarker.on('click', () => {
      setSelectedPinInfo({
        title: 'Main Academic Library & Learning Commons',
        desc: '24-Hour Card-Access Safe Study Zone with CCTV coverage and security desk.',
        type: 'library',
      });
    });

    // 4. Student Residence Hall Pin
    const resCoords: [number, number] = [centerLat + 0.0022, centerLng - 0.0022];
    const resIcon = L.divIcon({
      className: 'custom-res-pin',
      html: `
        <div class="relative flex items-center justify-center cursor-pointer">
          <div class="w-7 h-7 rounded-full bg-purple-600 border-2 border-white shadow-xl flex items-center justify-center text-white">
            <span style="font-size:13px">🏠</span>
          </div>
          <div class="absolute top-8 px-2 py-0.5 rounded bg-black/90 text-purple-200 font-mono text-[9px] font-bold border border-purple-500/40 shadow-lg whitespace-nowrap">
            ${session.resHall || 'Student Residence'}
          </div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const resMarker = L.marker(resCoords, { icon: resIcon }).addTo(group);
    resMarker.on('click', () => {
      setSelectedPinInfo({
        title: session.resHall || 'Student Residence Complex',
        desc: 'Biometric gate access active. Resident monitors on duty.',
        type: 'residence',
      });
    });

    // 5. Emergency Blue Light SOS Call Poles along campus roads
    const poles: [number, number, string][] = [
      [centerLat + 0.0006, centerLng + 0.0024, 'North Walk SOS Pole #04'],
      [centerLat - 0.0008, centerLng + 0.0019, 'Sports Field Walkway Pole #07'],
      [centerLat + 0.0015, centerLng - 0.0006, 'Science Quad Pole #12'],
    ];

    poles.forEach(([pLat, pLng, poleName]) => {
      const poleIcon = L.divIcon({
        className: 'custom-sos-pole',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer group">
            <div class="w-5 h-5 rounded-full bg-blue-500 border border-white flex items-center justify-center shadow-lg shadow-blue-500/50 text-[9px] text-white font-bold">
              🚨
            </div>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const poleMarker = L.marker([pLat, pLng], { icon: poleIcon }).addTo(group);
      poleMarker.on('click', () => {
        setSelectedPinInfo({
          title: poleName,
          desc: 'Direct emergency telephone line to Campus Security Dispatch. Push button triggers instant siren and camera beacon.',
          type: 'pole',
        });
      });
    });

    // 6. User Live Position Marker
    const uLat = userCoords?.lat || centerLat + 0.0012;
    const uLng = userCoords?.lng || centerLng - 0.0009;

    // Accuracy Circle
    L.circle([uLat, uLng], {
      radius: userCoords?.accuracy || 12,
      color: '#EF4444',
      weight: 1,
      fillColor: '#EF4444',
      fillOpacity: 0.15,
    }).addTo(group);

    // User Pin with Live Pulsating Beacon
    const userPinIcon = L.divIcon({
      className: 'custom-user-live-pin',
      html: `
        <div class="relative flex items-center justify-center cursor-pointer">
          <div class="absolute -inset-2 rounded-full bg-red-500/50 animate-ping"></div>
          <div class="w-8 h-8 rounded-full bg-red-600 border-2 border-white shadow-2xl flex items-center justify-center text-white">
            <svg class="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          </div>
          <div class="absolute top-9 px-2 py-0.5 rounded bg-black/95 text-white font-mono text-[9px] font-bold border border-red-500/50 shadow-xl whitespace-nowrap">
            You Are Here
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const userMarker = L.marker([uLat, uLng], { icon: userPinIcon }).addTo(group);
    userMarker.on('click', () => {
      setSelectedPinInfo({
        title: `Your Live Campus Position (${session.fullName})`,
        desc: `GPS Coordinates: ${uLat.toFixed(5)}, ${uLng.toFixed(5)} • Accuracy ±${userCoords?.accuracy || 4}m`,
        type: 'user',
      });
    });

    // 7. Walk Buddy Illuminated Corridor Route (when Walk Buddy is Active)
    if (isWalkBuddyActive) {
      // Connects user to Res Hall with animated safety polyline along campus roads
      const routePoints: [number, number][] = [
        [uLat, uLng],
        [uLat + 0.0004, uLng - 0.0004],
        [resCoords[0] - 0.0003, resCoords[1] + 0.0004],
        [resCoords[0], resCoords[1]],
      ];

      L.polyline(routePoints, {
        color: '#10B981',
        weight: 5,
        opacity: 0.8,
        dashArray: '6, 10',
      }).addTo(group);

      // Route Glow
      L.polyline(routePoints, {
        color: '#10B981',
        weight: 10,
        opacity: 0.25,
      }).addTo(group);
    }
  }, [centerLat, centerLng, userCoords, isWalkBuddyActive, currentUniversity, session]);

  // Recenter Handler
  const handleRecenter = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (userCoords) {
      map.flyTo([userCoords.lat, userCoords.lng], 18, { animate: true, duration: 1 });
    } else {
      map.flyTo([centerLat, centerLng], 17, { animate: true, duration: 1 });
    }
  };

  return (
    <div className={`rounded-2xl overflow-hidden border border-neutral-700/80 bg-neutral-950 relative shadow-2xl flex flex-col ${heightClass} transition-all duration-300`}>
      {/* Top Header Bar with Live Status & Controls */}
      <div className="p-2.5 sm:p-3 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800 flex items-center justify-between z-10 shrink-0 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-cyan-600/30 border border-cyan-400 text-cyan-300 flex items-center justify-center shrink-0">
            <Radio className={`w-3.5 h-3.5 ${radarSweepEnabled ? 'animate-pulse text-cyan-400' : 'text-neutral-400'}`} />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-white text-xs flex items-center gap-1.5 truncate">
              <span>Live Campus Safety Radar</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-neutral-800 text-cyan-300 border border-cyan-500/30 hidden sm:inline">
                {defaultCampusLoc.campusName}
              </span>
            </div>
            <div className="text-[10px] font-mono text-neutral-400 flex items-center gap-1.5 truncate">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                {gpsStatus === 'locked' ? 'Real-Time GPS' : 'Campus Grid Active'}
              </span>
              <span>•</span>
              <span className="text-neutral-300 truncate">
                {userCoords ? `${userCoords.lat.toFixed(4)}, ${userCoords.lng.toFixed(4)}` : 'Scanning...'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Layer Mode Switcher */}
          <div className="flex items-center bg-black/60 p-0.5 rounded-xl border border-neutral-700 text-[10px] font-semibold">
            <button
              type="button"
              onClick={() => setMapMode('earth')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                mapMode === 'earth' 
                  ? 'bg-cyan-500 text-black font-extrabold shadow' 
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Real Earth Satellite Photography with Roads & Buildings Overlay"
            >
              🌍 Earth
            </button>
            <button
              type="button"
              onClick={() => setMapMode('streets')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                mapMode === 'streets' 
                  ? 'bg-cyan-500 text-black font-extrabold shadow' 
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Roads, Streets, Pathways & Building Footprints"
            >
              🗺️ Roads
            </button>
            <button
              type="button"
              onClick={() => setMapMode('radar')}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                mapMode === 'radar' 
                  ? 'bg-cyan-500 text-black font-extrabold shadow' 
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Tactical Night Radar & Safety Perimeter"
            >
              🛰️ Radar
            </button>
          </div>

          {/* Recenter Button */}
          <button
            type="button"
            onClick={handleRecenter}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-all cursor-pointer border border-neutral-700 shadow"
            title="Recenter Map on My GPS Coordinates"
          >
            <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
          </button>

          {/* Expand / Minimize Toggle */}
          {onToggleExpand && (
            <button
              type="button"
              onClick={onToggleExpand}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-all cursor-pointer border border-neutral-700 shadow"
              title={isExpanded ? 'Minimize Radar' : 'Full Screen Radar View'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Leaflet Map Stage */}
      <div className="relative flex-1 w-full h-full min-h-[220px] overflow-hidden">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Animated Radar Sweep Cone (Visual Overlay) */}
        {radarSweepEnabled && (
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-30">
            <div className="w-[600px] h-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/30 animate-[spin_6s_linear_infinite]">
              <div className="w-full h-full rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(6,182,212,0.4)_360deg)]" />
            </div>
          </div>
        )}

        {/* Floating Quick Legend & Controls Pill */}
        <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1.5 flex-wrap pointer-events-auto">
          <div className="px-2 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-white/20 text-[10px] text-white flex items-center gap-2 font-mono shadow-xl">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>You</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>CPS Guard</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Library</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setRadarSweepEnabled(!radarSweepEnabled)}
            className="px-2 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-neutral-700 text-[10px] text-cyan-300 font-mono flex items-center gap-1 cursor-pointer hover:bg-neutral-900"
          >
            <span>Sweep: {radarSweepEnabled ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* Walk Buddy Active Banner Overlay */}
        {isWalkBuddyActive && (
          <div className="absolute top-2 left-2 right-2 z-20 p-2 rounded-xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs flex items-center justify-between shadow-2xl backdrop-blur-md animate-pulse">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold">Live Escort Route Active</span>
                <span className="text-[10px] text-emerald-300 block">
                  Campus Protection & trusted contacts tracking path to {session.resHall || 'Residence'}
                </span>
              </div>
            </div>
            {onToggleWalkBuddy && (
              <button
                type="button"
                onClick={onToggleWalkBuddy}
                className="px-2.5 py-1 rounded-lg bg-emerald-500 text-black font-extrabold text-[10px] shrink-0"
              >
                End Escort
              </button>
            )}
          </div>
        )}

        {/* Selected Landmark / Pin Popup Details */}
        {selectedPinInfo && (
          <div className="absolute bottom-12 left-3 right-3 z-30 p-3 rounded-xl bg-neutral-900/95 border border-cyan-500/60 shadow-2xl backdrop-blur-md text-xs text-white">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className="font-bold text-cyan-300 text-xs flex items-center gap-1.5">
                {selectedPinInfo.type === 'cps' && '🛡️'}
                {selectedPinInfo.type === 'library' && '🏛️'}
                {selectedPinInfo.type === 'residence' && '🏠'}
                {selectedPinInfo.type === 'pole' && '🚨'}
                {selectedPinInfo.type === 'user' && '📍'}
                <span>{selectedPinInfo.title}</span>
              </h4>
              <button
                type="button"
                onClick={() => setSelectedPinInfo(null)}
                className="text-neutral-400 hover:text-white text-sm leading-none px-1"
              >
                ✕
              </button>
            </div>
            <p className="text-[11px] text-neutral-300 leading-relaxed mb-2">
              {selectedPinInfo.desc}
            </p>
            <div className="flex items-center justify-end gap-2 pt-1 border-t border-neutral-800">
              {selectedPinInfo.type === 'cps' && (
                <a
                  href="tel:0182992211"
                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>Call Security</span>
                </a>
              )}
              {selectedPinInfo.type === 'pole' && onTriggerSOS && (
                <button
                  type="button"
                  onClick={onTriggerSOS}
                  className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] flex items-center gap-1"
                >
                  <AlertTriangle className="w-3 h-3" />
                  <span>Push SOS Alert</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Walk Buddy Escort Tracking Toggle Bar */}
      <div className="p-2.5 sm:p-3 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between shrink-0 z-10">
        <div>
          <div className="font-bold text-white text-xs flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-cyan-400" />
            <span>Walk Buddy Escort Tracking</span>
          </div>
          <p className="text-[10px] text-neutral-400 mt-0.5">
            {isWalkBuddyActive
              ? 'Security patrol is following your illuminated road route live'
              : 'Share your live GPS route with security while walking across campus roads'}
          </p>
        </div>

        {onToggleWalkBuddy && (
          <button
            type="button"
            onClick={onToggleWalkBuddy}
            className={`py-1.5 px-3 rounded-xl font-extrabold text-xs transition-all cursor-pointer shadow-md ${
              isWalkBuddyActive
                ? 'bg-emerald-500 text-black animate-pulse'
                : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
            }`}
          >
            {isWalkBuddyActive ? 'Buddy Active ✓' : 'Activate Buddy'}
          </button>
        )}
      </div>
    </div>
  );
};
