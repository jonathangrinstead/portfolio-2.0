<template>
    <div class="w-[300px] h-[300px] shadow-lg overflow-hidden rounded-2xl" id="map">

    </div>
</template>
<script setup lang="ts">
import { onMounted, nextTick, watch } from 'vue';
import { useColorMode } from '@vueuse/core';
import mapboxgl from 'mapbox-gl';
import memojiFavi from '@/assets/memoji_favi.png';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9uYXRoYW5ncmluc3RlYWQxOTk3IiwiYSI6ImNscTNwcGQ4MTBlOXUya3FubG85N2pjYmYifQ.4C2iTaUiNYuzlunMfJAZrw'
const lightStyle = 'mapbox://styles/jonathangrinstead1997/cmdagm7j1007501r1ajpa5l8t';
const darkStyle = 'mapbox://styles/jonathangrinstead1997/cmdagjf5v04sq01sd0hrq4t58';

let map: mapboxgl.Map | null = null;
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

onMounted(async () => {
    await nextTick();
    
    // Initialize map with current color mode
    const initialStyle = mode.value === 'dark' ? darkStyle : lightStyle;
    
    map = new mapboxgl.Map({
        container: 'map',
        style: initialStyle,
        attributionControl: false,
        logoPosition: 'bottom-left',
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
});
</script>
<style scoped>
/* Hide all Mapbox controls and attribution */
#map.mapboxgl-ctrl-bottom-right,
.mapboxgl-ctrl-bottom-left,
.mapboxgl-ctrl-top-right,
.mapboxgl-ctrl-top-left,
.mapboxgl-ctrl-group,
.mapboxgl-ctrl,
.mapboxgl-ctrl-attrib,
.mapboxgl-ctrl-logo {
    display: none !important;
}

#map .mapboxgl-ctrl{
    display: none !important;
}

/* Hide any remaining attribution elements */
.mapboxgl-ctrl-attrib-inner,
.mapboxgl-ctrl-attrib-button {
    display: none !important;
}

/* Apply border radius to map container and all Mapbox elements */
/* Ensure the internal canvas cannot overflow the container */
#map { position: relative; }
#map .mapboxgl-canvas { position: absolute; inset: 0; }
</style>  