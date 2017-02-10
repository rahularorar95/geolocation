(() => {
  if (!window.navigator || !window.navigator.geolocation) {
    alert('Your browser doesn\'t support geolocation!');
    return;
  }

  function onGeolocateSuccess(coordinates) {
    const { latitude, longitude } = coordinates.coords;
    showMap(latitude, longitude);
  }

  function onGeolocateError(error) {
    console.log(error.code, error.message);

    if (error.code === 1) {
      console.log('User declined geolocation');
    } else if (error.code === 2) {
      console.log('Geolocation position unavailable');
    } else if (error.code === 3) {
      console.log('Timeout determining geolocation');
    }
  }

  function onLocationChange(coordinates) {
    const { latitude, longitude } = coordinates.coords;
    console.log('Changed coordinates: ', latitude, longitude);
  }

  function geolocate() {
    navigator.geolocation.getCurrentPosition(onGeolocateSuccess, onGeolocateError);
  }

  function watchLocation() {
    const watchId = navigator.geolocation.watchPosition(onLocationChange, onGeolocateError);
    window.localStorage.setItem('lastWatch', watchId);
  }

  function clearWatch() {
    const watchId = window.localStorage.getItem('lastWatch');
    navigator.geolocation.clearWatch(watchId);
    console.log('Cleared watchId: ', watchId);
  }

  function showMap(latitude, longitude) {
    const $map = document.getElementById('map');
    const position = {lat: latitude, lng: longitude};
    const map = new google.maps.Map($map, {
      center: position,
      zoom: 6
    });
    const marker = new google.maps.Marker({map, position});
  }

  function hideMap() {
    const $map = document.getElementById('map');
    $map.innerHTML = '';
  }

  window.enableButtons = () => {
    const $geolocateButton = document.getElementById('geolocation-button');
    const $watchButton =  document.getElementById('watch-button');
    const $clearWatchButton = document.getElementById('clear-watch-button');

    $geolocateButton.disabled = false;
    $watchButton.disabled = false;
    $clearWatchButton.disabled = false;

    console.log('Google Maps API loaded');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const $geolocateButton = document.getElementById('geolocation-button');
    const $watchButton =  document.getElementById('watch-button');
    const $clearWatchButton = document.getElementById('clear-watch-button');

    $geolocateButton.addEventListener('click', geolocate);
    $watchButton.addEventListener('click', watchLocation);
    $clearWatchButton.addEventListener('click', clearWatch);
  });
})();
