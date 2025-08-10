<template>
    <div class="w-full h-full shadow-lg overflow-hidden rounded-[2rem] relative" id="map">
        <!-- Zoom Controls -->
        <!-- Plus (bottom-right) -->
        <div class="absolute bottom-3 right-3 z-10 pointer-events-auto">
            <button
                aria-label="Zoom in"
                @click="handleZoomIn"
                class="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors leading-none shadow-md backdrop-blur-sm
                       bg-white/90 text-black border-white/80 hover:bg-white
                       dark:bg-black/60 dark:text-white dark:border-white/40 dark:hover:bg-black/70"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
            </button>
        </div>

        <!-- Minus (bottom-left) -->
        <div class="absolute bottom-3 left-3 z-10 pointer-events-auto">
            <button
                aria-label="Zoom out"
                @click="handleZoomOut"
                class="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors leading-none shadow-md backdrop-blur-sm
                       bg-white/90 text-black border-white/80 hover:bg-white
                       dark:bg-black/60 dark:text-white dark:border-white/40 dark:hover:bg-black/70"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" aria-hidden="true">
                    <path d="M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useColorMode } from '@vueuse/core';
import mapboxgl from 'mapbox-gl';
import memojiFavi from '@/assets/memoji_favi.png';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9uYXRoYW5ncmluc3RlYWQxOTk3IiwiYSI6ImNscTNwcGQ4MTBlOXUya3FubG85N2pjYmYifQ.4C2iTaUiNYuzlunMfJAZrw'
const lightStyle = 'mapbox://styles/jonathangrinstead1997/cmdagm7j1007501r1ajpa5l8t';
const darkStyle = 'mapbox://styles/jonathangrinstead1997/cmdagjf5v04sq01sd0hrq4t58';

let map: mapboxgl.Map | null = null;
let resizeObserver: ResizeObserver | null = null;
const mode = useColorMode();

// Trafalgar Square coordinates
const trafalgarSquare = [-0.1281, 51.5080];

const updateMapStyle = () => {
    if (map) {
        const newStyle = mode.value === 'dark' ? darkStyle : lightStyle;
        map.setStyle(newStyle);
        
        // Re-add the marker after style change
        map.once('styledata', () => {
            addMarkersToMap();
            // Ensure camera recenters on Trafalgar Square after style load
            map && map.setCenter(trafalgarSquare as mapboxgl.LngLatLike);
        });
    }
};

const addMarkersToMap = () => {
    if (!map) return;
    
    // Remove existing markers
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
    existingMarkers.forEach(marker => marker.remove());
    
    // Create custom marker element (emoji avatar)
    const customMarker = document.createElement('div');
    customMarker.style.cssText = `
        width: 40px;
        height: 40px;
        background-image: url(${memojiFavi});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        pointer-events: none;
    `;

    // Add the custom marker anchored at the center
    new mapboxgl.Marker({ element: customMarker, anchor: 'center' })
        .setLngLat([trafalgarSquare[0], trafalgarSquare[1]])
        .addTo(map);
        
    console.log('Marker added at coordinates:', trafalgarSquare);
};

const handleZoomIn = () => {
    if (!map) return;
    map.easeTo({
        zoom: map.getZoom() + 1,
        duration: 300,
        center: trafalgarSquare as mapboxgl.LngLatLike,
    });
};

const handleZoomOut = () => {
    if (!map) return;
    map.easeTo({
        zoom: map.getZoom() - 1,
        duration: 300,
        center: trafalgarSquare as mapboxgl.LngLatLike,
    });
};

onMounted(async () => {
    await nextTick();
    
    // Initialize map with current color mode
    const initialStyle = mode.value === 'dark' ? darkStyle : lightStyle;
    
    map = new mapboxgl.Map({
        container: 'map',
        style: initialStyle,
        attributionControl: false,
        logoPosition: 'bottom-left',
        interactive: false,
        center: [trafalgarSquare[0], trafalgarSquare[1]], // Set initial center
        zoom: 13 // Set initial zoom
    });

    // Add markers after map loads
    map.on('load', () => {
        if (map) {
            map.resize();
            addMarkersToMap();
            map.setCenter(trafalgarSquare as mapboxgl.LngLatLike);
        }
    });

    // Keep centered on window resizes
    map.on('resize', () => {
        map && map.setCenter(trafalgarSquare as mapboxgl.LngLatLike);
    });

    // Watch for color mode changes
    watch(mode, () => {
        updateMapStyle();
    });

    // Observe container resize to keep Mapbox canvas sized correctly
    const container = document.getElementById('map');
    if (container) {
        resizeObserver = new ResizeObserver(() => {
            map && map.resize();
        });
        resizeObserver.observe(container);
    }
});

onUnmounted(() => {
    if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
    }
});
</script>
<style scoped>
/* Hide all Mapbox controls and attribution within this component */
:deep(#map .mapboxgl-ctrl-bottom-right),
:deep(#map .mapboxgl-ctrl-bottom-left),
:deep(#map .mapboxgl-ctrl-top-right),
:deep(#map .mapboxgl-ctrl-top-left),
:deep(#map .mapboxgl-ctrl-group),
:deep(#map .mapboxgl-ctrl),
:deep(#map .mapboxgl-ctrl-attrib),
:deep(#map .mapboxgl-ctrl-logo),
:deep(#map .mapboxgl-ctrl-attrib-inner),
:deep(#map .mapboxgl-ctrl-attrib-button) {
    display: none !important;
}

/* Ensure the internal canvas cannot overflow the container */
#map { position: relative; }
#map :deep(.mapboxgl-canvas) { position: absolute; inset: 0; }
</style>  
<style>
/* Global to ensure Mapbox logo/attribution are hidden even across re-renders */
#map .mapboxgl-ctrl-logo,
#map .mapboxgl-ctrl-attrib,
#map .mapboxgl-ctrl-attrib-inner,
#map .mapboxgl-ctrl-attrib-button {
  display: none !important;
}
</style>