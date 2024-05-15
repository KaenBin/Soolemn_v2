mapboxgl.accessToken =
  "pk.eyJ1IjoicGhhbm1haXRhbmxvaSIsImEiOiJjbHc1NjUxM3QwcTJtMnJxZXNoOXVibG92In0.3qD6h1Bpb71JDF20zjFAnA";

const map = new mapboxgl.Map({
  container: "map",
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v12",
  center: [12.550343, 55.665957],
  zoom: 8,
});

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker()
  .setLngLat([12.554729, 55.70651])
  .addTo(map);

// Create a default Marker, colored black, rotated 45 degrees.
const marker2 = new mapboxgl.Marker({ color: "black", rotation: 45 })
  .setLngLat([12.65147, 55.608166])
  .addTo(map);
