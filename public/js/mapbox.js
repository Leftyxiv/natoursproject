/*eslint-disable*/

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoibGVmdHl4aXYiLCJhIjoiY2tqdWU2M2djNzVhMTJxcDk5bWloZmJrdyJ9.7hQWRXosGdjoDldj-H6pgA';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
});

const bounds = new mapboxgl.LatLngBounds();
