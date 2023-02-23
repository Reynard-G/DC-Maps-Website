// On mouse move, update the coordinates
map.on('mousemove', function (e) {
    const location = fromLatLngToLocation(e.latlng, 64, 1, 6);
    document.getElementById("coordinates").innerHTML = `X: ${location.x} Y: ${location.y} Z: ${location.z}`;
});

// On mouse out, reset the coordinates
map.on('mouseout', function () {
    document.getElementById("coordinates").innerHTML = "X: ---- Y: -- Z: ----";
});