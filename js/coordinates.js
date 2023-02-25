// On mouse move, update the coordinates
map.on('mousemove', function (e) {
    const location = fromLatLngToLocation(e.latlng, 64, tilescale, mapzoomout);
    document.getElementById("coordinates").innerHTML = `X: ${Math.round(location.x)} Y: ${Math.round(location.y)} Z: ${Math.round(location.z)}`;
});

// On mouse out, reset the coordinates
map.on('mouseout', function () {
    document.getElementById("coordinates").innerHTML = "X: ---- Y: -- Z: ----";
});