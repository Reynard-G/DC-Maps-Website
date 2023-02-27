const worldtomap = [2.0, 0.0, -1.2246467991473532E-16, -1.2246467991473532E-16, 0.0, -2.0, 0.0, 1.0, 0.0];
const maptoworld = [0.5, -3.061616997868383E-17, 0.0, 0.0, 0.0, 1.0, -3.061616997868383E-17, -0.5, 0.0];
const tilescale = 1;
const mapzoomout = 6;

function fromLocationToLatLng(location, tilescale, mapzoomout) {
    var lat = worldtomap[3] * location.x + worldtomap[4] * location.y + worldtomap[5] * location.z + 248,
        lng = worldtomap[0] * location.x + worldtomap[1] * location.y + worldtomap[2] * location.z + 6;

    return new L.LatLng(
        -(((128 << tilescale) - lat) / (1 << mapzoomout))
        , lng / (1 << mapzoomout)
        , location.y
    );
}

function fromLatLngToLocation(latlng, y, tilescale, mapzoomout) {
    var lat = (128 << tilescale) + latlng.lat * (1 << mapzoomout),
        lng = latlng.lng * (1 << mapzoomout),
        x = maptoworld[0] * lng + maptoworld[1] * lat + maptoworld[2] * y - 3,
        z = maptoworld[6] * lng + maptoworld[7] * lat + maptoworld[8] * y + 124;

    return { x: x, y: y, z: z };
}

// Set the view when loaded in to be spawn
const spawn = fromLocationToLatLng({ x: 2725, y: 64, z: 4153 }, tilescale, mapzoomout);
const map = L.map('map', {
    crs: L.CRS.Simple,
    zoom: 6,
    attributionControl: false
}).setView([0, 0]).flyTo([spawn.lat, spawn.lng], 6);


// Create the maps along with the tile layer
const bounds = fromLocationToLatLng({ x: 6000, y: 64, z: 6000 }, tilescale, mapzoomout);
var redmontMap = L.tileLayer('../images/Leaflet Maps/Redmont/{z}/{x}/{y}.png', {
    minZoom: 2,
    maxZoom: 7,
    bounds: [[0, 0], [bounds.lat, bounds.lng]],
    noWrap: true,
    unloadInvisibleTiles: true,
    reuseTiles: true
}).addTo(map);

// Get the data from the txt file and convert the x and z coordinates to lat and lng
async function getHeatmapData() {
    var txt = await $.ajax({
        'url': "data/heatmaps/Chestshop Heatmap.txt",
        'dataType': "json",
    });

    return txt.map(position => {
        const coords = fromLocationToLatLng({ x: position[0], y: 64, z: position[1] }, tilescale, mapzoomout);
        return [coords.lat, coords.lng, .01];
    });
};

(async function () {
    const data = await getHeatmapData();
    
    var heatmapLayer = L.heatLayer(data, { minOpacity: .05, max: .5, radius: 20 });

    var baseMaps = {
        "<img src='images/icons/logo.jpg' width = 25 />": redmontMap,
    };

    var groupedOverlays = {
        "<font size='+1'>Heatmaps</font>": {
            "<img src='images/icons/block_world_heat.svg' width = 25 />": heatmapLayer
        }
    };

    L.control.groupedLayers(baseMaps, groupedOverlays, { collapsed: false }).addTo(map);
})();