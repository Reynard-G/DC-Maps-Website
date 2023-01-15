// Create the maps along with the tile layer
var redmontMap = L.tileLayer('../images/Leaflet Maps/Redmont/{z}/{x}/{y}.png', {
    minZoom: 0,
    maxZoom: 6,
    maxNativeZoom: 6,
    bounds: [[84.9901001802348, -172.99072265625003], [-64.47279382008165, 91.38427734375001]],
    noWrap: true,
    unloadInvisibleTiles: true,
    reuseTiles: true
});

var redmontHeatMap = L.tileLayer('../images/Leaflet Maps/Redmont Heatmap/{z}/{x}/{y}.png', {
    minZoom: 2,
    maxZoom: 9,
    maxNativeZoom: 6,
    bounds: [[84.9901001802348, -172.99072265625003], [-64.47279382008165, 91.38427734375001]],
    noWrap: true,
    unloadInvisibleTiles: true,
    reuseTiles: true
});

// Set the view when loaded in to be [-1, -60]
const map = L.map('map', {
    zoom: 6,
    layers: [redmontMap],
    attributionControl: false
}).setView([180, -180]).flyTo([-1, -60]);

// Create the heatmap layer
// Get the data from the txt file
/*var data = (function () {
    var txt = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "../data/heatmaps/Chestshop Heatmap.txt",
        'dataType': "json",
        'success': function (data) {
            txt = data;
        }
    });
    return txt;
})();

// Convert the x and z coordinates to lat and lng, the map is 12032x12032 and minecraft world is 6000x6000
function xy(x, z) {
    //let layerPoint = map.containerPointToLayerPoint([x * 2, z * 2]);
    return map.containerPointToLatLng([(x * 2) + 970, (z * 2) + 400]);
}
// Edit the data in "data" to convert the x and z coordinates to lat and lng
let newCoords;
for (var i = 0; i < data.length; i++) {
    newCoords = xy(data[i][0], data[i][1]);
    data[i] = [
        newCoords.lat,
        newCoords.lng,
        .05
    ];
}

var cfg = {
    "radius": 2,
    "maxOpacity": .6,
    "scaleRadius": true,
    "useLocalExtrema": true,
    latField: 'x',
    lngField: 'z',
    valueField: 'value'
};

var heatmapLayer = L.heatLayer(data, { minOpacity: .05, max: .5, radius: 20 }).addTo(map);*/
var baseMaps = {
    "<img src='images/icons/logo.jpg' width = 25 />": redmontMap,
    "<img src='images/icons/block_world_heat.svg' width = 25 />": redmontHeatMap
};

var overlayMaps = {

};

var layerControl = L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
