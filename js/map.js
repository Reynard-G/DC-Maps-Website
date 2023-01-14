// Create the map along with the tile layer
var redmontMap = L.tileLayer('../images/Redmont/{z}/{x}/{y}.png', {
    minZoom: 2,
    maxZoom: 6,
    bounds: [[84.9901001802348, -172.99072265625003], [-64.47279382008165, 91.38427734375001]],
noWrap: true,
    unloadInvisibleTiles: true,
        reuseTiles: true
});

// Set the view when loaded in to be [-1, -60]
const map = L.map('map', {
    center: [84, -165],
    zoom: 6,
    layers: [redmontMap],
    attributionControl: false
}).flyTo([-1, -60]);

// Create the heatmap layer
// Get the data from the JSON file
var data = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "../data/heatmaps/Chestshop Heatmap.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

// Convert the x and z coordinates to lat and lng, the map is 12032x12032 and minecraft world is 6000x6000
function xy(x, z) {
    let layerPoint = map.containerPointToLayerPoint([x * 2, z * 2]);
    return map.layerPointToLatLng([layerPoint.x, layerPoint.y]);
}
// Edit the data in "data" to convert the x and z coordinates to lat and lng
let newCoords;
for (var i = 0; i < data.length; i++) {
    newCoords = xy(data[i].x, data[i].z);
    data[i] = {
        x: newCoords.lat,
        z: newCoords.lng,
        value: 1
    };
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

var heatmapLayer = new HeatmapOverlay(cfg);
heatmapLayer.setData(
    {
        max: 100000,
        data: data
    }
);

var baseMaps = {
    "<img src='images/icons/logo.jpg' width = 25 />": redmontMap
};

var overlayMaps = {
    "<img src='images/icons/block_world_heat.svg' width = 25 />": heatmapLayer
};

var layerControl = L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
