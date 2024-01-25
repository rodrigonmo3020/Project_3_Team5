// Adding the title map
let myMap = L.map('map', {center:[24.408197,-101.6243106], zoom: 6})

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Variable to read the GeoJSON state data per year
let file1 = "static/data/geomex_2018.geojson"

// Defining the parameters to add color of the states according to the Total homicide number
function getColor(death) {
    return death > 4000 ? 'darkred' :
           death > 3000  ? 'red' :
           death > 2000  ? '#FFA500' :
           death > 1000  ? 'yellow' :
           death > 500   ? '#1e5945':
           death > 0     ? 'green':
                           'blue';
}

// Adding function for the map interaction 
function on_feature(feature, layer){
    layer.bindPopup(`<h1>${feature.properties.death}</h1><h3>${(feature.properties.state_name)}</h3>`)

    layer.on({
        mouseover: function(event){
            event.target.setStyle({fillOpacity: 1})
        },
    mouseout :  function(event){
        event.target.setStyle({fillOpacity: 0.6})
        },
    click    : function(event){
        myMap.fitBounds(event.target.getBounds());
        }
    })
}

// fetch the json data set and console log it
d3.json(file1).then(function(data){
    console.log(data);

    // define a styling function for the GeoJSON layer 
    L.geoJson(data, {
        style: function(feature){
            return {
                color : 'white',
                fillColor: getColor(feature.properties.death),
                fillOpacity: 0.6,
                weight : 1.5
            }
        },
        onEachFeature : on_feature
    }).addTo(myMap)

// Adding the map legend
let legend = L.control({position: "bottomleft"});
legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend"),
        grades = [0, 500, 1000, 2000, 3000, 4000],
        labels = [];

        div.innerHTML += "<h3 style='text-align: center'>Total Homicides</h3>"

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML += 
        '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};
legend.addTo(myMap);

})








